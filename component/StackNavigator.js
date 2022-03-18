import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useEffect} from 'react'
import nil from 'uuid/dist/nil'
import Address from './Address'
import CartItem from './CartItem'
import Category from './Category'
import ChangePassword from './ChangePassword'
import Checkout from './Checkout'
import CreatePost from './CreatePost'
import EditAddress from './EditAddress'
import MyCloset from './MyCloset'
import OrderList from './OrderList'
import OrderReceived from './OrderReceived'
import Payment from './Payment'
import Payouts from './Payouts'
import ProductDetail from './ProductDetail'
import Profile from './Profile'
import SaleHistory from './SaleHistory'
import Setting from './Setting'
import Welcome from './Welcome'

const Stack = createNativeStackNavigator()

function homeNavigation() {
    return (
      <Stack.Navigator screenOptions={{
          headerShown:true,
       
        }}
        >
     
          <Stack.Screen name="welcome" component={Welcome}/>
          <Stack.Screen  name="productdetail" component={ProductDetail}/>
          <Stack.Screen name="checkout" component={Checkout}/>
          <Stack.Screen name="payment" component={Payment}/>
          <Stack.Screen name="orderReceived" component={OrderReceived}/>
          <Stack.Screen name="orderList" component={OrderList}/>
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
      <Stack.Screen  name="Setting" component={Setting}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Address" component={Address}/>
        <Stack.Screen name="My Closet" component={MyCloset}/>
        <Stack.Screen name="Order List" component={OrderList}/>
        <Stack.Screen name="Sales History" component={SaleHistory}/>
        <Stack.Screen name="Payouts" component={Payouts}/>
        <Stack.Screen name="Logout" component={Logout}/>
    </Stack.Navigator>
    )
  }

 
  





export {homeNavigation,profileNavigation,CartNavigation,accountNavigation}