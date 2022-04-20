import { ScrollView, StyleSheet,Dimensions,SafeAreaView, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts,Raleway_700Bold,Raleway_800ExtraBold,Raleway_600SemiBold  } from '@expo-google-fonts/raleway';
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Alert } from 'react-native-web';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email')
})

export default function ForgotPassword({navigation}) {

    const [email,setEmail] = useState('')
    const[error,setError] = useState('')
    const[success,setSuccess] = useState('')


async function changePassword(data){
try {
  var response = await axios.post('/user/forgot/password',data)
  if(response.data){
    Alert.alert('password reset link has been sent to your email')
    navigation.navigate('resetpassword')
  }
 

} catch (error) {
  Alert.alert('Error', error.request.response)
  console.log(error.request.response)
}
  
}


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.loginForm}>
        <Text style={styles.login}>Forgot Password</Text>
       <Formik 
       initialValues={{email:''}}
       onSubmit={(values)=>changePassword(values)}
       validationSchema={validationSchema}
       >
        {({handleSubmit,handleChange,errors,touched,handleBlur})=>(
          <>
          <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="mail-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Email</Text>
          </View>
          <TextInput keyboardType='email'
           style={styles.inputField}
            onChangeText={handleChange('email')} 
            onBlur={handleBlur('email')}
            ></TextInput>
            {touched.email&& errors.email?(
              <Text style={bbstyles.error}>{errors.email}</Text>
            ):(null)}
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <View><Text style={styles.loginBtn}>Submit</Text></View>
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
        paddingTop:50,
       paddingVertical:100
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
      paddingVertical:5,
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
     paddingVertical:10,
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