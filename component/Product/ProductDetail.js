import axios from 'axios'
import React, { useContext, useState,useRef,useEffect } from 'react'
import { View,ActivityIndicator, Alert,Text, Image,SafeAreaView,Dimensions, StyleSheet, Button,ScrollView,TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import { AuthContext } from '../Context'
import bbstyles from '../Styles'
import { imageLink } from '../ImageLink'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold, Raleway_700Bold_Italic } from '@expo-google-fonts/raleway'
import { Feather, Ionicons } from '@expo/vector-icons'
// import { SliderBox } from "react-native-image-slider-box";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native'


export default function ProductDetail({navigation,route}) {
    const [showFullDesc, setShowFullDesc] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const sheetRef = useRef(null)
    const fall = new Animated.Value(1)
    const IsFocused = useIsFocused()


    

    React.useLayoutEffect(()=>{
        if(titleShown){
            setTitleShown({...titleShown, display:'none'})
        }
        return () => {
            setTitleShown({...titleShown,display:'flex'})
        }
    },[navigation])


    const product = route.params

    const data = useContext(AuthContext)
    const {cartCount,setCartCount,token,titleShown,setTitleShown} = data
    const {getToken} = data
  
    function addtocart(pid){
        setIsSubmitting(true)
        const data={
            pid,
            quantity:1
        }  

        const config = {
            headers: {
              'access-token':token
            }
          } 
        axios.post('/addtocart/cart',data,config).then(response=>{
            setIsSubmitting(false)
            sheetRef.current.snapTo(0)
            getToken()
            setCartCount(cartCount+1)
        }).catch(err=>{
            setIsSubmitting(false)
            Alert.alert('Error', err.request.response)
            console.log(err.request.response)
        })
    }

    function buyNow(){
        
    }

    function parseImages(image, images){
        var arr=[imageLink+image]
        images.forEach(image => {
            arr.push(imageLink+image)
        });
        return arr
    }


    const renderContent = () => (
        <View
        style={{
            backgroundColor: '#fff',
            height:300,
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
        <Ionicons name='cart-outline' size={60} color='#000'/>
        <Text style={{
            fontFamily: "Raleway_700Bold",
            fontSize: 24
        }}>Product Added to cart!</Text>
        <TouchableOpacity onPress={()=>sheetRef.current.snapTo(1)} style={[styles.loginBtn,{borderRadius:0}]}>
            <Text style={styles.loginText}>Back to Shopping</Text>
        </TouchableOpacity>
        </View>
  );
  
  return (
   <SafeAreaView style={{backgroundColor:'white',flex:1}}>

    <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0]}
        borderRadius={10}
        initialSnap={1}
        renderContent={renderContent}
        callbackNode={fall}
        enabledContentTapInteraction={false}
      />

       <ScrollView>
       <Animated.View
            style={{
            opacity: Animated.add(0.3, Animated.multiply(fall, 1.0))
        }}>

       
            <View style={styles.detailImage}>
            
            {/* <SliderBox
            images={parseImages(product.image, product.feature_image)}
            ImageComponentStyle	= {styles.productImage}
            dotColor="#663399"
            imageLoadingColor="#663399"
            /> */}

            </View>
            <View style={styles.detailContainer}>
                <View style={styles.productName}>
                    <Text style={styles.name}>{product.name}</Text>
                </View>
                <View style={styles.productFeature}>
                    <View style={styles.sizeWrapper}>
                        <Text style={styles.featureName}>Size</Text>
                        <View style={styles.productFeatureWrapper}>
                            <Text style={styles.featureValue}>{product.size_id?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.sizeWrapper}>
                        <Text style={styles.featureName}>Type</Text>
                        <View style={styles.productFeatureWrapper}><Text style={styles.featureValue}>{product.type}</Text></View> 
                    </View>
                    <View style={styles.sizeWrapper}>
                        <Text style={styles.featureName}>Brand</Text>
                        <View style={styles.productFeatureWrapper}>
                        <Text style={styles.featureValue}>{product.brand_id?.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.productDetailWrapper}>
                    <Text style={styles.detailHeader}>Item Detail</Text>
                    {showFullDesc ?(
                        <>
                            <Text style={styles.productDetail}>{product.detail}</Text>
                        <TouchableOpacity onPress={()=>setShowFullDesc(!showFullDesc)} style={styles.seemore}>
                            <Feather name="arrow-left" size={20} color={'#663399'}></Feather>
                            <Text style={styles.fullDesc} >Hide Full description</Text>
                        </TouchableOpacity>
                        </>
                    ):(
                        <>
                    <Text style={styles.productDetail} numberOfLines={4}>{product.detail}</Text>
                    <TouchableOpacity onPress={()=>setShowFullDesc(!showFullDesc)} style={styles.seemore}>
                        <Text style={styles.fullDesc} >Full description</Text>
                        <Feather name="arrow-right" size={20} color={'#663399'}></Feather>
                    </TouchableOpacity>
                    </>
                    )}
                </View>
                <View style={styles.productPrice}>
                    <Text style={styles.priceTitle}>Total</Text>
                    <Text style={styles.priceValue}>Rs. {product.price}</Text>
                </View>
            </View>
            </Animated.View>
       </ScrollView>
       {isSubmitting ?(
        <TouchableOpacity style={styles.loginBtn}>
          <ActivityIndicator size={24} color='#fff'/>
        </TouchableOpacity>
      ):(
        <TouchableOpacity style={styles.loginBtn} onPress={()=>addtocart(product._id)}>
                <Text style={styles.loginText}>Add to cart</Text>
        </TouchableOpacity>
      )}
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    detailImage:{
        backgroundColor:'#f5f5ff',
        paddingVertical:30,
        
    },
    productImage:{
        width:Dimensions.get('window').width,
        height:300,
        resizeMode:'contain'
    },
    detailContainer:{
        flex: 1,
        borderTopRightRadius:18,
        borderTopLeftRadius:18,
        backgroundColor:'white',
        padding:20,
        paddingTop:30,
    },
    name:{
        fontSize:28,
        lineHeight:33,
        fontFamily:'Raleway_600SemiBold',
        

    },
    productName:{
        marginBottom:15
        
    },

    productFeature:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    featureName:{
        fontSize:17,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        marginBottom:10,

    },
    featureValue:{
        fontSize:12,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
       
      

    },
    productFeatureWrapper:{
       
        textAlign:'center',
        paddingVertical:10,
        paddingHorizontal:35,
        borderWidth:1,
        borderColor:'#E3E3E3',
      
        borderRadius:7,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 0.8,
    },
    productDetailWrapper:{
        marginTop:25
    },
    detailHeader:{
        fontSize:17,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        marginVertical:10
    },
    productDetail:{
        fontSize:15,
        fontWeight:'400',
        opacity:0.5,
        fontFamily:'Raleway_400Regular',
        marginBottom:10
    },

    seemore:{
        flexDirection:'row',
        alignItems:'center',

    },

fullDesc:{
color:'#663399',
fontSize:15,
fontWeight:'700',
fontFamily:'Raleway_700Bold',
marginRight:5
},
productPrice:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
marginTop:20
},
priceTitle:{
fontSize:17,
fontWeight:'400',
fontFamily:'Raleway_400Regular'

},
priceValue:{
fontSize:22,
fontWeight:'700',
fontFamily:'Raleway_700Bold',
color:'#663399'
},
loginBtn:{
    paddingVertical:10,
    paddingHorizontal:10,
    width:Dimensions.get('window').width-60,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:20,
    marginBottom:20,
    alignSelf: 'center',
    },
    loginText:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:18,
    color:'white',
    },

})