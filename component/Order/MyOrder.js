import { StyleSheet, Text, View ,SafeAreaView,ScrollView} from 'react-native'
import React from 'react'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'

export default function MyOrder() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
    <View style={styles.container}>
    <Text style={styles.title}>My Orders</Text>
    <View style={styles.row}>
        <View>
            <Text  style={styles.processActive}>Delivered</Text>
        </View>
        <View>
            <Text style={styles.process}>Processing</Text>
        </View>
        <View>
            <Text  style={styles.process}>Cancelled</Text>
        </View>
    </View>
    <View style={styles.addressCard}>
        <View style={styles.row}>
            <Text style={styles.orderNo}>Order No : 1947034</Text>
            <Text style={styles.orderDate}>05-12-2022</Text>
        </View>
        <View style={styles.itemDetail}>
            <View>
                <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Tracking number:</Text><Text style={styles.itemValue}> IW3475453455</Text>
                </View>
                
            </View>
            <View style={styles.row}>
            <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Quantity:</Text><Text style={styles.orderNo}> 5</Text>
                </View>
            <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Total Amount:</Text><Text style={styles.orderNo}> Rs.50</Text>
                </View>
            </View>
        </View>
        <View style={styles.row}>
            <Text style={styles.details}>Details</Text>
            <Text style={styles.delivered}>Delivered</Text>
        </View>
    </View>

    <View style={styles.addressCard}>
        <View style={styles.row}>
            <Text style={styles.orderNo}>Order No : 1947034</Text>
            <Text style={styles.orderDate}>05-12-2022</Text>
        </View>
        <View style={styles.itemDetail}>
            <View>
                <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Tracking number:</Text><Text style={styles.itemValue}> IW3475453455</Text>
                </View>
                
            </View>
            <View style={styles.row}>
            <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Quantity:</Text><Text style={styles.orderNo}> 5</Text>
                </View>
            <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Total Amount:</Text><Text style={styles.orderNo}> Rs.50</Text>
                </View>
            </View>
        </View>
        <View style={styles.row}>
            <Text style={styles.details}>Details</Text>
            <Text style={styles.delivered}>Delivered</Text>
        </View>
    </View>

    <View style={styles.addressCard}>
        <View style={styles.row}>
            <Text style={styles.orderNo}>Order No : 1947034</Text>
            <Text style={styles.orderDate}>05-12-2022</Text>
        </View>
        <View style={styles.itemDetail}>
            <View>
                <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Tracking number:</Text><Text style={styles.itemValue}> IW3475453455</Text>
                </View>
                
            </View>
            <View style={styles.row}>
            <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Quantity:</Text><Text style={styles.orderNo}> 5</Text>
                </View>
            <View style={styles.dFlex}>
                <Text style={styles.orderDate}>Total Amount:</Text><Text style={styles.orderNo}> Rs.50</Text>
                </View>
            </View>
        </View>
        <View style={styles.row}>
            <Text style={styles.details}>Details</Text>
            <Text style={styles.delivered}>Delivered</Text>
        </View>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    addressCard:{
        backgroundColor:'#f5f5ff',
        padding:20,
        borderRadius:10,
        marginBottom:30,
        shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.6,
            shadowRadius: 3,
            elevation: 1,
            margin:20,
         
            
    },
    title:{
        fontSize:25,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        marginBottom:10
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10
    },
    processActive:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        padding:8,
        paddingHorizontal:20,
        borderRadius:18,
        backgroundColor:'#663399',
        color:'#f5f5ff'
        
    },
    process:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
    },
    dFlex:{
        flexDirection:'row',
        alignItems:'center'
    },
    itemDetail:{
        flexDirection:'column',
       
        justifyContent:'space-between'
    },
    orderNo:{
        fontSize:16,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        marginRight:10
    },
    orderDate:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular'
    },
    details:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Raleway_600SemiBold',
        paddingVertical:10,
        paddingHorizontal:25,
        borderRadius:20,
        color:'#663399',
        borderWidth:1,
        borderColor:'#663399',
        marginTop:5
    },
    delivered:{
    color:'#4CD964',
    fontSize:14,
    fontWeight:'500',
    fontFamily:'Raleway_600SemiBold',
    marginTop:5
    }

    
})