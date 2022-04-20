import { ScrollView, StyleSheet,Dimensions, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts,Raleway_700Bold,Raleway_800ExtraBold,Raleway_600SemiBold  } from '@expo-google-fonts/raleway';
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'
import * as Yup from 'yup'
import { Formik } from 'formik';
import { Alert } from 'react-native-web';


const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required(),
  confirmPassword:Yup.string().required(),
  verifyKey:Yup.string().required()
})


export default function ResetPassword() {
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [verifyKey,setVerifyKey] = useState('')
    const[error,setError] =useState('')
    const[success,setSuccess] = useState('')

async function resetPassword(data){
    try {
      var response =await axios.post('/user/reset/password',data)
      Alert.alert('your password has been successfully updated')
    } catch (error) {
      Alert.alert('Error',error.request.response)
    }
  }


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView >
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.loginForm}>
        <Text style={styles.login}>Reset Password</Text>
       <Formik initialValues={{newPassword:'',confirmPassword:'',verifyKey:''}}
       onSubmit={(values)=>resetPassword(values)}
       validationSchema= {validationSchema}>

        {({handleSubmit,handleChange,errors,handleBlur,touched})=>(
          <>
          <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >New Password</Text>
          </View>
          <TextInput keyboardType='default'
           secureTextEntry={true} 
           style={styles.inputField}
            onChangeText={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}>
            </TextInput>
            {touched.newPassword && errors.newPassword?(
              <Text style={bbstyles.error}>{errors.newPassword}</Text>
            ):(null)}
        </View>

        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Confirm Password</Text>
          </View>
          <TextInput keyboardType='default'
           secureTextEntry={true} 
           style={styles.inputField}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}>
            </TextInput>
            {touched.confirmPassword && errors.confirmPassword?(
              <Text style={bbstyles.error}>{errors.confirmPassword}</Text>
            ):(null)}
        </View>

        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Verify Key</Text>
          </View>
          <TextInput keyboardType='default'
           style={styles.inputField}
            onChangeText={handleChange('verifykey')}
            onBlur={handleBlur('verifykey')}>
            </TextInput>
            {touched.verifykey && errors.verifykey?(
              <Text style={bbstyles.error}>{errors.verifykey}</Text>
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