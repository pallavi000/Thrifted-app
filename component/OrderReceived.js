import React,{useContext,useEffect} from 'react'
import { View, Text,StyleSheet,TouchableWithoutFeedback } from 'react-native'
import {AuthContext} from './Context'
import {FontAwesome} from '@expo/vector-icons'

const OrderReceived = ({navigation}) => {

    const data = useContext(AuthContext)
    const {setCartCount} = data

    useEffect(() => {
      setCartCount(0) 
    }, [])


    return (
        <View style={styles.wrapper}>
       <Text style={styles.icon} ><FontAwesome name="check" size={30} color='white'/></Text>
            <Text style={styles.success}> Order Success</Text>
            
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('orderList')}>
            <Text style={styles.orderlist}>View OrderList</Text>
            </TouchableWithoutFeedback>
      
        </View>
    )
}

const styles = StyleSheet.create({
    success:{
        fontSize:25,
        fontWeight:'bold',
        margin:10
    },
    wrapper:{
        margin:20,
        textAlign:'center',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    icon:{
        backgroundColor:'green',
        padding:10,
        borderRadius:'50%'
    },
    orderlist:{
        backgroundColor:'#333',
        padding:10,
        borderRadius:5,
        color:'white',
        fontSize:16,
        fontWeight:'500',
        textAlign:'center',
        marginTop:20 
    }

})

export default OrderReceived
