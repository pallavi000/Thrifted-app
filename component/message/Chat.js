import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image, Dimensions, TextInput} from 'react-native'
import React from 'react'
import { Raleway_400Regular, Raleway_500Medium } from '@expo-google-fonts/raleway'
import {Feather, Octicons, Ionicons ,Fontisto} from '@expo/vector-icons'

export default function Chat() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
        <View style={styles.container}>
        <ScrollView> 
            <View style={styles.messageContainer}>
                <View style={styles.dFlex}>
                    <Image source={require('../../assets/user.png')} style={styles.image}></Image>
                    <Text style={styles.message}>Are you still travelling?</Text>
                </View>

                <View style={[styles.dFlex, styles.sender]}>
                <Text style={styles.senderMessage}>Are you still travelling?</Text>
                    {/* <Image source={require('../../assets/user.png')} style={styles.image}></Image> */}
                </View>
            </View>
            </ScrollView>
            <View style={styles.chatWrapper}>
                <View>
                    <Feather name='smile' size={20}></Feather>
                </View>
                <View style={{flexGrow:1,marginHorizontal:15}}>
                    <TextInput style={styles.messageInput} 
                    keyboardType='default'
                    placeholder='Start typing...'
                    ></TextInput>
                </View>
                <View style={styles.messageSend}>
               
                <Ionicons name='at-sharp' size={20} color="#3D3D3D" style={styles.hash}/>
                   <Ionicons name='send-outline' size={20} color="#3D3D3D"></Ionicons>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    messageContainer:{
        paddingHorizontal:10,
        paddingVertical:10,
        height:Dimensions.get('window').height-200,
    },
    dFlex:{
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        height:50,
        width:50,
        borderRadius:25,
        
    },
    message:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:'Raleway_500Medium',
        backgroundColor:'#E4E4E4D4',
        padding:10,
        paddingHorizontal:20,
        borderRadius:15,
        borderBottomLeftRadius:0,
        marginLeft:10

    },
    senderMessage:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:'Raleway_500Medium',
        backgroundColor:'#E4E4E4D4',
        padding:10,
        paddingHorizontal:20,
        borderRadius:15,
        borderBottomRightRadius:0,
        marginRight:10,
        backgroundColor:'#663399',
        color:'white'
    },
   
    sender:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
        marginVertical:20,
        
    },
    chatWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:5,
        paddingHorizontal:20,
        borderTopColor:'#E5E5EA',
        borderTopWidth:1,
        height:60

    },
    messageSend:{
        flexDirection:'row'
    },
    hash:{
     
        marginRight:10
    },
    messageInput:{
        height:40,
        color:'#666668',
        fontFamily:"Raleway_400Regular"
    }
   
})