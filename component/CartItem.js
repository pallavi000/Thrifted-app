import React,{useState,useEffect, useContext} from 'react'
import { View, Text,StyleSheet,Image,TouchableWithoutFeedback,ScrollView} from 'react-native'
import axios from 'axios'
import { AuthContext } from './Context'
import { MaterialIcons } from '@expo/vector-icons'
import { imageLink } from './ImageLink'


const CartItem = ({navigation}) => {
    const[items,setItems] = useState([])
    const data = useContext(AuthContext)
    const {cartItems} = data

    useEffect(() => {
      axios.get('http://fakestoreapi.com/carts').then(response=>{
          console.log(response.data)
      })
    }, [])


    return (
        <ScrollView style={styles.container}>
            <Text>CartItem</Text>
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
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('checkout')}>
                    <Text style={styles.Proceed}>Proceed to Checkout</Text>
                    </TouchableWithoutFeedback>
            <View>
           
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:20
    },
    itemWrapper:{
        display:'flex',
        flexDirection:'row',
        flex:1,
        backgroundColor:'#fff',
       marginBottom:10,
       paddingHorizontal:10,
       paddingVertical:20
     
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
   Proceed:{
    color: 'black',
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
    marginBottom:20
    }


    

})

export default CartItem
