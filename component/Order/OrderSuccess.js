import { StyleSheet, Text, SafeAreaView,ScrollView,Dimensions, View,TouchableOpacity,Image, } from 'react-native'
import React from 'react'

export default function OrderSuccess({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}} >
    <ScrollView>
       <View style={styles.cardWrapper}>
        <Image source={require('../../assets/congrats.png')} style={styles.image}></Image>
        <View style={styles.successwrapper}>
       <Text style={styles.title}>Congratulations !!!</Text>
       <Text style={styles.subtitle}>Your order have been taken and is being attended to</Text>
       </View>
       <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Track Order')} >
            <Text style={styles.login}>Start Ordering</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueBtn} onPress={()=>navigation.navigate('Checkout')} >
            <Text style={styles.continue}>Continue Shopping</Text>
            </TouchableOpacity>

       </View>
       </ScrollView>
</SafeAreaView>
  )
}


const styles = StyleSheet.create({
  cardWrapper:{
    textAlign:'center',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height: Dimensions.get('window').height
  },
  image:{
    width:Dimensions.get('window').width,
    height:180,
 resizeMode:'contain',
    marginBottom:30,
    marginTop:20,
    textAlign:'center',

},
successwrapper:{
  width:Dimensions.get('window').width-100,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
},
title:{
    fontSize:28,
    fontWeight:'700',
    fontFamily:'Raleway_700Bold',
    lineHeight:33,
    marginBottom:20,
    textAlign:'center'

},
subtitle:{
    fontSize:17,
    fontWeight:'400',
    fontFamily:'Raleway_400Regular',
    opacity:0.5,
    color:'#000',
    marginBottom:20,
    textAlign:'center'
},

loginBtn:{

    paddingVertical:10,
    paddingHorizontal:10,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:50,
    marginHorizontal:30,
    width:Dimensions.get('window').width-60,
   },
   continueBtn:{
    width:Dimensions.get('window').width-60,
    paddingVertical:10,
    paddingHorizontal:10,
    backgroundColor:'white',
    borderRadius:10,
    marginTop:20,
    marginHorizontal:30,
    borderWidth:1,
    borderColor:'#663399',
    shadowColor: "#663399",
   
shadowOffset: {
	width: 0,
	height: 10,
},
shadowOpacity: 0.2,
shadowRadius: 16.00,

elevation: 24,
   },
   continue:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:20,
    color:'#663399',
   },
   login:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:20,
    color:'white',
   },
})