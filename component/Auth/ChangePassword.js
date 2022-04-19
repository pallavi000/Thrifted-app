import { ScrollView, StyleSheet,Dimensions, Text, View,TouchableOpacity,TextInput, SafeAreaView } from 'react-native'
import React,{useState,useContext} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts,Raleway_700Bold,Raleway_800ExtraBold,Raleway_600SemiBold  } from '@expo-google-fonts/raleway';
import { AuthContext } from '../Context';
import axios from 'axios';
import bbstyles from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangePassword = (navigation) => {
    const [newPassword,setNewPassword] = useState('')
    const [currentPassword,setCurrentPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const[error,setError] = useState('')
    const {setIsLoggedIn} = useContext(AuthContext)



  return (
    <ScrollView style={{height:Dimensions.get('window').height}}>
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <View style={styles.loginForm}>
      <Text style={styles.login}>Change Password</Text>
        {error?(
          <Text style={bbstyles.alertDanger}>{error}</Text>
        ):(null)}
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label} >Current Password</Text>
          </View>
          <TextInput keyboardType='default' secureTextEntry={true} style={styles.inputField} onChangeText={(text)=>setCurrentPassword(text)} ></TextInput>
        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>New Password</Text>
          </View>
          <TextInput keyboardType='default'  onFocus={()=>{}} style={styles.inputField} secureTextEntry={true} onChangeText={(text)=>setNewPassword(text)}></TextInput>

        </View>
        <View style={styles.formgroup}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Confirm Password</Text>
          </View>
          <TextInput keyboardType='default'  onFocus={()=>{}} style={styles.inputField} secureTextEntry={true} onChangeText={(text)=>setConfirmPassword(text)}></TextInput>

        </View>
       
        <TouchableOpacity>
          <View><Text style={styles.loginBtn}>Update Password</Text></View>
        </TouchableOpacity>
        
      </View>
      </View>
      </ScrollView>
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
        paddingTop:50  
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
      marginBottom:30
    
    },
    formgroup:{
      marginBottom:20,
      borderBottomColor:'#c4c4c4',
     borderBottomWidth:1,
    
   
    },
    labelWrapper:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      marginBottom:5
    },
    label:{
      fontSize:15,
      fontWeight:'600',
      fontFamily:'Raleway_700Bold',
      color:'#868686',
      marginLeft:5,
     
    },
    inputField:{
      paddingVertical:7,
      paddingHorizontal:10
      
    },
    forgot:{
      fontSize:15,
      fontWeight:'600',
      fontFamily:'Raleway_600SemiBold',
      color:'#663399',
      marginTop:10
   
    },
    loginBtn:{
     fontWeight:'700',
     fontSize:20,
     color:'white',
     paddingVertical:20,
     paddingHorizontal:50,
     backgroundColor:'#663399',
     borderRadius:10,
     marginTop:70,
     textAlign:'center',
     fontFamily:'Raleway_700Bold',
     
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