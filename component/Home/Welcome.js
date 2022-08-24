import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";

export default function Welcome({ navigation }) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#663399",
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#663399" barStyle="light-content" />
      <Text style={styles.title}>Affordable Thrift Store</Text>
      <View style={styles.container}>
        <Image
          source={require("../../assets/favicon.png")}
          style={styles.imagecss}
        ></Image>
        <TouchableOpacity
          onPress={() => navigation.navigate("login")}
          style={styles.started}
        >
          <Text style={styles.startedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#663399",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginBottom: 90,
  },
  title: {
    fontWeight: "800",
    fontSize: 50,
    color: "white",
    fontFamily: "Raleway_800ExtraBold",
    padding: 10,
    textAlign: "center",
    paddingTop: 30,
  },
  imagecss: {
    width: Dimensions.get("window").width - 60,
    height: 314,
    resizeMode: "contain",
  },

  started: {
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    textAlign: "center",
    width: Dimensions.get("window").width - 80,
  },
  startedText: {
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
    fontSize: 20,
    color: "#663399",
  },
});
