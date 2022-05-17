import { StyleSheet, Text, View,Image ,ScrollView,SafeAreaView, FlatList,TouchableWithoutFeedback} from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../Context'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { imageLink } from '../ImageLink'
import { format } from 'timeago.js'
import LikeNotification from './LikeNotification'
import CommentNotification from './CommentNotification'
import FollowNotification from './FollowNotification'
import OrderNotification from './OrderNotification'

export default function Notification({navigation}) {
const data = useContext(AuthContext)
const[notifications,setNotifications] =useState([])
const {token,setUnreadNotification,socket} = data
const[orderNotifications,setOrderNotifications] = useState([])
const[tab,setTab] = useState('normal')
const config = {
    headers:{
        'access-token':token
    }
}

    useEffect(() => {
     getNotification()
     getOrderNotification()
     readNotification()

     socket.current.on('notification',(notification)=>{
        setUnreadNotification(prev=>prev+1)
        setNotifications(prevNotification => [notification, ...prevNotification])
        console.log(notification)
    })
    }, [])


   async function getNotification(){
       try {   
        const response = await axios.get('/notification',config)
        setNotifications(response.data)
       } catch (error) {
           console.log(error.message)
       }
    }

    async function getOrderNotification(){
        try {
            var response = await axios.get('/order-notification/order',config)
            console.log(response.data)
            setOrderNotifications(response.data)
        } catch (error) {
            
        }
    }

   async function readNotification(){
        try {
            var response = await axios.get('/notification/read',config)
            setUnreadNotification(0)
        } catch (error) {
            console.log(error.request.response)
        }
    }
    
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
        <ScrollView>
        <View style={styles.category}>
            <TouchableWithoutFeedback onPress={()=>setTab('normal')}><View><Text style={tab=='normal'?styles.normal:styles.order}>Normal</Text></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>setTab('order')}><View><Text style={tab=='order'?styles.normal:styles.order} >Orders</Text></View></TouchableWithoutFeedback>
        </View>
       {tab=='normal'?(
        <FlatList data={notifications}
       keyExtractor={(item)=>item._id}
       renderItem={({item})=>(
           item.type=='like'?(
            <LikeNotification item={item} navigation={navigation}/>
           ):item.type=='comment'?(
            <>
                <CommentNotification item={item} navigation={navigation}/>
            </>
           ):item.type=='follow'?(
               <>
                <FollowNotification item={item} navigation={navigation}/>
               </>
           ):(null)
       )}
       />
       ):(
            <FlatList data={orderNotifications}
            keyExtractor={item=>item._id}
            renderItem={({item})=>(
                <OrderNotification item={item} navigation={navigation}/>
            )}
            />
       )}
       
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontSize:15,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color:'#262626',
        paddingLeft:10,
        paddingTop:10
    },
    wrapper:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderBottomColor:'rgba(60, 60, 67, 0.18)',
        borderBottomWidth:0.5
    },
    userImage:{
        height:50,
        width:50,
        borderRadius:25,
        resizeMode:'cover',
        borderWidth:1,
        borderColor:'#c4c4c4'
        
    },
    postImage:{
        height:50,
        width:50,
        resizeMode:'cover'
    },
    detail:{
        fontSize:13,
        fontWeight:'400',
        fontFamily:"Raleway_400Regular",
        color:'#262626'


    },
    userName:{
        fontSize:13,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color:'#262626'
    },
    detailView:{
        flex:1,
        marginHorizontal:10
    },
    category:{
        borderBottomColor:'rgba(0, 0, 0, 0.2)',
        borderBottomWidth:0.4,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    normal:{
        fontSize:16,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold"
    },
    order:{
        fontFamily:"Raleway_600SemiBold",
        fontWeight:'600',
        fontSize:16,
        color:'rgba(0, 0, 0, 0.4)'
    },
    time:{
        fontSize:13,
        fontWeight:'500',
        fontFamily:"Raleway_500Medium",
        color:'rgba(0, 0, 0, 0.3)',
        marginRight:5
    },
    mention:{
        color:'#663399',
        fontSize:13,
        fontWeight:'500',
        fontFamily:"Raleway_500Medium",
    },
    replyWrapper:{
       flexDirection:'row',
       alignItems:'center',
       marginTop:10

    },
    replyText:{
        fontSize:11,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color:'rgba(0, 0, 0, 0.4)',
        marginLeft:10
    },
    message:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color:'#262626',
        paddingHorizontal:10,
        paddingVertical:5,
        borderWidth:1,
        borderColor:'rgba(60, 60, 67, 0.18)',
        borderRadius:5

    }
})