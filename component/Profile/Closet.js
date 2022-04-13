import { StyleSheet, Text, View,Dimensions,SafeAreaView,ScrollView,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import bbstyles from '../Styles'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import axios from 'axios'
import { AuthContext } from '../Context'
import { imageLink } from '../ImageLink'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import * as imagePicker from 'expo-image-picker'
import { DEFAULT_ICON_SIZE } from '@expo/vector-icons/build/createIconSet'
import {Picker} from '@react-native-picker/picker';


export default function Closet(props) {

    const[products,setProducts] = useState([])
    const[users,setUsers] = useState([])
    const navigation = props.navigation
    const data = useContext(AuthContext)
    const {decode} = data
    const {token} = data
    const[sorting,setSorting] = useState('-_id')
    const[modalVisible,setModalVisible] = useState(false)

    const config = {
        headers:{
            'access-token': token
        }
    }
    useEffect(() => {
        axios.post('/frontend/closet/'+decode._id).then(response=>{
            console.log(response.data)
            setProducts(response.data.product)
            setUsers(response.data.user)
            console.log('closet')
        }).catch(err=>{
            console.log(err.request.response)
        }) 
    }, [props])


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
       <ScrollView style={[bbstyles.scrollHeight]}>
       <View style={{paddingHorizontal:20}}>
       <View style={styles.header}>



<View style={styles.imageWrapper}>
<Image source ={require('../../assets/Saly-11.png')} style={styles.image}></Image>
</View>
<View style={styles.records}>
<View style={styles.recordContainer}>
<Text style={styles.recordCount}>10,000</Text>
<Text style={styles.recordTitle}>Posts</Text>
</View>
<View style={styles.recordContainer}>
<Text style={styles.recordCount}>5,000</Text>
<Text style={styles.recordTitle}>Posts</Text>
</View>

<View style={styles.recordContainer}>
<Text style={styles.recordCount}>3,00</Text>
<Text style={styles.recordTitle}>Posts</Text>
</View>
</View>

            </View>
            <Text style={styles.userName}>Username</Text>
<Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt #hashtag</Text>

<TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.login}>Follow</Text>
            </TouchableOpacity>
            </View>

<View style={styles.closetView}>
<View style={styles.closetTab}>
    <View><Text style={styles.listingActive}>Listing</Text></View>
    <View><Text style={styles.listing}>Sold</Text></View>
</View>
</View>
<View style={styles.productWrapper}>
{products.map(product=>{
    return(
        <View style={styles.productImage} key={product._id}>
    <Image source={{uri:imageLink+product.image}} style={styles.closetImage}></Image>
    </View>
    )
})}



</View>





        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    loginBtn:{

        paddingVertical:8,
        paddingHorizontal:50,
        backgroundColor:'#663399',
        borderRadius:5,
        marginTop:20,
        marginBottom:30
       },
       login:{
        textAlign:'center',
        fontFamily:'Raleway_700Bold',
        fontWeight:'700',
        fontSize:15,
        color:'white',
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
           borderColor:'#663399'
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
        paddingVertical:20,

        borderTopRightRadius:20,
        borderTopLeftRadius:20,
       

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0,
        elevation: 4,
            },
       closetTab:{
           flexDirection:'row',
           justifyContent:'space-around',
           alignItems:'center',
           
       },
       listing:{
           fontSize:14,
           fontWeight:'700',
           fontFamily:'Raleway_700Bold'
       },
       listingActive:{
        fontSize:14,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        color:'#663399'
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