import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet,TextInput } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import bbstyles from './Styles'
import axios from 'axios'
import { useState } from 'react/cjs/react.development'


const ValidationSchema= Yup.object().shape({
   email :Yup.string().required().email(),
    
 })

const ForgotPassword = ({navigation}) => {
const[error,setError] = useState('')
const[success,setSuccess] = useState('')
function changePassword(values){
    axios.post('/user/forgot/password',values).then(response=>{
        setSuccess('password reset link has been sent to your email')
        navigation.navigate('resetpassword')
        setError('')
    }).catch(err=>{
        setError(err.request.response)
        setSuccess('')
    })
}

    return (
        <View style={bbstyles.container}>
            <Text style={bbstyles.h1}>Forgot Passowrd??</Text>
            {error?(<Text style={bbstyles.alertDanger}>{error}</Text>):(null)}
         {success?(<Text style={bbstyles.alertSuccess}>{success}</Text>):(null)}
            <Formik 
            initialValues={{email:''}}
            onSubmit={values=>changePassword(values)}
            validationSchema={ValidationSchema}
            >

             {({handleChange, handleSubmit,errors })=>(
                 <>
            <TextInput style={bbstyles.formControl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Enter your email"
                keyboardType="email"
                onChangeText={handleChange("email")}
           />
         <Text style={styles.error}>{errors.email}</Text>

                <TouchableOpacity  onPress={()=>handleSubmit()}>
                    <Text style={bbstyles.btnPrimary}>Submit</Text>
                </TouchableOpacity>
                 </>
                 
             )}

            </Formik>
            
        </View>
    )
}


const styles = StyleSheet.create({
  error:{
        color:'red',
        marginTop:5
    }  
})

export default ForgotPassword
