import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,FlatList, Dimensions, TextInput, Alert, Platform, KeyboardAvoidingView, ActivityIndicator,TouchableWithoutFeedback, Pressable} from 'react-native'
import React, { useContext, useEffect,useRef,useState } from 'react'
import { Raleway_400Regular, Raleway_500Medium } from '@expo-google-fonts/raleway'
import {Feather, Octicons, Ionicons ,Fontisto} from '@expo/vector-icons'
import axios from 'axios'
import { AuthContext } from '../Context'
import bbstyles from '../Styles'
import {format} from 'timeago.js'


export default function Chat({route,navigation}) {
    const[messages,setMessages] = useState([])
    const[message, setMessage] = useState()
    const[loader,setLoader] = useState(true)
    const messageInput = useRef(null)
    const flatListRef = useRef(null)
    const[showTimer,setShowTimer] = useState(0)

    
    
    const receiver = route.params
    navigation.setOptions({
        title:receiver.user.name
    })

    const data = useContext(AuthContext)
    const {token,decode} = data

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
        } catch (error) {
            console.log(error.request.response)
        }
    }

    async function sendMessage() {
        try {
            messageInput.current.clear()
            setMessage()
            const data = {
                sender_id: decode._id,
                receiver_id: receiver.user._id,
                fromMe: true,
                message: message,
            }
            const response = await axios.post('/chat/message/'+receiver.conversation._id, data, config)
            setMessages([...messages, response.data])
        } catch (error) {
            Alert.alert('Error', error.request.response)
        }
    }

    function changeShowTimer(id) {
        setShowTimer(id)
    }


  return (
      
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
        <View style={styles.container}>
            
            
            <View style={styles.messageContainer}>
            
            {loader ? (
                <View style={bbstyles.loaderContainer}>
                    <ActivityIndicator size={'large'} color='#663399'/>
                </View>
            ):(
            <FlatList data = {messages}
            keyExtractor={(item)=>item._id}
            ref={flatListRef}
            onContentSizeChange={()=>flatListRef.current.scrollToEnd({animated:true})}
            renderItem={({item})=>(
             !item.fromMe?(
                <View style={styles.dFlex}>
                    <Image source={require('../../assets/user.png')} style={styles.image}></Image>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
             ):(
                <Pressable onPress={()=>changeShowTimer(item._id)} style={[styles.dFlex, styles.sender]}>
                    <View>
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

            </View>

            <View style={styles.chatWrapper}>
                <View>
                    <Feather name='smile' size={20}></Feather>
                </View>
                <View style={{flexGrow:1,marginHorizontal:15}}>
                
                    <TextInput style={styles.messageInput} 
                    keyboardType='default'
                    placeholder='Start typing...'
                    ref={messageInput}
                    onChangeText={(text)=>setMessage(text.trim())}
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
        </View>
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
        marginLeft:10,
        width: '90%'
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
        color:'white',
        maxWidth: '90%'
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