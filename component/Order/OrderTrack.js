import { StyleSheet, Text, View,ScrollView,Dimensions,Image} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Raleway_400Regular } from '@expo-google-fonts/raleway'

export default function OrderTrack() {
  return (
    <ScrollView style={{height:Dimensions.get('window').height}}>
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Status</Text>
      <View style={styles.loginForm}>
      <View style={styles.deliver}>
            <View style={styles.noteWrapper}>
            <View style={styles.imageView}>
            <Image source={require('../../assets/note.png')} style={styles.logo}></Image>
            </View>
                <Text style={styles.logoTitle}>Order Taken</Text>
            </View>
            <View>
                <Text style={styles.orderTick}><Feather name='check' size={15} color="white"></Feather></Text>
            </View>
      </View>
      <View style={styles.deliver}>
            <View style={styles.noteWrapper}>
            <View style={styles.imageView}>
            <Image source={require('../../assets/prepared.png')} style={styles.logo}></Image>
            </View>
                <Text style={styles.logoTitle}>Order Is Being Prepared</Text>
            </View>
            <View>
                <Text style={styles.orderTick}><Feather name='check' size={15} color="white"></Feather></Text>
            </View>
      </View>
      <View style={styles.deliver}>
            <View style={styles.noteWrapper}>
            <View style={styles.imageView}>
            <Image source={require('../../assets/deliver.png')} style={styles.logo}></Image>
            </View>
            <View>
            <Text style={styles.logoTitle}>Order Is Being Delivered</Text>
                <Text style={styles.subtitle}>Your delivery agent is coming</Text>
            </View>
              
            </View>
            <View style={{ justifyContent:'center',
        alignItems:'center',display:'flex'}}>
                <Text style={styles.phoneTick}><Feather name='phone-call' size={15} color="white"></Feather></Text>
            </View>
      </View>

      <View style={styles.mapContainer}>
      <Image source={require('../../assets/map.png')} style={styles.map}></Image>

      </View>
      </View>
    </View>

  </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#663399',
    },
   
    title:{
        fontWeight: '800',
        fontSize: 50,
        color:'white',
        fontFamily:'Raleway_800ExtraBold', 
        padding:20 ,
        paddingVertical:50
    },
    loginForm:{
        backgroundColor:'white',
        color:'black',
       borderTopRightRadius:18,
       borderTopLeftRadius:18,
     flex:1,
     padding:30,
     paddingTop:50
      },
      deliver:{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          paddingVertical:15,
          paddingHorizontal:10,
      },
      logo:{
          height:43,
          width:48,
        resizeMode:'cover',
         
        
      },
      imageView:{
        backgroundColor:'#f5f5ff',
        borderRadius:10,
        borderRadius:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:53,
        height:53
      },
      logoTitle:{
          fontSize:16,
          fontWeight:'600',
          color:'black',
          marginLeft:5
      },
      noteWrapper:{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'
      },
      orderTick:{
          backgroundColor:'#4CD964',
          height:20,
          width:20,
          textAlign:'center',
          borderRadius:10,
          lineHeight:20
      },
      phoneTick:{
        backgroundColor:'#663399',
        height:40,
        width:40,
        textAlign:'center',
        borderRadius:20,
        lineHeight: 42
       
      },
      mapContainer:{
          paddingVertical:50,
          paddingHorizontal:20,
          textAlign:'center',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'

      },

      map:{
          height:135,
          width:Dimensions.get('window').width-70,
          resizeMode:'cover',
      },
      subtitle:{
          fontSize:14,
          fontWeight:'400',
          fontFamily:"Raleway_400Regular",
          marginLeft:5
      }
})