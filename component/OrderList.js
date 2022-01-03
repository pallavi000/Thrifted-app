import React, { useContext,useEffect,useState } from 'react'
import { View, Text,StyleSheet ,Image, ScrollView} from 'react-native'
import axios from 'axios'
import { AuthContext } from './Context'
import { imageLink } from './ImageLink'

const OrderList = () => {
    const[items,setItems] = useState([])
    const data = useContext(AuthContext)
    const {token} = data

    useEffect(() => {
        const config = {
        headers: {
          'access-token':token
        }
      } 
     
    axios.get('/order/transaction',config).then(response=>{
        console.log(response.data)
        setItems(response.data)
    })
},[])




    return (
        <ScrollView>
        {items.map(item=>{
            return(
                <>
                <View style={styles.transaction}>
                    <Text style={styles.orderId}>Order #{item._id} </Text>
                    <Text style={styles.order}>Placed On {item.createdAt}</Text>
                    <Text style={styles.order}>Shipping Fee: {item.shipping}</Text>
                    <Text style={styles.order}>Total: {item.total}</Text>
                    
                    <View>
                        {item.orders.map(item=>{
                            return(
                            <View style={styles.itemWrapper}>
                            <Image source={{uri:imageLink+item.product_id?.image}} style={styles.itemImage}/>
                            <View style={styles.detailWrapper}>
                            <Text style={styles.itemName}>{item.product_id?.name}</Text>
                            <Text style={styles.itemSize}>Size: {item.size}</Text>
                            <Text style={styles.itemSize}>Quantity: {item.quantity} </Text>
                            <Text style={styles.itemSize}>{item.order_status}</Text>

                            </View>
                         </View>
                       
                            )
                        })}
                    </View>
                    </View>
                </>
            )
        })}
            

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    transaction:{
        backgroundColor:'#fff',
        padding:10,
        marginBottom:10
    },
    orderId:{
        fontSize:20,
        fontWeight:'500',
    },
    order:{
       fontSize:16,
       fontWeight:'500',
       color:'#666',
       marginTop:5
    },
    itemWrapper:{
        display:'flex',
        flexDirection:'row',
        flex:1,
        backgroundColor:'#fff',
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
        marginBottom:5,
        textTransform:'capitalize'

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

export default OrderList

