import React,{useEffect,useContext} from 'react'
import { StyleSheet, TextInput, Button, Text,View, TouchableWithoutFeedback, Alert} from 'react-native'
import {Formik} from 'formik'
import *  as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from './Context'
import bbstyles from './Styles'
import { useState } from 'react/cjs/react.development'


const validationSchema= Yup.object().shape({
   email:Yup.string().required().email(),
    password:Yup.string().required().min(8)
})



function Login({navigation}) {
    const[error,setError] = useState('')
    const {setIsLoggedIn} = useContext(AuthContext)


    function loginForm(values){
        console.log(values)
        axios.post('/user',values).then(async response=>{
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
    
function facebook(){

}

function google(){

}


    return (
        <View style={styles.loginContainer}>
        <Text style={{color:'red'}}>{error}</Text>
        <Formik
        initialValues={{email:'',password:''}}
        onSubmit={values=>loginForm(values)}

        >
        {({handleChange, handleSubmit,errors })=>(
            <>
            <TextInput style={bbstyles.formControl}
           autoCapitalize="none"
           autoCorrect={false}
           placeholder="Email"
           keyboardType="email-address"
           onChangeText={handleChange("email")}
           />
       <Text style={{color:'red'}}>{errors.email}</Text>
           <TextInput style={bbstyles.formControl}
           autoCapitalize="none"
           autoCorrect={false}
           placeholder="password"
           keyboardType="default"
           secureTextEntry
           onChangeText={handleChange("password")}
           />
          <Text style={{color:'red'}}>{errors.password}</Text>
            <TouchableWithoutFeedback onPress={handleSubmit}>
            <Text style={bbstyles.btnPrimary}>Login</Text>
            </TouchableWithoutFeedback>

             <TouchableWithoutFeedback onPress={()=>navigation.navigate('forgotpassword')}>
            <Text style={styles.forgot}> Forgot Password ?</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>facebook()}>
            <Text style={styles.facebook}>Login with Facebook</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>google()}>
            <Text style={styles.google}>Login with Google</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.forgot}>Are you a new user? </Text>
         
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('register')}>
            <Text style={styles.forgot}> Sign Up</Text>
            </TouchableWithoutFeedback>
            </>
        )}
        </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer:{
        margin:20
    },

    text:{
        fontFamily:"Roboto",
        fontSize:14,
        color:'#000',
        backgroundColor:'#ccc',
        padding:10,
        marginBottom:10,
        borderRadius:4
    },
    forgot:{
        fontSize:16,
        fontWeight:'500',
        marginTop:20,
        marginBottom:20,
        textAlign: 'center',
    },

    facebook:{
        backgroundColor: '#4267B2',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 'auto',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        marginBottom:10
    },
    google:{
        backgroundColor: '#DB4437',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 'auto',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',

    }
})

export default Login