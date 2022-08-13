import { ScrollView, StatusBar,ActivityIndicator,Alert, StyleSheet,Dimensions,SafeAreaView, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'
import { Formik } from 'formik';
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email')
})

export default function ForgotPassword({navigation}) {

    const[isSubmitting,setIsSubmitting] = useState(false)

    const changePassword = React.useCallback(async(data)=>{
      try {
        setIsSubmitting(true)
        var response = await axios.post('/user/forgot/password',data)
        if(response.data){
          Alert.alert('Password reset link has been sent to your email')
          navigation.navigate('resetpassword')
        }
        setIsSubmitting(false)
      } catch (error) {
        Alert.alert('Error', error.request.response)
        setIsSubmitting(false)
      }
    },[])



  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <StatusBar
        backgroundColor="#663399"
        barStyle="light-content"
    />
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
            <Ionicons name="mail-outline" size={14} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Email</Text>
          </View>
          <TextInput keyboardType='email-address'
           style={styles.inputField}
            onChangeText={handleChange('email')} 
            onBlur={handleBlur('email')}
            ></TextInput>
            {touched.email&& errors.email?(
              <Text style={bbstyles.error}>{errors.email}</Text>
            ):(null)}
        </View>
        {isSubmitting ?(
          <TouchableOpacity style={styles.loginBtn}>
          <ActivityIndicator size={24} color='#fff'/>
        </TouchableOpacity>
        ):(
        <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
          <View><Text style={styles.loginText}>Submit</Text></View>
        </TouchableOpacity>

        )}
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
       paddingVertical:Dimensions.get('window').height/15
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
      fontSize:12,
      fontWeight:'600',
      fontFamily:'Raleway_700Bold',
      color:'#868686',
      marginLeft:5,
     
    },
    inputField:{
      paddingVertical:5,
      paddingHorizontal:5,
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
    paddingVertical:10,
    paddingHorizontal:10,
    width:Dimensions.get('window').width-60,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:30,
    marginBottom:30
    },
    loginText:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:18,
    color:'white',
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