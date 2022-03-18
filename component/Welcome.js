import React,{useEffect,useState,usestate} from 'react'
import { Image, StyleSheet, Text, ListView,TouchableOpacity,Dimensions, TouchableWithoutFeedback, View } from 'react-native'
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import bbstyles from './Styles'
import { imageLink } from './ImageLink'
import Carousel from 'react-native-banner-carousel';

export default function Welcome({navigation}) {
    
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
       <ScrollView  style={bbstyles.bgWhite}>
         <ScrollView   horizontal={true} showsHorizontalScrollIndicator={false} style={styles.wrapper}>
          {categories.map(category=>{
              return(
                <TouchableOpacity onPress={()=>navigation.navigate('category',category)} style={styles.cateWrapper}>
                <Image style={styles.category} source={{uri:imageLink+category.image}}/>
                <Text style={styles.cateText}>{category.name}</Text>
             </TouchableOpacity>
              )
                })}
          </ScrollView>
           {products.map(product=>{
               return(
          <View style={styles.productWrapper}>
          <TouchableOpacity  onPress={()=>navigation.navigate('productdetail',product)}>
            <View style={styles.userWrapper}>
               <Image style={styles.userimage} source={{uri:'http://167.86.77.80:3000/images/1642749540268.jpg'}}></Image> 
               <Text style={styles.username}>username</Text>   
            </View>
            <View style={styles.product}>
                <Image style={styles.productImage} source={{uri:imageLink+product.image}}></Image>
                <View style={styles.typeWrapper}> 
                    <View><Text style={styles.productname} numberOfLines={1}>{product.name}</Text></View> 
                    <View><Text style={styles.type}>{product.type}</Text></View> 
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.price}>Rs. {product.price}</Text><Text>|</Text><Text style={styles.size}>Size: {product.size_id?.name}</Text><Text>|</Text><Text style={styles.brand}>{product.brand_id?.name}</Text>
                </View>   
            </View>
            </TouchableOpacity>
          </View>
                 )
          })}
       

       </ScrollView>
  );
}

const styles = StyleSheet.create({
   

     wrapper:{
        flexDirection:'row',
        marginTop:5,
        marginBottom:10
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
        borderWidth:1,
        borderColor:'lightgray',
        marginHorizontal:5,
        marginBottom:20
        
    },
    userWrapper:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
       paddingHorizontal:5,
       paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgray',


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
        paddingHorizontal:15,
        marginTop:10,
        marginBottom:5

    },
    detailWrapper:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:15,
        paddingHorizontal:15
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
    }
    

});
