import axios from 'axios'
import React, { useContext, useState } from 'react'
import { View ,Text, Image,SafeAreaView,Dimensions, StyleSheet, Button,ScrollView,TouchableWithoutFeedback, ViewPagerAndroidBase, TouchableOpacityComponent, TouchableOpacity} from 'react-native'
import { AuthContext } from '../Context'
import bbstyles from '../Styles'
import { imageLink } from '../ImageLink'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold, Raleway_700Bold_Italic } from '@expo-google-fonts/raleway'
import { Feather } from '@expo/vector-icons'
import { useEffect, useRef } from 'react/cjs/react.production.min'


export default function ProductDetail({navigation,route}) {

  

    React.useEffect(() => {
        console.log(navigation.getParent()?.getParent())
        if(titleShown){
            setTitleShown({...titleShown, display:'none'})
        }
          return () => {
            setTitleShown({...titleShown,display:'flex'})
          }

      }, [navigation]);

   
     

    const product = route.params


    const data = useContext(AuthContext)
    const {cartCount,setCartCount,token,titleShown,setTitleShown} = data
    const {getToken} = data
  
    function addtocart(pid){
        const data={
            pid,
            quantity:1
        }      
        const config = {
            headers: {
              'access-token':token
            }
          } 
          console.log(data)
        axios.post('/addtocart/cart',data,config).then(response=>{
            console.log('success')
            getToken()
            setCartCount(cartCount+1)
        }).catch(err=>{
            console.log(err.request.response)
            console.log('error')
        })
    }




    function buyNow(){
        
    }

  return (
   <SafeAreaView>
       <ScrollView style={[bbstyles.scrollHeight,{backgroundColor:'#f5f5ff',paddingBottom:0}]}>
            <View style={styles.detailImage}>
                <Image source={{uri:imageLink+product.image}} style={styles.productImage}></Image>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.productName}>
                    <Text style={styles.name}>{product.name}</Text>
                </View>
                <View style={styles.productFeature}>
                    <View style={styles.sizeWrapper}>
                        <Text style={styles.featureName}>Size</Text>
                        <View style={styles.productFeatureWrapper}>
                            <Text style={styles.featureValue}>Small</Text>
                        </View>
                    </View>
                    <View style={styles.sizeWrapper}>
                        <Text style={styles.featureName}>Type</Text>
                        <View style={styles.productFeatureWrapper}><Text style={styles.featureValue}>{product.type}</Text></View> 
                    </View>
                    <View style={styles.sizeWrapper}>
                        <Text style={styles.featureName}>Brand</Text>
                        <View style={styles.productFeatureWrapper}>
                        <Text style={styles.featureValue}>Nike</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.productDetailWrapper}>
                    <Text style={styles.detailHeader}>Item Detail</Text>
                    <Text style={styles.productDetail} numberOfLines={4}>{product.detail}</Text>
                    <View style={styles.seemore}>
                        <Text style={styles.fullDesc} >Full description</Text>
                        <Feather name="arrow-right" size={20} color={'#663399'}></Feather>
                    </View>
                </View>
                <View style={styles.productPrice}>
                    <Text style={styles.priceTitle}>Total</Text>
                    <Text style={styles.priceValue}>Rs. {product.price}</Text>
                </View>
                <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.login}>Add to cart</Text>
            </TouchableOpacity>
            
            </View>
          
       </ScrollView>
         
     
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    detailImage:{
        backgroundColor:'#f5f5ff',
        paddingVertical:30,
        
    },
    productImage:{
        width:Dimensions.get('window').width,
        height:300,
        resizeMode:'contain'
    },
    detailContainer:{
        flex: 1,
        borderTopRightRadius:18,
        borderTopLeftRadius:18,
        backgroundColor:'white',
        padding:20,
        paddingTop:30,
    },
    name:{
        fontSize:28,
        lineHeight:33,
        fontFamily:'Raleway_600SemiBold',
        

    },
    productName:{
        marginBottom:15
        
    },

    productFeature:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    featureName:{
        fontSize:17,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        marginBottom:10,

    },
    featureValue:{
        fontSize:12,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
       
      

    },
    productFeatureWrapper:{
       
        textAlign:'center',
        paddingVertical:10,
        paddingHorizontal:35,
        borderWidth:1,
        borderColor:'#E3E3E3',
      
        borderRadius:7,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 0.8,
    },
    productDetailWrapper:{
        marginTop:25
    },
    detailHeader:{
        fontSize:17,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        marginVertical:10
    },
    productDetail:{
        fontSize:15,
        fontWeight:'400',
        opacity:0.5,
        fontFamily:'Raleway_400Regular',
        marginBottom:10
    },

    seemore:{
        flexDirection:'row',
        alignItems:'center',

    },

fullDesc:{
color:'#663399',
fontSize:15,
fontWeight:'700',
fontFamily:'Raleway_700Bold',
marginRight:5
},
productPrice:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
marginTop:20
},
priceTitle:{
fontSize:17,
fontWeight:'400',
fontFamily:'Raleway_400Regular'

},
priceValue:{
fontSize:22,
fontWeight:'700',
fontFamily:'Raleway_700Bold',
color:'#663399'
},
loginBtn:{

    paddingVertical:20,
    paddingHorizontal:50,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:50,
    marginBottom:30
   

   },
   login:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:20,
    color:'white',
   }

})