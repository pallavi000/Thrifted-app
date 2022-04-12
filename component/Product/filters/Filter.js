import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native'
import React from 'react'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import {Fontisto} from '@expo/vector-icons'

export default function Filter() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.filterSection}>
                <Text style={styles.title}>Price Range</Text>
            </View>
            <View style={styles.filterSection}>
                <Text style={styles.title}>Colors</Text>
                <View style={styles.filterContainer}>
                    <View style={styles.colorFilter}>
                        <View style={styles.colorBlack}></View>
                    </View>
                        <View style={styles.colorWhite}></View>
                        <View style={styles.colorGray}></View>
                        <View style={styles.colorOrange}></View>
                        <View style={styles.colorBlue}></View>
                        <View ></View>
                        <View ></View>
                        <View ></View>
                </View>
                </View>

                <View style={styles.filterSection}>
                    <Text style={styles.title}>Size</Text>
                        <View style={styles.filterContainer}>
                        <View ><Text style={styles.size}>XS</Text></View>
                        <View ><Text style={styles.activeSize}>S</Text></View>
                        <View ><Text style={styles.activeSize}>M</Text></View>
                        <View ><Text style={styles.size}>L</Text></View>
                        <View ><Text style={styles.size}>XL</Text></View>
                        <View ></View>
                        <View ></View>
                    </View>
                </View>
                <View style={styles.filterSection}>
                <Text style={styles.title}>Category</Text>
                        <View style={styles.filterContainer}>
                            <Text style={styles.activeCategory}>All</Text>
                            <Text style={styles.category}>Women</Text>
                            <Text style={styles.category}>Men</Text>
                            <Text style={styles.category}>Boys</Text>
                            <Text style={styles.category}>Girls</Text>
                        </View>
                    </View>

                    <View style={styles.filterSection}>
                        <Text style={styles.title}>Brand</Text>
                        <View style={styles.BrandFilter}>
                            <Text style={styles.subtitle}>adidas Originals, Jack & Jones, s.Oliver</Text>
                            <Fontisto name='angle-right' size={20}></Fontisto>
                           
                        </View>
                    </View>

                <View style={styles.filterApplySection}>
                    <Text style={styles.discard}>Discard</Text>
                    <Text style={styles.apply}>Apply</Text>
                </View>



                </View>
        </ScrollView>
        </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    filterSection:{
        padding:20,
        // borderBottomColor:'#C9C9C9',
        // borderBottomWidth:1,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
            },
    title:{
        fontSize:16,
        fontFamily:'Raleway_700Bold',
        fontWeight:'700',
      
    },

    filterContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        flexWrap:'wrap',
        marginTop:20
    },
    colorFilter:{
        height:44,
        width:44,
        borderRadius:22,
        borderColor:'#020202',
        borderWidth:1,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
      
    },
    colorBlack:{
        height:36,
        width:36,
        borderRadius:18,
        backgroundColor:'#020202',
        borderColor:'rgba(0, 0, 0, 0.25)',
        borderWidth:1
    },
    colorWhite:{
        height:36,
        width:36,
        borderRadius:18,
        backgroundColor:' #F6F6F6',
        borderColor:'rgba(0, 0, 0, 0.25)',
        borderWidth:1
    },
    colorOrange:{
        height:36,
        width:36,
        borderRadius:18,
        backgroundColor:'#F48117',
        borderColor:'rgba(0, 0, 0, 0.25)',
        borderWidth:1

    },
    colorBlue:{
        height:36,
        width:36,
        borderRadius:18,
        backgroundColor:'#2CB1B1',
        borderColor:'rgba(0, 0, 0, 0.25)',
        borderWidth:1
    },
    colorGray:{
        height:36,
        width:36,
        borderRadius:18,
        backgroundColor:'#BEA9A9',
        borderColor:'rgba(0, 0, 0, 0.25)',
        borderWidth:1
    },

    size:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:"Raleway_500Medium",
        borderColor:'#ABB4BD',
        borderWidth:0.4,
        paddingVertical:10,
        paddingHorizontal:14,
        borderRadius:7,
       
    },

    activeSize:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:"Raleway_500Medium",
        backgroundColor:'#663399',
        color:'white',
        borderColor:'#ABB4BD',
        borderWidth:0.4,
        paddingVertical:10,
        paddingHorizontal:14,
        borderRadius:7,
    },
    category:{
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
        borderColor:'#ABB4BD',
        borderWidth:0.4,
        marginBottom:10
    },
    activeCategory:{
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        paddingVertical:10,
        paddingHorizontal:30,
        borderRadius:10,
        borderColor:'#ABB4BD',
        borderWidth:0.4,
        backgroundColor:'#663399',
        color:'white',
        marginBottom:10
    },
    subtitle:{
        fontSize:12,
        fontFamily:'Raleway_400Regular',
        fontWeight:'400',
    },
    BrandFilter:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    filterApplySection:{
        backgroundColor:'#f5f5ff',
        padding:10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: -4,
            },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    apply:{
        paddingVertical:15,
        paddingHorizontal:60,
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        borderColor:'#663399',
        borderWidth:0.4,
        color:'#f5f5ff',
        backgroundColor:'#663399',
        borderRadius:25,
        marginVertical:20
    },
    discard:{
        paddingVertical:15,
        paddingHorizontal:50,
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        borderColor:'#663399',
        borderWidth:0.4, 
        marginVertical:20,
        borderRadius:25
    }


    


   
})