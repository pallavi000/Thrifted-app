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

import CreatePost from './component/post/CreatePost'

import ForgotPassword from './component/Auth/ForgotPassword'
import ResetPassword from './component/Auth/ResetPassword';
import { CartNavigation, categoryNavigation, homeNavigation, profileNavigation } from './component/StackNavigator';

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
        const config = {
          headers: {
            'access-token':token
          }
        }
        const response = await axios.get('/addtocart/cartcount',config)
        retotal(response.data)
        setIsLoggedIn(true)
      }
    } catch (error) { 
      console.log(error.message)
    }
  }

  useEffect(() => {
    getToken()
}, [props])

  return (
    <>
      <NavigationContainer>
      <AuthContext.Provider value={{isLoggedIn,getToken,setIsLoggedIn,cartCount,setCartCount,token,decode,cartItems,subtotal,setCartItems,retotal,titleShown,setTitleShown}}>
      {isLoggedIn ?( 
        
        <Tab.Navigator  screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarActiveTintColor:'#663399',
        tabBarLabelPosition:'below-icon',
        tabBarStyle: {
          ...titleShown,    
          paddingHorizontal: 10,
          justifyContent: 'center',
          height: 50,
          shadowColor: '#ddd',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowRadius: 3.5,
          elevation: 5,
          backgroundColor:'#663399',
        },
      }}>

    
        <Tab.Screen name="home"  component={homeNavigation} options={{
         
            tabBarIcon:()=>(
              <Feather name='home' size={25} color='white' />
            )
          }}/> 
        <Tab.Screen name="Category Nav" component={categoryNavigation}
        options= {{
          tabBarIcon:()=>(<Feather name="grid" size={25}  color={'white'} />)
        }}/>

         <Tab.Screen  name="Create Post" component={CreatePost} options={{
          tabBarIcon:()=>(<Feather name="camera" size={25}  color={'white'}/>)
        }}/>

        <Tab.Screen name="addtocart" component={CartNavigation} options={{
          tabBarIcon:()=>(<><Feather name='shopping-cart' size={25} color='white'/><Text style={styles.cartcount}>{cartCount}</Text></>)
        }}/>
        
        <Tab.Screen name="account" component={profileNavigation} options={{
          tabBarIcon:()=>(<Feather name='user' size={25} color='white'/>)
        }}/>

      </Tab.Navigator>
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
