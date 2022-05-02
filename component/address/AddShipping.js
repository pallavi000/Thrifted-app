import { StyleSheet, Text,ActivityIndicator, View ,SafeAreaView,ScrollView,TextInput,TouchableOpacity,Alert} from 'react-native'
import React,{useContext,useState} from 'react'
import { Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {AuthContext} from '../Context'
import bbstyles from '../Styles'
import axios from 'axios'

const validationSchema = Yup.object().shape({
    district:Yup.string().required(),
    city:Yup.string().required(),
    street:Yup.string().required(),
    phone:Yup.string().required(),
    name:Yup.string().required().required(),
    zipcode:Yup.number().required()
})

export default function AddShipping({navigation}) {
    const[isSubmitting,setIsSubmitting] = useState(false)
        const data = useContext(AuthContext)
        const {token} = data
        const config = {
            headers:{
                'access-token': token
            }
        }
    
    async function add(values){
        setIsSubmitting(true)
        try {
            var response = await  axios.post('/address',values,config)
            Alert.alert('Success','Address has been added')
            setIsSubmitting(false)
            navigation.goBack()
        } catch (error) {
            setIsSubmitting(false)
            Alert.alert('Error',error.request.response)
        }
    }
    


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
        <View style={styles.container}>
        <Formik 
           initialValues={{district:'',city:'',street:'',phone:'',name:'',zipcode:''}}
           onSubmit={(values)=>add(values)}
           validationSchema={validationSchema}
           >
           {({handleChange,handleSubmit,errors,handleBlur,touched})=>(
               <>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 onChangeText={handleChange('name')}
                 onBlur={handleBlur('name')}
                 ></TextInput>
                 {touched.name && errors.name?(
                    <Text style={bbstyles.error}>{errors.name}</Text>
                 ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>District</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 onChangeText={handleChange('district')}
                 onBlur={handleBlur('district')}
                 ></TextInput>

                 {touched.district && errors.district?(
                        <Text style={bbstyles.error}>{errors.district}</Text>
                 ):(null)}
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>City</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 onChangeText={handleChange('city')}
                 onBlur={handleBlur('city')}
                 ></TextInput>
                 {touched.city && errors.city?(
                        <Text style={bbstyles.error}>{errors.city}</Text>
                 ):(null)}
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Street</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 onChangeText={handleChange('street')}
                 onBlur={handleBlur('street')}
                 ></TextInput>

                 {touched.street && errors.street?(
                        <Text style={bbstyles.error}>{errors.street}</Text>
                 ):(null)}
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Zip Code(Postal Code)</Text>
                <TextInput
                 keyboardType='numeric'
                 style={styles.input}
                 onChangeText={handleChange('zipcode')}
                 onBlur={handleBlur('zipcode')}
                 ></TextInput>

                 {touched.zipcode && errors.zipcode?(
                        <Text style={bbstyles.error}>{errors.zipcode}</Text>
                 ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                 keyboardType='numeric'
                 style={styles.input}
                 onChangeText={handleChange('phone')}
                 onBlur={handleBlur('phone')}
                 ></TextInput>

                 {touched.phone && errors.phone?(
                        <Text style={bbstyles.error}>{errors.phone}</Text>
                 ):(null)}
            </View>

                    {isSubmitting ?(
        <TouchableOpacity style={styles.loginBtn}>
          <ActivityIndicator size={24} color='#fff'/>
        </TouchableOpacity>
      ):(
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit} >
            <Text style={styles.login}>Save Address</Text>
            </TouchableOpacity>
      )}
            </>)}
            </Formik>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    container:{
        padding:20
    },
    formGroup:{
        paddingBottom:5,
        marginBottom:15,

    },
    label:{
        fontSize:16,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        color:'#868686',
        marginBottom:5
    },
    input:{
       fontSize:17,
       fontWeight:'500',
       fontFamily:"Raleway_500Medium",
       borderWidth:0,
       borderBottomColor:'#C9C9C9',
       borderBottomWidth:1
    },
    loginBtn:{
        paddingVertical:15,
        paddingHorizontal:10,
        backgroundColor:'#663399',
        borderRadius:10,
        marginTop:50,
        marginHorizontal:20,
       },
       login:{
        textAlign:'center',
        fontFamily:'Raleway_700Bold',
        fontWeight:'700',
        fontSize:18,
        color:'white',
       },
})