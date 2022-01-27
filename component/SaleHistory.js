import React, { useContext,useEffect,useState} from 'react'
import { View, Text,StyleSheet,Image,ScrollView} from 'react-native'
import { AuthContext } from './Context'
import axios from 'axios'
import bbstyles from './Styles'
import {imageLink} from './ImageLink'

const SaleHistory = () => {

    const[items,setItems] = useState([])
    const[totalSale,setTotalSale]= useState(0)
    const[user,setUser] = useState([])

    const data = useContext(AuthContext)
    const {token} = data

    const config = {
        headers: {
          'access-token':token
        }
      } 
useEffect(() => {
    axios.get('/order/all',config).then(response=>{
        console.log(response.data)
        setItems(response.data)
       
        var total = response.data.reduce((total,order)=>{
           return total+=order.price
        },0)
        setTotalSale(total)
       
    }).catch(err=>{
        console.log(err)
    })

    axios.get('/user/currentuser',config).then(response=>{
        console.log(response.data)
        setUser(response.data.user)
    })
}, [])






    return (
        <ScrollView style={bbstyles.container}>
            <Text style={bbstyles.h1}> SaleHistory</Text>
           <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={styles.h1}>Total Sale</Text>
                    <Text style={styles.value}>{totalSale}</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.h1}>Total Sold Items</Text>
                    <Text style={styles.value}>{items.length}</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.h1}>Available Amount</Text>
                    <Text style={styles.value}>{user.balance}</Text>
                </View>
                
           </View>
           <View>
           {items.map(item=>{
                            return(

                        <View key={item.id} style={styles.productContainer}>
                            <Image source={{uri:imageLink+item.product_id?.image}} style={styles.productImage} />
                            <View style={styles.productRight}>
                                <Text style={styles.productTitle} numberOfLines={2}>{item.product_id?.name}</Text>
                                 <Text style={styles.productPrice}>Quantity: {item.quantity}</Text>
                                <Text style={styles.productPrice}>Rs. {item.product_id?.price}</Text>
                                   <Text style={styles.productPrice}>{item.order_status}</Text>
                            </View>
                         </View>

                            )
                        })}
           </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
h1:{
    fontSize:18,
    fontWeight:'500',
    marginBottom:10
},
    wrapper:{
        padding:20,
        marginBottom:10,
        backgroundColor:'#fff'
    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    value:{
        fontSize:18,
        fontWeight:'500',
        color:'#666'
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

export default SaleHistory
