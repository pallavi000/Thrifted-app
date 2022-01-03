import React, { useContext } from 'react'
import { View, Text, TextInput, StyleSheet,TouchableWithoutFeedback } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import bbstyles from './Styles'
import axios from 'axios'
import { AuthContext } from './Context'

const validationSchema = Yup.object().shape({
    district:Yup.string().required(),
    city:Yup.string().required(),
    street:Yup.string().required(),
    phone:Yup.string().required(),
    shipping_district:Yup.string().required(),
    shipping_city:Yup.string().required(),
    shipping_street:Yup.string().required(),
    shipping_phone:Yup.string().required(),
    
})


const AddAddress = ({navigation}) => {

    const data = useContext(AuthContext)
    const {token} = data

    const config = {
        headers:{
            'access-token': token
        }
    }

function add(values){
    axios.post('/address',values,config).then(response=>{
        navigation.navigate('address')
        console.log(response.data)
    })

}



    return (
        <View style={styles.container}>
           <Formik 
           initialValues={{district:'',city:'',street:'',phone:'',shipping_district:'',shipping_city:'',shipping_street:'',shipping_phone:''}}
           onSubmit={(values)=>add(values)}
           validationSchema={validationSchema}
           >
           {({handleChange,handleSubmit,errors})=>(
               <>
               <Text style={bbstyles.h1}>Billing Address</Text>
                <TextInput
                style={bbstyles.formControl}
                    keyboardType='default'
                    placeholder="Enter district"
                    onChange={handleChange("district")}
                />
                <Text style={styles.error}>{errors.district}</Text>
                <TextInput
                 style={bbstyles.formControl}
                    keyboardType='default'
                    placeholder="Enter City"
                    onChange={handleChange("city")}
                />
                <Text style={styles.error}>{errors.city}</Text>
                <TextInput
                 style={bbstyles.formControl}
                    keyboardType='default'
                    placeholder="Enter street"
                    onChange={handleChange("street")}
                />
                <Text style={styles.error}>{errors.street}</Text>
                <TextInput
                 style={bbstyles.formControl}
                    keyboardType='default'
                    placeholder="Enter phone"
                    onChange={handleChange("phone")}
                />
                <Text style={styles.error}>{errors.phone}</Text>
                <Text style={bbstyles.h1}>Shipping Address</Text>

                <TextInput
                style={bbstyles.formControl}
                    keyboardType='default'
                    placeholder="Enter shipping_district"
                    onChange={handleChange("shipping_district")}
                />
                <Text style={styles.error}>{errors.shipping_district}</Text>
                <TextInput
                 style={bbstyles.formControl}
                    keyboardType='default'
                    placeholder="Enter City"
                    onChange={handleChange("shipping_city")}
                />
                <Text style={styles.error}>{errors.shipping_city}</Text>
                <TextInput
                 style={bbstyles.formControl}
                    keyboardType='default'
                    placeholder="Enter street"
                    onChange={handleChange("shipping_street")}
                />
                <Text style={styles.error}>{errors.shipping_street}</Text>
                <TextInput
                 style={bbstyles.formControl}
                    keyboardType='default'
                    placeholder="Enter phone"
                    onChange={handleChange("shipping_phone")}
                />
                <Text style={styles.error}>{errors.shipping_phone}</Text>

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
    container:{
        margin:20
    },
    error:{
        color:'red',
        marginTop:5
    }
})


export default AddAddress
