import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,FlatList, Dimensions, TextInput, Alert, Platform, KeyboardAvoidingView, ActivityIndicator,TouchableWithoutFeedback, Pressable, Keyboard, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect,useRef,useState } from 'react'
import { Raleway_400Regular, Raleway_500Medium } from '@expo-google-fonts/raleway'
import {Feather, Octicons, Ionicons ,Fontisto, FontAwesome} from '@expo/vector-icons'
import axios from 'axios'
import { AuthContext } from '../Context'
import bbstyles from '../Styles'
import {format} from 'timeago.js'
import { imageLink } from '../ImageLink'
// import Emoticons from 'react-native-emoticons';


export default function Chat({route,navigation}) {
    const[messages,setMessages] = useState([])
    const[message, setMessage] = useState()
    const[loader,setLoader] = useState(true)
    const messageInput = useRef(null)
    const flatListRef = useRef(null)
    const[showTimer,setShowTimer] = useState(0)
    const[showEmoji,setShowEmoji] = useState(false)

    
    
    const receiver = route.params
    navigation.setOptions({
        title:receiver.user.name,
        headerTitle: () => (
            <View style={{flexDirection: 'row',alignItems:'center',marginLeft:-30}}>
                <Image source={{uri: imageLink+receiver.user.image}} style={{height: 30,width:30,borderRadius:15}}></Image>
                <Text style={{marginLeft: 10,fontSize:18,fontWeight:'700',}}>{receiver.user.name}</Text>
            </View>
        ),
        headerRight: () => (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 60
            }}>
                <TouchableOpacity onPress={()=>videoCall()}>
                    <FontAwesome name='video-camera' size={20}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>call()}>
                    <Ionicons name='call' size={20}/>
                </TouchableOpacity>
            </View>
        )
    })

    function videoCall() {
        Alert.alert("Oops!!", "Feature not yet enabled.")
    }
    function call() {
        Alert.alert("Oops!!", "Feature not yet enabled.")
    }

    const data = useContext(AuthContext)
    const {token,decode,unreadMessage, setUnreadMessage} = data

    const config = {
        headers: {
          'access-token':token
        }
      } 

    useEffect(()=>{
        getMessages()
    },[])

   async function getMessages(){
        try {
            const response = await axios.get('/chat/message/'+receiver.conversation._id,config)
            setMessages(response.data)
            setLoader(false)
            setUnreadMessage(unreadMessage-receiver.conversation.unread_count)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    async function sendMessage() {
        try {
            Keyboard.dismiss()
            messageInput.current.clear()
            setMessage()
            const data = {
                sender_id: decode._id,
                receiver_id: receiver.user._id,
                fromMe: true,
                message: message,
            }
            const response = await axios.post('/chat/message/'+receiver.conversation._id, data, config)
            console.log(response.data)
            setMessages([...messages, response.data])
        } catch (error) {
            Alert.alert('Error', error.request.response)
        }
    }

    function changeShowTimer(id) {
        setShowTimer(id)
    }

    function emojiIconPress() {
        Keyboard.dismiss()
        setShowEmoji(!showEmoji)
    }


  return (
      
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    {/* <Emoticons
     onEmoticonPress={(emoji)=>setMessage(message+emoji.code)}
     onBackspacePress={()=>setShowEmoji(false)}
     show={showEmoji}
     concise={true}
     showHistoryBar={true}
     showPlusBar={false}
 /> */}
    
    <KeyboardAvoidingView
    keyboardVerticalOffset={-500}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
<>
    {loader ? (
                <View style={bbstyles.loaderContainer}>
                    <ActivityIndicator size={'large'} color='#663399'/>
                </View>
            ):(
            <FlatList data = {messages}
            contentContainerStyle={{padding: 10}}
            keyExtractor={(item)=>item._id}
            ref={flatListRef}
            onContentSizeChange={()=>flatListRef.current.scrollToEnd({animated:true})}
            renderItem={({item})=>(
             item.sender_id!=decode._id?(
                <View style={styles.dFlex}>
                    <Image source={{uri: imageLink+receiver.user.image}} style={styles.image}></Image>
                    <Pressable onPress={()=>changeShowTimer(item._id)} style={[styles.dFlex, styles.self]}>
                    <View style={{flexGrow:1}}>
                        <Text style={styles.message}>{item.message}</Text>
                        {showTimer==item._id?(
                            <Text style={styles.sentTime}>{format(item.updatedAt)}</Text>
                        ):(null)}
                    </View>
                    </Pressable>
                </View>
             ):(
                <Pressable onPress={()=>changeShowTimer(item._id)} style={[styles.dFlex, styles.sender]}>
                    <View style={{flexGrow:1}}>
                        <Text style={styles.senderMessage}>{item.message}</Text>
                        {showTimer==item._id?(
                            <Text style={styles.sentTime}>{format(item.updatedAt)}</Text>
                        ):(null)}
                    </View>
                </Pressable>
             )
            )}
            />     
            )}

    <View style={styles.chatWrapper}>
        <TouchableOpacity onPress={()=>emojiIconPress()}>
            <Feather name='smile' size={20}></Feather>
        </TouchableOpacity>
        <View style={{flexGrow:1,marginHorizontal:15}}>
            <TextInput style={styles.messageInput} 
            keyboardType='default'
            placeholder='Start typing...'
            ref={messageInput}
            value={message}
            onChangeText={(text)=>setMessage(text)}
            ></TextInput>
        </View>
        <View style={styles.messageSend}>
        
        <Ionicons name='at-sharp' size={20} color="#3D3D3D" style={styles.hash}/>
        {message?(
            <TouchableWithoutFeedback onPress={()=>sendMessage()}>
                <Ionicons name='send-outline' size={20} color="#3D3D3D"></Ionicons>
            </TouchableWithoutFeedback>
        ):(
            <Ionicons name='send-outline' size={20} color="#8E8E93"></Ionicons>
        )}
        </View>
    </View>
        </>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    messageContainer:{
        paddingHorizontal:10,
        paddingBottom: 10,
        height: Dimensions.get('window').height-140,
    },
    dFlex:{
        flexDirection:'row',
        alignItems:'center'
    },
    sentTime: {
        textAlign: 'right',
        paddingHorizontal: 10,
        fontSize: 10,
        color: '#8E8E93'
    },
    image:{
        height:40,
        width:40,
        borderRadius:25,
    },
    message:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:'Raleway_500Medium',
        backgroundColor:'#E4E4E4D4',
        padding:10,
        paddingHorizontal:20,
        paddingLeft: 10,
        borderRadius:15,
        borderBottomLeftRadius:0,
        marginLeft:10,
        maxWidth: '70%',
        alignSelf: 'flex-start'
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
        paddingLeft: 10,
        backgroundColor:'#663399',
        color:'white',
        maxWidth: '90%',
        alignSelf: 'flex-end',
        flexGrow:1
    },
    self: {
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginVertical:5,
    },
    sender:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
        marginVertical:5,
    },
    chatWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:5,
        paddingHorizontal:20,
        borderTopColor:'#E5E5EA',
        borderTopWidth:1,
        height:60,
        bottom: 0,
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
        fontFamily:"Raleway_400Regular",
        width: Dimensions.get('window').width-130
    }
   
})