import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import bbstyles from "../Styles";
import { imageLink } from "../ImageLink";
import { AuthContext, timeSince } from "../Context";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import HomepagePosts from "./HomepagePosts";
import NoProducts from "./NoProducts";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";
import CreateStory from "../story/CreateStory";
import Animated from "react-native-reanimated";
import HamroImagePicker from "../HamroImagePicker/HamroImagePicker";

export default function Home({ navigation }) {
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [loader, setLoader] = useState(true);
  const [nextPage, setNextPage] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [notificationToken, setNotificationToken] = useState("");
  const [dataType, setDataType] = useState("cache");
  const [showDropDown, setShowDropDown] = useState(false);

  const data = useContext(AuthContext);
  const {
    unreadMessage,
    setUnreadMessage,
    token,
    unreadNotification,
    setUnreadNotification,
    socket,
    unreadNormalNotificationCount,
    setUnreadNormalNotificationCount,
    unreadOrderNotificationCount,
    setUnreadOrderNotificationCount,
    products,
    setProducts,
    feedSetting,
    getFeedSetting,
    decode,
    stories,
    setStories,
  } = data;
  const config = {
    headers: {
      "access-token": token,
    },
  };
  const isFocused = useIsFocused();

  const getProducts = async (currentPage, countPerPage, productOnly) => {
    const data = {
      activePage: currentPage,
      itemsCountPerPage: countPerPage,
      productOnly,
      feedSetting: getFeedSetting(),
    };
    try {
      var sendDate = new Date().getTime();
      const response = await axios.post("/frontend/app/home", data, config);
      if (!productOnly) {
        setProducts(response.data.product);
        var userStories = changeStoriesLink(response.data.stories);
        setStories(userStories);
        response.data.stories = userStories;
        var receiveDate = new Date().getTime();
        var responseTimeMs = receiveDate - sendDate;
        console.log(responseTimeMs / 1000);
        storeInCache(response.data);
        setDataType("real");
      } else {
        setProducts([...products, ...response.data.product]);
      }
      if (response.data.product.length != itemsCountPerPage) {
        setHasNextPage(false);
      }
      if (!response.data.product.length) {
        setHasNextPage(false);
      }
      setLoader(false);
      setNextPage(false);
    } catch (error) {
      apiErrorNotification(error);
      setLoader(false);
    }
  };

  const storeInCache = useCallback(async (data) => {
    try {
      await AsyncStorage.setItem("products", JSON.stringify(data.product));
      await AsyncStorage.setItem("stories", JSON.stringify(data.stories));
    } catch (error) {
      // Pass
    }
  }, []);

  const getProductsFromCache = useCallback(async () => {
    try {
      const products = await AsyncStorage.getItem("products");
      const stories = await AsyncStorage.getItem("stories");
      if (products && stories) {
        setProducts(JSON.parse(products));
        setStories(JSON.parse(stories));
        setLoader(false);
      }
    } catch (error) {
      //Pass
    }
  }, []);

  const GetNextPage = useCallback(() => {
    setActivePage(activePage + 1);
    if (!nextPage && hasNextPage) {
      setNextPage(true);
      getProducts(activePage + 1, itemsCountPerPage, true);
    }
  }, [nextPage, activePage]);

  const getUnreadMessageCount = useCallback(async () => {
    try {
      const response = await axios.get("/chat/message/unread-count", config);
      setUnreadMessage(response.data);
    } catch (error) {
      // Pass
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUnreadMessageCount();
      getUnreadNotificationCount();
    }
  }, [token, isFocused]);

  useEffect(() => {
    console.log("active", activePage);
  }, [activePage]);

  useEffect(() => {
    getProductsFromCache();
    getProducts(activePage, itemsCountPerPage, false);
  }, [feedSetting]);

  const getUnreadNotificationCount = useCallback(async () => {
    try {
      var response = await axios.get("/notification/count", config);
      setUnreadNotification(response.data.total);
      setUnreadNormalNotificationCount(response.data.normalNotificationCount);
      setUnreadOrderNotificationCount(response.data.orderNotificationCount);
    } catch (error) {
      // Pass
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setActivePage(1);
    await getProducts(1, itemsCountPerPage, false);
    customSuccessNotification("Page Refreshed.");
  });

  const goToRentSalePage = (type) => {
    setShowDropDown(false);
    navigation.navigate("RentSale", {
      type,
      feedSetting,
    });
  };

  const DropDownItem = useCallback(() => {
    return (
      <View style={styles.dropDownContainer}>
        <TouchableOpacity
          style={styles.dropDownItemWrapper}
          onPress={() => goToRentSalePage("Sale")}
        >
          <Text style={styles.dropDownItem}>Sale</Text>
          <FontAwesome name="shopping-bag" size={16} />
        </TouchableOpacity>
        <View style={styles.dropDownLine}></View>
        <TouchableOpacity
          style={styles.dropDownItemWrapper}
          onPress={() => goToRentSalePage("Rent")}
        >
          <Text style={styles.dropDownItem}>Rent</Text>
          <FontAwesome name="recycle" size={16} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  function changeStoriesLink(users) {
    users.forEach((user) => {
      user.user_image = imageLink + user.user_image;
      user.stories.forEach((story) => {
        story.story_image = imageLink + story.story_image;
        story.story_video = imageLink + story.story_video;
        story.date = timeSince(story.createdAt);
      });
    });
    return users;
  }

  const bottomSheetRef = useRef();
  const fill = new Animated.Value(1);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        position: "relative",
      }}
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {loader ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : (
        <Animated.View
          style={[
            styles.container,
            {
              opacity: Animated.add(0.3, Animated.multiply(fill, 1.0)),
            },
          ]}
        >
          <Header
            unreadMessage={unreadMessage}
            unreadNotification={unreadNotification}
            navigation={navigation}
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
          />

          <View style={{ paddingBottom: 70, height: "100%" }}>
            {showDropDown && <DropDownItem />}
            {activePage === 1 && !products.length ? (
              <NoProducts navigation={navigation} />
            ) : (
              <HomepagePosts
                onRefresh={onRefresh}
                GetNextPage={GetNextPage}
                hasNextPage={hasNextPage}
                products={products}
                setProducts={setProducts}
                hasStories={true}
                stories={stories}
                setStories={setStories}
                dataType={dataType}
                navigation={navigation}
                bottomSheetRef={bottomSheetRef}
              />
              // <HamroImagePicker />
            )}
          </View>
        </Animated.View>
      )}
      <CreateStory
        bottomSheetRef={bottomSheetRef}
        setStories={setStories}
        fill={fill}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropDownContainer: {
    backgroundColor: "white",
    position: "absolute",
    left: 10,
    top: 0,
    width: "100%",
    zIndex: 99,
    width: 150,
    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropDownItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dropDownItem: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 16,
  },
  dropDownLine: { borderTopWidth: 1, borderColor: "#eee" },
  navlogo: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  category: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderColor: "rebeccapurple",
    borderWidth: 2,
  },
  cateWrapper: {
    marginHorizontal: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cateText: {
    textAlign: "center",
    marginTop: 4,
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: "500",
    width: 60,
  },

  productWrapper: {
    marginBottom: 20,
  },
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  userimage: {
    height: 34,
    width: 34,
    borderWidth: 2,
    borderColor: "rebeccapurple",
    padding: 5,
    borderRadius: 17,
  },
  username: {
    fontSize: 16,
    textTransform: "capitalize",
    marginLeft: 6,
  },
  product: {},
  productImage: {
    height: 400,
    width: "100%",
    resizeMode: "cover",
  },
  typeWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,

    marginBottom: 5,
  },
  detailWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  productname: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    width: 180,
  },
  type: {
    fontSize: 14,
    paddingHorizontal: 9,
    paddingVertical: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    textTransform: "capitalize",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 5,
  },
  size: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  brand: {
    fontSize: 15,
    marginLeft: 5,
  },
  productreview: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  reviewicon: {
    marginRight: 10,
  },
});
