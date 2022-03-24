import { StyleSheet, Text,Dimensions, View ,ScrollView, SafeAreaView, TouchableOpacity,Image} from 'react-native'
import React,{useEffect} from 'react'
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway'

export default function OrderHistory({navigation}) {


    React.useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {display: 'none'}
          });
      }, [navigation]);


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView style={{position:'relative'}} >
    <View>
        <Image source={require('../../assets/Saly-11.png')} style={styles.image}></Image>

        <Text style={styles.title}>No History Yet</Text>
        <Text style={styles.subtitle}>Hit the button down
below to Create an order</Text>

<TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Checkout')} >
            <Text style={styles.login}>Start Ordering</Text>
            </TouchableOpacity>
    </View>

    
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    image:{
        width:Dimensions.get('window').width,
        height:314,
     resizeMode:'contain',
        marginBottom:20,
        marginTop:30,
        textAlign:'center',

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

        paddingVertical:20,
        paddingHorizontal:50,
        backgroundColor:'#663399',
        borderRadius:10,
        marginTop:50,
        marginHorizontal:30
   
       
    
       },
       login:{
        textAlign:'center',
        fontFamily:'Raleway_700Bold',
        fontWeight:'700',
        fontSize:20,
        color:'white',
       },

})