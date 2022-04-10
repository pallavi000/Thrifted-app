import { StyleSheet, Text, View,ScrollView,SafeAreaView,Dimensions,Image } from 'react-native'
import React from 'react'
import { Raleway_600SemiBold } from '@expo-google-fonts/raleway'
export default function Category() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
       
        <View style={styles.categoryContainer}>
            <View>
            <Text style={styles.categoryName}>Women</Text>
                <View style={styles.borderBottom}></View>
            </View>
            <View>
            <Text style={styles.categoryName}>Men</Text>
            <View ></View>
            </View>
            <View>
            <Text style={styles.categoryName}>Kids</Text>
            <View ></View>
            </View>
        </View>
       <View style={styles.cardWrapper}>
        <View style={styles.summerCat}>
            <Text style={styles.summerTitle}>SUMMER SALES</Text>
            <Text style={styles.summerSubtitle}>Up to 50% off</Text>
        </View>

        <View style={styles.categories}>
            <View style={styles.categoriesName}><Text style={styles.cateTitle}>New</Text></View>
            <Image source={require('../../assets/cate1.png')} style={styles.categoriesImage}></Image>
        </View>

        <View style={styles.categories}>
            <View style={styles.categoriesName}><Text style={styles.cateTitle}>Clothes</Text></View>
            <Image source={require('../../assets/cate2.png')} style={styles.categoriesImage}></Image>
        </View>

        <View style={styles.categories}>
            <View style={styles.categoriesName}><Text style={styles.cateTitle}>Shoes</Text></View>
            <Image source={require('../../assets/cate3.png')} style={styles.categoriesImage}></Image>
        </View>

        <View style={styles.categories}>
            <View style={styles.categoriesName}><Text style={styles.cateTitle}>Accesories</Text></View>
            <Image source={require('../../assets/cate4.png')} style={styles.categoriesImage}></Image>
        </View>

       </View>
       </ScrollView>
       </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    cardWrapper:{
        padding:20,
        paddingHorizontal:20
    
    },
    categoryContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:5,
        // width:Dimensions.get('window').width
    },
    categoryName:{
        fontSize:16,
        fontWeight:'600',
        paddingBottom:10,
        paddingHorizontal:30,   
    },
    borderBottom:{
        borderBottomColor:'#663399',
        borderBottomWidth:2 ,
        paddingHorizontal:0
    },
    summerCat:{
        padding:40,
        backgroundColor:'#663399',
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        borderRadius:10,
    },
    summerTitle:{
        fontSize:24,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        color:'#F6F6F6',
        textAlign:'center'
    },
    summerSubtitle:{
        fontSize:14,
        fontWeight:'500',
        color:'#F6F6F6',
        textAlign:'center',
        marginTop:5
    },
    categories:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#2A2C36',
        borderRadius:10,
        marginVertical:20,
        flex: 2,
    },
    cateTitle:{
        fontSize:18,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold',
        color:'white',
        textAlign:'center',
        padding:20,
    },
    categoriesName:{
        backgroundColor:'#2A2C36',
        flex:1
        
    },
    categoriesImage:{
 
    resizeMode:'cover',
    height: 130,
    width: 171,
    borderTopRightRadius:10,
    borderBottomRightRadius:10

    }


})