import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import CartItem from "./Cart/CartItem";
import Category from "./category/Category";
import ChangePassword from "./Auth/ChangePassword";
import CreatePost from "../component/post/CreatePost";
import Closet from "./Profile/Closet";
import Profile from "./Profile/Profile";
import Setting from "./setting/Setting";
import Home from "./Home/Home";
import OrderHistory from "./Order/OrderHistory";
import OrderTrack from "./Order/OrderTrack";
import CategoryPage from "./category/CategoryPage";
import ChildCat from "./category/ChildCat";
import Shipping from "./address/Shipping";
import MyOrder from "./Order/MyOrder";
import OrderDetail from "./Order/OrderDetail";
import RedeemHistory from "./redeem/RedeemHistory";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "./Context";
import Notification from "./notification/Notification";
import Interest from "./Auth/Interest";
import RentSale from "./Home/RentSale";
import MySales from "./sales/MySales";
import SaleDetail from "./sales/SaleDetail";

const Stack = createNativeStackNavigator();

function HomeNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="landing"
        component={Home}
      />

      <Stack.Screen
        name="RentSale"
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
        component={RentSale}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="Change Password"
        component={ChangePassword}
      />

      <Stack.Screen
        name="Create Post"
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
        component={CreatePost}
      />

      <Stack.Screen
        name="Setting"
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
        component={Setting}
      />
      <Stack.Screen
        name="Category"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            borderWidth: 0,
            //               shadowColor: "#000000",
            // shadowOffset: {
            // 	width: 0,
            // 	height: 10,
            // },
            // shadowOpacity: 0.6,
            // shadowRadius: 16.00,

            // elevation: 24,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
        component={Category}
      />

      <Stack.Screen
        name="My Closet"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            borderWidth: 0,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        component={Closet}
      />

      <Stack.Screen
        name="Notification"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            borderWidth: 0,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        component={Notification}
      />

      <Stack.Screen
        name="Category Title"
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
        component={CategoryPage}
      />
      <Stack.Screen
        name="Child Category"
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
        component={ChildCat}
      />

      {/* <Stack.Screen name="payment" component={Payment}/>
          <Stack.Screen name="orderReceived" component={OrderReceived}/>
          <Stack.Screen name="editAddress" component={EditAddress}/> */}

      {/* <Stack.Screen name="changepassword" component={ChangePassword}/> */}
    </Stack.Navigator>
  );
}

function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            borderWidth: 0,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="Cart Items"
        component={CartItem}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Track Order"
        component={OrderTrack}
      />
    </Stack.Navigator>
  );
}

function CategoryNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Category"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            borderWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerTitleAlign: "center",
          headerShadowVisible: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
        component={Category}
      />
      <Stack.Screen
        name="Category Title"
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
        component={CategoryPage}
      />
      <Stack.Screen
        name="Child Category"
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
        component={ChildCat}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigation({ navigation }) {
  const data = useContext(AuthContext);
  const { setIsLoggedIn } = data;

  async function Logout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userImage");
    setIsLoggedIn(false);
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => Logout()}
              style={{ paddingRight: 20 }}
            >
              <MaterialCommunityIcons
                name="logout"
                size={20}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          ),
        }}
        component={Setting}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            borderWidth: 0,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="Profile"
        component={Profile}
      />

      <Stack.Screen
        name="Order History"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            borderWidth: 0,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        component={OrderHistory}
      />

      <Stack.Screen
        name="Addresses"
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
        component={Shipping}
      />

      <Stack.Screen
        name="My Orders"
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
        component={MyOrder}
      />

      <Stack.Screen
        name="My Sales"
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
        component={MySales}
      />

      <Stack.Screen
        name="Sale Details"
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
        component={SaleDetail}
      />

      <Stack.Screen
        name="Order Details"
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
        component={OrderDetail}
      />
      <Stack.Screen
        name="Interest Setting"
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
        component={Interest}
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
        name="Track Order"
        component={OrderTrack}
      />

      <Stack.Screen
        name="Redeemption History"
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
        component={RedeemHistory}
      />

      <Stack.Screen
        name="My Closet"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            borderWidth: 0,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        component={Closet}
      />
    </Stack.Navigator>
  );
}

export {
  HomeNavigation,
  ProfileNavigation,
  CartNavigation,
  CategoryNavigation,
};
