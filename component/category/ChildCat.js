import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native-gesture-handler";

export default function ChildCat({ navigation, route }) {
  const category = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category.name,
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Text style={styles.select}>Select Category</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.categoryWrapper}
        data={category.childrens}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Category Title", item)}
          >
            <Text style={styles.name}>
              {item.name} ({item.productcount})
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  select: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    padding: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryWrapper: {
    marginVertical: 10,
    paddingBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Raleway_600SemiBold",
    paddingVertical: 20,
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
});
