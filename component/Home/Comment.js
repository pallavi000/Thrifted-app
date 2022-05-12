import { SafeAreaView, ScrollView, StyleSheet, Text, View,Image, FlatList,TouchableOpacity,TextInput } from 'react-native'
import React,{useContext, useState} from 'react'
import { imageLink } from '../ImageLink'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { format } from 'timeago.js'
import { AuthContext } from '../Context'
import axios from 'axios'

export default function Comment({route}) {
    const[newComment,setNewComment] = useState('')
    const[comments,setComments]= useState(route.params.comments)
    const data = useContext(AuthContext)
    const {decode,token} = data
    console.log(comments)

    

    const config = {
        headers: {
            'access-token':token
        }
    }

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
        
        try {
            const data={
                comment:newComment
            }
            const response = await axios.post('/post/comment/post/'+route.params._id,data,config)
            setNewComment('')
            console.log(response.data)
            setComments([...comments,response.data])
        } catch (error) {
            console.log(error.request.response)
        }
    }
   
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1,padding:20}} >
     <FlatList data={comments}
     keyExtractor={item=>item._id}
     renderItem={({item})=>(
        <View style={styles.mainWrapper} >
            <View style={styles.wrapper}>
                <View>
                    <Image source={{uri:imageLink+item.user?.image}} style={styles.image}></Image>
                </View>
                <View style={{marginLeft:10}}>
                    <View style={styles.row}>
                        <Text style={styles.name}>{item.user?.name}</Text><Text style={styles.comment}>{item.comment}</Text>
                    </View>
                    <View style={styles.timeWrapper}>
                        <Text style={styles.time}>{format(item.createdAt)}</Text><Text style={styles.time}>{item.likes_count} likes</Text>
                    </View>
                </View>
            </View>
           
            <TouchableOpacity onPress={()=>addLike(item)}>
            {isLiked(item)?(
                <MaterialCommunityIcons name='cards-heart' size={10} color='red'></MaterialCommunityIcons>
            ):(
                <MaterialCommunityIcons name='heart-outline' size={10}></MaterialCommunityIcons>
            )}
            </TouchableOpacity>
         </View>
     )}
         
    />
    <View style={styles.addcomment}>
    <View>
    <Image source={{uri:imageLink+comments[0].user?.image}} style={styles.image}></Image>
    </View>
    <View style={{flex: 1,}}>
        <TextInput
        onChangeText={(text)=>setNewComment(text)}
        value={newComment}
        style={styles.input}
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
        alignItems:'center'
        
    },
    mainWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10  
    },
    image:{
        height:36,
        width:36,
        borderRadius:18,
        resizeMode:'cover'

    },
    name:{
        fontSize:13,
        fontWeight:'700',
        fontFamily:"Raleway_700Bold",
        marginRight:10
    },
    comment:{
        fontSize:12,
        fontWeight:'400',
        fontFamily:"Raleway_400Regular"
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
        alignItems:'center'
    },
    input: {
        height:40,
        color:'#666668',
        fontFamily:"Raleway_400Regular",
        flex: 1,
        marginHorizontal:8
    },
    post:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color:'#663399'
    }
})