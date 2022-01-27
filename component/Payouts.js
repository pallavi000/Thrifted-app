import React, { useContext,useState } from 'react'
import { View, Text,TextInput,TouchableWithoutFeedback } from 'react-native'
import { StyleSheet } from 'react-native'
import bbstyles from './Styles'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { AuthContext } from './Context'
import {Picker} from '@react-native-picker/picker'
import { greaterOrEq, tan } from 'react-native-reanimated'



const validationSchema= Yup.object().shape({
    balance:Yup.string().required(),
     account_detail:Yup.string().required(),
     payment_method:Yup.string().required()

 })


const Payouts = ({navigation}) => {

    const[error,setError] = useState('')
    const data = useContext(AuthContext)
    const {token} = data

        const config = {
        headers: {
          'access-token':token
        }
    }

function payoutForm(values){
    axios.post('/user/withdraw',values,config).then(response=>{
        console.log(response.data)
        navigation.navigate('profile')
    }).catch(err=>{
        setError(err.request.response)
    })
}
    return (
        <View style={bbstyles.container}>
            <Text style={bbstyles.h1}>Payouts</Text>
            {error?(
                <Text style={bbstyles.alertDanger}>{error}</Text>
            ):(null)}
            <Formik
        initialValues={{balance:'',payment_method:'',account_detail:''}}
        onSubmit={values=>payoutForm(values)}
        validationSchema={validationSchema}
        >
        {({handleChange, handleSubmit,errors,setFieldValue,values })=>(
            <>

            <Picker
                    style={styles.formControl}
                     selectedValue={values.payment_method}
                        onValueChange={itemValue =>
                        setFieldValue('payment_method',itemValue)
                    }>
                             <Picker.Item  label="Selelct Payment Method" value="" />
                            <Picker.Item  label="FonePay" value="fonepay" />
                            <Picker.Item  label="Esewa" value="esewa" />
                </Picker>

                <Text style={{color:'red'}}>{errors.payment_method}</Text>

            <TextInput style={styles.formControl}
           autoCapitalize="none"
           autoCorrect={false}
           placeholder="Account No/Id"
           keyboardType="default"
           onChangeText={handleChange("account_detail")}
           />
       <Text style={{color:'red'}}>{errors.account_detail}</Text>
           <TextInput style={styles.formControl}
           autoCapitalize="none"
           autoCorrect={false}
           placeholder="Enter amount for withdraw"
           keyboardType="default"
    
           onChangeText={handleChange("balance")}
           />
          <Text style={{color:'red'}}>{errors.balance}</Text>
            <TouchableWithoutFeedback onPress={handleSubmit}>
            <Text style={bbstyles.btnPrimary}>Submit</Text>
            </TouchableWithoutFeedback>

            </>
        )}
        </Formik>
        </View>
    )
}


const styles = StyleSheet.create({
    formControl: {
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
    },
})

export default Payouts
