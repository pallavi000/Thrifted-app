import React,{useContext} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { Button, TextInput,View,StyleSheet,Text, TouchableWithoutFeedback } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from './Context'
import bbstyles from './Styles'


const validationSchema= Yup.object().shape({
    name:Yup.string().required(),
    email:Yup.string().required().email(),
    password:Yup.string().required().min(8)
})



function Register({navigation}) {

    const {setIsLoggedIn} = useContext(AuthContext)

    function signup(values){
        axios.post('/user/all',values).then(async response=>{      
           await AsyncStorage.setItem('token',response.data)
         setIsLoggedIn(true)
        
        }).catch(err=>{
            console.log(err)
        })
        }


        function facebook(){

        }

        function google(){

        }

    return (
        <View style={styles.loginContainer}>
        <Formik
        initialValues={{ name:'', email:'',password:''}}
        onSubmit = {values=>signup(values)}
        validationSchema= {validationSchema}
        >  
        {({handleChange,handleSubmit,errors})=>(
            <>
         <TextInput style={bbstyles.formControl}
           autoComplete = {false}
           placeholder="enter name"
           keyboardType = 'default'
           onChange = {handleChange('name')}
           />
         <Text style={{color:'red'}}>{errors.name}</Text>

           <TextInput style={bbstyles.formControl}
           autoComplete = {false}
           placeholder="Email"
           keyboardType = 'email-address'
           onChange = {handleChange('email')}
           />
          <Text style={{color:'red'}}>{errors.email}</Text>

        <TextInput style={bbstyles.formControl}
           autoComplete = {false}
           placeholder="password"
           keyboardType = 'default'
           secureTextEntry
           onChange = {handleChange('password')}
           />
          <Text style={{color:'red'}}>{errors.password}</Text>

     
        <TouchableWithoutFeedback onPress={handleSubmit}>
            <Text style={bbstyles.btnPrimary}>Login</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>facebook()}>
            <Text style={styles.facebook}>Login with Facebook</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>google()}>
            <Text style={styles.google}>Login with Google</Text>
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
        marginTop:20,
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

export default Register
