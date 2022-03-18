import { ScrollView, StyleSheet,Dimensions, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts,Raleway_700Bold,Raleway_800ExtraBold,Raleway_600SemiBold  } from '@expo-google-fonts/raleway';
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'

export default function Login({navigation}) {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const[error,setError] = useState('')
  const {setIsLoggedIn} = useContext(AuthContext)

  function loginForm(){
    //validation
    if(email.trim().length==0) {
      setError('Email is required.')
      return false
    }
    if(password.trim().length==0) {
      setError('Password is required')
      return false
    }

    //data
    const data = {
      email,
      password,
    }
    axios.post('/user',data).then(async response=>{
        console.log(response.data)
        try {
          await AsyncStorage.setItem('token',response.data.token)
        setIsLoggedIn(true)
        } catch (error) {
            setError(error.message)
        }
    }).catch(err=>{
        console.log(err.request.response)
        setError(err.request.response)
    })
  }

  return (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.loginForm}>
        <Text style={styles.login}>Login</Text>
        {error?(
          <Text style={bbstyles.alertDanger}>{error}</Text>
        ):(null)}
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="mail-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label}>Email</Text>
          </View>
          <TextInput keyboardType='email' style={styles.inputField} onChange={(e)=>setEmail(e.target.value)}></TextInput>
        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label}>Password</Text>
          </View>
          <TextInput keyboardType='default' onFocus={()=>{}} style={styles.inputField} secureTextEntry={true} onChange={(e)=>setPassword(e.target.value)}></TextInput>

        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('forgotpassword')}>
          <Text style={styles.forgot}>Forgot Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>loginForm()}>
          <View><Text style={styles.loginBtn}>Login </Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('register')} >
          <Text style={styles.create}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>

  </ScrollView>
  )
}

const styles = StyleSheet.create({


  container:{
     backgroundColor:'#663399',
     height:Dimensions.get('window').height,


 },

 title:{
     fontWeight: '800',
     fontSize: 50,
     color:'white',
     fontFamily:Raleway_800ExtraBold, 
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
   fontFamily:Raleway_700Bold,
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
   fontFamily:Raleway_700Bold,
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
   fontFamily:Raleway_600SemiBold,
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
  fontFamily:Raleway_700Bold,
  
 },
 create:{
  fontSize:15,
  fontWeight:'600',
  fontFamily:Raleway_600SemiBold,
  color:'#663399',
  marginTop:10,
  textAlign:'center'
 }

})