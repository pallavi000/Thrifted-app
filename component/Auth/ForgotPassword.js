import { ScrollView, StyleSheet,Dimensions, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts,Raleway_700Bold,Raleway_800ExtraBold,Raleway_600SemiBold  } from '@expo-google-fonts/raleway';
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'

export default function ForgotPassword({navigation}) {

    const [email,setEmail] = useState('')
    const[error,setError] = useState('')
    const[success,setSuccess] = useState('')


function changePassword(){

    if(email.trim().length==0) {
        setError('Email is required.')
        return false
      }

    const data = {
        email
    }
    axios.post('/user/forgot/password',data).then(response=>{
        setSuccess('password reset link has been sent to your email')
        navigation.navigate('resetpassword')
        setError('')
    }).catch(err=>{
        setError(err.request.response)
        setSuccess('')
    })
}


  return (
    <ScrollView style={{height:Dimensions.get('window').height}}>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.loginForm}>
        <Text style={styles.login}>Forgot Password</Text>
        {error?(
          <Text style={bbstyles.alertDanger}>{error}</Text>
        ):(null)}
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="mail-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Email</Text>
          </View>
          <TextInput keyboardType='email' style={styles.inputField} onChange={(e)=>setEmail(e.target.value)} ></TextInput>
        </View>
        
       
        <TouchableOpacity onPress={()=>changePassword()}>
          <View><Text style={styles.loginBtn}>Submit</Text></View>
        </TouchableOpacity>
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
        paddingTop:50  
    },
    loginForm:{
      backgroundColor:'white',
      color:'black',
      borderRadius:18,
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
     marginTop:70,
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