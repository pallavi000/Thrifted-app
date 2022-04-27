import { View ,Button,TouchableOpacity} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useEffect} from 'react'
import Address from './Address'
import CartItem from './Cart/CartItem'
import Category from './category/Category'
import ChangePassword from './Auth/ChangePassword'
import Checkout from './Cart/Checkout'
import CreatePost from '../component/post/CreatePost'
import EditAddress from './EditAddress'
import Closet from './Profile/Closet'
import OrderList from './OrderList'
import OrderReceived from './OrderReceived'
import Payment from './Payment'
import Payouts from './Payouts'
import ProductDetail from './Product/ProductDetail'
import Profile from './Profile/Profile'
import SaleHistory from './SaleHistory'
import Setting from './setting/Setting'
import Welcome from './Welcome'
import Home from './Home/Home'
import OrderHistory from './Order/OrderHistory'
import OrderSuccess from './Order/OrderSuccess'
import OrderTrack from './Order/OrderTrack'
import CategoryPage from './category/CategoryPage'
import ChildCat from './category/ChildCat'
import Shipping from './address/Shipping'
import AddShipping from './address/AddShipping'
import MyOrder from './Order/MyOrder'
import OrderDetail from './Order/OrderDetail'
import Filter from './Product/filters/Filter'
import BrandFilter from './Product/filters/BrandFilter'
import Redeem from './redeem/Redeem'
import RedeemHistory from './redeem/RedeemHistory'
import Messages from './message/Messages'
import Chat from './message/Chat'
import EditShipping from './address/EditShipping'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

function homeNavigation() {
    return (
      <Stack.Navigator screenOptions={{
          headerShown:true,
        }}
        >
        
          <Stack.Screen options={{
                  headerShown: false,
                }} name="landing" component={Home}/>

           <Stack.Screen name="Messages" options={{
                headerStyle:{
                  backgroundColor:'#fff',
                  borderWidth:0,
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle:{
                  fontSize:18,
                  fontWeight:'700',
                } 
              }} component={Messages}/>
              
              <Stack.Screen options={{
            headerShown:false,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
           name="Change Password" component={ChangePassword}/>

            <Stack.Screen name="Create Post" options={{
                headerStyle:{
                  backgroundColor:'#fff',
                  borderWidth:0,
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle:{
                  fontSize:18,
                  fontWeight:'700',
                } 
              }} component={CreatePost}/>

           <Stack.Screen name="Setting" options={{
                headerStyle:{
                  backgroundColor:'#fff',
                  borderWidth:0,
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle:{
                  fontSize:18,
                  fontWeight:'700',
                } 
              }} component={Setting}/>

            <Stack.Screen name="Edit Shipping Address" options={{
                headerStyle:{
                  backgroundColor:'#fff',
                  borderWidth:0,
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle:{
                  fontSize:18,
                  fontWeight:'700',
                } 
              }} component={EditShipping}/>

        

        <Stack.Screen name="Pallavi" options={{
                headerStyle:{
                  backgroundColor:'#fff',
                  borderWidth:0,
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle:{
                  fontSize:18,
                  fontWeight:'700',
                } 
              }} component={Chat}/> 
              <Stack.Screen options={{
            headerStyle:{
              backgroundColor:'#f5f5ff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} 
          name="Product Detail"  component={ProductDetail}/>

<Stack.Screen name="Category" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
//               shadowColor: "#000000",
// shadowOffset: {
// 	width: 0,
// 	height: 10,
// },
// shadowOpacity: 0.6,
// shadowRadius: 16.00,

// elevation: 24,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            }
            
          }} component={Category}/>

<Stack.Screen name="My Closet" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} component={Closet}/>
      <Stack.Screen name="Category Title" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            },
           

          }} component={CategoryPage}/>
      <Stack.Screen name="Child Category" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            }
          }} component={ChildCat}/>

  
          {/* <Stack.Screen name="payment" component={Payment}/>
          <Stack.Screen name="orderReceived" component={OrderReceived}/>
          <Stack.Screen name="editAddress" component={EditAddress}/> */}
      
         
          {/* <Stack.Screen name="changepassword" component={ChangePassword}/> */}
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
           name="Cart Items" component={CartItem}/>

           <Stack.Screen  options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} name="Checkout" component={Checkout}/>

          <Stack.Screen options={{
                headerShown: false,
              }} name="Order Success" component={OrderSuccess}/>

    <Stack.Screen options={{
                headerShown: false,
              }} name="Track Order" component={OrderTrack}/>
      </Stack.Navigator>
    )
  }



  function categoryNavigation(props){
    return(
      <Stack.Navigator screenOptions={{
        headerShown:true,
      }}
      >
     
       <Stack.Screen name="Category" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
//               shadowColor: "#000000",
// shadowOffset: {
// 	width: 0,
// 	height: 10,
// },
// shadowOpacity: 0.6,
// shadowRadius: 16.00,

// elevation: 24,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            }
            
          }} component={Category}/>
      <Stack.Screen name="Category Title" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            },
           

          }} component={CategoryPage}/>
      <Stack.Screen name="Child Category" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            }
          }} component={ChildCat}/> 
</Stack.Navigator>
    )
  }
  
function profileNavigation({navigation}){
    return(
      <Stack.Navigator>
      <Stack.Screen name="Setting" options={{
         headerRight: () => (
                      <TouchableOpacity onPress={() => navigation.navigate('Logout')} style={{paddingRight:20}}>
                        <MaterialCommunityIcons name='logout' size={20} ></MaterialCommunityIcons>
                      </TouchableOpacity>
                    ),
      }}

      component={Setting}/>
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

          <Stack.Screen name="Shipping Address" options={{
                headerStyle:{
                  backgroundColor:'#fff',
                  borderWidth:0,
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle:{
                  fontSize:18,
                  fontWeight:'700',
                } 
              }} component={Shipping}/> 

            <Stack.Screen name="Add Shipping Address" options={{
                headerStyle:{
                  backgroundColor:'#fff',
                  borderWidth:0,
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle:{
                  fontSize:18,
                  fontWeight:'700',
                } 
              }} component={AddShipping}/>
        
        <Stack.Screen name="My Orders" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            } 
          }} component={MyOrder}/>  

        <Stack.Screen name="Order Details" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            } 
          }} component={OrderDetail}/>   
        
        <Stack.Screen name="Redeem" options={{
           headerShown: false,
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerShown:true,
            headerStyle:{
              backgroundColor:'#663399',
              color:'white'
            },
            headerTintColor:'white',
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
              color:'white'
            } 
          }} component={Redeem}/> 

        <Stack.Screen name="Redeemption History" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'700',
            } 
          }} component={RedeemHistory}/>  
          
          <Stack.Screen name="My Closet" options={{
            headerStyle:{
              backgroundColor:'#fff',
              borderWidth:0,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }} component={Closet}/>

          <Stack.Screen name="Logout" component={Logout}/>

      </Stack.Navigator>
    )
  }

  









  function Logout(){
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
    </Stack.Navigator>
    )
  }

 
  





export {homeNavigation,profileNavigation,CartNavigation,accountNavigation,categoryNavigation}