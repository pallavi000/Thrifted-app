import React from 'react'
import { View, Text, TouchableOpacity,TextInput } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import bbstyles from './Styles'
import axios from 'axios'
import { useState } from 'react/cjs/react.development'

const ValidationSchema = Yup.object().shape({
    newPassword:Yup.string().required().min(8),
    confirmPassword:Yup.string().required().min(8),
    verifykey:Yup.string().required()
})


const ResetPassword = () => {
const[error,setError] =useState('')
const[success,setSuccess] = useState('')

function resetPassword(values){
  axios.post('/user/reset/password',values).then(response=>{
            console.log(response.data)
            setSuccess('your password has been successfully updated')

        }).catch(err=>{
            setError(err.request.response)
        })
}

    return (
        <View style={bbstyles.container}>
            <Text style={bbstyles.h1}>Reset Password</Text>
             {error?(<Text style={bbstyles.alertDanger}>{error}</Text>):(null)}
            {success?(<Text style={bbstyles.alertSuccess}>{success}</Text>):(null)}
            <Formik
            initialValues={{newPassword:'',confirmPassword:'',verifykey:''}}
            onSubmit={values=>resetPassword(values)}
            validationSchema={ValidationSchema}
            >

            {({handleChange,handleSubmit,errors})=>(
                <>
                <TextInput style={bbstyles.formControl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="new Password"
                keyboardType="default"
                secureTextEntry
                onChangeText={handleChange("newPassword")}
                />
                <Text style={bbstyles.error}>{errors.newPassword}</Text> 

                  <TextInput style={bbstyles.formControl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Confirm Password"
                keyboardType="default"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                />
                <Text style={bbstyles.error}>{errors.confirmPassword}</Text> 
                  <TextInput style={bbstyles.formControl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Verification Key"
                keyboardType="default"
                secureTextEntry
                onChangeText={handleChange("verifykey")}
                />
                <Text style={bbstyles.error}>{errors.verifykey}</Text> 

                <TouchableOpacity onPress={()=>handleSubmit()}>
                    <Text style={bbstyles.btnPrimary}>Submit</Text>
                </TouchableOpacity>
                </>
            )}
            </Formik>
        </View>
    )
}

export default ResetPassword
