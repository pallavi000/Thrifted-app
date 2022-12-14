import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import BrandFilter from "../Product/filters/BrandFilter";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import CategoryFilter from "./CategoryFilter";

export default function SearchFilter(props) {
  const [showBrand, setShowBrand] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [color_id, setColor_id] = useState([]);
  const [brand_id, setBrand_id] = useState([]);
  const [minprice, setMinprice] = useState([0]);
  const [maxprice, setMaxprice] = useState([20000]);
  const [category_id, setCategory_id] = useState(props.category_id);
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );

  const { navigation } = props;

  useLayoutEffect(() => {
    setColor_id(props.color_id);
    setBrand_id(props.brand_id);
    if (props.maxprice && props.maxprice.length > 0) {
      setMaxprice(props.maxprice);
      setMinprice(props.minprice);
    }
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      title: "Filter",
      headerLeft: () => (
        <TouchableOpacity onPress={() => props.setFilter(false)}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      ),
    });
    return () => {
      props.navigation.setOptions({
        title: "Search Result",
        headerLeft: () => (
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        ),
      });
    };
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setCategory_id([selectedCategory._id]);
    }
  }, [selectedCategory]);

  function color_filter(id) {
    if (color_id.includes(id)) {
      var y = color_id.filter((c) => c != id);
      setColor_id(y);
    } else {
      var z = [...color_id, id];
      setColor_id(z);
    }
  }

  function apply() {
    props.setColor_id(color_id);
    props.setBrand_id(brand_id);
    if (minprice[0] != 0 || maxprice[0] != 20000) {
      props.setMinprice(minprice);
      props.setMaxprice(maxprice);
    } else {
      props.setMinprice([]);
      props.setMaxprice([]);
    }
    props.setCategory_id(category_id);
    props.setSelectedCategory(selectedCategory);
    props.setFilter(false);
  }

  function priceFilter(data) {
    setMaxprice([data[1]]);
    setMinprice([data[0]]);
  }

  function getBrandNames() {
    var brandNames = [];
    props.brands.forEach((brand) => {
      if (brand_id.includes(brand._id)) {
        brandNames.push(brand.name);
      }
    });
    return brandNames.join(", ");
  }

  return showBrand ? (
    <BrandFilter
      setShowBrand={setShowBrand}
      brands={props.brands}
      brand_id={brand_id}
      setBrand_id={setBrand_id}
    />
  ) : showCategory ? (
    <CategoryFilter
      categories={props.categories}
      navigation={navigation}
      setOpenSelectField={setShowCategory}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      setFilter={props.setFilter}
    />
  ) : (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.filterSection}>
            <Text style={styles.title}>Price Range</Text>
            <MultiSlider
              values={[minprice[0], maxprice[0]]}
              min={0}
              max={20000}
              snapped={true}
              smoothSnapped={true}
              markerStyle={{
                backgroundColor: "#663399",
                height: 20,
                width: 20,
              }}
              selectedStyle={{ backgroundColor: "#663399" }}
              trackStyle={{ height: 4 }}
              onValuesChangeFinish={(values) => priceFilter(values)}
              onValuesChange={(values) => priceFilter(values)}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.priceShow}>Rs. {minprice[0]}</Text>
              <Text style={styles.priceShow}>Rs. {maxprice[0]}</Text>
            </View>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.title}>Colors</Text>
            <View style={styles.filterContainer}>
              {props.colors.map((color) => {
                return color_id.includes(color._id) ? (
                  <TouchableOpacity
                    onPress={() => color_filter(color._id)}
                    style={styles.colorFilter}
                    key={color._id}
                  >
                    <View
                      style={[
                        styles.colorActive,
                        { backgroundColor: color.name },
                      ]}
                    ></View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={color._id}
                    onPress={() => color_filter(color._id)}
                    style={styles.colorFilterInactive}
                  >
                    <View
                      style={[styles.color, { backgroundColor: color.name }]}
                    ></View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* <View style={styles.filterSection}>
                    <Text style={styles.title}>Size</Text>
                        <View style={styles.filterContainer}>
                        <View ><Text style={styles.size}>XS</Text></View>
                        <View ><Text style={styles.activeSize}>S</Text></View>
                        <View ><Text style={styles.activeSize}>M</Text></View>
                        <View ><Text style={styles.size}>L</Text></View>
                        <View ><Text style={styles.size}>XL</Text></View>
                        <View ></View>
                        <View ></View>
                    </View>
                </View> */}
          {/* <View style={styles.filterSection}>
                        <Text style={styles.title}>Category</Text>
                                <View style={styles.filterContainer}>
                                    <Text style={styles.activeCategory}>All</Text>
                                    <Text style={styles.category}>Women</Text>
                                    <Text style={styles.category}>Men</Text>
                                    <Text style={styles.category}>Boys</Text>
                                    <Text style={styles.category}>Girls</Text>
                                </View>
                            </View> */}

          <TouchableOpacity
            style={styles.filterSection}
            onPress={() => setShowCategory(true)}
          >
            <Text style={styles.title}>Category</Text>
            <View style={styles.BrandFilter}>
              {selectedCategory ? (
                <Text style={styles.subtitle}>{selectedCategory.name}</Text>
              ) : (
                <Text style={styles.subtitle}>
                  Select category from the list.
                </Text>
              )}

              <Fontisto name="angle-right" size={20}></Fontisto>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterSection}
            onPress={() => setShowBrand(true)}
          >
            <Text style={styles.title}>Brand</Text>
            <View style={styles.BrandFilter}>
              {brand_id && brand_id.length > 0 ? (
                <Text style={styles.subtitle}>{getBrandNames()}</Text>
              ) : (
                <Text style={styles.subtitle}>
                  Select brands from the list.
                </Text>
              )}
              <Fontisto name="angle-right" size={20}></Fontisto>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.filterApplySection}>
        <TouchableOpacity onPress={() => props.setFilter(false)}>
          <Text style={styles.discard}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => apply()}>
          <Text style={styles.apply}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  priceShow: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#f5f5ff",
    borderWidth: 1,
    borderColor: "#663399",
    borderRadius: 5,
    color: "#663399",
    fontSize: 12,
  },
  filterSection: {
    padding: 20,
    // borderBottomColor:'#C9C9C9',
    // borderBottomWidth:1,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
  },

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    flexWrap: "wrap",
    marginTop: 20,
  },
  colorFilter: {
    height: 44,
    width: 44,
    borderRadius: 22,
    borderColor: "#020202",
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  colorFilterInactive: {
    height: 44,
    width: 44,
    borderRadius: 22,
    borderColor: "#fff",
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  colorActive: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#020202",
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: 1,
  },
  color: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#020202",
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: 1,
  },

  size: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    borderColor: "#ABB4BD",
    borderWidth: 0.4,
    paddingVertical: 10,
    width: 47,
    borderRadius: 7,
    textAlign: "center",
    marginRight: 20,
    marginBottom: 10,
  },

  activeSize: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    backgroundColor: "#663399",
    color: "white",
    borderColor: "#ABB4BD",
    borderWidth: 0.4,
    paddingVertical: 10,
    borderRadius: 7,
    width: 47,
    textAlign: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    paddingVertical: 10,
    width: 93,
    borderRadius: 10,
    borderColor: "#ABB4BD",
    borderWidth: 0.4,
    marginBottom: 10,
    textAlign: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  activeCategory: {
    fontSize: 14,
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    paddingVertical: 10,
    width: 93,
    borderRadius: 10,
    borderColor: "#ABB4BD",
    borderWidth: 0.4,
    backgroundColor: "#663399",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
  },
  BrandFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterApplySection: {
    backgroundColor: "#f5f5ff",
    paddingVertical: 5,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  apply: {
    paddingVertical: 10,
    paddingHorizontal: 60,
    fontSize: 14,
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    borderColor: "#663399",
    borderWidth: 0.4,
    color: "#f5f5ff",
    backgroundColor: "#663399",
    borderRadius: 25,
    marginVertical: 10,
  },
  discard: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    fontSize: 14,
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    borderColor: "#663399",
    borderWidth: 0.4,
    marginVertical: 10,
    borderRadius: 25,
  },
});
