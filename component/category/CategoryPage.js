import { StyleSheet, Text, View,SafeAreaView, ScrollView,Image ,Dimensions} from 'react-native'
import React from 'react'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'

export default function CategoryPage() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
    <View style={styles.row}>
    <View style={styles.sortContainer}>
      <Ionicons name='filter' size={20}></Ionicons>
      <Text style={styles.filter}>Filters</Text>
    </View>
    <View style={styles.sortContainer}>
    <MaterialCommunityIcons name='swap-vertical' size={20}></MaterialCommunityIcons>
        <Text style={styles.filter}>Price: lowest to high</Text>
    </View>
    </View>
    
    <View style={styles.container}>
        <View style={styles.productWrapper}>
            <Image source={require('../../assets/product1.png')} style={styles.productImage}></Image>
            <View style={styles.detailWrapper}>
            <Text style={styles.productName} >Puma Shirt</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px', marginRight:5}}>Brands</Text>
                <Text>Puma</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px',marginRight:5}}>Price</Text>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px'}}>Rs.500.00</Text>
            </View>
            </View>
        </View>

        <View style={styles.productWrapper}>
            <Image source={require('../../assets/product1.png')} style={styles.productImage}></Image>
            <View style={styles.detailWrapper}>
            <Text style={styles.productName} >Puma Shirt</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px', marginRight:5}}>Brands</Text>
                <Text>Puma</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px',marginRight:5}}>Price</Text>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px'}}>Rs.500.00</Text>
            </View>
            </View>
        </View>
        <View style={styles.productWrapper}>
            <Image source={require('../../assets/product1.png')} style={styles.productImage}></Image>
            <View style={styles.detailWrapper}>
            <Text style={styles.productName} >Puma Shirt</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px', marginRight:5}}>Brands</Text>
                <Text>Puma</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px',marginRight:5}}>Price</Text>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px'}}>Rs.500.00</Text>
            </View>
            </View>
        </View>
        <View style={styles.productWrapper}>
            <Image source={require('../../assets/product1.png')} style={styles.productImage}></Image>
            <View style={styles.detailWrapper}>
            <Text style={styles.productName} >Puma Shirt</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px', marginRight:5}}>Brands</Text>
                <Text>Puma</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px',marginRight:5}}>Price</Text>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:'5px'}}>Rs.500.00</Text>
            </View>
            </View>
        </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20,
        paddingBottom:15,
        borderBottomColor:'#3C3C434A',
        borderBottomWidth:0.5,
        marginBottom:15
    },
    sortContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    filter:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Raleway_400Regular',
        marginLeft:5
    },
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
     
    },
    productImage:{
        height:210,
        resizeMode:'cover'

    },
    productWrapper:{
      
        width:(Dimensions.get('window').width-20)/2,
        marginRight:10,
        marginBottom:10,
        
    },
    productName:{
        fontSize:12,
        fontWeight:'500',
        marginVertical:5,
        fontFamily:'Raleway_600SemiBold'
    },
    detailWrapper:{
        padding:10,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,
    }

})