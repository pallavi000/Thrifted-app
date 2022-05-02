import React, { useContext,useState,useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableWithoutFeedback } from 'react-native'
import {useFocusEffect, useIsFocused} from '@react-navigation/native'
import axios from 'axios'
import { AuthContext } from './Context'
import bbstyles from './Styles'
import AddAddress from './AddAddress'
import { yupToFormErrors } from 'formik'



export default function Address({navigation}) {
    const[shipping,setShipping] = useState([])
    const[billing,setBilling] = useState([])

    const data = useContext(AuthContext)
    const {token} = data

    const IsFocused = useIsFocused()
    

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
        }).catch(err=>{
            console.log(err.request.response)
        })
    }, [IsFocused])

    return (
        <ScrollView style={[styles.container,bbstyles.bgWhite]}>
        {shipping && shipping.length!=0?(
            <>
            <Text style={bbstyles.h1}>My Address</Text> 
            <Text style={styles.billing}>Billing Address</Text>
            <View style={styles.profileText}>
            <Text style={styles.header}>District</Text>
            <Text style={styles.valueName}>{billing.district}</Text>
            </View> 
        <View style={styles.profileText}>
            <Text style={styles.header}>City</Text>
            <Text style={styles.valueName}>{billing.city}</Text>
        </View> 
        <View style={styles.profileText}>
            <Text style={styles.header}>Street</Text>
            <Text style={styles.valueName}>{billing.street}</Text>
        </View>
        <View style={styles.profileText}>
            <Text style={styles.header}>Phone</Text>
            <Text style={styles.valueName}>{billing.phone}</Text>
        </View>

        {/* shipping address */}
        <Text style={styles.billing}>Shipping Address</Text>
            <View style={styles.profileText}>
            <Text style={styles.header}>District</Text>
            <Text style={styles.valueName}>{shipping.district}</Text>
        </View> 
        <View style={styles.profileText}>
            <Text style={styles.header}>City</Text>
            <Text style={styles.valueName}>{shipping.city}</Text>
        </View> 
        <View style={styles.profileText}>
            <Text style={styles.header}>Street</Text>
            <Text style={styles.valueName}>{shipping.street}</Text>
        </View>
        <View style={styles.profileText}>
            <Text style={styles.header}>Phone</Text>
            <Text style={styles.valueName}>{shipping.phone}</Text>
        </View>

        <TouchableWithoutFeedback onPress={()=>navigation.navigate('editAddress')} >
         <Text style={bbstyles.btnPrimary} >Edit Address</Text>
        </TouchableWithoutFeedback>

            </>
        ):(<AddAddress/>)}
            


        </ScrollView>
    )

    
}

const styles = StyleSheet.create({
    profileText:{
        margin:20,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingBottom:10

    },

  

    header:{
        fontSize:17,
        fontWeight:'600',
        marginBottom:5
    },
    valueName:{
        fontSize:16,
        fontWeight:'500',
        color:'#6b6b6b',
        textTransform:'capitalize'
    },
    value:{
        fontSize:16,
        fontWeight:'500',
        color:'#6b6b6b',
    },
    container:{
        margin:15
    },
    billing:{
        marginHorizontal:20,
        fontWeight:'500',
        fontSize:20,
        marginVertical:5
    }

})
