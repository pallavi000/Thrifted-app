import { StyleSheet, Text, View, SafeAreaView, ScrollView ,Image ,TextInput,TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect,useContext,useState, useRef } from 'react'
import {FontAwesome5, Ionicons} from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import axios from 'axios'
import { AuthContext } from '../Context'
import { FlatList } from 'react-native-gesture-handler'
import { imageLink } from '../ImageLink'
import {format} from 'timeago.js'
import { useIsFocused } from '@react-navigation/native'
import bbstyles from '../Styles'
import { io } from 'socket.io-client'


export default function Messages({navigation}) {

    const isFocused = useIsFocused()
    const [loader, setLoader] = useState(true)
    const data = useContext(AuthContext)
    const {token,titleShown,setTitleShown,decode,socket} = data
    const[chats,setChats]= useState([])
    const[originalChats, setOriginalChats] = useState([])
 
    
    const config = {
        headers: {
            'access-token':token
        }
    } 
    useEffect(()=>{
        
        socket.current.on('conversation',(conversation)=>{
            setChats(prevMessages => {
                var index = prevMessages.findIndex(message=>message._id==conversation._id)
                if(index!=-1){
                    var copy = [...prevMessages]
                    copy[index]= conversation
                    return copy
                } else {
                    return [...prevMessages, conversation]
                }
            })

        })
    },[])

    navigation.setOptions({
        title: decode.name,
        headerRight:()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('New Chat')}>
            <FontAwesome5 name='plus' size={20}/>
            </TouchableOpacity>
        )
    })

useEffect(()=>{
    getMessage()
},[isFocused])

async function getMessage(){
    try {
        const response = await axios.get('/chat/conversation',config)
        setChats(response.data)
        setOriginalChats(response.data)
        setLoader(false)
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

function getUnreadCount(conversation) {
    if(conversation.sender_id._id==decode._id) {
        return conversation.sender_id_unread_count
    }
    if(conversation.receiver_id._id==decode._id) {
        return conversation.receiver_id_unread_count
    }
    return 0
}


function getImage(item) {
    return decode._id==item.sender_id._id?imageLink+item.receiver_id.image:imageLink+item.sender_id.image
}

function getName(item) {
    return decode._id==item.sender_id._id?item.receiver_id.name:item.sender_id.name
}

function searchChats(text) {
    if(text.trim().length>0) {
        text = text.toLowerCase().trim()
      let filterChats = originalChats.filter(chat=>getName(chat).toLowerCase().includes(text))
      setChats(filterChats)
    } else {
      setChats(originalChats)
    }
}


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons  style={styles.searchIcon} name="search" size={20} color="#979797"></Ionicons>
                <TextInput style={styles.searchText}
                keyboardType="default"
                placeholder="Search"
                onChangeText={(text)=>searchChats(text)}
                ></TextInput>
            </View>
            {loader ? (
                <View style={bbstyles.loaderContainer}>
                    <ActivityIndicator size={'large'} color='#663399'/>
                </View>
            ):(
            <FlatList data={chats}
            keyExtractor= {item=>item._id}
            renderItem={({item})=>(
            <TouchableOpacity style={[styles.dFlex, styles.marginTop]} onPress={()=>startChat(item)}>
                <View style={styles.userWrapper}>
                    <View style={styles.ImageWrapper}>
                        <Image source={{uri:getImage(item)}} style={styles.image}></Image>
                    </View>
                    <View style={styles.userDetailwrpper}>
                        <Text style={styles.name}>{getName(item)}</Text>
                        <Text style={getUnreadCount(item)>0?styles.userMessageBold:styles.userMessage}>{item.last_message}</Text>
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    {getUnreadCount(item)>0?(<Text style={styles.activeIndicator}>{getUnreadCount(item)}</Text>):(null)}
                    <Text style={styles.activeStatus}>{format(item.updatedAt)}</Text>
                </View>
            </TouchableOpacity>
            )}
            ></FlatList>
            )}
        </View>
        <View >
        </View>
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
    userMessageBold: {
        fontSize: 12,
        fontFamily: "Raleway_600SemiBold"
    },
    activeStatus:{
        fontSize:12,
        fontWeight:'400',
        fontFamily: 'Raleway_400Regular',
        color:'rgba(0, 0, 0, 0.4)',
        marginTop: 10
    },
    statusWrapper:{
        justifyContent:'center',
        alignItems:'flex-end'
    },
    activeIndicator:{
        height:16,
        width:16,
        borderRadius:5,
        // backgroundColor:'#4CD964',
        backgroundColor: '#FF2424',
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        lineHeight: 16,
    },
    offlineIndicator:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#FF2424' 
    }

})