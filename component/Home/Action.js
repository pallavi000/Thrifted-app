import { StyleSheet, Text, View ,TextInput,Image,TouchableOpacity,Button, FlatList} from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { AuthContext } from '../Context'
import { imageLink } from '../ImageLink'
import { Raleway_500Medium } from '@expo-google-fonts/raleway'
// import { SliderBox } from "react-native-image-slider-box";


export default React.memo(function Action(props) {
    const[comment,setComment] = useState('')
    const[like,setLike]= useState(false)
    const {navigation} = props
    const[item,setItem] = useState(props.product)

    const data = useContext(AuthContext)
    const {token,decode} = data
    const config = {
        headers: {
            'access-token':token
        }
    }

    useEffect(()=>{
        if(props.product?.likes.find(like=>like.user_id==decode._id)){
            setLike(true)
        }
    },[])
  

    async function addLike(){
        try {
            const data={
                action:like?'unlike':'like'
            }
            const response = await axios.post('/post/like/post/'+props.product._id,data,config)
            setLike(!like)
            if(like){
                
                setItem({...item,likes_count:item.likes_count-1})

            }else{
                setItem({...item,likes_count:item.likes_count+1})

            }
            console.log(response.data)
            
        } catch (error) {
            console.log(error.request.response)
        }
    }   
    
    function parseImages(image, images){
        var arr=[imageLink+image]
        images.forEach(image => {
            arr.push(imageLink+image)
        });
        return arr
    }

  return (
      <>
    
    <TouchableOpacity  onPress={()=>navigation.navigate('Product Detail',item)}>
          <View style={styles.productWrapper} key={item._id}>
            <TouchableOpacity onPress={()=>navigation.navigate('My Closet',item.seller_id)} style={styles.userWrapper}>
               <Image style={styles.userimage} source={{uri:imageLink+item.seller_id?.image}}></Image> 
               <Text style={styles.username}>{item.seller_id?.name}</Text>   
            </TouchableOpacity>
            </View>
            </TouchableOpacity>
            <View style={styles.productWrapper}>

            <View style={styles.product}>
                <Image style={styles.productImage} source={{uri:imageLink+item.image}}></Image>

                {/* <SliderBox
                images={parseImages(item.image, item.feature_image)}
                ImageComponentStyle	= {styles.productImage}
                dotColor="#663399"
                imageLoadingColor="#663399"
                onCurrentImagePressed={()=>navigation.navigate('Product Detail',item)}
                /> */}
                <View style={styles.productreview}>
                <TouchableOpacity onPress={()=>addLike()} style={{marginRight:5}}>
                {like?(
                    <MaterialCommunityIcons name='cards-heart' size={25} color='red'></MaterialCommunityIcons>
                ):(
                    <MaterialCommunityIcons name='heart-outline' size={25} color='black'></MaterialCommunityIcons>
                )}
                </TouchableOpacity>
                
                {/* <View>
                <Image source={require('../../assets/icons/Shop.png')} style={styles.smallIcon}/>
                </View> */}
                
                <TouchableOpacity  onPress={()=>navigation.navigate('Comments',item._id)}>
                    <Image source={require('../../assets/icons/Comment.png')} style={styles.smallIcon}/>
                </TouchableOpacity>

                <View>
                    <Image source={require('../../assets/icons/Share.png')} style={styles.smallIcon}/>
                </View>
                
                </View>
                <View  style={styles.typeWrapper}>
                    <Text style={styles.productname}>{item.likes_count} Likes</Text>
                </View>
                
                <TouchableOpacity onPress={()=>navigation.navigate('Product Detail',item)}>
                <View style={styles.typeWrapper}> 
                    <View><Text style={styles.productname} numberOfLines={1}>{item.name}</Text></View> 
                    <View><Text style={styles.type}>{item.type}</Text></View> 
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.price}>Rs. {item.price}</Text><Text>|</Text><Text style={styles.size}>Size: {item.size_id?.name}</Text><Text>|</Text><Text style={styles.brand}>{item.brand_id?.name}</Text>
                </View>  
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=>navigation.navigate('Comments',item._id)} style={styles.typeWrapper}>
                    <Text style={styles.viewComment}>View All {item.comments_count} Comments</Text>
                </TouchableOpacity>
            </View>
            </View>
           
           
                </>
  )
})

const styles = StyleSheet.create({
    productreview:{
    paddingVertical:10,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10
},
viewComment:{
fontSize:13,
fontWeight:'500',
fontFamily:"Raleway_500Medium",
color:'rgba(0, 0, 0, 0.5)'
},
    smallIcon: {
        height: 25,
        width: 25,
        marginRight: 5
    },
    activeIcon:{
        height: 25,
        width: 25,
        marginRight: 5,
        color:'red'   
    },
    productWrapper:{
        marginBottom:20
        
    },
    userWrapper:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
       paddingHorizontal:5,
       paddingVertical:10,
    },
    userimage:{
        height:34,
        width:34,
        borderWidth:2,
        borderColor:'rebeccapurple',
        padding:5,
        borderRadius:17
    },
    username:{
        fontSize:16,
        textTransform:'capitalize',
        marginLeft:6

    },
    product:{

    },
    productImage:{
        height:400,
        width:'100%',
        resizeMode:'cover'
        
    },
    typeWrapper:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
       
        marginBottom:5

    },
    detailWrapper:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:15,
        paddingHorizontal:10
    },
    productname:{
        fontSize:16,
        fontWeight:'600',
        textTransform:'capitalize',
        width:180
    },
    type:{
        fontSize:14,
        paddingHorizontal:9,
        paddingVertical:1,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ddd',
        textTransform:'capitalize'
      
    },
    price:{
        fontSize:15,
        fontWeight:'bold',
        marginRight:5
    },
    size:{
        fontSize:15,
        marginHorizontal:5
    },
    brand:{
          fontSize:15,
        marginLeft:5
    },
    productreview:{
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    reviewicon:{
       
        marginRight:10
    }
    

})