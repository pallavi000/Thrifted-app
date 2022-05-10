import React,{useContext, useEffect,useState} from 'react'
import { Image, StyleSheet,SafeAreaView, StatusBar, Text,TouchableOpacity,Dimensions, TouchableWithoutFeedback, RefreshControl, View,ScrollView, FlatList, ActivityIndicator } from 'react-native'
import axios from 'axios'
import {Ionicons,Feather } from '@expo/vector-icons'
import bbstyles from '../Styles'
import { imageLink } from '../ImageLink'
// import { SliderBox } from "react-native-image-slider-box";
import { AuthContext } from '../Context'
import { useIsFocused } from '@react-navigation/native'
import { Raleway_500Medium } from '@expo-google-fonts/raleway'

export default function Home({navigation}) {

    const[products,setProducts] = useState([])
    const[banners,setBanners] = useState([])
    const [categories, setCategories] = useState([])
    const[sellProducts,setSellProducts] = useState([])
    const[rentProducts,setRentProducts] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const[activePage,setActivePage] = useState(1)
    const[itemsCountPerPage,setItemsCountPerPage]= useState(10)
    const[loader,setLoader] = useState(true)
    const[nextPage,setNextPage] = useState(true)
    const data = useContext(AuthContext)
    const {unreadMessage, setUnreadMessage, token} = data
    const config = {
        headers: {
            'access-token':token
        }
    } 

    async function getProducts(currentPage, countPerPage, productOnly) {
        const data = {
            activePage: currentPage,
            itemsCountPerPage: countPerPage,
            productOnly
        }
        try {
            const response = await axios.post('/frontend/app/home', data)
            if(!productOnly) {
                setProducts(response.data.product)
                setBanners(response.data.banner)
                setRentProducts(response.data.rentProduct)
                setSellProducts(response.data.saleProduct)
                setCategories(response.data.categories)
            } else {
                setProducts([...products, ...response.data.product])
            }
            setLoader(false)
            setNextPage(false)
            console.log('ends')
        } catch (error) {
            setLoader(false)
        }
        
    }

    function GetNextPage() {
        setActivePage(activePage + 1);
        if (!nextPage) {
            setNextPage(true)
            getProducts(activePage+1,itemsCountPerPage, true)
        }
    }

    async function getUnreadMessageCount() {
        try {
            const response = await axios.get('/chat/message/unread-count', config)
            setUnreadMessage(response.data)
        } catch (error) {
        }
    }

    useEffect(() => {
        getProducts(activePage, itemsCountPerPage, false)
        getUnreadMessageCount()
    }, [])

    function onRefresh() {
        setActivePage(1)
        getProducts(1, itemsCountPerPage, true)
    }

    function parseImages(image, images){
        var arr=[imageLink+image]
        images.forEach(image => {
            arr.push(imageLink+image)
        });
        return arr
    }


    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = contentSize.height/2;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    }

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
        <StatusBar
            backgroundColor="#fff"
            barStyle="dark-content"
        />
        {loader ? (
            <View style={bbstyles.loaderContainer}>
                <ActivityIndicator size={'large'} color='#663399'/>
            </View>
        ):(
        <>
        <View  style={styles.homeNav}>
            <View style={styles.navlogo}>
                <Feather name='instagram' size={30} color='black'/>
            </View>
            <View style={styles.navcontent}>
                <View style={styles.icons}>
                <Image source={require('../../assets/icons/Search.png')} style={styles.icon}/>
                </View>
                <View style={styles.icons}>
                    <Image source={require('../../assets/icons/Like.png')} style={styles.icon}/>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Messages')} style={styles.icons}>
                    <Image source={require('../../assets/icons/Messenger.png')} style={styles.icon}/>{unreadMessage>0?(<Text style={styles.unreadMessage}>{unreadMessage}</Text>):(null)}
                </TouchableOpacity>
            </View>
        </View>

        <View style={{paddingBottom:50}}>
        
        <ScrollView 
        style={bbstyles.scrollHeight}
        onScroll={({nativeEvent})=>{
            if(isCloseToBottom(nativeEvent)) {
                GetNextPage()
            }
        }}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        <View>
            <ScrollView   horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.wrapper} >
                    {categories.map(category=>{
                        return(
                            <TouchableOpacity key={category._id} onPress={()=>navigation.navigate('Category Title',category)} style={styles.cateWrapper}>
                            <Image style={styles.category} source={{uri:imageLink+category.image}}/>
                            <Text numberOfLines={1} style={styles.cateText}>{category.name}</Text>
                        </TouchableOpacity>
                        )
                    })}
                </View>
          </ScrollView>

         {/* <FlatList
            data={products}
            keyExtractor={item => item._id}
            renderItem={({ item })=>(
                 
            )}
        /> */}

        {products.map(item=>{
            return(
                <TouchableOpacity key={item._id}  onPress={()=>navigation.navigate('Product Detail',item)}>
          <View style={styles.productWrapper} key={item._id}>
            <TouchableOpacity onPress={()=>navigation.navigate('My Closet',item.seller_id)} style={styles.userWrapper}>
               <Image style={styles.userimage} source={{uri:imageLink+item.seller_id?.image}}></Image> 
               <Text style={styles.username}>{item.seller_id?.name}</Text>   
            </TouchableOpacity>
            <View style={styles.product}>
                {/* <Image style={styles.productImage} source={{uri:imageLink+product.image}}></Image> */}

                {/* <SliderBox
                images={parseImages(item.image, item.feature_image)}
                ImageComponentStyle	= {styles.productImage}
                dotColor="#663399"
                imageLoadingColor="#663399"
                onCurrentImagePressed={()=>navigation.navigate('Product Detail',item)}
                /> */}
                <View style={styles.productreview}>
                <View>
                    <Image source={require('../../assets/icons/Like.png')} style={styles.smallIcon}/>
                </View>
                <View>
                <Image source={require('../../assets/icons/Shop.png')} style={styles.smallIcon}/>
                </View>
                <View>
                <Image source={require('../../assets/icons/Comment.png')} style={styles.smallIcon}/>
                </View>
                </View>
                <View style={styles.typeWrapper}> 
                    <View><Text style={styles.productname} numberOfLines={1}>{item.name}</Text></View> 
                    <View><Text style={styles.type}>{item.type}</Text></View> 
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.price}>Rs. {item.price}</Text><Text>|</Text><Text style={styles.size}>Size: {item.size_id?.name}</Text><Text>|</Text><Text style={styles.brand}>{item.brand_id?.name}</Text>
                </View>   
            </View>
            </View>
            </TouchableOpacity>
            )
        })}
        
        
        </View>
    </ScrollView>
    </View>
    </>
    )}
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
    icon: {
        height: 30,
        width: 30
    },
    smallIcon: {
        height: 25,
        width: 25,
        marginRight: 5
    },
    navcontent:{
        flexDirection:'row',
        alignItems:'center',
    },
    icons:{
        marginRight:10,
        position: 'relative'
    },
    unreadMessage: {
        position: 'absolute',
        top: 0,
        right: -6,
        backgroundColor: '#FF2424',
        color: 'white',
        height: 20,
        width: 20,
        fontSize: 10,
        borderRadius: 10,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '600'
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
        fontWeight:'500',
        width: 60
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