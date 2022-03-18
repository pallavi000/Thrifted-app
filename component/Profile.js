import React,{useEffect,useState} from 'react'
import { Text, View,StyleSheet,TouchableWithoutFeedback } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import bbstyles from './Styles'

function Profile({navigation}) {
    const[user,setUser] = useState([])

   async function ProfileScreen(){

      
        const config = {
            headers:{
                'access-token': await AsyncStorage.getItem('token')
            }
        }

        console.log(config)
        axios.get('/user/currentuser',config).then(response=>{
            console.log(response.data)
            setUser(response.data.user)
        }).catch(err=>{
            console.log(err.request.response)
        })
    }


    useEffect(() => {
        console.log('profile')
        ProfileScreen()
    }, [])


    return (
       <View style={[styles.container, bbstyles.bgWhite]}>
        <Text style={bbstyles.h1}>My Profile</Text>
        <View style={styles.profileText}>
            <Text style={styles.header}>Name</Text>
            <Text style={styles.valueName}>{user.name}</Text>
        </View>
        <View style={styles.profileText} >
            <Text style={styles.header}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.profileText}>
            <Text style={styles.header}>Available Balance</Text>
            <Text style={styles.value}>{user.balance}</Text>
        </View>

        <TouchableWithoutFeedback onPress={()=>navigation.navigate('editAddress')} >
            <Text style={bbstyles.buyNow}>Edit Info</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={()=>navigation.navigate('changepassword')} >
         <Text style={bbstyles.btnPrimary}>Change Password</Text>
        </TouchableWithoutFeedback>

       </View>
    )
}


const styles = StyleSheet.create({
    profileText:{
        margin:15,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingBottom:20
    },

  

    header:{
        fontSize:17,
        fontWeight:'600',
        marginBottom:5
    },
    valueName:{
        fontSize:16,
        fontWeight:'500',
        color:'#6b6b6b',
        textTransform:'capitalize'
    },
    value:{
        fontSize:16,
        fontWeight:'500',
        color:'#6b6b6b',
    },
    container:{
        margin:15
    }

})

export default Profile


