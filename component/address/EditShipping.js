import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TextInput,TouchableOpacity} from 'react-native'
import React from 'react'
import { Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'

export default function EditShipping({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
        <View style={styles.container}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>street</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>City</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>State</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Zip Code(Postal Code)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Checkout')} >
            <Text style={styles.login}>Update Address</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    container:{
        padding:20
    },
    formGroup:{
        paddingBottom:5,
        marginBottom:15,
        borderBottomColor:'#C9C9C9',
        borderBottomWidth:1
    },
    label:{
        fontSize:16,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        color:'#868686',
        marginBottom:5
    },
    input:{
       fontSize:17,
       fontWeight:'500',
       fontFamily:"Raleway_500Medium",
       borderWidth:0,
    },
    loginBtn:{
        paddingVertical:15,
        paddingHorizontal:10,
        backgroundColor:'#663399',
        borderRadius:10,
        marginTop:50,
        marginHorizontal:20,
       },
       login:{
        textAlign:'center',
        fontFamily:'Raleway_700Bold',
        fontWeight:'700',
        fontSize:18,
        color:'white',
       },
})