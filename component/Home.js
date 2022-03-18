import React,{useEffect,useState} from 'react'
import { View,StyleSheet,Button } from 'react-native'
import {navigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Permission from 'expo-permissions'
import * as Notifications from 'expo-notifications'
 function Home({navigation}) {

    useEffect(()=>{
        // pushNotification()
        
    },[])

//     const pushNotification = async ()=>{
//         const permission = await Permission.getAsync(Permission.NOTIFICATIONS)
//         if(!permission.granted){
//             const permission = await Permission.askAsync(Permission.NOTIFICATIONS)
//         }

//         if(!permission.granted)return

//         const token = (await Notifications.getExpoPushTokenAsync()).data

//         console.log(token)
//     }

// const showNotification = ()=>{
//     Notifications.presentNotificationAsync({
//         title:'congratulations',
//         body:'test hello',
//         data:{
//             _displayInForeground:true
//         }
//     })
// }


    return (
        <View style={styles.container}>

         <Button style={styles.button} title="Login" onPress={()=>navigation.navigate('login')}/>
          <Button style={styles.button} title="SignUp" onPress={()=>navigation.navigate('register')}/>
          <Button  style={styles.button} title="test" onPress={()=>showNotification()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'skyblue',
        padding:20,
    }

})

export default Home
