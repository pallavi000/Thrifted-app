import { SafeAreaView, ScrollView, StyleSheet, Text, View,Image, FlatList,TouchableOpacity,TextInput, Keyboard, Alert } from 'react-native'
import React,{useContext, useRef, useState} from 'react'
import { imageLink } from '../ImageLink'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { format } from 'timeago.js'
import { AuthContext } from '../Context'
import axios from 'axios'

export default function Comment({navigation, route}) {
    const[newComment,setNewComment] = useState('')
    
    const[comments,setComments]= useState([])
    const post_id = route.params
    
    const data = useContext(AuthContext)
    const {decode,token,titleShown,setTitleShown,userImage} = data
    const config = {
        headers: {
            'access-token':token
        }
    }

    async function getComments() {
        try {
            const response = await axios.get('/post/comment/post/'+post_id, config)
            setComments(response.data)
        } catch (error) {
            Alert.alert('Error', error.request.response)
        }
    }

    React.useEffect(()=>{
        getComments()
        
    },[navigation])

    

    

    async function addLike(comment){
        try {
            var data={
               action:isLiked(comment)?'unlike':'like'
            }
            var response = await axios.post('/post/like/comment/'+comment._id,data,config)
            var newcomments = [...comments]
            var singleComment = newcomments.find(com=>com._id== comment._id)
            if(isLiked(comment)){
                singleComment.likes= singleComment.likes.filter(like=>like.user_id!=decode._id)
                singleComment.likes_count-= 1
            }else{
                singleComment.likes = [...singleComment.likes,{user_id:decode._id}]
                singleComment.likes_count+= 1

            }
            setComments(newcomments)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    function isLiked(comment){
       var like =  comment.likes.find(like=>like.user_id==decode._id)
       if(like){
           return true
       }else{
           return false
       }
    }

    async function addComment(){
        if(newComment.trim().length==0) return
        Keyboard.dismiss()
        setNewComment('')
        try {
            const data={
                comment:newComment
            }
            const response = await axios.post('/post/comment/post/'+post_id,data,config)
            setComments([...comments,response.data])
        } catch (error) {
            console.log(error.request.response)
        }
    }
   
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    
     <FlatList data={comments}
     contentContainerStyle={{padding: 20}}
     keyExtractor={item=>item._id}
     renderItem={({item})=>(
        <View style={styles.mainWrapper} >
            <View style={styles.wrapper}>
                <View style={{alignSelf:'flex-start'}}>
                    <Image source={{uri:imageLink+item.user?.image}} style={styles.image}></Image>
                </View>
                <View style={{flex:1,paddingHorizontal:10}}>
                        <Text><Text style={styles.name}>{item.user?.name}</Text>  <Text  style={styles.comment}>{item.comment}</Text></Text>
                    <View style={styles.timeWrapper}>
                        <Text style={styles.time}>{format(item.createdAt)}</Text><Text style={styles.time}>{item.likes_count} likes</Text>
                    </View>
                </View>
            </View>
           
            <TouchableOpacity onPress={()=>addLike(item)}>
            {isLiked(item)?(
                <MaterialCommunityIcons name='cards-heart' size={10} color='red'></MaterialCommunityIcons>
            ):(
                <MaterialCommunityIcons name='heart-outline' color={'black'} size={10}></MaterialCommunityIcons>
            )}
            </TouchableOpacity>
         </View>
     )}
         
    />
    <View style={styles.addcomment}>
    <View>
    <Image source={{uri:imageLink+userImage}} style={styles.image}></Image>
    </View>
    <View style={{flex: 1}}>
        <TextInput
        keyboardType='default'
        onChangeText={(text)=>setNewComment(text)}
        value={newComment}
        style={styles.input}
        returnKeyLabel='Send'
        placeholder="Write a comment..."
        onSubmitEditing={()=>addComment()}
        ></TextInput>
    </View>
    {newComment.trim()?(
        <TouchableOpacity onPress={()=>addComment()}>
    <Text style={styles.post}>Post</Text>

    </TouchableOpacity>
    ):(
        <TouchableOpacity >
        <Text style={[styles.post,{opacity:0.5}]}>Post</Text>
        </TouchableOpacity>
    )}
    


    </View>
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    mainWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:15,
    },
    image:{
        height:36,
        width:36,
        borderRadius:18,
        resizeMode:'cover',
        marginTop:2
    },
    name:{
        fontSize:14,
        fontWeight:'700',
        fontFamily:"Raleway_700Bold",
        marginRight:10,
    },
    comment:{
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        flexWrap: 'wrap',
        flex:1,
        lineHeight: 16
    },
    time:{
        fontSize:10,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color: 'rgba(0, 0, 0, 0.5)',
        marginRight:10
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    timeWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:5  
    },
    addcomment:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
        paddingHorizontal: 10,
        bottom: 0,
        height: 60
    },
    input: {
        height:40,
        color:'#666668',
        fontFamily:"Raleway_400Regular",
        flex: 1,
        marginHorizontal:10,
    },
    post:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color:'#663399'
    }
})