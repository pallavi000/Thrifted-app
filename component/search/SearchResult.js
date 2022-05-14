import { StyleSheet, Text, View, SafeAreaView,FlatList, Dimensions,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { imageLink } from '../ImageLink'

const SearchResult = ({route,navigation}) => {
    const products = route.params
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
        <FlatList
        contentContainerStyle={styles.container}
        data={products}
        numColumns={2}
        keyExtractor={item => item._id}
        renderItem={({ item })=>(
            <TouchableOpacity onPress={()=>navigation.navigate('Product Detail',item)} key={item._id} style={styles.productWrapper}>
            <Image source={{uri:imageLink+item.image}} style={styles.productImage}></Image>
            <View style={styles.detailWrapper}>
            <Text style={styles.productName} numberOfLines={1} >{item.name}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:"Raleway_700Bold",marginVertical:1, marginRight:5}}>Brands</Text>
                <Text>{item.brand_id?.name}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:1,marginRight:5}}>Price</Text>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:1}}>Rs.{item.price}</Text>
            </View>
            </View>
        </TouchableOpacity>
        )}
    />
    </SafeAreaView>
  )
}

export default SearchResult

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20,
        paddingBottom:15,
        borderBottomColor:'#3C3C434A',
        borderBottomWidth:0.5,
    },
    sortContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    filter:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:"Raleway_400Regular",
        marginLeft:5,
        textTransform: 'capitalize'
    },
    container:{
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 50,
    },
    productImage:{
        height:210,
        resizeMode:'cover'
    },
    productWrapper:{
        width:(Dimensions.get('window').width-30)/2,
        marginBottom:15,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
    },
    productName:{
        fontSize:12,
        fontWeight:'500',
        marginVertical:5,
        fontFamily:"Raleway_600SemiBold"
    },
    detailWrapper:{
        padding:10,
        shadowColor: "#ddd",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 5,

        elevation: 7,
    }
})