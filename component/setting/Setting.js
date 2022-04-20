import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons,MaterialIcons,Feather,Ionicons,FontAwesome} from '@expo/vector-icons'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'

export default function Setting() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.pagesWrapper}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <MaterialCommunityIcons name='hanger' size={20}></MaterialCommunityIcons>
                    <Text style={styles.pageName}>My Closet</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                </View>  
                </View>

                <View style={styles.border}></View>

                <View style={styles.pagesWrapper}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <MaterialIcons name='person-outline' size={20}></MaterialIcons>
                        <Text style={styles.pageName}>My Profile</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.pagesWrapper}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Feather name='shopping-bag' size={20}></Feather>
                    <Text style={styles.pageName}>My Purchases</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                </View>  
                </View>

                <View style={styles.border}></View>

                <View style={styles.pagesWrapper}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Ionicons name='location-outline' size={20}></Ionicons>
                        <Text style={styles.pageName}>My Addresses</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.pagesWrapper}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <FontAwesome name='money' size={20}></FontAwesome>
                    <Text style={styles.pageName}>My Balance</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                </View>  
                </View>

                <View style={styles.border}></View>

                <View style={styles.pagesWrapper}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Ionicons name='briefcase-outline' size={20}></Ionicons>
                        <Text style={styles.pageName}>Pending Balance</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.pagesWrapper}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <MaterialCommunityIcons name='briefcase' size={20}></MaterialCommunityIcons>
                    <Text style={styles.pageName}>Redeem</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                </View>  
                </View>

                <View style={styles.border}></View>

                <View style={styles.pagesWrapper}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <MaterialCommunityIcons name='history' size={20}></MaterialCommunityIcons>
                        <Text style={styles.pageName}>Redeem History</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.pagesWrapper}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <MaterialIcons name='notifications-none' size={20}></MaterialIcons>
                    <Text style={styles.pageName}>Sales</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                </View>  
                </View>

                <View style={styles.border}></View>
                <View style={styles.pagesWrapper}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <MaterialIcons name='notifications-none' size={20}></MaterialIcons>
                        <Text style={styles.pageName}>New Arrivals</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                    </View>
                </View>
                <View style={styles.border}></View>
                <View style={styles.pagesWrapper}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <MaterialIcons name='notifications-none' size={20}></MaterialIcons>
                        <Text style={styles.pageName}>Delivery Status Changes</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name='chevron-double-right' size={20} color="#CDCDCD"></MaterialCommunityIcons>
                    </View>
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
    card:{
        padding:10,
        borderRadius:20,
        borderColor:'#E1E1E1',
        borderWidth:1,
        marginBottom:20,
        shadowColor: "rgba(0, 0, 0, 0.3)",
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.6,
shadowRadius: 3,
elevation: 1,
    },
    pagesWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10
    },
    pageName:{
        fontSize:13,
        fontFamily:'Raleway_700Bold',
        fontWeight:'700',
        marginLeft:5
    },
    border:{
        padding:10,
        borderBottomColor:'#CDCDCD',
        borderBottomWidth:1,
        margin:'auto',
       marginBottom:10,
        width:'80%',
        textAlign:'center'
    }
})