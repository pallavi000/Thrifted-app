import React, { useContext, useState,useEffect } from 'react'
import { View, Text,Image, StyleSheet, ScrollView,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import axios from 'axios'
import { AuthContext } from './Context'
import bbstyles from './Styles'
import { imageLink } from './ImageLink'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import * as imagePicker from 'expo-image-picker'
import { DEFAULT_ICON_SIZE } from '@expo/vector-icons/build/createIconSet'



export default function MyCloset({navigation}) {

    const[products,setProducts] = useState([])
    const[users,setUsers] = useState([])
    

    
    

    const data = useContext(AuthContext)
    const {decode} = data
    const {token} = data


     const config = {
        headers:{
            'access-token': token
        }
    }


    useEffect(() => {
        axios.get('/frontend/closet/'+decode._id).then(response=>{
            console.log(response.data)
            setProducts(response.data.product)
            setUsers(response.data.user)
        }) 
    }, [])






    async function avatarImage(){
 
     const {granted} = await imagePicker.getMediaLibraryPermissionsAsync()
    if(!granted){
        alert("Permission denied")
    }else{
     const result = await imagePicker.launchImageLibraryAsync()
        if(!result.cancelled){

           const data = {
              image:result.uri
           }
           axios.post('/user/change/avatar',data,config).then(response=>{
               console.log(response.data)
              const avatarUser =  {...users,image:response.data}
              setUsers(avatarUser)
         
           }).catch(err=>{
               console.log(err.request.response)
           })
        }

    }

    

    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.line}>
            <View  style={styles.product} >
                <View style={styles.productImage}>
                <TouchableOpacity onPress={()=>avatarImage()}>
                {users.image?(
                    
                 <Image source={{uri:imageLink+users.image}} style={styles.userImage}/>
                ):(
                   
                    <Image source={{uri:imageLink+'/images/camera.png'}} style={styles.userImage}/>
               )}
       

           </TouchableOpacity>
                  <Text style={styles.userName}>{users.name}</Text>
                    </View>
                  <View style={styles.productDesc}>
                      <Text style={styles.userDetail}>Posts</Text>
                      <Text style={styles.count}>{products.length}</Text>

                  </View>
                  </View>
                  <TouchableWithoutFeedback>
                    <Text style={bbstyles.secondary}>Create Product</Text>
                    </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.closet}>
                    {products.map(product=>{
                        return(
                            <TouchableOpacity style={styles.closetCard} onPress={()=>navigation.navigate('productdetail',product)}>
                            <Image source={{uri:imageLink+product.image}} style={styles.postImage}/>
                            <Text>{product.name}</Text>
                            <Text>{product.brand_id?.name}</Text>
                            <Text>Rs.{product.price}</Text>
                            <Text>Size:{product.size}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    </View>


           
        </ScrollView>
    )
}

const styles = StyleSheet.create({

container:{
    margin:20
},
closetCard:{
  flex:0.5,
  marginRight:10

},



    userImage:{
        height:100,
        width:100,
        borderRadius:50,
        textAlign:'center',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    profile:{
        margin:10, 
        display: 'flex',
        flexDirection:'row',
    },
    userName:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        textTransform:'capitalize'
    },
    imageView:{
        flex:2
    },
    detailView:{
        flex:3
    },

    product:{
        flex:1,
        flexDirection:'row',
        margin:10
    },
    productImage:{
        height:100,
        width:'100%',
        resizeMode:'contain',
        flex:1,
      alignItems:'center'
    },

    productDesc:{
        fontWeight:'500',
        fontSize:16,
        flex:3,
        marginLeft:40,
    },
    userDetail:{
        fontWeight:'bold',
        fontSize:20,
    },
    count:{
        color:'#6b6b6b',
        fontWeight:'500',
        fontSize:19,
        
    },
    line:{
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingBottom:20
    },
    postImage:{
        height:200,
        width:'100%',
        resizeMode:'cover'
    },

    closet:{
        marginTop:20,
        flexDirection:'row',
        display:'flex',
        flexWrap:'wrap',
        flex:1
    }


})
