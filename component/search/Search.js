import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import bbstyles from "../Styles";

const Search = ({ navigation }) => {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  async function startSearch() {
    setLoading(true);
    Keyboard.dismiss();
    if (query.trim().length == 0) return;
    const data = {
      search: query,
    };
    try {
      const response = await axios.post("/frontend/search-request", data);
      setLoading(false);
      navigation.navigate("Search Result", {
        search: query,
        products: response.data,
      });
    } catch (error) {
      Alert.alert(error.request.response);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {loading ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : (
        <View style={{ padding: 10 }}>
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
              ref={searchRef}
              autoFocus={true}
              returnKeyType="search"
              returnKeyLabel="Search"
              value={query}
              onChangeText={(text) => setQuery(text)}
              onSubmitEditing={() => startSearch()}
              selectionColor="#663399"
            ></TextInput>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: "#7676801F",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
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
});
