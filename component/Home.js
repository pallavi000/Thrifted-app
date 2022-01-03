import React,{useEffect,useState} from 'react'
import { View,StyleSheet,Button } from 'react-native'
import {navigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

 function Home({navigation}) {


    return (
        <View style={styles.container}>

         <Button style={styles.button} title="Login" onPress={()=>navigation.navigate('login')}/>
          <Button style={styles.button} title="SignUp" onPress={()=>navigation.navigate('register')}/>
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
