import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import BrandCheck from "../ui/BrandCheck";
import { AuthContext } from "../Context";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";
import bbstyles from "../Styles";

export default function Interest({ navigation }) {
  const [category_ids, setCategory_ids] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const data = useContext(AuthContext);
  const { token, feedSetting, setFeedSetting } = data;
  const config = {
    headers: {
      "access-token": token,
    },
  };

  async function getCategories() {
    setIsLoading(true);
    try {
      let arr = [];
      const response = await axios.get("/category");
      for (const category of response.data) {
        arr = [...arr, ...category.childrens];
      }
      setCategories(arr);
    } catch (error) {
      apiErrorNotification(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (
      categories &&
      categories.length != 0 &&
      user.interests &&
      user.interests.length != 0
    ) {
      var arr = [];
      for (const category of categories) {
        if (user.interests.includes(category._id)) {
          arr.push(category._id);
        }
      }
      setCategory_ids(arr);
    }
  }, [categories, user]);

  const getUser = React.useCallback(async () => {
    try {
      const response = await axios.get("/user/currentuser", config);
      setUser(response.data.user);
    } catch (error) {
      apiErrorNotification(error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  function category_check(id) {
    if (category_ids.includes(id)) {
      var x = category_ids.filter((br) => br != id);
      setCategory_ids(x);
    } else {
      var b = [...category_ids, id];
      setCategory_ids(b);
    }
  }

  async function submitInterests() {
    setIsSubmitting(true);
    try {
      const data = {
        interests: category_ids,
      };
      const response = await axios.post(
        "/frontend/interests/feed",
        data,
        config
      );
      if (feedSetting) {
        var duplicate_feed = { ...feedSetting };
        setFeedSetting(duplicate_feed);
      }
      customSuccessNotification("Interests updated.");
      navigation.goBack();
    } catch (error) {
      apiErrorNotification(error);
      setIsSubmitting(false);
    }
  }
  return isLoading ? (
    <View style={bbstyles.loaderContainer}>
      <ActivityIndicator size={"large"} color="#663399" />
    </View>
  ) : (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.brandFilter}>
              <View>
                <Text style={styles.brandName}>{item.name}</Text>
              </View>
              <View style={styles.brandCheck}>
                <BrandCheck
                  brand={item}
                  brand_ids={user.interests ? user.interests : []}
                  brand_filter={category_check}
                />
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.filterApplySection}>
        {isSubmitting ? (
          <TouchableOpacity style={styles.apply}>
            <ActivityIndicator size={18} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => submitInterests()}>
            <Text style={styles.apply}>Save</Text>
          </TouchableOpacity>
        )}
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
    width: Dimensions.get("window").width / 2,
    textAlign: "center",
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
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  activeBrand: {
    color: "#663399",
  },
});
