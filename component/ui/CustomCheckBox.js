import { StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomCheckBox = (props) => {
  async function checkCheckBox() {
    props.setSelection;
    await AsyncStorage.setItem("shippingId", props.id);
    props.loadSelectedCheckBox();
  }

  return (
    <CheckBox
      value={props.isSelected == props.id ? true : false}
      onValueChange={checkCheckBox}
      style={styles.checkbox}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    color: "white",
    marginRight: 8,
  },
});

export default CustomCheckBox;
