import React,{useState,useEffect, useContext} from 'react'
import { View, Text,StyleSheet,Image,TouchableWithoutFeedback,ScrollView} from 'react-native'
import axios from 'axios'
import { AuthContext } from './Context'
import { MaterialIcons } from '@expo/vector-icons'
import { imageLink } from './ImageLink'


const CartItem = (props) => {
    const {navigation} = props
    const[items,setItems] = useState([])
    const data = useContext(AuthContext)
    const {cartItems} = data

  


    return (
        <ScrollView style={styles.container}>
            {cartItems.map(item=>{
                return(
                
                        <View key={item.id} style={styles.productContainer}>
                            <Image source={{uri:imageLink+item.product_id?.image}} style={styles.productImage} />
                            <View style={styles.productRight}>
                                <Text style={styles.productTitle} numberOfLines={3}>{item.product_id?.name}</Text>
                                 <Text style={styles.productPrice}>Quantity: {item.quantity}</Text>
                                <Text style={styles.productPrice}>Rs. {item.product_id?.price}</Text>
                            </View>
                    </View>


                   
                    
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
    productContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 10
    },
    productRight: {
        padding: 10,
        flex: 3
    },
    productImage: {
        height: 150,
        flex: 2,
        resizeMode: 'contain'
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'capitalize'
    },
    ratingContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
    productPrice:{
        fontWeight: 'bold',
        marginTop: 10,
        textTransform: 'capitalize'
    },


    

})

export default CartItem
