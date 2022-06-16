import { StyleSheet, Text, ActivityIndicator, View,ScrollView,SafeAreaView,Dimensions,Image ,TouchableWithoutFeedback ,TouchableOpacity} from 'react-native'
import React,{useEffect,useState, useContext,useLayoutEffect} from 'react'
import { Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios'
import {imageLink} from '../ImageLink'
import bbstyles from '../Styles'


export default function Category({navigation}) {
    const[categories,setCategories] = useState([])
    const[active,setActive] = useState(false)
    const[activeCategory,setActiveCategory] = useState()
    const[loader,setLoader] = useState(true)

    useEffect(()=>{
        getCategory()
    },[])

    const getCategory = React.useCallback(async()=>{
        try {
            var response = await axios.get('/category')
            setCategories(response.data)
            setActiveCategory(response.data[0])
            setActive(response.data[0]._id)
            navigation.setOptions({
                title: response.data[0].name,
            })
            setLoader(false)
        } catch (error) {
            setLoader(false)
        }
    })


    const currentCategory = React.useCallback((category)=>{
        setActive(category._id)
        setActiveCategory(category)
        navigation.setOptions({
            title:category.name
        })
    })


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    {loader ? (
        <View style={bbstyles.loaderContainer}>
            <ActivityIndicator size={'large'} color='#663399'/>
        </View>
    ):(
        <>
        <View style={styles.categoryContainer}>
        {categories.map(category=>{
            return(
                <TouchableWithoutFeedback key={category._id} onPress={()=>currentCategory(category)}>
                <View>
                    <Text style={styles.categoryName}>
                        {category.name}
                    </Text>

                    {active==category._id?(
                        <View style={styles.borderBottom}></View>
                    ):(
                        <View></View>
                    )}
                </View>
                </TouchableWithoutFeedback>
            )
        })}   
        </View>
    <ScrollView >
       <View style={styles.cardWrapper}>
        <View style={styles.summerCat}>
            <Text style={styles.summerTitle}>SUMMER SALES</Text>
            <Text style={styles.summerSubtitle}>Up to 50% off</Text>
        </View>
    {activeCategory?(
        activeCategory.childrens.map(category=>{
            return(
                <TouchableOpacity style={styles.categories} key={category._id} onPress={()=>navigation.navigate('Child Category',category)}>
            <View style={styles.categoriesName}><Text style={styles.cateTitle}>{category.name}</Text></View>
            <Image source={{uri: imageLink+category.image}} style={styles.categoriesImage}></Image>
        </TouchableOpacity>
            )
        })
    ):(null)}
        
        

        

       </View>
       </ScrollView>
       </>
    )}
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
        paddingTop: 10,
        paddingBottom: 0,
        // width:Dimensions.get('window').width
    },
    categoryName:{
        fontSize:16,
        fontWeight:'600',
        paddingBottom:10,
        paddingHorizontal:30,  
        textAlign:'left' 
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