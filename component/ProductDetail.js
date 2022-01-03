import axios from 'axios'
import React, { useContext } from 'react'
import { View ,Text, Image, StyleSheet, Button,TouchableWithoutFeedback, ViewPagerAndroidBase, TouchableOpacityComponent} from 'react-native'
import { cartContext } from './CartContext'
import { AuthContext } from './Context'
import { imageLink } from './ImageLink'
import bbstyles from './Styles'

function ProductDetail({route}) {

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
            console.log(response.data)
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
       <View style={styles.container}>
       <View style={styles.imageContainer}>
           <Image source={{uri:imageLink+product.image}} style={styles.productImg}/>
           </View>
           <View style={styles.detailcontainer}>
           <Text style={styles.title}>{product.name}</Text>
           <Text style={styles.category} >{product.category_id?.name}</Text>
           <Text style={styles.price}>Rs.{product.price}</Text>
           <Text style={styles.desc}>{product.detail}</Text>

            <TouchableWithoutFeedback onPress={()=>addtocart(product._id)}>
            <Text style={bbstyles.btnPrimary}>Add to Cart</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>buyNow()}>
            <Text style={bbstyles.buyNow}> Buy Now</Text>
            </TouchableWithoutFeedback>


           </View>
       </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
       
       flex:1
    },
    productImg:{
        height:300,
        width:'100%',
        resizeMode:'cover',
        marginVertical:20
    },
    title:{
        fontSize:17,
        fontWeight:'600',
        marginBottom:10,
        textTransform:'capitalize'
    },
    category:{
        fontSize:16,
        fontWeight:'500',
        marginBottom:10,
        textTransform:'capitalize'
    },
    price:{
        fontWeight:'500',
        fontSize:16,
        marginBottom:10
    },

    desc:{
        fontSize:16,
        fontWeight:'400',
        marginBottom:20
    }

})

export default ProductDetail
