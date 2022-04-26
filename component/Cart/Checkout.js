import { View ,Text,SafeAreaView, Image,Dimensions,TouchableOpacity, StyleSheet,Alert, Button,ScrollView,TouchableWithoutFeedback, ViewPagerAndroidBase, TouchableOpacityComponent} from 'react-native'

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
import { v4 as uuidv4 } from 'uuid';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';


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


const IsFocused = useIsFocused()

async function loadSelectedCheckBox() {
    var addressId = await AsyncStorage.getItem('shippingId')
    setSelectedId(addressId)
}

useEffect(()=>{
if(addresses && addresses.length>0 && selectedId){
    console.log('address find')
    var shippingAddress = addresses.find(address=>address._id==selectedId)
    if(shippingAddress){
        setShippingAddresses(shippingAddress)
    }
}
},[addresses,selectedId])


const data = useContext(AuthContext)
        const {token,subtotal} = data
        const config = {
            headers:{
                'access-token': token
            }
        }
        
    useEffect(() => {
        getaddress()
        loadSelectedCheckBox()
    }, [IsFocused])
    
async function getaddress(){
    try {
        var response = await axios.get('/address',config)
        setAddresses(response.data)
    } catch (error) {
       //Alert.alert('Error', error.request.response)
    }
}


function changeBillingAddress(id){
    var billing = addresses.find(address=>address._id == id)
    if(billing){
        setBillingAddress(billing)
    }
}

function orderSuccess() {
    navigation.navigate('Order Success')

}


function payment(){
    if(!paymentMethod){
        Alert.alert('Please Select Payment Method')
        return
    }
    const data={
        total:subtotal+shippingFee,
        shipping:shippingFee,
        note: '',
        transaction_id:pid,
        payment_method:paymentMethod
      }
    axios.post('/order',data,config).then(res=>{
        if(paymentMethod=='khalti'){
            setKhaltiVisible(true)
        }else{
            setEsewaVisible(true)
        }

    }).catch(err=>{
        Alert.alert('Error',err.request.response)
    })
}

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
    <Esewa
        orderSuccess={orderSuccess}
        total={subtotal}
        pid={pid}
        visible={esewaVisible}
        setVisible={setEsewaVisible}
    />
    <Khalti
        orderSuccess={orderSuccess}
        total={subtotal}
        pid={pid}
        visible={khaltiVisible}
        setVisible = {setKhaltiVisible}
    />
       <View style={styles.cardWrapper}>
       <View style={styles.headerWrapper}>
            <Text style={styles.header}>Shipping Information</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('account',{screen:'Shipping Address'})}>
            <Text style={styles.change}>Change</Text>
            </TouchableOpacity>
       </View>
       {shippingAddress?(
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
               <Checkbox value={sameBilling} style={styles.checkbox} onValueChange={setSameBilling}></Checkbox>
                <Text>Same as Shipping Address</Text>
           </View>
           {!sameBilling?(

            <Picker
                    style={styles.formcontrol}
                     selectedValue={billingAddress._id}
                        onValueChange={itemValue =>
                        changeBillingAddress(itemValue)
                    }>
                  <Picker.Item  label="Selelct Billing Address" value="" />
                    {addresses.map(address=>{
                        return(
                           
                            <Picker.Item  label={`${address.street}, ${address.city}, ${address.district}, ${address.zipcode}, Nepal`} value={address._id} />
                            
                        )
                    })}
                </Picker>
           ):(null)}
           </>
       ):(
        <TouchableOpacity onPress={()=>navigation.navigate('account',{screen:'Add Shipping Address'})} style={[styles.card,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10}]}>
        <Text>Add Shipping Address</Text>
        <View  style={styles.add}>
        <Ionicons name="add" size={20} style={styles.addIcon}></Ionicons>
         </View>
        </TouchableOpacity>
       )}
           

           



           <View style={styles.headerWrapper}>
            <Text style={styles.header}> Payement Method</Text>
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

           <View style={styles.cartTotal}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.totalValue}>Rs. {subtotal}</Text>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>payment()} >

            <Text style={styles.login}>Confirm to Pay</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    cardWrapper:{
        padding:20,
        paddingHorizontal:30
    
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
        marginVertical:15
    },
    userName:{
        fontSize:17,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        marginLeft:10
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
        marginTop:50
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
    loginBtn:{

        paddingVertical:10,
        paddingHorizontal:10,
        width:Dimensions.get('window').width-60,
        backgroundColor:'#663399',
        borderRadius:10,
        marginTop:50,
        marginBottom:30
       
    
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