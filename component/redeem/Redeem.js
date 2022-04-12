import { StyleSheet, Text, View,SafeAreaView, ScrollView, TextInput,Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'

export default function Redeem({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView >
    <View style={styles.container}>
      <Text style={styles.title}>Redeem</Text>
      <View style={styles.loginForm}>
        <Text style={styles.login}>Redeem</Text>
        
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label} >Payment Method</Text>
          </View>
          <TextInput keyboardType='default' style={styles.inputField}></TextInput>
        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Account No./ID</Text>
          </View>
          <TextInput keyboardType='default' style={styles.inputField}></TextInput>
        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Ammount</Text>
          </View>
          <TextInput keyboardType='Number' style={styles.inputField}></TextInput>
        </View>

        <TouchableOpacity >
          <View><Text style={styles.loginBtn}>Redeem</Text></View>
        </TouchableOpacity>

      </View>
    </View>

  </ScrollView>
  </SafeAreaView>
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
        paddingVertical:100,
        textAlign:'center'
    },
    loginForm:{
      backgroundColor:'white',
      color:'black',
     borderTopRightRadius:18,
     borderTopLeftRadius:18,
    flex:1,
    padding:30
    },
    login:{
        fontWeight:'700',
        fontSize:18,
        fontFamily:'Raleway_700Bold',
        marginBottom:30
      
      },
      formgroup:{
        marginBottom:20,
        borderBottomColor:'#c4c4c4',
       borderBottomWidth:1,
      },
      labelWrapper:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5
      },
      label:{
        fontSize:15,
        fontWeight:'600',
        fontFamily:'Raleway_700Bold',
        color:'#868686',
        marginLeft:5,
       
      },
      inputField:{
        paddingVertical:7,
        paddingHorizontal:10
        
      },
      forgot:{
        fontSize:15,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        color:'#663399',
        marginTop:10
     
      },
      loginBtn:{
       fontWeight:'700',
       fontSize:20,
       color:'white',
       paddingVertical:20,
       paddingHorizontal:50,
       backgroundColor:'#663399',
       borderRadius:10,
       marginTop:40,
       marginBottom:30,
       textAlign:'center',
       fontFamily:'Raleway_700Bold',
       
      },
      create:{
       fontSize:15,
       fontWeight:'600',
       fontFamily:'Raleway_600SemiBold',
       color:'#663399',
       marginTop:10,
       textAlign:'center'
      }
})