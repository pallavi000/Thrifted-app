import React, { useContext,useEffect,useState } from 'react'
import { View, Text, TextInput, StyleSheet,TouchableWithoutFeedback,ScrollView } from 'react-native'
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


const EditAddress = ({navigation}) => {
    const[address,setAddress] = useState([])
        const data = useContext(AuthContext)
        const {token} = data
    
        const config = {
            headers:{
                'access-token': token
            }
        }

    useEffect(() => {
      axios.get('/address/edit',config).then(response=>{
           console.log(response.data.shipping)
           console.log(response.data.billing)
           setAddress(response.data)
       })
    }, [])
    
    function add(values){
        axios.put('/address/edit',values,config).then(response=>{
            console.log(response.data)
            navigation.navigate('Address')
    })
}
    
    
    
        return (
            <ScrollView style={[styles.container,bbstyles.bgWhite]}>
               <Formik 
               initialValues={{district:address.billing?.district,city:address.billing?.city,street:address.billing?.street,phone:address.billing?.phone,shipping_district:address.shipping?.district,shipping_city:address.shipping?.city,shipping_street:address.shipping?.street,shipping_phone:address.shipping?.phone}}
               onSubmit={(values)=>add(values)}
               validationSchema={validationSchema}
               enableReinitialize
             
               >
               {({handleChange,handleSubmit,errors})=>(
                   <>
                   <Text style={bbstyles.h1}>Billing Address</Text>
                    <TextInput
                    style={bbstyles.formControl}
                        keyboardType='default'
                        placeholder="Enter district"
                        defaultValue={address.billing?.district}
                        onChangeText={handleChange("district")}
                    />
                    <Text style={styles.error}>{errors.district}</Text>
                    <TextInput
                     style={bbstyles.formControl}
                        keyboardType='default'
                        placeholder="Enter City"
                       defaultValue={address.billing?.city}
                        onChangeText={handleChange("city")}
                      
                    />
                    <Text style={styles.error}>{errors.city}</Text>
                    <TextInput
                     style={bbstyles.formControl}
                        keyboardType='default'
                        placeholder="Enter street"
                        defaultValue={address.billing?.street}
                        onChangeText={handleChange("street")}
                      
                    />
                    <Text style={styles.error}>{errors.street}</Text>
                    <TextInput
                     style={bbstyles.formControl}
                        keyboardType='default'
                        placeholder="Enter phone"
                        defaultValue={address.billing?.phone}
                        onChangeText={handleChange("phone")}
                      
                    />
                    <Text style={styles.error}>{errors.phone}</Text>
                    <Text style={bbstyles.h1}>Shipping Address</Text>
    
                    <TextInput
                    style={bbstyles.formControl}
                        keyboardType='default'
                        placeholder="Enter shipping_district"
                        defaultValue={address.shipping?.district}
                        onChangeText={handleChange("shipping_district")}
                      
                    />
                    <Text style={styles.error}>{errors.shipping_district}</Text>
                    <TextInput
                     style={bbstyles.formControl}
                        keyboardType='default'
                        placeholder="Enter City"
                        defaultValue={address.shipping?.city}
                        onChangeText={handleChange("shipping_city")}
                      
                    />
                    <Text style={styles.error}>{errors.shipping_city}</Text>
                    <TextInput
                     style={bbstyles.formControl}
                        keyboardType='default'
                        placeholder="Enter street"
                        defaultValue={address.shipping?.street}
                        onChangeText={handleChange("shipping_street")}
                      
                    />
                    <Text style={styles.error}>{errors.shipping_street}</Text>
                    <TextInput
                     style={bbstyles.formControl}
                        keyboardType='default'
                        placeholder="Enter phone"
                        defaultValue={address.shipping?.phone}
                        onChangeText={handleChange("shipping_phone")}
                      
                    />
                    <Text style={styles.error}>{errors.shipping_phone}</Text>
    
                    <TouchableWithoutFeedback onPress={handleSubmit}>
                    <Text style={bbstyles.btnPrimary}>Submit</Text>
                    </TouchableWithoutFeedback>
                   </>
               )}
    
               </Formik>
            </ScrollView>
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

export default EditAddress
