import { StyleSheet, Text, View,Image,Dimensions,ScrollView,SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts, Raleway_700Bold, Raleway_800ExtraBold, Raleway_600SemiBold,Raleway_400Regular, Raleway_500Medium } from '@expo-google-fonts/raleway';


export default function Welcome({navigation}) {

    let [fontsLoaded] = useFonts({
        Raleway_700Bold, Raleway_800ExtraBold, Raleway_600SemiBold,Raleway_400Regular,Raleway_500Medium
    });
    if (!fontsLoaded) {
        return null;
    }

  return (
    <SafeAreaView style={{backgroundColor:'#663399',flex:1}}>
    <ScrollView>
    <View style={styles.container}>
    <Text style={styles.title}>Affordable Thrift Store</Text>
        <View>
            <Image source={require('../../assets/Saly-10.png')} style={styles.imagecss}></Image>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('login')}>
            <View><Text style={styles.started}>Get Started</Text></View>
        </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
       padding:20,
        backgroundColor:'#663399',
        paddingTop:50

    },

    title:{
        fontWeight: '800',
        fontSize: 50,
        color:'white',
        fontFamily:'Raleway_800ExtraBold',    
    },
    imagecss:{
     width:Dimensions.get('window').width-40,
        height:314,
     resizeMode:'contain',
    },

    started:{
        fontWeight:'700',
        fontSize:20,
        color:'#663399',
        paddingVertical:10,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:90,
        textAlign:'center',
        fontFamily:'Raleway_700Bold'
    }

})