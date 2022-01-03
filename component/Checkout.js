import axios from 'axios'
import React, { useContext,useState,useEffect} from 'react'
import {View,Text, StyleSheet,TouchableWithoutFeedback, Image, ScrollView} from 'react-native'
import { SafeAreaFrameContext } from 'react-native-safe-area-context'
import CartItem from './CartItem'
import { AuthContext } from './Context'
import bbstyles from './Styles'
import {FontAwesome} from '@expo/vector-icons'
import { imageLink } from './ImageLink'

export default function Checkout({navigation}) {
    const[shipping,setShipping] = useState([])
    const[billing,setBilling] = useState([])
    const[shippings,setShippings] = useState([])
    const[shippingFee,setShippingFee] = useState(0)
    const[user,setUser] = useState([])
    const data = useContext(AuthContext)
    const {cartItems,subtotal} = data
    const {token} = data


    useEffect(() => {
        const config = {
            headers:{
                'access-token': token
            }
        }

        axios.get('/user/currentuser',config).then(response=>{
            console.log(response.data)
            setBilling(response.data.billing)
            setShipping(response.data.shipping)
            setUser(response.data.user)
        }).catch(err=>{
            console.log(err.request.response)
        })

        axios.get('/shipping',config).then(response=>{
            setShippings(response.data)
        })

    }, [])

    useEffect(() => {
        if(shipping && Object.keys(shipping).length!=0 && shippings && shippings.length!=0){
  
      shippings.map(ship=>{
        if(ship.location.toLowerCase()== shipping.district.toLowerCase()){
          setShippingFee(ship.fee)
        } else {
          setShippingFee(0)
        }
      })
    }
      }, [shipping,shippings])



    return (
      <ScrollView style={styles.container}>
        
<Text style={bbstyles.h1}>Shipping Address</Text>
{shipping && shipping.length!=0?(
    <View  style={styles.shipping}>
<Text style={styles.address}>{shipping.street},{shipping.city},{shipping.district}</Text>
<Text style={styles.address}><FontAwesome name="phone" size={20}/><Text style={styles.phone}>{shipping.phone}</Text></Text>
<Text style={styles.address}><FontAwesome name="envelope" size={20}/><Text style={styles.phone}>{user.email}</Text></Text>

</View>
):(null)}

<Text style={bbstyles.h1}>Billing Address</Text>
{billing && billing.length!=0?(
 <View  style={styles.shipping}>
<Text style={styles.address}>{billing.street},{billing.city},{billing.district}</Text>
<Text style={styles.address}><FontAwesome name="phone" size={20}/><Text style={styles.phone}>{billing.phone}</Text></Text>
<Text style={styles.address}><FontAwesome name="envelope" size={20}/><Text style={styles.phone}>{user.email}</Text></Text>

</View>
):(null)}

{cartItems.map(item=>{
                return(
                    <>
                    <View style={styles.itemWrapper}>
                        <Image source={{uri:imageLink+item.product_id?.image}} style={styles.itemImage}/>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.itemName}>{item.product_id?.name}</Text>
                            <Text style={styles.itemSize}>Size: {item.size}</Text>
                            <Text style={styles.itemQuantity}>Quantity: {item.quantity} </Text>
                            <Text style={styles.itemPrice}>Rs.{item.product_id?.price}</Text>
                        </View>
                    </View>
                    </>
                )
            })}
          <View style={styles.subtotal}>

           <Text style={styles.total}><Text>SubTotal: </Text><Text>Rs. {subtotal}</Text></Text>
           <Text style={styles.total}><Text>Shipping Fee: </Text><Text>Rs. {shippingFee}</Text></Text>
           <Text style={styles.total}><Text>Total:</Text><Text>Rs. {subtotal+shippingFee}</Text></Text>
          </View>

          <TouchableWithoutFeedback onPress={()=>navigation.navigate('payment',{shippingFee})}>
                    <Text style={styles.Proceed}>Proceed to Pay</Text>
                    </TouchableWithoutFeedback>
          
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    Proceed:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 'auto',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        borderColor:'#ddd',
        borderWidth:1,
        marginTop:10,
        marginBottom:20,
        backgroundColor:'orangered'
        },
    subtotal:{
        padding:10,
        backgroundColor:'#fff'
    },
    total:{
        fontSize:18,
        fontWeight:'500',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,
        marginVertical:7

    },
    shipping:{
        backgroundColor:'#fff',
        padding:20,
        borderColor:'#663399',
        borderWidth:1,
        borderRadius:9,
       
    },
    container:{
        margin:20
    },
    address:{
        fontSize:16,
        fontWeight:'500',
        marginVertical:5,
        textTransform:'capitalize'
        
    },
    phone:{
        marginLeft:9,
        textTransform:'lowercase'
    },
    itemWrapper:{
        display:'flex',
        flexDirection:'row',
        flex:1,
        backgroundColor:'#fff',
       paddingHorizontal:10,
       paddingVertical:20,
       marginTop:10
     
    },
    itemImage:{
        height:150,
        width:'100%',
        resizeMode:'contain',
        flex:2 
    },
    detailWrapper:{
        marginLeft:15,
        flex:3
    },
    itemName:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5,
        textTransform:'capitalize'
    },
    itemSize:{
        fontSize:18,
        color:'#777',
        fontWeight:'500',
        marginBottom:5

    },
    itemQuantity:{
        fontSize:18,
        color:'orangered',
        fontWeight:'500',
        marginBottom:5
    },
    itemPrice:{
        fontSize:20,
        color:'orangered',
        fontWeight:'500',
        marginBottom:5
    },
})