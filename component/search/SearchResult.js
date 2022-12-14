import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { imageLink } from "../ImageLink";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import Animated from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Sort from "../Product/filters/Sort";
import bbstyles from "../Styles";
import EmptySearch from "./EmptySearch";
import { apiErrorNotification } from "../ErrorHandle";

const SearchResult = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const search = route.params.search;
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [sorting, setSorting] = useState("-_id");
  const [totalProduct, setTotalProduct] = useState(24);
  const sheetRef = useRef(null);

  const [brand_id, setBrand_id] = useState([]);
  const [color_id, setColor_id] = useState([]);
  const [minprice, setMinprice] = useState([]);
  const [maxprice, setMaxprice] = useState([]);
  const [category_id, setCategory_id] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [nextPage, setNextPage] = useState(true);
  const fall = new Animated.Value(1);
  const [nextPageProducts, setNextPageProducts] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [initLoader, setInitLoader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();

  async function getSideBarFilters() {
    try {
      const response = await axios.get("/frontend/search-sidebar");
      setBrands(response.data.brand);
      setColors(response.data.color);
      setCategories(response.data.category);
    } catch (error) {}
  }

  async function getProducts() {
    setLoader(true);
    setHasNextPage(true);
    setPageNo(1);
    try {
      const data = {
        search: search,
        sorting,
        pageNo: 1,
      };
      const response = await axios.post("/frontend/search-request", data);
      setProducts(response.data);
      setLoader(false);
      if (initLoader && response.data.length) {
        setInitLoader(false);
      }
      if (!response.data.length) {
        setHasNextPage(false);
      }
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  async function getFilterProducts() {
    setLoader(true);
    setHasNextPage(true);
    setPageNo(1);
    try {
      const data = {
        brand_id,
        category_id,
        color_id,
        minprice,
        maxprice,
        search,
        pageNo: 1,
        sorting,
      };
      const response = await axios.post("/frontend/search-filter", data);
      setProducts(response.data);
      setLoader(false);
    } catch (error) {}
  }

  async function getNextPageProducts() {
    try {
      const data = {
        brand_id,
        category_id,
        color_id,
        minprice,
        maxprice,
        search,
        pageNo: pageNo + 1,
        sorting,
      };
      const response = await axios.post("/frontend/search-filter", data);
      if (!response.data.length) {
        setHasNextPage(false);
      }
      setProducts([...products, ...response.data]);
    } catch (error) {}
  }

  useEffect(() => {
    if (
      (brand_id && brand_id.length != 0) ||
      (color_id && color_id.length != 0) ||
      (minprice && minprice.length != 0) ||
      (category_id && category_id.length != 0)
    ) {
      getFilterProducts();
    } else {
      getProducts();
    }
  }, [brand_id, color_id, minprice, category_id, sorting]);

  useEffect(() => {
    getSideBarFilters();
  }, []);

  const getSortingInfo = React.useCallback(() => {
    if (sorting == "-likes_count") {
      return "Popular";
    } else if (sorting == "-_id") {
      return "Newest";
    } else if (sorting === "price") {
      return "Price: lowest to high";
    } else if (sorting === "-price") {
      return "Price: highest to low";
    } else {
      return "Newest";
    }
  }, [sorting]);

  const GetNextPage = React.useCallback(() => {
    if (hasNextPage) {
      getNextPageProducts();
      setPageNo(pageNo + 1);
    }
  });

  return filter ? (
    <SearchFilter
      setFilter={setFilter}
      brand_id={brand_id}
      color_id={color_id}
      minprice={minprice}
      maxprice={maxprice}
      category_id={category_id}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      setCategory_id={setCategory_id}
      setBrand_id={setBrand_id}
      setColor_id={setColor_id}
      setMaxprice={setMaxprice}
      setMinprice={setMinprice}
      colors={colors}
      brands={brands}
      categories={categories}
      navigation={navigation}
    />
  ) : (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Sort
        sheetRef={sheetRef}
        sorting={sorting}
        setSorting={setSorting}
        fall={fall}
      />
      {loader ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : initLoader && !products.length ? (
        <EmptySearch navigation={navigation} />
      ) : (
        <Animated.View
          style={{
            opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.sortContainer}
              onPress={() => setFilter(true)}
            >
              <Ionicons name="filter" size={20}></Ionicons>
              <Text style={styles.filter}>Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sheetRef.current.snapTo(0)}
              style={styles.sortContainer}
            >
              <MaterialCommunityIcons
                name="swap-vertical"
                size={20}
              ></MaterialCommunityIcons>
              <Text style={styles.filter}>{getSortingInfo()}</Text>
            </TouchableOpacity>
          </View>
          {products.length ? (
            <FlatList
              contentContainerStyle={styles.container}
              data={products}
              numColumns={2}
              keyExtractor={(item) => item._id}
              onEndReachedThreshold={4}
              onEndReached={GetNextPage}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Product Detail", item)}
                  key={item._id}
                  style={styles.productWrapper}
                >
                  <Image
                    source={{ uri: imageLink + item.image }}
                    style={styles.productImage}
                  ></Image>
                  <View style={styles.detailWrapper}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {item.name}
                    </Text>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontWeight: "700",
                          fontFamily: "Raleway_700Bold",
                          marginVertical: 1,
                        }}
                      >
                        Rs. {item.price}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                hasNextPage ? (
                  <View style={{ flex: 1 / 2 }}>
                    <ActivityIndicator size={"large"} color="#663399" />
                  </View>
                ) : null
              }
              ListFooterComponentStyle={{
                padding: 40,
                flex: 1,
                alignSelf: "center",
              }}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 50,
              }}
            >
              <View>
                <Image
                  source={require("../../assets/empty-search.png")}
                  style={styles.image}
                />
              </View>
              <Text style={styles.header}>No Result Found</Text>
            </View>
          )}
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    resizeMode: "contain",
  },
  header: {
    fontWeight: "700",
    fontSize: 28,
    fontFamily: "Raleway_700Bold",
    color: "#262626",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 15,
    borderBottomColor: "#3C3C434A",
    borderBottomWidth: 0.5,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filter: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_400Regular",
    marginLeft: 5,
    textTransform: "capitalize",
  },
  container: {
    alignItems: "flex-start",
    paddingTop: 15,
    paddingBottom: 50,
    paddingHorizontal: 5,
  },
  productImage: {
    height: 170,
    resizeMode: "cover",
    borderRadius: 6,
  },
  productWrapper: {
    width: (Dimensions.get("window").width - 30) / 2,
    marginBottom: 15,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  productName: {
    fontSize: 12,
    fontWeight: "500",
    marginVertical: 2,
    fontFamily: "Raleway_600SemiBold",
  },
  detailWrapper: {
    padding: 10,
    paddingVertical: 5,
    shadowColor: "#ddd",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    elevation: 7,
  },
});
