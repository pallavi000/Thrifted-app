import { ScrollView,SafeAreaView, StyleSheet,Dimensions, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts,Raleway_700Bold,Raleway_800ExtraBold,Raleway_600SemiBold  } from '@expo-google-fonts/raleway';
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email:Yup.string().required().email(),
  password:Yup.string().required(),

})

export default function Login({navigation}) {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const[error,setError] = useState('')
  const {setIsLoggedIn} = useContext(AuthContext)

  function loginForm(data){
   

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
  <SafeAreaView style={{backgroundColor:'white',flex:1}}>
  <ScrollView >
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.loginForm}>
        <Text style={styles.login}>Login</Text>
        {error?(
          <Text style={bbstyles.alertDanger}>{error}</Text>
        ):(null)}
        <Formik initialValues={{email:'',password:''}}
        onSubmit={(values)=>loginForm(values)}
        validationSchema={validationSchema}>

      {({handleChange,handleSubmit,errors,touched, handleBlur})=>(
        <>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="mail-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Email</Text>
          </View>
          <TextInput keyboardType='email-address' 
           style={styles.inputField}
           onChangeText={handleChange('email')} 
           onBlur={handleBlur('email')}
           ></TextInput>
           {touched.email && errors.email?(
            <Text style={bbstyles.error}>{errors.email}</Text>
           ):(null)}
        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label}>Password</Text>
          </View>
          <TextInput keyboardType='default'
           onFocus={()=>{}}
            style={styles.inputField} 
            secureTextEntry={true} 
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            ></TextInput>
          {touched.password && errors.password?(
            <Text style={bbstyles.error}>{errors.password}</Text>
           ):(null)}
     
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('forgotpassword')}>
          <Text style={styles.forgot}>Forgot Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <View><Text style={styles.loginBtn}>Login </Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('register')} >
          <Text style={styles.create}>Create Account</Text>
        </TouchableOpacity>
        </>
      )}
        </Formik>
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
     paddingTop:50  
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
   paddingHorizontal:10,
   borderBottomColor:'#c4c4c4',
   borderBottomWidth:1,
   
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