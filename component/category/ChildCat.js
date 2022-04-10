import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native'
import React from 'react'
import { Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'

export default function ChildCat() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
    <View><Text style={styles.select}>Select Category</Text></View>
    <View style={styles.categoryWrapper}>
    <View><Text style={styles.name}>Tops</Text></View>
    <View><Text style={styles.name}>Shirt and Blouses</Text></View>
    <View><Text style={styles.name}>Cardigans & Sweaters</Text></View>
    <View><Text style={styles.name}>Knitwear</Text></View>
    <View><Text style={styles.name}>Blazers</Text></View>
    <View><Text style={styles.name}>Pants</Text></View>
    <View><Text style={styles.name}>Jeans</Text></View>
    <View><Text style={styles.name}>Shorts</Text></View>
    <View><Text style={styles.name}>Skirts</Text></View>
    <View><Text style={styles.name}>Dresses</Text></View>
    </View>
   
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    select:{
        fontSize:16,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        padding:20
    },
    categoryWrapper:{
        marginVertical:10
    },
    name:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:'Raleway_600SemiBold',
       paddingVertical:20,
        borderBottomColor:'#c4c4c4',
        borderBottomWidth:1,
        paddingHorizontal:20
    }
})