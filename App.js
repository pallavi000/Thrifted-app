import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect, useContext } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator }  from '@react-navigation/native-stack'
import Home from './component/Home';
import Login from './component/Auth/Login'
import Register from './component/Auth/Register';
import Welcome from './component/Home/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetail from './component/ProductDetail';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Profile from './component/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Feather, FontAwesome} from '@expo/vector-icons'
import CartItem from './component/CartItem';
import axios from 'axios'
import { AuthContext } from './component/Context';
import CartContext, { cartContext } from './component/CartContext';
import { spring } from 'react-native-reanimated';
import Address from './component/Address';
import Closet from './component/Profile/Closet';
import jwt_decode from "jwt-decode";
import Checkout from './component/Checkout';
import Payment from './component/Payment';
import OrderReceived from './component/OrderReceived';
import OrderHistory from './component/Order/OrderHistory';
import EditAddress from './component/EditAddress';
import CreatePost from './component/post/CreatePost'
import SaleHistory from './component/SaleHistory';
import Payouts from './component/Payouts';
import Category from './component/Category'
import ForgotPassword from './component/Auth/ForgotPassword'
import ResetPassword from './component/Auth/ResetPassword';
import ChangePassword from './component/ChangePassword'
import Setting from './component/Setting';
import { accountNavigation, CartNavigation, categoryNavigation, homeNavigation, profileNavigation } from './component/StackNavigator';

//axios.defaults.baseURL="http://localhost:5000/api"
axios.defaults.baseURL="http://167.86.77.80/api"

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
  const[titleShown,setTitleShown] = useState(
    {
      display: 'flex',
    }
  )

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


// function toggleNavigaton(){  
//   return(
//     <Drawer.Navigator>
//       <Drawer.Screen name="Profile" component={Profile}/>
//       <Drawer.Screen name="Address" component={Address}/>
//       <Drawer.Screen name="My Closet" component={MyCloset}/>
//       <Drawer.Screen name="Order List" component={OrderList}/>
//       <Drawer.Screen name="Create Post" component={CreatePost}/>
//       <Drawer.Screen name="Sales History" component={SaleHistory}/>
//       <Drawer.Screen name="Payouts" component={Payouts}/>
//       <Drawer.Screen name="Logout" component={Logout}/>

//     </Drawer.Navigator>
//   )
// }

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
          height: 60,
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
            <Feather name="home" size={25}  color={'white'}/>
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
          tabBarIcon:()=>(<><Feather name="shopping-bag" size={25}  color={'white'}/><Text style={styles.cartcount}>{cartCount}</Text></>)
        }}/>
        
        <Tab.Screen name="account" component={profileNavigation} options={{
          tabBarIcon:()=>(<Feather name="user" size={25}  color={'white'}/>)
        }}/>

      </Tab.Navigator>
      ):(<Stack.Navigator screenOptions={{
        headerShown:false
      }}>
          <Stack.Screen name="home" component={Welcome} />
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
    backgroundColor:'#663399',
    color:'white',
    fontSize:15,
    fontWeight:'500',
    lineHeight:20,
    borderWidth: 1,
    borderColor: '#fff'
    
  }
});
