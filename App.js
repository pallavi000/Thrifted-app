import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect, useContext } from 'react';
import { Alert, StyleSheet, Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator }  from '@react-navigation/native-stack'
import Login from './component/Auth/Login'
import Register from './component/Auth/Register';
import Welcome from './component/Home/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Feather} from '@expo/vector-icons'
import axios from 'axios'
import { AuthContext } from './component/Context';
import jwt_decode from "jwt-decode";
import Comment from './component/Home/Comment';

import CreatePost from './component/post/CreatePost'

import ForgotPassword from './component/Auth/ForgotPassword'
import ResetPassword from './component/Auth/ResetPassword';
import { CartNavigation, categoryNavigation, homeNavigation, profileNavigation } from './component/StackNavigator';
import TabNavigator from './component/TabNavigator';
import Chat from './component/message/Chat';
import NewChat from './component/message/NewChat';
import Messages from './component/message/Messages';
import ProductDetail from './component/Product/ProductDetail';
import Checkout from './component/Cart/Checkout';
import Shipping from './component/address/Shipping';
import AddShipping from './component/address/AddShipping';
import EditShipping from './component/address/EditShipping';
import Search from './component/search/Search';
import SearchResult from './component/search/SearchResult';
import LoadingScreen from './component/Auth/LoadingScreen';

//axios.defaults.baseURL="http://localhost:5000/api"
axios.defaults.baseURL="http://167.86.77.80/api"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
 
export default function App(props) {
  const[isLoggedIn,setIsLoggedIn] = useState(false)
  const[cartCount,setCartCount]= useState(0)
  const[token,setToken] = useState('')
  const[decode,setDecode] = useState([])
  const[cartItems,setCartItems] = useState([])
  const[subtotal,setSubtotal] = useState([])
  const[loadingComplete, setLoadingComplete] = useState(false)
  const[unreadMessage, setUnreadMessage] = useState(0)
  const[userImage, setUserImage] = useState()
  const[appReady,setAppReady] = useState(false)
  
  const[titleShown,setTitleShown] = useState(
    {
      display: 'flex',
    }
  )
  

  const {navigation} = props


  function retotal(cartitems){
    var a = 0
    var total = 0
      cartitems.map(q=>{
           a  += q.quantity
           total += (q.price*q.quantity)
      })
     setCartCount(a)
     setSubtotal(total)
     setCartItems(cartitems)
  }
  
  async function getToken(){
    try {  
      const authConfig = await AsyncStorage.getItem('token')
      if(authConfig) {
        setToken(authConfig)
        var token = authConfig;
        var decoded = jwt_decode(token);
        setDecode(decoded)
        
        const userImg = await AsyncStorage.getItem('userImage')
        if(!userImg) {
          await AsyncStorage.setItem('userImage', decode.image)
          setUserImage(decode.image)
        } else {
          setUserImage(userImg)
        }

        const config = {
          headers: {
            'access-token':token
          }
        }
        setIsLoggedIn(true)
        const response = await axios.get('/addtocart/cartcount',config)
        retotal(response.data)
      }
      setAppReady(true)
    } catch (error) { 
      console.log(error.message)
    }
  }


  useEffect(() => {
    getToken()
}, [props,isLoggedIn])

  return (
    !appReady?(
      <LoadingScreen/>
    ):(
    <>
      <NavigationContainer>
      
      <AuthContext.Provider value={{isLoggedIn,getToken,setIsLoggedIn,cartCount,setCartCount,token,decode,cartItems,subtotal,setCartItems,retotal,titleShown,setTitleShown,unreadMessage, setUnreadMessage,userImage,setUserImage}}>
      {isLoggedIn ?(
        <Stack.Navigator>
          <Stack.Screen name='main'
          options={{
            headerShown: false,
          }}
          component={TabNavigator} />
          <Stack.Screen options={{
              headerStyle:{
                backgroundColor:'#f5f5ff',
                borderWidth:0,
              },
              headerTitleAlign: 'center',
              headerShadowVisible: false,
            }} 
            name="Product Detail"  component={ProductDetail}/>
            <Stack.Screen  options={{
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} name="Checkout" component={Checkout}/>

          <Stack.Screen name="Search" options={{
        
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                
              }} component={Search}/>

          <Stack.Screen name="Search Result" options={{
        
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                
              }} component={SearchResult}/> 

          <Stack.Screen name="Addresses" options={{
        
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                
              }} component={Shipping}/> 

            <Stack.Screen name="Add Address" options={{
                
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                
              }} component={AddShipping}/>
              <Stack.Screen name="Edit Address" options={{
                headerTitleAlign: 'center',
                headerShadowVisible: false,
              }} component={EditShipping}/>
          <Stack.Screen name='Comments' component={Comment}/>
          <Stack.Screen name="Messages" options={{
              headerTitleAlign: 'center',
              headerShadowVisible: false,
            }} component={Messages}/>
            <Stack.Screen name="New Chat" options={{
                headerTitleAlign: 'center',
                headerShadowVisible: false,
              }} component={NewChat}/>
          <Stack.Screen name="chat" component={Chat}/> 
        </Stack.Navigator>
      ):(<Stack.Navigator screenOptions={{
        headerShown:false
      }}>
          <Stack.Screen name="home" component={Welcome} />
          <Stack.Screen name="login" component={Login}/>
          <Stack.Screen name="register" component={Register}/>
          <Stack.Screen name="forgotpassword" options={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle:{
              backgroundColor:'#663399',
              color:'white'
            },
            headerTitle: 'Forgot Password ?',
            headerTintColor:'white',
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
              color:'white'
            } 
            
          }} component = {ForgotPassword}/>
          <Stack.Screen name="resetpassword" component = {ResetPassword}/>
        </Stack.Navigator>
        )}
        </AuthContext.Provider>
      </NavigationContainer>
      </>
      )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIcon: {
        height: 30,
        width: 30,
    },
  cartcount:{
    position:'absolute',
    right:12,
    top:5,
    height:20,
    width:20,
    borderRadius:10,
    textAlign:'center',
    backgroundColor:'#663399',
    color:'white',
    fontSize:15,
    fontWeight:'500',
    lineHeight:20,
    borderWidth: 1,
    borderColor: '#fff'
    
  }
});
