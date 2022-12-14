import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CategorySelect = (props) => {
  const [parentCategories, setParentCategories] = useState(props.categories);
  const [childCategories, setChildCategories] = useState([]);
  const [grandChildCategories, setGrandChildCategories] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedGrandChildId, setSelectedGrandChildId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );

  const changeHeader = React.useCallback(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <TouchableOpacity onPress={() => doneSelect()}>
          <Text
            style={{
              fontFamily: "Raleway_700Bold",
              fontSize: 16,
              color: "#663399",
              marginRight: 10,
            }}
          >
            Done{" "}
            <MaterialCommunityIcons
              name="check-bold"
              size={16}
              color="#663399"
            />
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    changeHeader();
    return () => {
      props.initChangeHeader();
    };
  }, [selectedCategory]);

  function doneSelect() {
    props.setSelectedCategory(selectedCategory);
    props.setOpenSelectField(null);
  }

  function selectParentCategory(catId) {
    const filterCat = props.categories.filter((cate) => cate._id == catId);
    if (filterCat && filterCat.length > 0) {
      setParentCategories(filterCat);
      setSelectedParentId(filterCat[0]._id);
      setSelectedCategory(filterCat[0]);
      setChildCategories(filterCat[0].childrens);
      setGrandChildCategories([]);
      setSelectedChildId(null);
    }
  }

  function selectChildCategory(catId) {
    const filterCat = childCategories.filter((child) => child._id == catId);
    if (filterCat && filterCat.length > 0) {
      setChildCategories(filterCat);
      setSelectedChildId(filterCat[0]._id);
      setSelectedCategory(filterCat[0]);
      setGrandChildCategories(filterCat[0].childrens);
      setSelectedGrandChildId(null);
    }
  }

  function selectGrandChildCategory(cate) {
    setSelectedGrandChildId(cate._id);
    setSelectedCategory(cate);
  }

  function reset() {
    setParentCategories(props.categories);
    setChildCategories([]);
    setGrandChildCategories([]);
    setSelectedParentId(null);
    setSelectedChildId(null);
    setSelectedGrandChildId(null);
    setSelectedCategory(props.selectedCategory);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => reset()}>
        <Text style={styles.select}>All Categories</Text>
      </TouchableOpacity>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={styles.categoryWrapper}>
          {parentCategories.map((child) => {
            return (
              <TouchableOpacity
                onPress={() => selectParentCategory(child._id)}
                key={child._id}
              >
                <Text
                  style={
                    selectedParentId == child._id
                      ? styles.selectedName
                      : styles.name
                  }
                >
                  {child.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.childCategoryWrapper}>
          {childCategories.map((child) => {
            return (
              <TouchableOpacity
                key={child._id}
                onPress={() => selectChildCategory(child._id)}
              >
                <Text
                  style={
                    selectedChildId == child._id
                      ? styles.selectedName
                      : styles.name
                  }
                >
                  {child.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.grandChildCategoryWrapper}>
          {grandChildCategories.map((child) => {
            return (
              <TouchableOpacity
                key={child._id}
                onPress={() => selectGrandChildCategory(child)}
              >
                <Text
                  style={
                    selectedGrandChildId == child._id
                      ? styles.selectedName
                      : styles.name
                  }
                >
                  {child.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategorySelect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 999,
    paddingBottom: 30,
    backgroundColor: "white",
  },
  select: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoryWrapper: {},
  childCategoryWrapper: {
    marginLeft: 20,
  },
  grandChildCategoryWrapper: {
    marginLeft: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Raleway_600SemiBold",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    color: "#000",
  },
  selectedName: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Raleway_600SemiBold",
    paddingVertical: 15,
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    color: "#663399",
  },
});
