import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Filter from "../Product/filters/Filter";
import axios from "axios";
import { imageLink } from "../ImageLink";
import bbstyles from "../Styles";
import Sort from "../Product/filters/Sort";
import Animated from "react-native-reanimated";

export default function CategoryPage({ navigation, route }) {
  const [filter, setFilter] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [sorting, setSorting] = useState("-_id");
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [totalProduct, setTotalProduct] = useState(24);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const sheetRef = useRef(null);

  const [brand_id, setBrand_id] = useState([]);
  const [color_id, setColor_id] = useState([]);
  const [minprice, setMinprice] = useState([]);
  const [maxprice, setMaxprice] = useState([]);
  const category = route.params;

  const [category_id, setCategory_id] = useState([]);
  const [currentcatId, setCurrentcatId] = useState(category._id);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const fall = new Animated.Value(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  }, []);

  useEffect(() => {
    if (
      (brand_id && brand_id.length != 0) ||
      (color_id && color_id.length != 0) ||
      (minprice && minprice.length != 0) ||
      (category_id && category_id.length != 0)
    ) {
      filterProducts();
    } else {
      getProducts();
    }
  }, [sorting, brand_id, color_id, category_id, minprice]);

  const getProducts = async () => {
    setLoader(true);
    setHasNextPage(true);
    setPageNo(1);
    try {
      const data = {
        category_slug: category.slug,
        pageNo: 1,
        sorting,
      };
      var response = await axios.post("/category/filter", data);
      var x = response.data.products.filter(
        (v, i, a) => a.findIndex((t) => t._id === v._id) === i
      );
      setProducts(x);
      setBrands(response.data.brands);
      setColors(response.data.colors);
      setTotalProduct(response.data.count);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  async function filterProducts() {
    setLoader(true);
    setHasNextPage(true);
    setPageNo(1);
    var data = {
      brand_id,
      color_id,
      minprice,
      maxprice,
      category_id,
      pageNo: 1,
      sorting,
    };
    if (category_id && category_id.length > 0) {
    } else {
      data = {
        brand_id,
        color_id,
        minprice,
        maxprice,
        category_id: [currentcatId],
        pageNo: 1,
        sorting,
      };
    }
    try {
      var response = await axios.post("/category/checkfilter", data);
      var x = response.data.products.filter(
        (v, i, a) => a.findIndex((t) => t._id === v._id) === i
      );
      setProducts(x);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }

  async function getNextPageProducts() {
    var data = {
      brand_id,
      color_id,
      minprice,
      maxprice,
      category_id,
      pageNo: pageNo + 1,
      sorting,
    };
    if (category_id && category_id.length > 0) {
    } else {
      data = {
        brand_id,
        color_id,
        minprice,
        maxprice,
        category_id: [currentcatId],
        pageNo: pageNo + 1,
        sorting,
      };
    }
    try {
      var response = await axios.post("/category/checkfilter", data);
      if (!response.data.products.length) {
        setHasNextPage(false);
      }
      var x = response.data.products.filter(
        (v, i, a) => a.findIndex((t) => t._id === v._id) === i
      );
      setProducts([...products, ...x]);
    } catch (error) {}
  }

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

  const GetNextPage = useCallback(() => {
    if (hasNextPage) {
      getNextPageProducts();
      setPageNo(pageNo + 1);
    }
  });

  const onRefresh = useCallback(() => {
    setActivePage(1);
    getProducts();
  });

  return filter ? (
    <Filter
      setFilter={setFilter}
      brand_id={brand_id}
      color_id={color_id}
      minprice={minprice}
      maxprice={maxprice}
      setBrand_id={setBrand_id}
      setColor_id={setColor_id}
      setMaxprice={setMaxprice}
      setMinprice={setMinprice}
      colors={colors}
      brands={brands}
      title={category.name}
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
          {products.length > 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={styles.container}
              data={products}
              numColumns={2}
              keyExtractor={(item) => item._id + "" + new Date().getTime()}
              onEndReachedThreshold={4}
              onEndReached={GetNextPage}
              renderItem={({ item, index }) => (
                <>
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
                </>
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
                paddingTop: 90,
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
}

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
