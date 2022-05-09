import { StyleSheet, Text, View, SafeAreaView, ScrollView ,Image ,TextInput,TouchableOpacity } from 'react-native'
import React, { useEffect,useContext,useState } from 'react'
import {Ionicons} from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_500Medium } from '@expo-google-fonts/raleway'
import axios from 'axios'
import { AuthContext } from '../Context'
import { FlatList } from 'react-native-gesture-handler'
import { imageLink } from '../ImageLink'

export default function Messages({navigation}) {

    navigation.setOptions({
        headerRight:()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('New Chat')}>
            <Ionicons name='add' size={20}></Ionicons>
            </TouchableOpacity>
        )
    })

    const data = useContext(AuthContext)
    const {token,decode} = data
    const[chats,setChats]= useState([])

    const config = {
        headers: {
          'access-token':token
        }
      } 

useEffect(()=>{
    getMessage()
},[])

async function getMessage(){
    try {
        const response = await axios.get('/chat/conversation',config)
        console.log(response)
        setChats(response.data)
    } catch (error) {
        console.log(error.request.response)
    }
}


async function startChat(conversation){
   if(decode._id == conversation.sender_id._id){
    const receiver = {
        user: conversation.receiver_id,
        conversation: conversation
    }
    navigation.navigate('chat',receiver)
   }else{
    const receiver = {
        user: conversation.sender_id,
        conversation: conversation
    }
    navigation.navigate('chat',receiver)
   }
    
}


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons  style={styles.searchIcon} name="search" size={20} color="#979797"></Ionicons>
                <TextInput style={styles.searchText}
                keyboardType="default"
                placeholder="Search"
                ></TextInput>
            </View>
            <FlatList data={chats}
            keyExtractor= {item=>item._id}
            renderItem={({item})=>(
            <TouchableOpacity style={[styles.dFlex, styles.marginTop]} onPress={()=>startChat(item)}>
                <View style={styles.userWrapper}>
                    <View style={styles.ImageWrapper}>
                        <Image source={{uri:imageLink+decode._id==item.sender_id._id?item.receiver_id.image:item.sender_id.image}} style={styles.image}></Image>
                    </View>
                    <View style={styles.userDetailwrpper}>
                        <Text style={styles.name}>{decode._id==item.sender_id._id?item.receiver_id.name:item.sender_id.name}</Text>
                        <Text style={styles.userMessage}>Hi, I'm pallavi</Text>
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    <Text style={styles.activeIndicator}></Text>
                    <Text style={styles.activeStatus}>now</Text>
                </View>
            </TouchableOpacity>
            )}
            ></FlatList>
        </View>
        <View >
        </View>
        </ScrollView>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    searchContainer:{
        padding:10,
        backgroundColor:'#7676801F',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10
    },
    searchText:{
        color:'#979797',
        fontSize:16,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        marginLeft:8,
        height:25,
        flexGrow:1
    },
    dFlex:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    marginTop:{
        marginTop:20
    },
    userWrapper:{
        flexDirection:'row',
       alignItems:'center'
    },
    image:{
        height:56,
        width:56,
        resizeMode:'cover',
        borderRadius:28,
        borderColor:'#C7C7CC',
        borderWidth:0.4
    },
    ImageWrapper:{
        height:64,
        width:64,
        borderRadius:32,
        borderWidth:0.4,
        borderColor:'#C7C7CC',
        marginRight:10,
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:"Raleway_500Medium",
        marginBottom:8
    },
    userMessage:{
        fontSize:12,
        fontWeight:'400',
        fontFamily:"Raleway_400Regular"
    },
    activeStatus:{
        fontSize:12,
        fontWeight:'400',
        fontFamily: 'Raleway_400Regular',
        color:'rgba(0, 0, 0, 0.4)'
    },
    statusWrapper:{
        justifyContent:'center',
        alignItems:'center'
    },
    activeIndicator:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#4CD964'
    },
    offlineIndicator:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#FF2424' 
    }

})