import { StyleSheet, Text, View,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native'
import React,{useLayoutEffect} from 'react'
import { Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'

export default function ChildCat({navigation,route}) {
 
  const category = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      title:category.name
    })
  }, [])

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
    <View><Text style={styles.select}>Select Category</Text></View>
    <View style={styles.categoryWrapper}>
    {category.childrens.map(child=>{
      return(
      <TouchableOpacity key={child._id} onPress={()=>navigation.navigate('Category Title',child)}><Text style={styles.name}>{child.name} ({child.productcount})</Text></TouchableOpacity>
      )
    })}
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