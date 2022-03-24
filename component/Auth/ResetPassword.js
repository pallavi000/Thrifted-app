import { ScrollView, StyleSheet,Dimensions, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts,Raleway_700Bold,Raleway_800ExtraBold,Raleway_600SemiBold  } from '@expo-google-fonts/raleway';
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'

export default function ResetPassword() {
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [verifyKey,setVerifyKey] = useState('')
    const[error,setError] =useState('')
    const[success,setSuccess] = useState('')

function resetPassword(){
    if(newPassword.trim().length==0) {
        setError('New Password is required.')
        return false
      }
      if(confirmPassword.trim().length==0) {
        setError('Confirm Password is required.')
        return false
      }
      if(verifyKey.trim().length==0) {
        setError('Verify Key is required.')
        return false
      }



    const data={
        newPassword,
        confirmPassword,
        verifykey:verifyKey
    }
    axios.post('/user/reset/password',data).then(response=>{
              console.log(response.data)
              setSuccess('your password has been successfully updated')
  
          }).catch(err=>{
              setError(err.request.response)
          })
  }


  return (
<ScrollView style={{height:Dimensions.get('window').height}}>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.loginForm}>
        <Text style={styles.login}>Reset Password</Text>
        {error?(
          <Text style={bbstyles.alertDanger}>{error}</Text>
        ):(null)}
        {success?(
          <Text style={bbstyles.alertSuccess}>{success}</Text>
        ):(null)}
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >New Password</Text>
          </View>
          <TextInput keyboardType='default' secureTextEntry={true} style={styles.inputField} onChange={(e)=>setNewPassword(e.target.value)} ></TextInput>
        </View>

        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Confirm Password</Text>
          </View>
          <TextInput keyboardType='default' secureTextEntry={true} style={styles.inputField} onChange={(e)=>setConfirmPassword(e.target.value)} ></TextInput>
        </View>

        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Verify Key</Text>
          </View>
          <TextInput keyboardType='default'  style={styles.inputField} onChange={(e)=>setVerifyKey(e.target.value)} ></TextInput>
        </View>
        
       
        <TouchableOpacity onPress={()=>resetPassword()}>
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