import React,{useEffect,useState,usestate} from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import bbstyles from './Styles'
import { imageLink } from './ImageLink'


function Welcome({navigation}) {


    const[products,setProducts] = useState([])
    const[banners,setBanners] = useState([])
    const [categories, setCategories] = useState([])
    const[sellProducts,setSellProducts] = useState([])
    const[rentProducts,setRentProducts] = useState([])

useEffect(() => {

    axios.get('/frontend/home').then(response=>{
        console.log(response.data)
        setProducts(response.data.product)
        setBanners(response.data.banner)
        setRentProducts(response.data.rentProduct)
        setSellProducts(response.data.saleProduct)
        setCategories(response.data.categories)
    })
}, [])


    return (
        
       <ScrollView style={styles.container}>
       {banners.map(banner=>{
           return(
               banner.section=="top"?(
                <Image style={styles.banner} source={{uri:imageLink+banner.image}}/>
               ):(null)
            
           )
       })}
         
          <View style={styles.wrapper}>
          {categories.map(category=>{
              return(
                <TouchableOpacity onPress={()=>navigation.navigate('category',category)} style={styles.cateWrapper}>
                <Image style={styles.category} source={{uri:imageLink+category.image}}/>
                <Text style={styles.cateText}>{category.name}</Text>
             </TouchableOpacity>
              )
          })}
          </View>
          
          <View style={styles.productWrapper}>
          <Text style={bbstyles.h1}>New Arrival</Text>
          {products.slice(0,4).map(product=>{
              return(
                  <TouchableOpacity style={styles.product} onPress={()=>navigation.navigate('productdetail',product)}>
                  <Image source={{uri:imageLink+product.image}} style={styles.productImage}/>
                  <View style={styles.productDesc}>
                      <Text style={styles.productTitle} numberOfLines={3}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price}</Text>
                      <Text style={styles.productCategory}>{product.category}</Text>
                  </View>
                  </TouchableOpacity>
              )
          })}
          </View>
          {banners.map(banner=>{
           return(
               banner.section=="middle"?(
                <Image style={styles.banner} source={{uri:imageLink+banner.image}}/>
               ):(null)
            
           )
       })}
          <View style={styles.productWrapper}>
          <Text style={bbstyles.h1}>Product For Rent</Text>
          {rentProducts.slice(0,4).map(product=>{
              return(
                  <TouchableOpacity style={styles.product} onPress={()=>navigation.navigate('productdetail',product)}>
                  <Image source={{uri:imageLink+product.image}} style={styles.productImage}/>
                  <View style={styles.productDesc}>
                      <Text style={styles.productTitle} numberOfLines={3}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price}</Text>
                      <Text style={styles.productCategory}>{product.category}</Text>
                  </View>
                  </TouchableOpacity>
              )
          })}
          </View>

          {banners.map(banner=>{
           return(
               banner.section=="last"?(
                <Image style={styles.banner} source={{uri:imageLink+banner.image}}/>
               ):(null)
            
           )
       })}
          <View style={styles.productWrapper}>
          <Text style={bbstyles.h1}>Product For Sell</Text>
          {sellProducts.slice(0,4).map(product=>{
              return(
                  <TouchableOpacity style={styles.product} onPress={()=>navigation.navigate('productdetail',product)}>
                  <Image source={{uri:imageLink+product.image}} style={styles.productImage}/>
                  <View style={styles.productDesc}>
                      <Text style={styles.productTitle} numberOfLines={3}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price}</Text>
                      <Text style={styles.productCategory}>{product.category}</Text>
                  </View>
                  </TouchableOpacity>
              )
          })}
          </View>



       </ScrollView>
    )
}

const styles = StyleSheet.create({
    card:{
        padding:10,
        borderWidth:1,
        borderColor:'red',
        width:250,
        height:300,
        margin: 10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    banner:{
        height:200,
        width:'100%',
        resizeMode:'contain'
    },
    wrapper:{
        flexDirection:'row',
        margin:20
      
    },
    category:{
        height:100,
        width:100,
        borderRadius:50,
    },
    cateWrapper:{
        marginHorizontal:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
    },
    cateText:{
        textAlign:'center',
        marginTop:10,
        textTransform:'capitalize',
        fontSize:16,
        fontWeight:'500'
    },
    product:{
        flex:1,
        flexDirection:'row',
        margin:20
    },
 
    

    

    productImage:{
        height:200,
        width:'100%',
        resizeMode:'contain',
        flex:2
    },

    productDesc:{
        fontWeight:'500',
        fontSize:16,
        flex:3,
        marginLeft:20,
    },
    productWrapper:{
      flex:1,
      margin:20
    },
    productTitle:{
        fontWeight:'500',
        fontSize:16,
        marginBottom:5,
        textTransform:'capitalize'
    },
    productPrice:{
        fontWeight:'bold',
        marginBottom:5
    },
    productCategory:{
        textTransform:'capitalize'
    },


    container:{
        flex:1,
        flexWrap:'wrap',
    
        
    }
})

export default Welcome
