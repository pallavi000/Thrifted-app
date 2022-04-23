import React,{useEffect,useState,usestate} from 'react'
import { Image, StyleSheet, Text, ListView,TouchableOpacity,Dimensions, TouchableWithoutFeedback, View,ScrollView } from 'react-native'
import axios from 'axios'
import {Ionicons,Feather } from '@expo/vector-icons'
import bbstyles from '../Styles'
import { imageLink } from '../ImageLink'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home({navigation}) {

    const[products,setProducts] = useState([])
    const[banners,setBanners] = useState([])
    const [categories, setCategories] = useState([])
    const[sellProducts,setSellProducts] = useState([])
    const[rentProducts,setRentProducts] = useState([])

useEffect(() => {
    axios.get('/frontend/home').then(response=>{
        setProducts(response.data.product)
        setBanners(response.data.banner)
        setRentProducts(response.data.rentProduct)
        setSellProducts(response.data.saleProduct)
        setCategories(response.data.categories)
        console.log(response.data.product)


        
    })
}, [])




  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
<View  style={styles.homeNav}>
        <View style={styles.navlogo}>
                    <Ionicons name='aperture' size={30}></Ionicons>
                </View>
                <View style={styles.navcontent}>
                    <View style={styles.icons}>
                    <Ionicons name="search" size={30} ></Ionicons>
                    </View>
                    <View style={styles.icons}>
                    <Ionicons name="heart-outline" size={30}></Ionicons>
                    </View>
                    <View style={styles.icons}>
                    <Ionicons name="mail-outline" size={30}></Ionicons> 
                    </View>
                </View>
      </View>

<View style={{paddingBottom:100,backgroundColor:'white'}}>
    <ScrollView style={bbstyles.scrollHeight}>
    
   
        <View>
            <ScrollView   horizontal={true} showsHorizontalScrollIndicator={false} >
            <View style={styles.wrapper} >
          {categories.map(category=>{
              return(
                <TouchableOpacity onPress={()=>navigation.navigate('Category Nav',{screen:'Category Title'})} style={styles.cateWrapper}>
                <Image style={styles.category} source={{uri:imageLink+category.image}}/>
                <Text style={styles.cateText}>{category.name}</Text>
             </TouchableOpacity>
              )
                })}
                </View>
          </ScrollView>

          {products.map(product=>{
               return(
          <TouchableWithoutFeedback  onPress={()=>navigation.navigate('Product Detail',product)}>
          <View style={styles.productWrapper} key={product._id}>
            <TouchableOpacity onPress={()=>navigation.navigate('account',{screen:'My Closet',params:product.seller_id})} style={styles.userWrapper}>
               <Image style={styles.userimage} source={{uri:imageLink+product.seller_id?.image}}></Image> 
               <Text style={styles.username}>{product.seller_id?.name}</Text>   
            </TouchableOpacity>
            <View style={styles.product}>
                <Image style={styles.productImage} source={{uri:imageLink+product.image}}></Image>
                <View style={styles.productreview}>
                <View>
                <Feather name="heart" style={styles.reviewicon} size={25}></Feather>
                </View>
                <View>
                <Feather name="shopping-bag" style={styles.reviewicon}  size={25}></Feather>
                </View>
                <View>
                <Feather name="mail" style={styles.reviewicon}  size={25}></Feather>
                </View>
                </View>
                <View style={styles.typeWrapper}> 
                    <View><Text style={styles.productname} numberOfLines={1}>{product.name}</Text></View> 
                    <View><Text style={styles.type}>{product.type}</Text></View> 
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.price}>Rs. {product.price}</Text><Text>|</Text><Text style={styles.size}>Size: {product.size_id?.name}</Text><Text>|</Text><Text style={styles.brand}>{product.brand_id?.name}</Text>
                </View>   
            </View>
            </View>
            </TouchableWithoutFeedback>
         
                 )
          })}


        </View>
    </ScrollView>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    homeNav:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'white'

    },
    navcontent:{
        flexDirection:'row',
        alignItems:'center',
    },
    icons:{
        marginRight:10
    },
    wrapper:{
        flexDirection:'row',
        marginTop:5,
        marginBottom:10,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        paddingBottom:20

    },
    category:{
        height:70,
        width:70,
        borderRadius:35,
        borderColor:'rebeccapurple',
        borderWidth:2
    },
    cateWrapper:{
        marginHorizontal:4,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
    },
    cateText:{
        textAlign:'center',
        marginTop:4,
        textTransform:'capitalize',
        fontSize:14,
        fontWeight:'500'
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
        width:'auto',
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