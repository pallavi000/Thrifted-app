import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import { Feather, Fontisto } from "@expo/vector-icons";

const Header = ({
  navigation,
  showDropDown,
  setShowDropDown,
  unreadNotification,
  unreadMessage,
}) => {
  return (
    <View style={styles.homeNav}>
      <TouchableWithoutFeedback onPress={() => setShowDropDown(!showDropDown)}>
        <View style={styles.navlogo}>
          <Image
            source={require("../../assets/app-logo.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.navLogoText}>हाम्रोCloset</Text>
          <Feather name="chevron-down" size={20} style={styles.navLogoArrow} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.navcontent}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.icons}
        >
          <Image
            source={require("../../assets/icons/Search.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notification")}
          style={styles.icons}
        >
          <Fontisto name="bell" size={25} color="black" />
          {unreadNotification > 0 ? (
            <Text style={styles.unreadNotification}>{unreadNotification}</Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Messages")}
          style={styles.icons}
        >
          <Image
            source={require("../../assets/icons/Messenger.png")}
            style={styles.icon}
          />
          {unreadMessage > 0 ? (
            <Text style={styles.unreadMessage}>{unreadMessage}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeNav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    position: "relative",
  },
  navLogoText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 18,
    marginLeft: 8,
  },
  navLogoArrow: {
    alignSelf: "flex-end",
    marginLeft: 2,
  },
  icon: {
    height: 30,
    width: 30,
  },
  smallIcon: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  navcontent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    marginRight: 10,
    position: "relative",
  },
  unreadNotification: {
    position: "absolute",
    top: -3,
    right: -5,
    backgroundColor: "#FF2424",
    color: "white",
    height: 20,
    width: 20,
    fontSize: 10,
    borderRadius: 10,
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "600",
  },
  unreadMessage: {
    position: "absolute",
    top: 0,
    right: -6,
    backgroundColor: "#FF2424",
    color: "white",
    height: 20,
    width: 20,
    fontSize: 10,
    borderRadius: 10,
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "600",
  },
  dropDownContainer: {
    backgroundColor: "white",
    position: "absolute",
    left: 10,
    top: 0,
    width: "100%",
    zIndex: 99,
    width: 150,
    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropDownItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dropDownItem: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 16,
  },
  dropDownLine: { borderTopWidth: 1, borderColor: "#eee" },
  navlogo: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
