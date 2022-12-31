import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Header = ({ modalRef, headerText, enableDone, multiSelectSubmit }) => {
  return (
    <View
      style={{
        alignItems: "center",
        height: 60,
        width: Dimensions.get("window").width,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        backgroundColor: "rgba(100, 100, 100, 0.2)",
      }}
    >
      <View
        style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity onPress={() => modalRef.current.close()}>
          <Image
            resizeMode="contain"
            style={{
              marginLeft: 10,
              width: 20,
              height: 20,
              tintColor: "#FFFFFF",
            }}
            source={require("../../assets/close.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 25,
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          {headerText}
        </Text>
      </View>
      <View style={{ marginRight: 10 }}>
        {enableDone ? (
          <TouchableOpacity onPress={() => multiSelectSubmit()}>
            <Image
              resizeMode="contain"
              style={{
                marginRight: 10,
                width: 25,
                height: 25,
                tintColor: "#FFFFFF",
              }}
              source={require("../../assets/forward.png")}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
