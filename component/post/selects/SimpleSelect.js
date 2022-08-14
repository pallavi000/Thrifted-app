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

const SimpleSelect = (props) => {
  const [selects, setSelects] = useState(props.selects);
  const [selectedSelect, setSelectedSelect] = useState(props.selectedSelect);

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
  }, [selectedSelect]);

  function doneSelect() {
    if (!selectedSelect) return;
    props.setSelectedSelect(selectedSelect);
    props.setOpenSelectField(null);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={styles.categoryWrapper}>
          {selects.map((select) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedSelect(select)}
                key={select._id}
              >
                <Text
                  style={
                    selectedSelect._id == select._id
                      ? styles.selectedName
                      : styles.name
                  }
                >
                  {select.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SimpleSelect;

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
