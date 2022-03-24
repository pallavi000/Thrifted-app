import { View ,Text,SafeAreaView, Image,Dimensions, StyleSheet, Button,ScrollView,TouchableWithoutFeedback, ViewPagerAndroidBase, TouchableOpacityComponent, TouchableOpacity} from 'react-native'

import React,{useState} from 'react'
import { Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import { Feather } from '@expo/vector-icons'
import { RadioButton } from 'react-native-paper';

export default function Checkout({navigation}) {
const[paymentMethod,setPaymentMethod] = useState('')


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
       <View style={styles.cardWrapper}>
       <View style={styles.headerWrapper}>
            <Text style={styles.header}>Shipping Information</Text>
            <Text style={styles.change}>Change</Text>
       </View>
           <View style={styles.card}>
                <View style={styles.userWrapper}>
                    <Feather name="user" size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>User Name</Text>
                </View>
                <View style={styles.userWrapper}>
                    <Feather name='map-pin' size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>Kawasoti-8 Nawalpur,Nepal</Text>
                </View>
                <View style={styles.userWrapper}>
                    <Feather name='phone' size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>+977-98765321</Text>
                </View>

           </View>

           <View style={styles.headerWrapper}>
            <Text style={styles.header}> Payement Method</Text>
           
       </View>
           <View style={styles.card}>
                <View style={styles.userWrapper}>
                <RadioButton
                 color='#663399'
                    value="esewa"
                    status={ paymentMethod === 'esewa' ? 'checked' : 'unchecked' }
                    onPress={() => setPaymentMethod('esewa')}
                />
                <View style={styles.creaditCard}>
                <View style={styles.cardImageWrapper}>
                <Image style={styles.cardImage} source={require('../../assets/Bitmap.png')}></Image>
                </View>
                    <Text style={styles.userName}>**** **** **** 1234</Text>
                </View>
                </View>
                <View style={styles.userWrapper}>
                <RadioButton
                color='#663399'
                    value="khalti"
                    status={ paymentMethod === 'khalti' ? 'checked' : 'unchecked' }
                    onPress={() => setPaymentMethod('khalti')}
                />
                <View style={styles.creaditCard}>
                <View style={styles.cardImageWrapper}>
                <Image style={styles.cardImage} source={require('../../assets/Bitmap.png')}></Image>
                </View>
                    <Text style={styles.userName}>**** **** **** 1234</Text>
                </View>
                </View>
           </View>

           <View style={styles.cartTotal}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.totalValue}>Rs. 400</Text>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Checkout')} >
            <Text style={styles.login}>Confirm to Pay</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    cardWrapper:{
        padding:20,
        paddingHorizontal:30
    
    },
    
    card:{
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
    },
    headerWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
    },
    header:{
        fontSize:17,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
    },
    change:{
        fontSize:15,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        color:'#663399',
    },
    userWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:15
    },
    userName:{
        fontSize:17,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        marginLeft:10
    },
    creaditCard:{
        flexDirection:'row',
        alignItems:'center'
    },
    cardImage:{
        height:20,
        width:70,
        resizeMode:'cover',
      

       
    },
    cardImageWrapper:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderColor:'#D6D9E0',
        borderWidth:1,
        borderRadius:10
    },
    cartTotal:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:50
    },
    total:{
     fontSize:17,
     fontWeight:'400',
     fontFamily:'Raleway_400Regular',
     color:'#663399'
    },
    totalValue:{
     fontSize:22,
     fontWeight:'700',
     fontFamily:'Raleway_700Bold',
     color:'#663399'
    },
    loginBtn:{

        paddingVertical:20,
        paddingHorizontal:50,
        backgroundColor:'#663399',
        borderRadius:10,
        marginTop:50,
        marginBottom:30
       
    
       },
       login:{
        textAlign:'center',
        fontFamily:'Raleway_700Bold',
        fontWeight:'700',
        fontSize:20,
        color:'white',
       },
})