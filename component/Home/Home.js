import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  RefreshControl,
  TextInput,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import axios from "axios";
import { Ionicons, Feather, MaterialIcons, Fontisto } from "@expo/vector-icons";
import bbstyles from "../Styles";
import { imageLink } from "../ImageLink";
import { AuthContext } from "../Context";
import { useIsFocused } from "@react-navigation/native";
import Action from "./Action";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sellProducts, setSellProducts] = useState([]);
  const [rentProducts, setRentProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [loader, setLoader] = useState(true);
  const [nextPage, setNextPage] = useState(true);
  const [notificationToken, setNotificationToken] = useState("");
  const [dataType, setDataType] = useState("cache");
  const [feedSetting, setFeedSetting] = useState("followings");
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
  } = data;
  const config = {
    headers: {
      "access-token": token,
    },
  };
  const isFocused = useIsFocused();

  async function getSwitch() {
    try {
      var value = JSON.parse(await AsyncStorage.getItem("feedsettings"));
      if (value) {
        if (value.followings && value.interests) {
          setFeedSetting("all");
          return "all";
        } else if (value.followings) {
          setFeedSetting("followings");
          return "followings";
        } else if (value.interests) {
          setFeedSetting("interests");
          return "interests";
        } else {
          return "followings";
        }
      } else {
        return "followings";
      }
    } catch (error) {
      return "followings";
    }
  }

  const getProducts = useCallback(
    async (currentPage, countPerPage, productOnly) => {
      const data = {
        activePage: currentPage,
        itemsCountPerPage: countPerPage,
        productOnly,
        feedSetting: await getSwitch(),
      };

      try {
        const response = await axios.post("/frontend/app/home", data, config);
        if (!productOnly) {
          setProducts(response.data.product);
          // setBanners(response.data.banner)
          // setRentProducts(response.data.rentProduct)
          // setSellProducts(response.data.saleProduct)
          setCategories(response.data.categories);
          storeInCache(response.data);
          setDataType("real");
        } else {
          setProducts([...products, ...response.data.product]);
        }
        console.log("results");
        setLoader(false);
        setNextPage(false);
      } catch (error) {
        Alert.alert("Error", error.request.response);
        console.log(error.request.response);
        setLoader(false);
      }
    },
    [products]
  );

  const storeInCache = useCallback(async (data) => {
    try {
      await AsyncStorage.setItem("products", JSON.stringify(data.product));
      await AsyncStorage.setItem("categories", JSON.stringify(data.categories));
    } catch (error) {
      // Pass
    }
  }, []);

  const getProductsFromCache = useCallback(async () => {
    try {
      const products = await AsyncStorage.getItem("products");
      const categories = await AsyncStorage.getItem("categories");
      if (products && categories) {
        setProducts(JSON.parse(products));
        setCategories(JSON.parse(categories));
        setLoader(false);
      }
    } catch (error) {
      //Pass
    }
  }, []);

  const GetNextPage = useCallback(() => {
    setActivePage(activePage + 1);
    if (!nextPage) {
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
    getProductsFromCache();
    getProducts(activePage, itemsCountPerPage, false);
  }, []);

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

  const onRefresh = useCallback(() => {
    setActivePage(1);
    getProducts(1, itemsCountPerPage, false);
  });

  const renderItem = useCallback(
    ({ item, index }) => originalRenderItem({ item, index }),
    [products, categories]
  );

  const originalRenderItem = ({ item, index }) => {
    return (
      <View>
        {index == 0 ? (
          <FlatList
            contentContainerStyle={styles.wrapper}
            keyExtractor={(item) => item._id}
            horizontal={true}
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => navigation.navigate("Category Title", item)}
                style={styles.cateWrapper}
              >
                <Image
                  style={styles.category}
                  source={{ uri: imageLink + item.image }}
                />
                <Text numberOfLines={1} style={styles.cateText}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : null}
        <Action
          product={item}
          dataType={dataType}
          products={products}
          setProducts={setProducts}
          navigation={navigation}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {loader ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : (
        <>
          <View style={styles.homeNav}>
            <View style={styles.navlogo}>
              <Feather name="instagram" size={30} color="black" />
            </View>
            <View style={styles.navcontent}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                style={styles.icons}
              >
                <Image
                  source={require("../../assets/icons/Search.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}
                style={styles.icons}
              >
                <Fontisto name="bell" size={25} color="black" />
                {unreadNotification > 0 ? (
                  <Text style={styles.unreadNotification}>
                    {unreadNotification}
                  </Text>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Messages")}
                style={styles.icons}
              >
                <Image
                  source={require("../../assets/icons/Messenger.png")}
                  style={styles.icon}
                />
                {unreadMessage > 0 ? (
                  <Text style={styles.unreadMessage}>{unreadMessage}</Text>
                ) : null}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingBottom: 50, height: "100%" }}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              removeClippedSubviews={true}
              initialNumToRender={10}
              contentContainerStyle={{ paddingBottom: 20 }}
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              onEndReached={GetNextPage}
              ListFooterComponent={() => (
                <ActivityIndicator size={"large"} color="#663399" />
              )}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeNav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
  },
  icon: {
    height: 30,
    width: 30,
  },
  smallIcon: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  navcontent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    marginRight: 10,
    position: "relative",
  },
  unreadNotification: {
    position: "absolute",
    top: -3,
    right: -5,
    backgroundColor: "#FF2424",
    color: "white",
    height: 20,
    width: 20,
    fontSize: 10,
    borderRadius: 10,
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "600",
  },
  unreadMessage: {
    position: "absolute",
    top: 0,
    right: -6,
    backgroundColor: "#FF2424",
    color: "white",
    height: 20,
    width: 20,
    fontSize: 10,
    borderRadius: 10,
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "600",
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
