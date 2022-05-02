import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity,Alert} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import {Ionicons} from '@expo/vector-icons'
import CheckBox from 'expo-checkbox'
import axios from 'axios'
import { AuthContext } from '../Context'
import {useFocusEffect, useIsFocused} from '@react-navigation/native'
import CustomCheckBox from '../ui/CustomCheckBox'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Shipping(props) {

    const[addresses,setAddresses] = useState([])
    const {navigation} = props
    const IsFocused = useIsFocused()
    const [isSelected, setSelection] = useState(0);

    async function loadSelectedCheckBox() {
        var addressId = await AsyncStorage.getItem('shippingId')
        setSelection(addressId)

    }
    

    useEffect(()=>{
        loadSelectedCheckBox()
    },[])

   

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
    } catch (error) {
       Alert.alert('Error', error.request.response)
    }

}

async function removeAddress(id){
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
        Alert.alert('Success','Address Deleted!')
    } catch (error) {
        Alert.alert('Error',error.request.response)
    }
}

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
    {addresses && addresses.length !=0?(
        addresses.map(address=>{
        return(
            <View key={address._id} style={styles.addressCard}>
            <View style={styles.address}>
            <Text style={styles.userName}>{address.name}</Text>
            <Text style={styles.street}> {address.street} </Text>
            <Text style={styles.street}>{address.city}, {address.district}, {address.zipcode}, Nepal</Text>
            <View style={styles.addressCheck}>
           
            <CustomCheckBox
                id={address._id}
                loadSelectedCheckBox={loadSelectedCheckBox}
                isSelected={isSelected}
                setSelection={setSelection}
            />
             
            <Text style={styles.street}>Use as the shipping address</Text>
            </View>
        </View>
        <View style={styles.action}>
        <TouchableOpacity onPress={()=>navigation.navigate('Edit Address',address)}>
            <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>removeAddress(address._id)}>
                <Text style={[styles.edit,{color:'red',marginBottom:10}]}>Delete</Text>
                </TouchableOpacity>
        </View>
    </View>
        )
    })
    ):(null)}
    
 
    <TouchableOpacity onPress={()=>navigation.navigate('Add Address')} style={styles.add}>
        <Ionicons name="add" size={20} style={styles.addIcon}></Ionicons>
    </TouchableOpacity>


    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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