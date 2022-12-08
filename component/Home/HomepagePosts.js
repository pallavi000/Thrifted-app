import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { imageLink } from "../ImageLink";
import Action from "./Action";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import InstaStory from "react-native-insta-story";

export default React.memo(function HomepagePosts({
  onRefresh,
  GetNextPage,
  products,
  setProducts,
  navigation,
  hasNextPage = false,
  hasCategories = false,
  categories = null,
  dataType = "real",
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [enableScroll, setEnableScroll] = useState(true);

  const scRef = useRef(null);
  useScrollToTop(scRef);

  const renderItem = ({ item, index }) => originalRenderItem({ item, index });

  const data = [
    {
      user_id: 1,
      user_image:
        "https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg",
      user_name: "Ahmet Çağlar Durmuş",
      stories: [
        {
          story_id: 1,
          story_image:
            "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
          swipeText: "Custom swipe text for this story",
          onPress: () => console.log("story 1 swiped"),
        },
        {
          story_id: 2,
          story_image:
            "https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg",
        },
      ],
    },
    {
      user_id: 2,
      user_image:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      user_name: "Test User",
      stories: [
        {
          story_id: 1,
          story_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU",
          swipeText: "Custom swipe text for this story",
          onPress: () => console.log("story 1 swiped"),
        },
        {
          story_id: 2,
          story_image:
            "https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg",
          swipeText: "Custom swipe text for this story",
          onPress: () => console.log("story 2 swiped"),
        },
      ],
    },
  ];

  const originalRenderItem = ({ item, index }) => {
    return (
      <View>
        {index == 0 && hasCategories ? (
          <InstaStory
            unPressedBorderColor="#663399"
            pressedBorderColor="#663399"
            avatarSize={70}
            data={data}
            duration={10}
            onStart={(item) => console.log(item)}
            onClose={(item) => console.log("close: ", item)}
            customSwipeUpComponent={
              <View>
                <Text>Swipe</Text>
              </View>
            }
            avatarStyle={{ borderWidth: 2, borderColor: "#ddd" }}
            style={{
              marginTop: 5,
              marginBottom: 10,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}
          />
        ) : null}
        <Action
          product={item}
          dataType={dataType}
          products={products}
          setProducts={setProducts}
          navigation={navigation}
          setEnableScroll={setEnableScroll}
        />
      </View>
    );
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ref={scRef}
      showsVerticalScrollIndicator={false}
      initialNumToRender={6}
      removeClippedSubviews={true} // Unmount components when outside of window
      maxToRenderPerBatch={1} // Reduce number in each render batch
      updateCellsBatchingPeriod={100} // Increase time between renders
      windowSize={7} // Reduce the window size
      contentContainerStyle={{ paddingBottom: 20 }}
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      onEndReached={GetNextPage}
      onEndReachedThreshold={4}
      scrollEnabled={enableScroll}
      ListFooterComponent={() =>
        hasNextPage && <ActivityIndicator size={"large"} color="#663399" />
      }
    />
  );
});

const styles = StyleSheet.create({
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
