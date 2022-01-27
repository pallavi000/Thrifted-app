import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect, useContext } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator }  from '@react-navigation/native-stack'
import Home from './component/Home';
import Login from './component/Login'
import Register from './component/Register';
import Welcome from './component/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetail from './component/ProductDetail';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Profile from './component/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {FontAwesome} from '@expo/vector-icons'
import CartItem from './component/CartItem';
import axios from 'axios'
import { AuthContext } from './component/Context';
import CartContext, { cartContext } from './component/CartContext';
import { spring } from 'react-native-reanimated';
import Address from './component/Address';
import MyCloset from './component/MyCloset';
import jwt_decode from "jwt-decode";
import Checkout from './component/Checkout';
import Payment from './component/Payment';
import OrderReceived from './component/OrderReceived';
import OrderList from './component/OrderList';
import EditAddress from './component/EditAddress';
import CreatePost from './component/CreatePost'
import SaleHistory from './component/SaleHistory';
import Payouts from './component/Payouts';
import Category from './component/Category'
import ForgotPassword from './component/ForgotPassword'
import ResetPassword from './component/ResetPassword';
import ChangePassword from './component/ChangePassword'

axios.defaults.baseURL="http://167.86.77.80:5000/api"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
 
export default function App(props) {

  const[isLoggedIn,setIsLoggedIn] = useState(false)
  const[cartCount,setCartCount]= useState(0)
  const[token,setToken] = useState('')
  const[decode,setDecode] = useState([])
  const[cartItems,setCartItems] = useState([])
  const[subtotal,setSubtotal] = useState([])

  const {navigation} = props


  function retotal(cartitems){
    Alert.alert("retotal",'retotal running')
    var a = 0
    var total = 0
      cartitems.map(q=>{
           a  += q.quantity
           total += (q.price*q.quantity)
      })
     setCartCount(a)
     setSubtotal(total)
     setCartItems(cartitems)
     console.log(cartItems)

  }
  
  
  async function getToken(){
    try {
      
      const authConfig = await  AsyncStorage.getItem('token') 
    setToken(authConfig)
    var token = authConfig;
    var decoded = jwt_decode(token);
    setDecode(decoded)

    const config = {
      headers: {
        'access-token':token
      }
    } 
    axios.get('/addtocart/cartcount',config).then(response=>{
     retotal(response.data)
     console.log(response.data)
    })
    console.log(decoded)
    if(authConfig){
      setIsLoggedIn(true)   
    }
    } catch (error) {
      
    }

    
  }


  
  useEffect(() => {
    getToken()
}, [props])


function homeStackNavigator({navigation}){


  return(
        <Stack.Navigator screenOptions={{
          headerShown:true
        }}>
    
          <Stack.Screen name="welcome" component={Welcome}/>
          <Stack.Screen  name="productdetail" component={ProductDetail}/>
          <Stack.Screen name="checkout" component={Checkout}/>
          <Stack.Screen name="payment" component={Payment}/>
          <Stack.Screen name="orderReceived" component={OrderReceived}/>
          <Stack.Screen name="orderList" component={OrderList}/>
          <Stack.Screen name="editAddress" component={EditAddress}/>
          <Stack.Screen name="category" component = {Category} />
          <Stack.Screen name="changepassword" component={ChangePassword}/>
          
          </Stack.Navigator>
  )
}

function profileNavigation(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="profile" component={Profile}/>
    </Stack.Navigator>
  )
}


function CartNavigation(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="cartItem" component={CartItem}/>
    </Stack.Navigator>
  )
}

 function Logout({navigation}){
  useEffect(async () => {
    await AsyncStorage.removeItem('token')
    setIsLoggedIn(false)
  }, [])
  return(
    <View>

    </View>
  )
}

function toggleNavigaton(){  
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile}/>
      <Drawer.Screen name="Address" component={Address}/>
      <Drawer.Screen name="My Closet" component={MyCloset}/>
      <Drawer.Screen name="Order List" component={OrderList}/>
      <Drawer.Screen name="Create Post" component={CreatePost}/>
      <Drawer.Screen name="Sales History" component={SaleHistory}/>
      <Drawer.Screen name="Payouts" component={Payouts}/>
      <Drawer.Screen name="Logout" component={Logout}/>

    </Drawer.Navigator>
  )
}

  return (
    <>
      <NavigationContainer>
      <AuthContext.Provider value={{isLoggedIn,getToken,setIsLoggedIn,cartCount,setCartCount,token,decode,cartItems,subtotal}}>
      {isLoggedIn ?(
        <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarActiveTintColor:'red',
        tabBarLabelPosition:'below-icon',
        tabBarStyle: {
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          height: 70,
          shadowColor: '#ddd',
          shadowOffset: {
            width: 0,
            height: 10
          },
          shadowRadius: 3.5,
          elevation: 5
        },
      }}>
        
        <Tab.Screen name="home"  component={homeStackNavigator} options={{
            tabBarIcon:()=>(
            <FontAwesome name="home" size={30}/>
            )
          }}/> 
        <Tab.Screen  name="profile" component={profileNavigation} options={{
          tabBarIcon:()=>(<FontAwesome name="user" size={30} />)
        }}/>
        <Tab.Screen name="addtocart" component={CartNavigation} options={{
          tabBarIcon:()=>(<><FontAwesome name="shopping-cart" size={30}/><Text style={styles.cartcount}>{cartCount}</Text></>)
        }}/>
        <Tab.Screen name="toggle" component={toggleNavigaton} options={{
          tabBarIcon:()=>(<FontAwesome name="bars" size={30}/>)
        }}/>

      </Tab.Navigator>
      ):(<Stack.Navigator screenOptions={{
        headerShown:false
      }}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={Login}/>
          <Stack.Screen name="register" component={Register}/>
            <Stack.Screen name="forgotpassword" component = {ForgotPassword}/>
            <Stack.Screen name="resetpassword" component = {ResetPassword}/>
        </Stack.Navigator>
        )}
      
        </AuthContext.Provider>
      </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartcount:{
    position:'absolute',
    right:18,
    top:10,
    height:20,
    width:20,
    borderRadius:10,
    textAlign:'center',
    backgroundColor:'rebeccapurple',
    color:'white',
    fontSize:15,
    fontWeight:'500',
    lineHeight:20
    
  }
});
