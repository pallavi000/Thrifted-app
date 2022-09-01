import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";

const ZipCodePicker = (props) => {
  const [selectedSelect, setSelectedSelect] = useState(props.selectedSelect);
  const [selects, setSelects] = useState(props.selects);

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
      props.navigation.setOptions({
        headerShown: true,
        headerRight: () => null,
      });
    };
  }, [selectedSelect]);

  function doneSelect() {
    if (!selectedSelect) return;
    props.setSelectedSelect(selectedSelect);
    props.setShowAddressPicker(null);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={styles.categoryWrapper}>
          {selects.map((select) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedSelect(select)}
                key={uuidv4()}
              >
                <Text
                  style={
                    selectedSelect.zipcode == select.zipcode
                      ? styles.selectedName
                      : styles.name
                  }
                >
                  {select.zipcode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ZipCodePicker;

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
    paddingBottom: 90,
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
    color: "#000",
    textTransform: "capitalize",
  },
  selectedName: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Raleway_600SemiBold",
    paddingVertical: 15,
    borderBottomColor: "#c4c4c4",
    paddingHorizontal: 20,
    textTransform: "capitalize",
    color: "#663399",
  },
});
