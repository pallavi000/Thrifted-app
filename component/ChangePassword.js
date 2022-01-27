import React,{useContext,useState} from 'react'
import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {AuthContext} from './Context'
import bbstyles from './Styles'
import { NavigationContainer } from '@react-navigation/native'

const ValidationSchema = Yup.object().shape({
    currentPassword:Yup.string().required().min(8),
    newPassword:Yup.string().required().min(8),
    confirmPassword:Yup.string().required().min(8)
})

const ChangePassword = ({navigation}) => {

const[error,setError] = useState('')
const data =useContext(AuthContext)
const {token} = data

 const config = {
        headers:{
            'access-token': token
        }
    }

function changePassword(values){
    axios.post('/user/change/password',values,config).then(response=>{
        console.log(response.data)
        navigation.navigate('profile')
    }).catch(error=>{
        setError(error.request.response)
    })
}

    return (
       <View style={bbstyles.container}>
            <Text style={bbstyles.h1}>Reset Password</Text>
             {error?(<Text style={bbstyles.alertDanger}>{error}</Text>):(null)}
            <Formik
            initialValues={{currentPassword:'',newPassword:'',confirmPassword:''}}
            onSubmit={values=>changePassword(values)}
            validationSchema={ValidationSchema}
            >
            {({handleChange,handleSubmit,errors})=>(
                <>
                 <TextInput style={bbstyles.formControl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="current Password"
                keyboardType="default"
                secureTextEntry
                onChangeText={handleChange("currentPassword")}
                />
                <Text style={bbstyles.error}>{errors.currentPassword}</Text> 
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
                
                <TouchableOpacity onPress={()=>handleSubmit()}>
                    <Text style={bbstyles.btnPrimary}>Submit</Text>
                </TouchableOpacity>
                </>
            )}
            </Formik>
        </View>
    )
}

export default ChangePassword
