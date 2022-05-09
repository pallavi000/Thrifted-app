import { ScrollView, StatusBar,ActivityIndicator, StyleSheet,Dimensions, Text,SafeAreaView,Alert, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts,Raleway_700Bold,Raleway_800ExtraBold,Raleway_600SemiBold  } from '@expo-google-fonts/raleway';
import { AuthContext } from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Formik } from 'formik';
import * as Yup from 'yup'
import bbstyles from '../Styles';

const validationSchema= Yup.object().shape({
  email:Yup.string().required().email("Email is required."),
  password:Yup.string().required("Password is Required."),
  name:Yup.string().required("Full Name is Required.")
})

export default function Register({navigation}) {
   
    const {setIsLoggedIn} = useContext(AuthContext)
    const[isSubmitting,setIsSubmitting] = useState(false)

    async function registerForm(data){
      setIsSubmitting(true)
      try {
        var response= await axios.post('/user/all',data)
        if(response.data){
          await AsyncStorage.setItem('token',response.data.token)
          setIsLoggedIn(true)
        }
        setIsSubmitting(false)
      } catch (error) {
        Alert.alert('Error',error.request.response)
        setIsSubmitting(false)
      }
  }
   

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <StatusBar
        backgroundColor="#663399"
        barStyle="light-content"
    />
    <ScrollView >
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.loginForm}>
        <Text style={styles.login}>Register</Text>
       <Formik initialValues={{email:'',password:'',name:''}}
            onSubmit={(values)=>registerForm(values)}
            validationSchema={validationSchema}>

              {({handleSubmit,handleChange,handleBlur,touched,errors})=>(
                <>
                <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="person" size={14} color={'#868686'}></Ionicons>
            <Text style={styles.label} >Full Name</Text>
          </View>
          <TextInput keyboardType='default'
           style={styles.inputField} 
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           ></TextInput>
           {touched.name && errors.name?(
             <Text style={bbstyles.error}>{errors.name}</Text>
           ):(null)}
        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Ionicons name="mail-outline" size={14} color={'#868686'}></Ionicons>
            <Text style={styles.label}>Email</Text>
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
            <Ionicons name="lock-closed-outline" size={14} color={'#868686'}></Ionicons>
            <Text style={styles.label}>Password</Text>
          </View>
          <TextInput keyboardType='default'
          secureTextEntry={true}
           style={styles.inputField} 
           onChangeText={handleChange('password')}
           onBlur={handleBlur('password')}
           ></TextInput>
            {touched.password && errors.password?(
             <Text style={bbstyles.error}>{errors.password}</Text>
           ):(null)}
        </View>
        
        {isSubmitting?(
          <TouchableOpacity style={styles.loginBtn}>
            <ActivityIndicator size={24} color='#fff'/>
          </TouchableOpacity>
        ):(
              <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
                <Text style={styles.loginText}>Register</Text>
              </TouchableOpacity>
        )}
                </>
              )}
            </Formik>
        
        <Text style={styles.already}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('login')} >
          <Text style={styles.create}>Login</Text>
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
    marginTop:50,
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
    },
    already: {
        fontSize:15,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        color:'#868686',
        marginTop:20,
        textAlign:'center'
    }
})