import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold, } from '@expo-google-fonts/raleway';
import { Feather, FontAwesome } from '@expo/vector-icons';
import React,{useEffect,useState,useContext} from 'react'
import { View ,Text,SafeAreaView,Alert, Image,Dimensions, StyleSheet, Button,ScrollView,TouchableWithoutFeedback, ViewPagerAndroidBase, TouchableOpacityComponent, TouchableOpacity} from 'react-native'
import bbstyles from '../Styles'
import axios from 'axios'
import { AuthContext } from '../Context';
import { imageLink } from '../ImageLink';



export default function CartItem({navigation}) {

    const data = useContext(AuthContext)
    const {cartItems,setCartItems,token,subtotal,retotal} = data
    

    console.log(cartItems)

    const config = {
        headers:{
            'access-token': token
        }
    }

    async function removeCart(item){
        try {
            var res = await axios.delete('/addtocart/cartremove/'+item._id,config)
            var products =  cartItems.filter(product=>product.product_id?._id!=item.product_id._id)     
            setCartItems(products)
            retotal(products)
        } catch (error) {
            Alert.alert('Error', error.request.response)
        }
       
  
    }
   


  return (
<SafeAreaView style={{backgroundColor:'white',flex:1}} >
     <ScrollView >
     {cartItems && cartItems.length>0?(
        <View style={styles.cardWrapper}>
        {cartItems.map(item=>{
                return(
            <View style={styles.card}>
               <View style={styles.imageWrapper}>
                  <Image style={styles.image} source={{uri:imageLink+item.product_id?.image}}></Image>
               </View>
               <View style={styles.cartDetail}>
               <View style={{flexDirection:'row'}}>
               <Text style={styles.title} numberOfLines={2}>{item.product_id?.name}</Text>
               </View>
                    
                    <Text style={styles.price}>Rs. {item.product_id?.price}</Text>
                    <View style={styles.itemContent}>
                        
                        <View style={styles.cartChangeWrapper}>
                        <Text style={styles.quantity}>Quantity: <Text style={styles.value}>{item.quantity}</Text></Text>
                     </View>
                    </View>
                    
               </View>
               <TouchableOpacity onPress={()=>removeCart(item)}><Feather name="trash" size={20} color="#FA4A0C"></Feather></TouchableOpacity>

            </View>
                )})
                }
            
            <View style={styles.cartTotal}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.totalValue}>Rs. {subtotal}</Text>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Checkout')} >
            <Text style={styles.login}>Checkout</Text>
            </TouchableOpacity>
        </View>
        
     ):(
         <Text>No Items.</Text>
     )}
     </ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({

cardWrapper:{
    padding:20,
    paddingHorizontal:30

},

card:{
    backgroundColor:'#f5f5ff',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    alignItems:'flex-end',
    borderRadius:10,
    marginBottom:30,
    shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 1,
    
  

},
image:{

    width:100,
    backgroundColor:'red',
    height:100,
    borderRadius:10
},
cartDetail:{
    flexDirection:'column',
    justifyContent:'center',
    flexGrow:1,
    marginLeft:10
},
title:{
    fontFamily:'Raleway_600SemiBold',
    fontSize:16,
    fontWeight:'600',  
    marginBottom:10,
    flex:1,
    flexWrap:'wrap'
},
price:{
    fontFamily:'Raleway_600SemiBold',
    fontSize:15,
    color:'#663399',
    marginBottom:10
},
cartChangeWrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
},

cartChange:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
},

inc:{
    backgroundColor:'#663399',
    paddingVertical:1,
    paddingHorizontal:7,
    textAlign:'center',
    fontSize:14,
    color:'white',
    borderRadius:5,
    marginHorizontal:10
},
value:{
    color:'#663399',
    fontSize:14,
    fontWeight:'600'
},
loginBtn:{

    paddingVertical:10,
    paddingHorizontal:50,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:30,
    marginBottom:30
   

   },
   login:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:20,
    color:'white',
   },
   cartTotal:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       marginTop:200
   },
   total:{
    fontSize:17,
    fontWeight:'400',
    fontFamily:'Raleway_400Regular',
    color:'#663399'
   },
   totalValue:{
    fontSize:22,
    fontWeight:'700',
    fontFamily:'Raleway_700Bold',
    color:'#663399'
   }



})