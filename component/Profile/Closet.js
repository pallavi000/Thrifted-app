import { StyleSheet, ActivityIndicator, Text, TouchableWithoutFeedback, View,Dimensions,SafeAreaView,ScrollView,Image,TouchableOpacity, Alert } from 'react-native'
import React,{useState,useEffect,useContext, useRef} from 'react'
import bbstyles from '../Styles'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import axios from 'axios'
import { AuthContext } from '../Context'
import { imageLink } from '../ImageLink'
import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import { EvilIcons, Feather, FontAwesome, SimpleLineIcons } from '@expo/vector-icons'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as imagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Closet(props) {

    const sheetRef = useRef(null)
    const fill = new Animated.Value(1)
    const[products,setProducts] = useState([])
    const[user,setUser] = useState([])
    const navigation = props.navigation
    const data = useContext(AuthContext)
    const {decode,token,setUserImage} = data
    const[sorting,setSorting] = useState('-_id')
    const[modalVisible,setModalVisible] = useState(false)
    const[activeTab,setActiveTab] = useState('listing')
    const[loading,setLoading] = useState(true)
    const[sales, setSales] = useState([])
    const[followSubmit, setFollowSubmit] = useState(false)
    const[isFollowing, setIsFollowing] = useState(false)
    const[imageUploading, setImageUploading] = useState(false)
    const isFocused = useIsFocused()
    const[messageSubmit, setMessageSubmit] = useState(false)
    
    const config = {
        headers:{
            'access-token': token
        }
    }

    useEffect(() => {
        getProducts()
        getSales()
    }, [isFocused])

    async function getProducts() {
        try {
            const response = await axios.post('/frontend/closet/'+props.route.params._id)
            setProducts(response.data.product)
            setUser(response.data.user)
            if(response.data.user.followers.includes(decode._id)) {
                setIsFollowing(true)
            } else {
                setIsFollowing(false)
            }
            navigation.setOptions({
                title: response.data.user.name
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    async function getSales() {
        try {
            const response = await axios.get('/order/sales/get/'+props.route.params._id,config)
            setSales(response.data)            
        } catch (error) {
        }        
    }

    function toggleTab(action) {
        setActiveTab(action)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    async function followUser() {
        setFollowSubmit(true)
        try {
            const response = await axios.post('/user/follow/'+user._id, {}, config)
            setFollowSubmit(false)
            setUser(response.data)
            setIsFollowing(true)
        } catch (error) {
            Alert.alert('Error', error.request.response)
        }
    }

    async function doUnfollow() {
        setFollowSubmit(true)
        try {
            const response = await axios.post('/user/unfollow/'+user._id, {}, config)
            setFollowSubmit(false)
            setUser(response.data)
            setIsFollowing(false)
        } catch (error) {
            Alert.alert('Error', error.request.response)
        }
    }

    function unFollowUser() {
        Alert.alert("Unfollow User", "Are you sure you want to unfollow?", [
            {text: 'Yes', onPress: doUnfollow},
            {text: 'Cancel'}
        ])
    }

    async function selectImage() {
        const {granted} = await imagePicker.getMediaLibraryPermissionsAsync()
        if(!granted){
            const result = await imagePicker.requestMediaLibraryPermissionsAsync()
            if(!result.granted) {
                return Alert.alert("Error", "Permission denied")
            }
        }
        const imageResult = await imagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [4,4],
            mediaTypes: imagePicker.MediaTypeOptions.Images
        })
        if(!imageResult.cancelled){
            var uri = null
            if(imageResult.base64) {
                uri  = `data:image/jpeg;base64,${imageResult.base64}`
            }
            uploadUserImage(uri)
        }
    }

    async function openCamera() {
        const {granted} = await imagePicker.getCameraPermissionsAsync()
        if(!granted){
            const result = await imagePicker.requestCameraPermissionsAsync()
            if(!result.granted) {
                return Alert.alert("Error", "Permission denied")
            }
        }
        const imageResult = await imagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4,4],
            base64: true
        })
        if(!imageResult.cancelled){
            var uri = null
            if(imageResult.base64) {
                uri  = `data:image/jpeg;base64,${imageResult.base64}`
            }
            uploadUserImage(uri)
        }
    }

    async function uploadUserImage(uri) {
        sheetRef.current.snapTo(1)
        setImageUploading(true)
        try {
            const data = {
                image: uri
            }
            const response = await axios.post('/user/change/avatar', data, config)
            setUser({...user, image: response.data})
            setImageUploading(false)
            setUserImage(response.data)
            await AsyncStorage.setItem('userImage', response.data)
        } catch (error) {
            Alert.alert(error.request.response)
            setImageUploading(false)
        }
    }

    function getFollowersCount() {
        if(user.followers && user.followers.length>0) {
            return numberWithCommas(user.followers.length)
        }
        return 0;
    }

    function parseBio(bio) {
        if(!bio) return bio
        const bioArr = bio.split(' ')
        let parsedBio = []
        bioArr.forEach((b, index)=>{
            if(b.includes('#')) {
                parsedBio.push(<Text key={index} style={{color: '#663399'}}>{b+" "}</Text>)
            } else {
                parsedBio.push(b+" ")
            }
        })
        return parsedBio
    }

    async function sendMessage() {
        setMessageSubmit(true)
        try {
            const data = {
                receiver_id:user._id,
            }
        
            const response = await axios.post('/chat/newchat',data,config)
            const receiver = {
                user,
                conversation: response.data
            }
            setMessageSubmit(false)
            navigation.navigate('chat',receiver)
        } catch (error) {
            Alert.alert('Error', error.request.response)
        }
    }


    const renderHeader = () =>(
        <>
        <View style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            paddingTop: 20,
            borderTopWidth: 1,
            borderTopColor: '#ddd',
        }}>
            <Text
            style={{
                fontFamily: "Raleway_600SemiBold",
                fontSize: 20,
                color: 'black',
                borderTopWidth: 5,
                borderTopColor: '#663399',              
                paddingTop: 5,
                borderRadius: 3
            }}
            >Choose Image</Text>
        </View>
        </>
    )
    function renderContent() {
        return(
        <View
        style={{
            backgroundColor: '#fff',
            height:300
        }}
        >
        <TouchableOpacity onPress={()=>selectImage()} style={[styles.cameraIconWrapper,{borderRadius:0}]}>
            <Image style={styles.cameraIcon} source={require('../../assets/gallery.png')}/><Text style={styles.loginText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>openCamera()} style={[styles.cameraIconWrapper,{borderRadius:0}]}>
            <Image style={styles.cameraIcon} source={require('../../assets/camera.png')}/><Text style={styles.loginText}>Open Camera</Text>
        </TouchableOpacity>
        </View>
        )
    }


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >

    <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0]}
        borderRadius={10}
        initialSnap={1}
        enabledContentTapInteraction={false}
        renderHeader={renderHeader}
        renderContent={renderContent}
        callbackNode={fill}
    />


{loading?(
<View style={bbstyles.loaderContainer}>
    <ActivityIndicator size={'large'} color='#663399'/>
</View>
):(
    <Animated.View  style={[styles.container,{
            opacity: Animated.add(0.3, Animated.multiply(fill, 1.0))
        }]}>

       <ScrollView style={[bbstyles.scrollHeight]}>
       <View style={{paddingHorizontal:20}}>
       <View style={styles.header}>


{imageUploading?(
    <TouchableOpacity style={styles.imageWrapper}>
    <ActivityIndicator size={'large'} color='#663399'/>
    </TouchableOpacity>
): decode._id==user._id ?(
<TouchableOpacity style={styles.imageWrapper} onPress={()=>sheetRef.current.snapTo(0)}>
<Image source ={{uri: imageLink+user.image}} style={styles.image}></Image>
</TouchableOpacity>
):(
    <TouchableOpacity style={styles.imageWrapper}>
<Image source ={{uri: imageLink+user.image}} style={styles.image}></Image>
</TouchableOpacity>
)}

<View style={styles.records}>
<View style={styles.recordContainer}>
<Text style={styles.recordCount}>{numberWithCommas(products.length)}</Text>
<Text style={styles.recordTitle}>Products</Text>
</View>
<View style={styles.recordContainer}>
<Text style={styles.recordCount}>{numberWithCommas(sales.length)}</Text>
<Text style={styles.recordTitle}>Sales</Text>
</View>

<View style={styles.recordContainer}>
<Text style={styles.recordCount}>{getFollowersCount()}</Text>
<Text style={styles.recordTitle}>Followers</Text>
</View>
</View>

            </View>
            <Text style={styles.userName}>{user.name}</Text>
<Text style={styles.desc}>{parseBio(user.bio)}</Text>

{followSubmit?(
    <TouchableOpacity style={styles.loginBtn}>
        <ActivityIndicator size={'small'} color='white' />
</TouchableOpacity>
):messageSubmit?(
    <View style={{flexDirection: 'row', alignItems:'center'}}>
        <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'white',borderWidth:1,borderColor:'#ddd'}]}>
            <Text style={[styles.login,{color:'black'}]}>Following</Text><SimpleLineIcons name='user-following' size={14} color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'white',borderWidth:1,borderColor:'#ddd'}]}>
            <Text style={[styles.login,{color:'black'}]}>Message</Text><ActivityIndicator size={14} color='#663399' />
        </TouchableOpacity>
    </View>
):(
    decode._id==user._id ?(
        <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'white',borderWidth:1,borderColor:'#ddd'}]} onPress={()=>navigation.navigate('Edit Profile', user)}>
            <Text style={[styles.login,{color:'black'}]}>Edit Profile</Text><EvilIcons name='user' size={20} color={'black'}/>
        </TouchableOpacity>
    ):!isFollowing?(
<TouchableOpacity style={styles.loginBtn} onPress={()=>followUser()}>
            <Text style={styles.login}>Follow</Text><SimpleLineIcons name='user-follow' size={14} color={'white'}/>
</TouchableOpacity>
    ):(
        <View style={{flexDirection: 'row', alignItems:'center'}}>
        <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'white',borderWidth:1,borderColor:'#ddd'}]} onPress={()=>unFollowUser()}>
            <Text style={[styles.login,{color:'black'}]}>Following</Text><SimpleLineIcons name='user-following' size={14} color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'white',borderWidth:1,borderColor:'#ddd'}]} onPress={()=>sendMessage()}>
            <Text style={[styles.login,{color:'black'}]}>Message</Text><Feather name='message-square' size={14} color={'black'}/>
        </TouchableOpacity>
        </View>
    )
)}
            </View>


<View style={{ overflow: 'hidden', paddingBottom: 5 }}>
    <View style={styles.shadowShow}/>
</View>
<View style={styles.closetView}>
    <View style={styles.closetTab}>
        <TouchableWithoutFeedback onPress={()=>toggleTab('listing')}>
            <Text style={activeTab=="listing" ? styles.listingActive : styles.listing}>Listing</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>toggleTab('sold')}>
            <Text style={activeTab=="sold" ? styles.listingActive : styles.listing}>Sold</Text>
        </TouchableWithoutFeedback>
    </View>
</View>


<View style={styles.productWrapper}>
{activeTab=="listing" ?(
products.map(product=>{
    return(
        <View style={styles.productImage} key={product._id}>
    <Image source={{uri:imageLink+product.image}} style={styles.closetImage}></Image>
    </View>
    )
})
):(
    sales.map(sale=>{
        return(
            sale.product_id?(
                <View style={styles.productImage} key={sale._id}>
                    <Image source={{uri:imageLink+sale.product_id.image}} style={styles.closetImage}></Image>
                </View>
            ):(null)
        )
    })
)}
</View>





        </ScrollView>
            </Animated.View>

)}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    cameraContainer:{
      padding:25,
        borderColor:'#C4C4C4BF',
        borderWidth:0.5
    },
    cameraIcon:{
        height:30,
        width:30,
    },
    cameraIconWrapper: {
    paddingVertical:10,
    paddingHorizontal:10,
    width:Dimensions.get('window').width-60,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:20,
    marginBottom:20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    },
    loginText:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:18,
    color:'white',
    marginLeft: 5
    },
    loginBtn:{
        paddingVertical:8,
        backgroundColor:'#663399',
        borderRadius:5,
        marginTop:20,
        marginBottom:30,
        borderWidth:1,
        borderColor: '#663399',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        flexGrow: 1
       },
       login:{
        textAlign:'center',
        fontFamily:'Raleway_700Bold',
        fontWeight:'700',
        fontSize:15,
        color:'white',
        marginRight: 10
       },
       header:{
           flexDirection:'row',
           alignItems:'center',
          

       },
       image:{
           height:74,
           width:74,
           resizeMode:'cover',
           borderRadius:37,
           borderColor:'#fff',
           borderWidth:2,
       },
       imageWrapper:{
           height:80,
           width:80,
           borderRadius:40,
           marginRight:30,
           borderWidth:2,
           borderColor:'#663399',
           alignItems: 'center',
           justifyContent: 'center'
       },
       records:{
           flexDirection:'row',
           justifyContent:'space-around',
           alignItems:'center',
           flex:1,
       },
       recordCount:{
           fontSize:18,
           fontWeight:'700',
           fontFamily:'Raleway_700Bold'
       },
       recordTitle:{
           fontSize:14,
           fontWeight:'600',
           fontFamily:'Raleway_600SemiBold',
           marginTop:5,
           textAlign:'center'
       },
       userName:{
           fontSize:14,
           fontWeight:'700',
           fontFamily:'Raleway_700Bold',
           marginTop:5
       },
       desc:{
           fontSize:14,
           fontWeight:'400',
           fontFamily:'Raleway_400Regular',
           marginTop:5
       },
       closetView:{
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
        },
        shadowShow: {
            shadowColor: "#000000",
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity:  0.17,
            shadowRadius: 2.54,
            elevation: 4,
            backgroundColor: 'white',
            height: 5,
        },
       closetTab:{
           flexDirection:'row',
           justifyContent:'space-around',
           alignItems:'center',
       },
       listing:{
           fontSize:14,
           fontWeight:'700',
           fontFamily:'Raleway_700Bold',
           paddingVertical:20,
           width: Dimensions.get('window').width/2,
           textAlign: 'center',
           color: 'black',
           borderBottomWidth: 2,
            borderBottomColor: '#fff',
       },
       listingActive:{
        fontSize:14,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        color:'#663399',
        paddingVertical:20,
        borderBottomWidth: 2,
        borderBottomColor: '#663399',
        width: Dimensions.get('window').width/2,
        textAlign: 'center'
    },
    productWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap'
        
    },
    closetImage:{
        height:200,
        width:(Dimensions.get('window').width-5)/2,
        resizeMode:'cover',
        marginBottom:5,
       
    }

})