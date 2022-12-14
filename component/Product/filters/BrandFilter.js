import {
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BrandCheck from "../../ui/BrandCheck";
import { Ionicons } from "@expo/vector-icons";

export default function BrandFilter(props) {
  const [brands, setBrands] = useState(props.brands);

  const brand_filter = React.useCallback((id) => {
    if (props.brand_id.includes(id)) {
      var x = props.brand_id.filter((br) => br != id);
      props.setBrand_id(x);
    } else {
      var b = [...props.brand_id, id];
      props.setBrand_id(b);
    }
  });

  const searchBrand = React.useCallback((text) => {
    if (text.trim().length > 0) {
      let filterBrands = props.brands.filter((brand) =>
        brand.name.includes(text)
      );
      setBrands(filterBrands);
    } else {
      setBrands(props.brands);
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons
              style={styles.searchIcon}
              name="search"
              size={20}
              color="#979797"
            ></Ionicons>
            <TextInput
              style={styles.searchText}
              keyboardType="default"
              placeholder="Search"
              onChangeText={(text) => searchBrand(text)}
            ></TextInput>
          </View>
        </View>
        <FlatList
          data={brands}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.brandFilter}>
              <View>
                <Text style={styles.brandName}>{item.name}</Text>
              </View>
              <View style={styles.brandCheck}>
                <BrandCheck
                  brand={item}
                  brand_ids={props.brand_id}
                  brand_filter={brand_filter}
                />
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.filterApplySection}>
        <TouchableOpacity onPress={() => props.setShowBrand(false)}>
          <Text style={styles.discard}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.setShowBrand(false)}>
          <Text style={styles.apply}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchWrapper: {
    marginBottom: 20,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#7676801F",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  searchText: {
    color: "#979797",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    marginLeft: 8,
    height: 25,
    flexGrow: 1,
  },
  brandFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    margin: 8,
    padding: 10,
    borderColor: "#C4C4C4",
  },
  brandName: {
    fontSize: 16,
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
  },
  activeBrand: {
    fontSize: 16,
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    color: "#663399",
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
  filterApplySection: {
    backgroundColor: "#f5f5ff",
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
  },
  activeBrand: {
    color: "#663399",
  },
});
