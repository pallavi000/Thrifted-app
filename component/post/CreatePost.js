import { StyleSheet, Text, View, SafeAreaView,ScrollView,Image,TextInput } from 'react-native'
import React from 'react'
import {Feather} from '@expo/vector-icons'
import { Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'

export default function CreatePost() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
     <ScrollView style={{position:'relative'}} >
        <View style={styles.container}>
            <Image source={require('../../assets/post.png')} style={styles.userImage} ></Image>
            <View style={styles.row}>
                <View style={styles.cameraContainer}>
                    <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                </View>
                <View style={styles.cameraContainer}>
                    <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                </View>
                <View style={styles.cameraContainer}>
                    <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                </View>
            </View>

            <View style={styles.uploadBtn}>
                <Text style={{fontSize:13,fontFamily:'Raleway_500Medium',color:'#868686'}}>Upload Photos</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>What are you selling? (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Tell buyers about your selling (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Category (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Quantity (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Color (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Brand (Optional)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Size (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Quantity (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Original Price(Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Listing Price (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Your Earning (When Sold)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Product Type (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 ></TextInput>
            </View>

        </View>
     </ScrollView>
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    cameraContainer:{
      padding:25,
        borderColor:'#C4C4C4BF',
        borderWidth:0.5
    },
    userImage:{
        height:150,
        width:170,
        resizeMode:'cover',
        borderColor:'#C4C4C4BF',
        borderWidth:0.5,
        margin:'auto',
        marginBottom:30,
        alignItems:'center'
    },
    uploadBtn:{
        paddingHorizontal:20,
        paddingVertical:8,
        borderColor:'#C4C4C480',
        borderWidth:1,
        textAlign:'center',
        borderRadius:5,
        marginVertical:20
    },
    textSecondary:{
        color:'#868686',
        fontSize:15,
        fontFamily:'Raleway_600SemiBold'

    },
    formGroup:{
        paddingBottom:10,
        marginBottom:20,
        borderBottomColor:'#C9C9C9',
        borderBottomWidth:1
    },
    label:{
        color:'#868686',
        fontSize:15,
        fontFamily:'Raleway_600SemiBold',
        marginBottom:10
    },
    input:{
       fontSize:17,
       fontWeight:'500',
       fontFamily:"Raleway_500Medium",
       borderWidth:0,
    },
})