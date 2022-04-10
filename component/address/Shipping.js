import { StyleSheet, Text, View ,SafeAreaView,ScrollView, CheckBox} from 'react-native'
import React,{useState} from 'react'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import {Ionicons} from '@expo/vector-icons'

export default function Shipping() {
    const [isSelected, setSelection] = useState(false);
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
    <View style={styles.addressCard}>
        <View style={styles.address}>
            <Text style={styles.userName}>Jone Doe</Text>
            <Text style={styles.street}> 3 Newbridge Court </Text>
            <Text style={styles.street}>Chino Hills, CA 91709, United States</Text>
            <View style={styles.addressCheck}>
            <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.street}>Use as the shipping address</Text>
            </View>
        </View>
        <View style={styles.action}>
            <Text style={styles.edit}>Edit</Text>
        </View>
    </View>

    <View style={styles.addressCard}>
        <View style={styles.address}>
            <Text style={styles.userName}>Jone Doe</Text>
            <Text style={styles.street}> 3 Newbridge Court </Text>
            <Text style={styles.street}>Chino Hills, CA 91709, United States</Text>
            <View style={styles.addressCheck}>
            <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.street}>Use as the shipping address</Text>
            </View>
        </View>
        <View style={styles.action}>
            <Text style={styles.edit}>Edit</Text>
        </View>
    </View>

    <View style={styles.addressCard}>
        <View style={styles.address}>
            <Text style={styles.userName}>Jone Doe</Text>
            <Text style={styles.street}> 3 Newbridge Court </Text>
            <Text style={styles.street}>Chino Hills, CA 91709, United States</Text>
            <View style={styles.addressCheck}>
            <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.street}>Use as the shipping address</Text>
            </View>
        </View>
        <View style={styles.action}>
            <Text style={styles.edit}>Edit</Text>
        </View>
    </View>

    <View style={styles.add}>
        <Ionicons name="add" size={20} style={styles.addIcon}></Ionicons>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    addressCard:{
        backgroundColor:'#f5f5ff',
        padding:20,
        borderRadius:10,
        marginBottom:30,
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
        alignItems:'center',
        marginTop:15
    },
    checkbox:{
        backgroundColor:'#663399',
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
            height:10,
            width:10,
            borderRadius:20 ,
            padding:20,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#f5f5ff',
            
            


},
addIcon:{
    textAlign:'center'
}
  
})