import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useEffect} from 'react'
import nil from 'uuid/dist/nil'
import Address from './Address'
import CartItem from './Cart/CartItem'
import Category from './Category'
import ChangePassword from './ChangePassword'
import Checkout from './Cart/Checkout'
import CreatePost from './CreatePost'
import EditAddress from './EditAddress'
import Closet from './Profile/Closet'
import OrderList from './OrderList'
import OrderReceived from './OrderReceived'
import Payment from './Payment'
import Payouts from './Payouts'
import ProductDetail from './Product/ProductDetail'
import Profile from './Profile/Profile'
import SaleHistory from './SaleHistory'
import Setting from './Setting'
import Welcome from './Welcome'
import Home from './Home/Home'
import OrderHistory from './Order/OrderHistory'

const Stack = createNativeStackNavigator()

function homeNavigation() {
    return (



      
      <Stack.Navigator screenOptions={{
          headerShown:true,
        }}
        >

<Stack.Screen name="My Closet" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} component={Closet}/>


          <Stack.Screen options={{
            headerShown: false,
          }} name="landing" component={Home}/>
          
          <Stack.Screen options={{
            headerStyle:{
              backgroundColor:'#f5f5ff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} 
          name="Product Detail"  component={ProductDetail}/>
          <Stack.Screen name="payment" component={Payment}/>
          <Stack.Screen name="orderReceived" component={OrderReceived}/>
          <Stack.Screen name="editAddress" component={EditAddress}/>
          <Stack.Screen name="category" component = {Category} />
          <Stack.Screen name='tst' component={CreatePost}/>
          <Stack.Screen name="changepassword" component={ChangePassword}/>
          </Stack.Navigator>
    )
  }

  
function profileNavigation(){
    return(
      <Stack.Navigator>
      <Stack.Screen name="Setting" component={Setting}/>
      <Stack.Screen  options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} name="Profile" component={Profile}/>

<Stack.Screen name="Order History"options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} component={OrderHistory}/>




      </Stack.Navigator>
    )
  }

  function CartNavigation(){
    return(
      <Stack.Navigator>
      <Stack.Screen options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
           name="cartItem" component={CartItem}/>


           <Stack.Screen  options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} name="Checkout" component={Checkout}/>
      </Stack.Navigator>
    )
  }

  function Logout({navigation}){
    useEffect(async () => {
      await AsyncStorage.removeItem('token')
      // setIsLoggedIn(false)
    }, [])
    return(
      <View>
  
      </View>
    )
  }
  

  function accountNavigation(){
    return(
    <Stack.Navigator
    screenOptions={{
      headerStyle:{
        shadowColor: '#ddd',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowRadius: 3.5,
            elevation: 5
      }
    }}
    >
     <Stack.Screen name="Order History" component={OrderHistory}/>
      <Stack.Screen  name="Setting" component={Setting}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Address" component={Address}/>
        <Stack.Screen name="My Closet" component={Closet}/>
       
        <Stack.Screen name="Sales History" component={SaleHistory}/>
        <Stack.Screen name="Payouts" component={Payouts}/>
        <Stack.Screen name="Logout" component={Logout}/>
    </Stack.Navigator>
    )
  }

 
  





export {homeNavigation,profileNavigation,CartNavigation,accountNavigation}