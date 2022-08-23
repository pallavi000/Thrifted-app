import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "./Context";
import { Feather } from "@expo/vector-icons";
import {
  CartNavigation,
  CategoryNavigation,
  HomeNavigation,
  ProfileNavigation,
} from "./StackNavigator";
import CreatePost from "./post/CreatePost";
import { imageLink } from "./ImageLink";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const data = useContext(AuthContext);
  const { cartCount, decode, userImage } = data;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#663399",
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          display: "flex",
          paddingHorizontal: 10,
          justifyContent: "center",
          height: 50,
          shadowColor: "#ddd",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowRadius: 3.5,
          elevation: 5,
          backgroundColor: "#663399",
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNavigation}
        options={{
          tabBarIcon: () => <Feather name="home" size={25} color="white" />,
        }}
      />
      <Tab.Screen
        name="Category Nav"
        component={CategoryNavigation}
        options={{
          tabBarIcon: () => <Feather name="grid" size={25} color={"white"} />,
        }}
      />

      <Tab.Screen
        name="Create Post"
        component={CreatePost}
        options={{
          tabBarIcon: () => <Feather name="camera" size={25} color={"white"} />,
        }}
      />

      <Tab.Screen
        name="addtocart"
        component={CartNavigation}
        options={{
          tabBarIcon: () => (
            <>
              <Feather name="shopping-cart" size={25} color="white" />
              <Text style={styles.cartcount}>{cartCount}</Text>
            </>
          ),
        }}
      />

      <Tab.Screen
        name="account"
        component={ProfileNavigation}
        options={{
          tabBarIcon: () => (
            <Image
              source={{ uri: imageLink + userImage }}
              style={styles.imageIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  smallIcon: {
    height: 30,
    width: 30,
  },
  imageIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E5E5EA",
    backgroundColor: "white",
  },
  cartcount: {
    position: "absolute",
    right: 12,
    top: 5,
    height: 20,
    width: 20,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#663399",
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
