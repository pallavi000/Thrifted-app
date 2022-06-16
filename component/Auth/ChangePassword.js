import { ScrollView, ActivityIndicator, StyleSheet,Dimensions,StatusBar,Alert,Text, View,TouchableOpacity,TextInput, SafeAreaView } from 'react-native'
import React,{useState,useContext} from 'react'
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'
import * as Yup from 'yup'
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
  currentPassword:Yup.string().required('Current Password is required.'),
  newPassword: Yup.string().required('New Password is required.'),
  confirmPassword:Yup.string().required('Confirm Password is required.').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})


const ChangePassword = ({navigation}) => {

    const[isSubmitting, setIsSubmitting] = useState(false)

    const data =useContext(AuthContext)
    const {token} = data
    const config = {
        headers:{
            'access-token': token
        }
    }

    const changePassword = React.useCallback(async (data)=>{
      try {
        setIsSubmitting(true)
        var response = await axios.post('/user/change/password',data,config)
        Alert.alert('Success','Password has been changed.')
        setIsSubmitting(false)
        navigation.goBack()
      } catch (error) {
        setIsSubmitting(false)
        Alert.alert('Error',error.request.response)
      }
    },[])


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <StatusBar
        backgroundColor="#663399"
        barStyle="light-content"
    />
    <ScrollView >
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <View style={styles.loginForm}>
      <Text style={styles.login}>Change Password</Text>
      <Formik initialValues={{newPassword:'',confirmPassword:'',currentPassword:''}}
       onSubmit={(values)=>changePassword(values)}
       validationSchema= {validationSchema}>

        {({handleSubmit,handleChange,errors,handleBlur,touched})=>(
          <>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label} >Current Password</Text>
          </View>
          <TextInput keyboardType='default'
           secureTextEntry={true} 
           style={styles.inputField}
            onChangeText={handleChange('currentPassword')}
            onBlur={handleBlur('currentPassword')}>
            </TextInput>
            {touched.currentPassword && errors.currentPassword?(
              <Text style={bbstyles.error}>{errors.currentPassword}</Text>
            ):(null)}
        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>New Password</Text>
          </View>
          <TextInput keyboardType='default'
           secureTextEntry={true} 
           style={styles.inputField}
            onChangeText={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}>
            </TextInput>
            {touched.newPassword && errors.newPassword?(
              <Text style={bbstyles.error}>{errors.newPassword}</Text>
            ):(null)}
        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Confirm Password</Text>
          </View>
          <TextInput keyboardType='default'
           secureTextEntry={true} 
           style={styles.inputField}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}>
            </TextInput>
            {touched.confirmPassword && errors.confirmPassword?(
              <Text style={bbstyles.error}>{errors.confirmPassword}</Text>
            ):(null)}
        </View>

              {isSubmitting?(
        <TouchableOpacity style={styles.loginBtn}>
          <ActivityIndicator size={24} color='#fff'/>
        </TouchableOpacity>
              ):(
        <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
          <View><Text style={styles.loginText}>Update Password</Text></View>
        </TouchableOpacity>
              )}
       
        
        </>
        )}
        </Formik>
        
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
  )
}

export default ChangePassword

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
     paddingVertical:30  
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
   marginBottom:40
 },
 formgroup:{
   marginBottom:20,
 },
 labelWrapper:{
   display:'flex',
   flexDirection:'row',
   alignItems:'center', 
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
 },
 loginBtn:{
    paddingVertical:10,
    paddingHorizontal:10,
    width:Dimensions.get('window').width-60,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:30,
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
 }
   
});