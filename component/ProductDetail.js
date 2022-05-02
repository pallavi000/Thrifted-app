import { getDrawerStatusFromState } from '@react-navigation/drawer'
import { BaseNavigationContainer, NavigationRouteContext } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { View ,Text, Image, StyleSheet, Button,ScrollView,TouchableWithoutFeedback, ViewPagerAndroidBase, TouchableOpacityComponent, TouchableOpacity} from 'react-native'
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens'
import { cartContext } from './CartContext'
import { AuthContext } from './Context'
import { imageLink } from './ImageLink'
import bbstyles from './Styles'

function ProductDetail({route}) {
    const[activeImage,setActiveImage] = useState(route.params.image)
    
    const data = useContext(AuthContext)
    const {cartCount,setCartCount,token} = data
    const {getToken} = data
  
    const product = route.params

    console.log(product)


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
       <ScrollView style={[styles.container,bbstyles.bgWhite]} >
       <View style={styles.imageContainer}>
           <Image source={{uri:imageLink+activeImage}} style={styles.productImg}/>
           </View>
           <ScrollView  horizontal={true} >
           <View  style={styles.featurewrapper}>
           <TouchableOpacity style={styles.featurecontainer} onPress={()=>setActiveImage(product.image)}>
            <Image source={{uri:imageLink+product.image}}  style={styles.featureimage} />
           </TouchableOpacity>
                {product.feature_image.map(feature=>{
                    return(
                        <TouchableOpacity style={styles.featurecontainer} onPress={()=>setActiveImage(feature)}>
                        <Image source={{uri:imageLink+feature}}  style={styles.featureimage} />
                        </TouchableOpacity>
                    )
                })}
                </View>
            </ScrollView>
         
           <View style={styles.detailcontainer}>
           <Text style={styles.title}>{product.name}</Text>
           <View style={styles.categorywrapper}>
           <View><Text style={styles.category} >{product.category_id?.name}</Text></View>
            <View style={styles.producttype}><Text style={styles.type}>{product.type}</Text></View> 

           </View>
           <Text style={styles.price}>Rs.{product.price}</Text>
           <Text style={styles.desc}>{product.detail}</Text>

            <TouchableWithoutFeedback onPress={()=>addtocart(product._id)}>
            <Text style={bbstyles.btnPrimary}>Add to Cart</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback  onPress={()=>buyNow()}>
            <Text style={bbstyles.buyNow}> Buy Now</Text>
            </TouchableWithoutFeedback>


           </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
       
       flex:1,
       marginBottom:10
    },
    productImg:{
        height:300,
        width:'100%',
        resizeMode:'cover',
        marginVertical:10
    },
    title:{
        fontSize:17,
        fontWeight:'600',
        marginBottom:8,
        textTransform:'capitalize'
    },
    category:{
        fontSize:15,
        fontWeight:'500',
        marginBottom:7,
        textTransform:'capitalize'
    },
    price:{
        fontWeight:'bold',
        fontSize:16,
        marginBottom:7
    },
   

    desc:{
        fontSize:16,
        fontWeight:'400',
        marginBottom:20,
        opacity:0.6
    },
    type:{
         fontSize:15,
        fontWeight:'400',
        textTransform:'capitalize',
        alignSelf:'center'
    },
    producttype:{
        paddingBottom:2,
        borderColor:'grey',
        borderWidth:1,
        borderRadius:17,
        paddingHorizontal:15,
        width:65,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:7
    },
    categorywrapper:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    featurewrapper:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:"center",
        flexDirection:'row',
        marginBottom:15
    },
    featureimage:{
        height:80,
        width:'auto',
        resizeMode:'cover'
    },
    featurecontainer:{
         height:80,
        width:70,
        marginRight:6
    }

})

export default ProductDetail
