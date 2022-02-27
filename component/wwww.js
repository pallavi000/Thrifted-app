import React,{useEffect,useState,usestate} from 'react'
import { Image, StyleSheet, Text, ListView,TouchableOpacity,Dimensions, TouchableWithoutFeedback, View } from 'react-native'
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import bbstyles from './Styles'
import { imageLink } from './ImageLink'
import Carousel from 'react-native-banner-carousel';


function Welcome({navigation}) {


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
    })
}, [])


    return ( 
       <ScrollView  style={styles.container}>

             <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={Dimensions.get('window').width}
                >
              
                    {banners.map(banner=>{
                        return(
                            banner.section=="top"?(
                                <Image style={styles.banner} source={{uri:imageLink+banner.image}}/>
                            ):(null)
                        )
                    })}
                </Carousel>

       
          <Text style={styles.topcategory}>Top Categories</Text>
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
          
          <View style={styles.productWrapper}>
          <Text style={styles.h1}>New Arrival</Text>
          {products.slice(0,4).map(product=>{
              return(
                  <TouchableOpacity style={styles.product} onPress={()=>navigation.navigate('productdetail',product)}>
                  <Image source={{uri:imageLink+product.image}} style={styles.productImage}/>
                  <View style={styles.productDesc}>
                      <Text style={styles.productTitle} numberOfLines={3}>{product.name}</Text>
                      <Text style={styles.productPrice}>Rs. {product.price}</Text>
                      <Text style={styles.productCategory}>{product.category_id?.name}</Text>
                  </View>
                  </TouchableOpacity>
              )
          })}
          </View>
             <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={Dimensions.get('window').width}
                >
                    {banners.map(banner=>{
                            return(
                                banner.section=="middle"?(
                                    <Image style={styles.banner} source={{uri:imageLink+banner.image}}/>
                                ):(null)
                            )
                        })}

                </Carousel>
          
          <View style={styles.productWrapper}>
          <Text style={styles.h1}>Product For Rent</Text>
          {rentProducts.slice(0,4).map(product=>{
              return(
                  <TouchableOpacity style={styles.product} onPress={()=>navigation.navigate('productdetail',product)}>
                  <Image source={{uri:imageLink+product.image}} style={styles.productImage}/>
                  <View style={styles.productDesc}>
                      <Text style={styles.productTitle} numberOfLines={3}>{product.name}</Text>
                      <Text style={styles.productPrice}>Rs. {product.price}</Text>
                      <Text style={styles.productCategory}>{product.category_id?.name}</Text>
                  </View>
                  </TouchableOpacity>
              )
          })}
          </View>
          <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={Dimensions.get('window').width}
                >

          {banners.map(banner=>{
           return(
               banner.section=="last"?(
                <Image style={styles.banner} source={{uri:imageLink+banner.image}}/>
               ):(null)
            
           )
       })}

       </Carousel>


      
               
                   
          <View style={styles.productWrapper}>
          <Text style={styles.h1}>Product For Sell</Text>
          {sellProducts.slice(0,4).map(product=>{
              return(
                   <TouchableOpacity  onPress={()=>navigation.navigate('productdetail',product)}>
                       <View style={styles.product}>
                 
                  <Image source={{uri:imageLink+product.image}} style={styles.productImage}/>
                  <View style={styles.productDesc}>
                      <Text style={styles.productTitle} numberOfLines={3}>{product.name}</Text>
                      <Text style={styles.productPrice}>Rs. {product.price}</Text>
                      <Text style={styles.productCategory}>{product.category_id?.name}</Text>
                  </View>
                
                  </View>
                    </TouchableOpacity>


              )
          })}
        </View>
       </ScrollView>
    )
}



const styles = StyleSheet.create({
    container:{

    },
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
     
   flex: 1,
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop:0
    },
    wrapper:{
        flexDirection:'row',
        marginHorizontal:10,
        marginTop:0,
        marginBottom:10
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
      
        flexDirection:'row',
        margin:10
    },
 


    productImage:{
        height:150,
        resizeMode:'cover',
        flex:2
    },

    productDesc:{
        fontWeight:'500',
        fontSize:16,
        flex:2,
        marginLeft:20,
    },
    productWrapper:{
 
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
    h1:{
         margin: 20,
         marginLeft:10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    topcategory:{
          margin: 20,
          marginTop:5,
         marginLeft:10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'   
    },
    


 
})

export default Welcome
