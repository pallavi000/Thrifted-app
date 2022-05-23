import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity,Alert, ActivityIndicator, FlatList, Image, Dimensions} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import {Fontisto, Ionicons} from '@expo/vector-icons'
import CheckBox from 'expo-checkbox'
import axios from 'axios'
import { AuthContext } from '../Context'
import {useFocusEffect, useIsFocused} from '@react-navigation/native'
import CustomCheckBox from '../ui/CustomCheckBox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import bbstyles from '../Styles'


export default function Shipping(props) {

    const[addresses,setAddresses] = useState([])
    const {navigation} = props
    const IsFocused = useIsFocused()
    const [isSelected, setSelection] = useState(0);
    const [loader, setLoader] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(0)

    async function loadSelectedCheckBox() {
        var addressId = await AsyncStorage.getItem('shippingId')
        setSelection(addressId)
    }
    

    useEffect(()=>{
        loadSelectedCheckBox()
    },[isSelected])

   

    const data = useContext(AuthContext)
        const {token} = data
        const config = {
            headers:{
                'access-token': token
            }
        }

    useEffect(() => {
        getaddress()
    }, [IsFocused])
    
async function getaddress(){
    try {
        var response = await axios.get('/address',config)
        setAddresses(response.data) 
        if(!isSelected && response.data && response.data.length>0) {
            setSelection(response.data[0]._id)
            await AsyncStorage.setItem('shippingId',response.data[0]._id)
        }
        setLoader(false)
    } catch (error) {
       Alert.alert('Error', error.request.response)
    }

}

async function removeAddress(id){
    setIsSubmitting(id)
    try {
        var response =await axios.delete('/address/'+id,config)
        var deleted= addresses.filter(address=>address._id!= id)
        setAddresses(deleted)
        if(isSelected==id) {
            await AsyncStorage.removeItem('shippingId')
            if(deleted && deleted.length>0) {
                setSelection(deleted[0]._id)
                await AsyncStorage.setItem('shippingId',deleted[0]._id)
            } else {
                setSelection(0)
            }
        }
        setIsSubmitting(0)
        // Alert.alert('Success','Address Deleted!')
    } catch (error) {
        setIsSubmitting(0)
        Alert.alert('Error',error.request.response)
    }
}

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1,padding:10}} >
    {loader ? (
        <View style={bbstyles.loaderContainer}>
            <ActivityIndicator size={'large'} color='#663399'/>
        </View>
    ):(
    addresses && addresses.length !=0?(
        <FlatList
        data={addresses}
        keyExtractor={item=>item._id}
        renderItem={({item})=>(
            <View key={item._id} style={styles.addressCard}>
            <View style={styles.address}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.street}> {item.street} </Text>
            <Text style={styles.street}>{item.city}, {item.district}, {item.zipcode}, Nepal</Text>
            <View style={styles.addressCheck}>
           
            <CustomCheckBox
                id={item._id}
                loadSelectedCheckBox={loadSelectedCheckBox}
                isSelected={isSelected}
                setSelection={setSelection}
            />
             
            <Text style={styles.street}>Use as the shipping address</Text>
            </View>
        </View>
            <View style={styles.action}>
            <TouchableOpacity onPress={()=>navigation.navigate('Edit Address',item)}>
                <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
                {isSubmitting==item._id?(
                    <TouchableOpacity style={[styles.edit,{color:'red',marginBottom:10}]}>
                        <ActivityIndicator size={'small'} color='#fa4a0c' />
                    </TouchableOpacity>
                ):(
                <TouchableOpacity onPress={()=>removeAddress(item._id)}>
                    <Text style={[styles.edit,{color:'red',marginBottom:10}]}>Delete</Text>
                </TouchableOpacity>
                )}
            </View>
        </View>
        )}
        ListFooterComponent={()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('Add Address')} style={styles.add}>
                <Fontisto name="plus-a" size={24} style={styles.addIcon} />
            </TouchableOpacity>
        )}
        />
    ):(
        <>
        <View style={{flex:1, alignItems:'center',justifyContent:'center',paddingBottom:50}}>
            <View>
                <Image source={require('../../assets/empty-address.png')} style={styles.image} />
            </View>
            <Text style={styles.header}>No Address Added Yet</Text>
            <Text style={styles.subtitle}>Click the button below to add</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Add Address')} style={[styles.add,{marginBottom:30}]}>
            <Fontisto name="plus-a" size={24} style={styles.addIcon} />
        </TouchableOpacity>
        </>
    )
    )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width-40,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20
    },
    header: {
        fontWeight:'700',
        fontSize:28,
        fontFamily:"Raleway_700Bold",
        color: '#262626',
        textAlign: 'center'
    },
    subtitle: {
        fontSize:12,
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        color:'#868686',
        marginTop: 10,
        textAlign:'center',
    },
    action:{
            justifyContent:'space-between'
    },
    addressCard:{
        backgroundColor:'#f5f5ff',
        padding:20,
        borderRadius:10,
        marginBottom:10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.6,
            shadowRadius: 3,
            elevation: 1,
            margin:20,
            flexDirection:'row',
            justifyContent:'space-between',
            
    },
    userName:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Raleway_600SemiBold',
        marginBottom:15
    },
    street:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        marginBottom:10
    },
    edit:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Raleway_600SemiBold',
        color:'#663399'
    },
    addressCheck:{
        flexDirection:'row',
        marginTop:15
    },
    checkbox:{
        color:'white',
        marginRight:8
    },

add:{
    shadowColor: "#663399",
shadowOffset:{
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
    margin:10,  
    height:50,
    width:50,
    borderRadius:25 ,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f5f5ff',
    },
    addIcon:{
        textAlign:'center',
        color: '#663399'
    }
  
})