import { View, ActivityIndicator,Text,SafeAreaView, StatusBar, Image,Dimensions,TouchableOpacity, StyleSheet,Alert, Button,ScrollView,TouchableWithoutFeedback} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import { Feather, Ionicons } from '@expo/vector-icons'
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import {Picker} from '@react-native-picker/picker';
import Esewa from '../payment_gateway/Esewa';
import Khalti from '../payment_gateway/Khalti';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import bbstyles from '../Styles';


export default function Checkout({navigation}) {
const[paymentMethod,setPaymentMethod] = useState('')
const[addresses,setAddresses] = useState([])
const[selectedId,setSelectedId] = useState(0)
const[shippingAddress,setShippingAddresses] = useState()
const[sameBilling,setSameBilling] = useState(true)
const[billingAddress,setBillingAddress] = useState({})
const[pid,setPid] = useState(uuidv4())
const[shippingFee,setShippingFee] = useState(0)
const[esewaVisible,setEsewaVisible] = useState(false)
const[khaltiVisible,setKhaltiVisible] = useState(false)
const[isSubmitting,setIsSubmitting] = useState(false)

const[loader,setLoader] = useState(true)


const IsFocused = useIsFocused()

async function loadSelectedCheckBox() {
    var addressId = await AsyncStorage.getItem('shippingId')
    if(addressId) {
        setSelectedId(addressId)
    }
}

useEffect(()=>{
if(addresses && addresses.length>0 && selectedId){
    var shippingAddress = addresses.find(address=>address._id==selectedId)
    if(shippingAddress){
        setShippingAddresses(shippingAddress)
    } else {
        setShippingAddresses(addresses[0])
    }
} else {
    setShippingAddresses()
}
},[addresses,selectedId])


const data = useContext(AuthContext)
const {token,subtotal,getToken} = data
const config = {
    headers:{
        'access-token': token
    }
}
        
useEffect(() => {
    getaddress()
    loadSelectedCheckBox()
}, [IsFocused])

useEffect(()=>{
    if(!isSubmitting) {
       navigation.setOptions({
            headerStyle:{
              backgroundColor:'#fff',
            },
            headerTitleStyle:{
                color: '#000'
            },
            headerTintColor:'black',
        }) 
    } else {
        navigation.setOptions({
            headerStyle:{
              backgroundColor:'#663399',
            },
            headerTitleStyle:{
                color: '#fff'
            },
            headerTintColor:'white',
        })
    }
},[isSubmitting])
    
async function getaddress(){
    try {
        var response = await axios.get('/address',config)
        setAddresses(response.data)
        setLoader(false)
    } catch (error) {
        setLoader(false)
       Alert.alert('Error', error.request.response)
    }
}


function changeBillingAddress(id){
    var billing = addresses.find(address=>address._id == id)
    if(billing){
        setBillingAddress(billing)
    }
}

function orderSuccess() {
    getToken()
    navigation.navigate('Order Success')
}


function payment(){
    if(!paymentMethod){
        Alert.alert('Please Select Payment Method')
        return
    }
    if(paymentMethod=='khalti'){
        setKhaltiVisible(true)
    }else{
        setEsewaVisible(true)
    }
}

  return ( 
    isSubmitting ? (
        <SafeAreaView style={{backgroundColor:'#663399',flex:1}}>
        <StatusBar
            backgroundColor="#663399"
            barStyle="light-content"
        />
        <View style={bbstyles.loaderContainer}>
            <ActivityIndicator size={100} color='#fff'/>
            <Text style={styles.payProcessing}>Payment Processing</Text>
            <Text style={styles.subtitle}>Please wait...</Text>
        </View>
        </SafeAreaView>
    ):(
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
    />
    <ScrollView >
    <Esewa
        orderSuccess={orderSuccess}
        total={subtotal}
        pid={pid}
        visible={esewaVisible}
        setVisible={setEsewaVisible}
        shippingFee={shippingFee}
        config={config}
        subtotal={subtotal}
        setIsSubmitting={setIsSubmitting}
    />
    <Khalti
        orderSuccess={orderSuccess}
        total={subtotal}
        pid={pid}
        visible={khaltiVisible}
        setVisible = {setKhaltiVisible}
        shippingFee={shippingFee}
        config={config}
        subtotal={subtotal}
        setIsSubmitting={setIsSubmitting}
    />
       <View style={styles.cardWrapper}>
       <View style={styles.headerWrapper}>
            <Text style={styles.header}>Shipping Information</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Addresses')}>
            <Text style={styles.change}>Change</Text>
            </TouchableOpacity>
       </View>
       {loader ? (
           <View style={styles.card}>
                <ActivityIndicator size={'large'} color='#663399'/>
           </View>
       ) :shippingAddress?(
           <>
            <View style={styles.card}>
                <View style={styles.userWrapper}>
                    <Feather name="user" size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>{shippingAddress.name}</Text>
                </View>
                <View style={styles.userWrapper}>
                    <Feather name='map-pin' size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.district}, {shippingAddress.zipcode}, Nepal</Text>
                </View>
                <View style={styles.userWrapper}>
                    <Feather name='phone' size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>{shippingAddress.phone}</Text>
                </View>
           </View>

           <View style={{flexDirection:'row',alignItems:'center',marginBottom:15}}>
               <Checkbox value={sameBilling}
               style={styles.checkbox}
               color={sameBilling ? '#663399' : undefined}
               onValueChange={setSameBilling}></Checkbox>
                <Text>Same as Shipping Address</Text>
           </View>
           {!sameBilling && !billingAddress ?(
            <Picker
                style={styles.formcontrol}
                    selectedValue={billingAddress?._id}
                    onValueChange={itemValue =>
                    changeBillingAddress(itemValue)
                }>
                <Picker.Item  label="Select Billing Address" value="" />
                {addresses.map(address=>{
                    return(
                        
                        <Picker.Item key={address._id} label={`${address.street}, ${address.city}, ${address.district}, ${address.zipcode}, Nepal`} value={address._id} />
                        
                    )
                })}
            </Picker>
           ):(null)}
           {!sameBilling && billingAddress ?(
               <>
               <View style={styles.headerWrapper}>
                    <Text style={styles.header}>Billing Information</Text>
                    <TouchableOpacity onPress={()=>setBillingAddress()}>
                        <Text style={styles.change}>Change</Text>
                    </TouchableOpacity>
               </View>
               <View style={styles.card}>
                <View style={styles.userWrapper}>
                    <Feather name="user" size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>{shippingAddress.name}</Text>
                </View>
                <View style={styles.userWrapper}>
                    <Feather name='map-pin' size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.district}, {shippingAddress.zipcode}, Nepal</Text>
                </View>
                <View style={styles.userWrapper}>
                    <Feather name='phone' size={20} color={'#200E32'}></Feather>
                    <Text style={styles.userName}>{shippingAddress.phone}</Text>
                </View>
           </View>
           </>
           ):(null)}
           </>
       ):(
        <TouchableOpacity onPress={()=>navigation.navigate('Add Address')} style={[styles.card,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10}]}>
        <Text>Add Shipping Address</Text>
        <View  style={styles.add}>
        <Ionicons name="add" size={20} style={styles.addIcon}></Ionicons>
         </View>
        </TouchableOpacity>
       )}
           

           



           <View style={styles.headerWrapper}>
            <Text style={styles.header}>Payment Method</Text>
       </View>
           <View style={styles.card}>
                <View style={styles.userWrapper}>
                <RadioButton
                 color='#663399'
                    value="esewa"
                    status={ paymentMethod === 'esewa' ? 'checked' : 'unchecked' }
                    onPress={() => setPaymentMethod('esewa')}
                />
                <View style={styles.creaditCard}>
                <View style={styles.cardImageWrapper}>
                <Image style={styles.cardImage} source={require('../../assets/esewa_logo.png')}></Image>
                </View>
                </View>
                </View>
                <View style={styles.userWrapper}>
                <RadioButton
                color='#663399'
                    value="khalti"
                    status={ paymentMethod === 'khalti' ? 'checked' : 'unchecked' }
                    onPress={() => setPaymentMethod('khalti')}
                />
                <View style={styles.creaditCard}>
                <View style={styles.cardImageWrapper}>
                <Image style={styles.cardImage} source={require('../../assets/khalti-logo.png')}></Image>
                </View>
                </View>
                </View>
           </View>
        </View>
    </ScrollView>

    <View style={{paddingHorizontal: 20}}>
    <View style={styles.cartTotal}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.totalValue}>Rs. {subtotal}</Text>
            </View>
        {shippingAddress && paymentMethod ?(
            <TouchableOpacity style={styles.loginBtn} onPress={()=>payment()}>
                <Text style={styles.login}>Confirm to Pay</Text>
            </TouchableOpacity>
        ):(
            <TouchableOpacity style={styles.loginBtnDisabled} >
                <Text style={styles.login}>{paymentMethod ? 'Choose Shipping Address' : 'Choose Payment Method'}</Text>
            </TouchableOpacity>
        )}
    </View>

    </SafeAreaView>
    )
  )
}

const styles = StyleSheet.create({
    cardWrapper:{
        padding:20,
        paddingHorizontal:30
    },
    payProcessing: {
        fontWeight:'700',
        fontSize:24,
        fontFamily:"Raleway_700Bold",
        color: '#fff',
        textAlign: 'center',
        marginTop:20
    },
    subtitle: {
        fontSize:14,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color:'#e5e5e5',
        marginTop: 10,
        textAlign:'center',
    },
    formcontrol: {
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 10,
    },
    
    card:{
        backgroundColor:'#f5f5ff',
        padding:20,
        borderRadius:10,
        marginBottom:20,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 1,   
    },
    headerWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
    },
    header:{
        fontSize:17,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
    },
    change:{
        fontSize:15,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        color:'#663399',
    },
    userWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:15,
    },
    userName:{
        fontSize:17,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        marginLeft:10,
        flex: 1,
        flexWrap: 'wrap'
    },
    creaditCard:{
        flexDirection:'row',
        alignItems:'center'
    },
    cardImage:{
        height:20,
        width:70,
        resizeMode:'cover',
      

       
    },
    cardImageWrapper:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderColor:'#D6D9E0',
        borderWidth:1,
        borderRadius:10
    },
    cartTotal:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20
    },
    total:{
     fontSize:17,
     fontWeight:'400',
     fontFamily:'Raleway_400Regular',
     color:'#663399'
    },
    totalValue:{
     fontSize:22,
     fontWeight:'700',
     fontFamily:'Raleway_700Bold',
     color:'#663399'
    },
    loginBtnDisabled:{
        paddingVertical:10,
        borderRadius:10,
        marginTop:20,
        marginBottom:20,
        width: '100%',
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#cccccc",
        color: "#666666",
    },
    loginBtn:{
    paddingVertical:10,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:20,
    marginBottom:20,
    width: '100%',
   },
   login:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:20,
    color:'white',
   },
  

       checkbox:{
        color:'white',
        marginRight:8
    },

    add:{
        shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 14,
                margin:10,  
                height:40,
                width:40,
                borderRadius:20 ,
              
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#f5f5ff',
               
    
                },
                addIcon:{
                    textAlign:'center'
                }
})