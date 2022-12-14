import { StyleSheet, SafeAreaView, Image } from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#663399",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/splash.png")}
        style={{ height: 75, width: 75, resizeMode: "center" }}
      />
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
