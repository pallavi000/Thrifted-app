import { StyleSheet, Text, View, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Checkbox from 'expo-checkbox';
import { Raleway_500Medium } from '@expo-google-fonts/raleway';
import BrandCheck from '../../ui/BrandCheck';

export default function BrandFilter(props) {

  function brand_filter(id){
    if(props.brand_id.includes(id)){
        var x = props.brand_id.filter(br=>br !=id)
        props.setBrand_id(x)
    }else{
        var b = [...props.brand_id, id];
        props.setBrand_id(b)
    }
}

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView>
        <View style={styles.container}>
          {props.brands.map(brand=>{
            return(
              <View style={styles.brandFilter}>
              <View>
                <Text style={styles.brandName}>{brand.name}</Text>
              </View>
              <View style={styles.brandCheck}>
                <BrandCheck
                  brand = {brand}
                  brand_ids = {props.brand_id}
                  brand_filter = {brand_filter}
                />
              </View>
          </View>
            )
          })}
          </View>
          <View style={styles.filterApplySection}>
          <TouchableOpacity onPress={()=>props.setShowBrand(false)}>
              <Text style={styles.discard}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>props.setShowBrand(false)}>
              <Text style={styles.apply}>Apply</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
    },
    brandFilter:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
    },
    checkbox: {
        margin: 8,
        padding:10,
        borderColor:'#C4C4C4',
      },
      brandName:{
          fontSize:16,
          fontFamily:"Raleway_500Medium",
          fontWeight:'500',
      },
      activeBrand:{
        fontSize:16,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        color:'#663399'
      },
      apply:{
        paddingVertical:10,
        paddingHorizontal:60,
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        borderColor:'#663399',
        borderWidth:0.4,
        color:'#f5f5ff',
        backgroundColor:'#663399',
        borderRadius:25,
        marginVertical:10
    },
    discard:{
        paddingVertical:10,
        paddingHorizontal:50,
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        borderColor:'#663399',
        borderWidth:0.4, 
        marginVertical:10,
        borderRadius:25
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
        justifyContent:'space-evenly',
        alignItems:'center',
        paddingHorizontal:20
    },
    activeBrand:{
        color:'#663399'
    }
})

