import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import {Feather, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
import { Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'

export default function RedeemHistory() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.pendingCard}>
                <View>
                    <Text styles={styles.title}>Esewa . 9845534234</Text>
                            <View style={styles.row}>
                                <Text style={styles.subtitle}>02/03/2022</Text>
                                <Text style={styles.subtitle}>05:30:21</Text>
                            </View>
                        </View>

                <View style={styles.pendingAction}>
                <MaterialCommunityIcons style={styles.icon} name='timer-sand-empty' size={20}></MaterialCommunityIcons>
                </View>
           </View>

            <View style={styles.cancelledCard}>
                <View>
                    <Text styles={styles.title}>Esewa . 9845534234</Text>
                            <View style={styles.row}>
                                <Text style={styles.subtitle}>02/03/2022</Text>
                                <Text style={styles.subtitle}>05:30:21</Text>
                            </View>
                        </View>

                <View style={styles.cancelledAction}>
                <Ionicons name='close' style={styles.icon} size={20}></Ionicons>
                </View>
            </View>

         <View style={styles.successCard}>
                <View>
                    <Text styles={styles.title}>Esewa . 9845534234</Text>
                            <View style={styles.row}>
                                <Text style={styles.subtitle}>02/03/2022</Text>
                                <Text style={styles.subtitle}>05:30:21</Text>
                            </View>
                        </View>

                <View style={styles.successAction}>
                <Feather name='check' style={styles.icon} size={20}></Feather>
                </View>
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
    pendingCard:{
        backgroundColor:'#f5f5ff',
        padding:20,
        borderRadius:10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.6,
            shadowRadius: 3,
            elevation: 1, 
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:20  
    },
    cancelledCard:{
        backgroundColor:'rgba(255, 36, 36, 0.25)',
        padding:20,
        borderRadius:10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.6,
            shadowRadius: 3,
            elevation: 1,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center' ,
            marginTop:20   
    },
    successCard:{
        backgroundColor:'rgba(76, 217, 100, 0.25)',
        padding:20,
        borderRadius:10,
       
        shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.6,
            shadowRadius: 3,
            elevation: 1,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center' ,
            marginTop:20  
    },
   
    row:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:7
    },
    pendingAction:{
        backgroundColor:'#68B6F3',
        height:24,
        width:24,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        color:'white'

    },
    cancelledAction:{
        backgroundColor:'#FF2424',
        height:24,
        width:24,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        color:'white'

    },
    successAction:{
        backgroundColor:'#4CD964',
        height:24,
        width:24,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        color:'white'

    },
    icon:{
        fontSize:15,
        alignItems:'center',
        fontWeight:'500',
        color:'white'
    },
    dFlex:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'  
    },
    title:{
        fontSize:14,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
     
    },
    subtitle:{
        fontSize:14,
        color:'#868686',
        fontWeight:'600',
        fontFamily:"Raleway_600SemiBold",
        marginRight:10
    }
})