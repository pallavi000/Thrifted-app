import React, { useContext } from 'react'
import { View, Text,StyleSheet,TouchableWithoutFeedback } from 'react-native'
import { AuthContext } from './Context'
import bbstyles from './Styles'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


const Payment = ({route,navigation}) => {

const data = useContext(AuthContext)
const {subtotal} = data
const shippingFee = route.params
const {cartItems} = data
const {token} = data
console.log(shippingFee)


function esewa(){
  
    const config = {
        headers:{
            'access-token': token
        }
    }

    const data={
        total:subtotal+shippingFee.shippingFee,
        shipping:shippingFee.shippingFee,
        note: '',
        transaction_id:uuidv4(),
        payment_method:"cod"
      }
    
        axios.post('/order',data,config).then(response=>{
            navigation.navigate('orderReceived',{cartItems,data})
        })



}

    return (
        <View style={styles.container}>
        <Text style={bbstyles.h1}>Payment Detail</Text>
           <View style={styles.subtotal}>
        <Text style={styles.total}><Text>SubTotal: </Text><Text>Rs. {subtotal}</Text></Text>
        <Text style={styles.total}><Text>Shipping Fee: </Text><Text>Rs. {shippingFee.shippingFee}</Text></Text>
        <Text style={styles.total}><Text>Total:</Text><Text>Rs. {subtotal+shippingFee.shippingFee}</Text></Text>
        </View>
        <TouchableWithoutFeedback onPress={()=>esewa()}>
            <Text style={styles.esewa}>Pay With COD</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:20
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
    esewa:{
        backgroundColor:'green',
        padding:10,
        borderRadius:5,
        color:'white',
        fontSize:16,
        fontWeight:'500',
        textAlign:'center',
        marginTop:20
    },
})

export default Payment

