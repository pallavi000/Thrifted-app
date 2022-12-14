import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Welcome from "./component/Home/Welcome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "./component/Context";
import jwt_decode from "jwt-decode";
import Comment from "./component/Home/Comment";

import ForgotPassword from "./component/Auth/ForgotPassword";
import ResetPassword from "./component/Auth/ResetPassword";
import TabNavigator from "./component/TabNavigator";
import Chat from "./component/message/Chat";
import NewChat from "./component/message/NewChat";
import Messages from "./component/message/Messages";
import ProductDetail from "./component/Product/ProductDetail";
import Checkout from "./component/Cart/Checkout";
import Shipping from "./component/address/Shipping";
import AddShipping from "./component/address/AddShipping";
import EditShipping from "./component/address/EditShipping";
import Search from "./component/search/Search";
import SearchResult from "./component/search/SearchResult";
import LoadingScreen from "./component/Auth/LoadingScreen";
import { io } from "socket.io-client";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_600SemiBold,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import ChangePassword from "./component/Auth/ChangePassword";
import ChangeProfile from "./component/Profile/ChangeProfile";
import Redeem from "./component/redeem/Redeem";
import EditPost from "./component/post/EditPost";
import OrderTrack from "./component/Order/OrderTrack";
import OrderSuccess from "./component/Order/OrderSuccess";
import * as Notifications from "expo-notifications";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import FeedSetting from "./component/setting/FeedSetting";
import ChangePickupLocation from "./component/post/ChangePickupLocation";
import Constants from "expo-constants";
import { RootSiblingParent } from "react-native-root-siblings";
import { customErrorNotification } from "./component/ErrorHandle";

// axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = Constants.manifest?.extra?.API_URL;

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default gestureHandlerRootHOC(function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState("");
  const [decode, setDecode] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [notificationApiCall, setNotificationApiCall] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [unreadMessage, setUnreadMessage] = useState(0);
  const [unreadNotification, setUnreadNotification] = useState(0);
  const [unreadNormalNotificationCount, setUnreadNormalNotificationCount] =
    useState(0);
  const [unreadOrderNotificationCount, setUnreadOrderNotificationCount] =
    useState(0);
  const [stories, setStories] = useState([]);

  const [userImage, setUserImage] = useState();
  const [isSeller, setIsSeller] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [feedSetting, setFeedSetting] = useState(null);
  const socket = useRef();
  const responseListener = useRef();
  const navigationRef = useRef();

  const [titleShown, setTitleShown] = useState({
    display: "flex",
  });

  // notification
  const registerForPushNotificationsAsync = React.useCallback(
    async (configToken) => {
      const config = {
        headers: {
          "access-token": configToken,
        },
      };
      try {
        let token;
        const { existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          customErrorNotification(
            "Failed to get push token for push notification."
          );

          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        const data = {
          token,
        };
        const response = await axios.post(
          "/frontend/notification/token",
          data,
          config
        );
      } catch (error) {}
    }
  );

  const retotal = React.useCallback((cartitems) => {
    var a = 0;
    var total = 0;
    cartitems.map((q) => {
      a += q.quantity;
      total += q.price * q.quantity;
    });
    setCartCount(a);
    setSubtotal(total);
    setCartItems(cartitems);
  }, []);

  function handleErrors(e) {
    //console.log(e);
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("connect_error", (err) => handleErrors(err));
      socket.current.on("connect_failed", (err) => handleErrors(err));
      socket.current.on("disconnect", (err) => handleErrors(err));

      socket.current.on("conversation", (conversation) => {
        //console.log("app");
      });
      socket.current.on("receiveMessage", (message) => {
        setUnreadMessage(unreadMessage + 1);
      });
      socket.current.on("notification", (notification) => {
        setUnreadNotification(unreadNotification + 1);
        setUnreadNormalNotificationCount(unreadNormalNotificationCount + 1);
      });
    }
  }, [socket, unreadMessage, unreadNotification, unreadNormalNotificationCount]);

  const socketConnect = (decoded) => {
    socket.current = io("https://hamrocloset.com", {
      reconnection: true,
      reconnectionAttempts: "Infinity",
      reconnectionDelay: 1000,
    });
    socket.current.on("connect", () => {
      socket.current.emit("join", decoded._id);
    });
  };

  const userImageSet = React.useCallback(async (decoded) => {
    try {
      const userImg = await AsyncStorage.getItem("userImage");
      if (!userImg) {
        if (decoded.image) {
          await AsyncStorage.setItem("userImage", decoded.image);
        }
        setUserImage(decoded.image);
      } else {
        setUserImage(userImg);
      }
    } catch (error) {
      // Do Nothing
    }
  }, []);

  const getCartItems = React.useCallback(async (token) => {
    try {
      const config = {
        headers: {
          "access-token": token,
        },
      };
      const response = await axios.get("/addtocart/cartcount", config);
      retotal(response.data);
    } catch (error) {
      // Maybe cache implementation??
    }
  }, []);

  function getFeedSetting() {
    if (feedSetting) {
      if (feedSetting.followings && feedSetting.interests) {
        return "all";
      } else if (feedSetting.followings) {
        return "followings";
      } else if (feedSetting.interests) {
        return "interests";
      } else {
        return "all";
      }
    } else {
      return "all";
    }
  }

  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        var data = response.notification.request.content.data;
        if (data.type == "comment") {
          navigationRef?.current?.navigate("Comments", data.post_id);
        }
        if (data.type == "order") {
          navigationRef?.current?.navigate("My Sales");
        }
        if (data.type == "message") {
          navigationRef?.current?.navigate("chat", data);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const getToken = React.useCallback(async () => {
    try {
      var [value, authConfig] = await Promise.all([
        AsyncStorage.getItem("feedsettings"),
        AsyncStorage.getItem("token"),
      ]);
      if (value) {
        setFeedSetting(JSON.parse(value));
      }
      if (authConfig) {
        setToken(authConfig);
        var token = authConfig;
        var decoded = jwt_decode(token);
        setDecode(decoded);
        if (!notificationApiCall) {
          registerForPushNotificationsAsync(token);
          setNotificationApiCall(true);
        }
        if (decoded.is_seller) {
          setIsSeller(true);
        }
        socketConnect(decoded);
        userImageSet(decoded);
        setIsLoggedIn(true);
        getCartItems(token);
      }
      setAppReady(true);
    } catch (error) {
      // Error Handle
    }
  }, [notificationApiCall]);

  useEffect(() => {
    getToken();
  }, [props, isLoggedIn]);

  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_600SemiBold,
    Raleway_400Regular,
    Raleway_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  return !appReady ? (
    <LoadingScreen />
  ) : (
    <RootSiblingParent>
      <NavigationContainer ref={navigationRef}>
        <AuthContext.Provider
          value={{
            isLoggedIn,
            getToken,
            unreadNotification,
            setUnreadNotification,
            socket,
            setIsLoggedIn,
            cartCount,
            setCartCount,
            token,
            decode,
            cartItems,
            subtotal,
            setCartItems,
            retotal,
            titleShown,
            setTitleShown,
            unreadMessage,
            setUnreadMessage,
            userImage,
            setUserImage,
            unreadNormalNotificationCount,
            setUnreadNormalNotificationCount,
            unreadOrderNotificationCount,
            setUnreadOrderNotificationCount,
            getCartItems,
            setProducts,
            products,
            selectedProduct,
            setSelectedProduct,
            setToken,
            isSeller,
            setIsSeller,
            feedSetting,
            setFeedSetting,
            getFeedSetting,
            stories,
            setStories,
          }}
        >
          {isLoggedIn ? (
            <Stack.Navigator>
              <Stack.Screen
                name="main"
                options={{
                  headerShown: false,
                }}
                component={TabNavigator}
              />
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: "#fff",
                    borderWidth: 0,
                  },
                  headerTitleAlign: "center",
                  headerShadowVisible: true,
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                  },
                }}
                name="Product Detail"
                component={ProductDetail}
              />
              <Stack.Screen
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                name="Checkout"
                component={Checkout}
              />

              <Stack.Screen
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "#663399",
                    color: "white",
                  },
                  headerTintColor: "white",
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    color: "white",
                  },
                }}
                name="Order Track"
                component={OrderTrack}
              />

              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Order Success"
                component={OrderSuccess}
              />

              <Stack.Screen
                name="Search"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                component={Search}
              />

              <Stack.Screen
                name="Search Result"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                component={SearchResult}
              />

              <Stack.Screen
                name="Edit Post"
                options={{
                  headerStyle: {
                    backgroundColor: "#fff",
                    borderWidth: 0,
                  },
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                  },
                }}
                component={EditPost}
              />

              <Stack.Screen
                name="Addresses"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                component={Shipping}
              />

              <Stack.Screen
                name="Change Pickup Location"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                component={ChangePickupLocation}
              />

              <Stack.Screen
                name="Add Address"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                component={AddShipping}
              />
              <Stack.Screen
                name="Edit Address"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                component={EditShipping}
              />

              <Stack.Screen
                name="Redeem"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "#663399",
                    color: "white",
                  },
                  headerTintColor: "white",
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    color: "white",
                  },
                }}
                component={Redeem}
              />

              <Stack.Screen
                name="Feed Setting"
                options={{
                  headerStyle: {
                    backgroundColor: "#fff",
                    borderWidth: 0,
                  },
                  headerTitleAlign: "center",
                  headerShadowVisible: true,
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                  },
                }}
                component={FeedSetting}
              />

              <Stack.Screen name="Comments" component={Comment} />
              <Stack.Screen
                name="Messages"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                component={Messages}
              />
              <Stack.Screen
                name="New Chat"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
                component={NewChat}
              />
              <Stack.Screen name="chat" component={Chat} />
              <Stack.Screen
                name="Change Password"
                options={{
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "#663399",
                    color: "white",
                  },
                  headerTintColor: "white",
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    color: "white",
                  },
                }}
                component={ChangePassword}
              />
              <Stack.Screen
                name="Edit Profile"
                options={{
                  headerStyle: {
                    backgroundColor: "#fff",
                    borderWidth: 0,
                  },
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                  },
                }}
                component={ChangeProfile}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="home" component={Welcome} />
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="register" component={Register} />
              <Stack.Screen
                name="forgotpassword"
                options={{
                  headerShown: true,
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: "#663399",
                    color: "white",
                  },
                  headerTitle: "Forgot Password ?",
                  headerTintColor: "white",
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    color: "white",
                  },
                }}
                component={ForgotPassword}
              />
              <Stack.Screen name="resetpassword" component={ResetPassword} />
            </Stack.Navigator>
          )}
        </AuthContext.Provider>
      </NavigationContainer>
    </RootSiblingParent>
  );
});

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
