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

const HomepagePosts = ({
  onRefresh,
  GetNextPage,
  products,
  setProducts,
  navigation,
  hasNextPage = false,
  hasCategories = false,
  categories = null,
  dataType = "real",
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [enableScroll, setEnableScroll] = useState(true);

  const scRef = useRef(null);
  useScrollToTop(scRef);

  const renderItem = useCallback(
    ({ item, index }) => originalRenderItem({ item, index }),
    [products, categories]
  );

  const originalRenderItem = ({ item, index }) => {
    return (
      <View>
        {index == 0 && hasCategories ? (
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
      removeClippedSubviews={true}
      initialNumToRender={10}
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
};

export default HomepagePosts;

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
