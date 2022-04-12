import { StyleSheet, Text, View, SafeAreaView, ScrollView ,Image ,TextInput} from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_500Medium } from '@expo-google-fonts/raleway'

export default function Messages() {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons  style={styles.searchIcon} name="search" size={20} color="#979797"></Ionicons>
                <TextInput style={styles.searchText}
                keyboardType="default"
                placeholder="Search"
                ></TextInput>
            </View>

            <View style={[styles.dFlex, styles.marginTop]}>
                <View style={styles.userWrapper}>
                    <View style={styles.ImageWrapper}>
                        <Image source={require('../../assets/user.png')} style={styles.image}></Image>
                    </View>
                    <View style={styles.userDetailwrpper}>
                        <Text style={styles.name}>Joshua_l</Text>
                        <Text style={styles.userMessage}>Hi, I'm pallavi</Text>
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    <Text style={styles.activeIndicator}></Text>
                    <Text style={styles.activeStatus}>now</Text>
                </View>
            </View>

            <View style={[styles.dFlex, styles.marginTop]}>
                <View style={styles.userWrapper}>
                    <View style={styles.ImageWrapper}>
                        <Image source={require('../../assets/user.png')} style={styles.image}></Image>
                    </View>
                    <View style={styles.userDetailwrpper}>
                        <Text style={styles.name}>Joshua_l</Text>
                        <Text style={styles.userMessage}>Hi, I'm pallavi</Text>
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    <Text style={styles.activeIndicator}></Text>
                    <Text style={styles.activeStatus}>now</Text>
                </View>
            </View>

            <View style={[styles.dFlex, styles.marginTop]}>
                <View style={styles.userWrapper}>
                    <View style={styles.ImageWrapper}>
                        <Image source={require('../../assets/user.png')} style={styles.image}></Image>
                    </View>
                    <View style={styles.userDetailwrpper}>
                        <Text style={styles.name}>Joshua_l</Text>
                        <Text style={styles.userMessage}>Hi, I'm pallavi</Text>
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    <Text style={styles.activeIndicator}></Text>
                    <Text style={styles.activeStatus}>now</Text>
                </View>
            </View>

            <View style={[styles.dFlex, styles.marginTop]}>
                <View style={styles.userWrapper}>
                    <View style={styles.ImageWrapper}>
                        <Image source={require('../../assets/user.png')} style={styles.image}></Image>
                    </View>
                    <View style={styles.userDetailwrpper}>
                        <Text style={styles.name}>Joshua_l</Text>
                        <Text style={styles.userMessage}>Hi, I'm pallavi</Text>
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    <Text style={styles.offlineIndicator}></Text>
                    <Text style={styles.activeStatus}>now</Text>
                </View>
            </View>

            <View style={[styles.dFlex, styles.marginTop]}>
                <View style={styles.userWrapper}>
                    <View style={styles.ImageWrapper}>
                        <Image source={require('../../assets/user.png')} style={styles.image}></Image>
                    </View>
                    <View style={styles.userDetailwrpper}>
                        <Text style={styles.name}>Joshua_l</Text>
                        <Text style={styles.userMessage}>Hi, I'm pallavi</Text>
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    <Text style={styles.activeIndicator}></Text>
                    <Text style={styles.activeStatus}>now</Text>
                </View>
            </View>
        </View>
        <View >
        </View>
        </ScrollView>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    searchContainer:{
        padding:10,
        backgroundColor:'#7676801F',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10
    },
    searchText:{
        color:'#979797',
        fontSize:16,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        marginLeft:8,
        height:25,
    },
    dFlex:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    marginTop:{
        marginTop:20
    },
    userWrapper:{
        flexDirection:'row',
       alignItems:'center'
    },
    image:{
        height:56,
        width:56,
        resizeMode:'cover',
        borderRadius:28,
        borderColor:'#C7C7CC',
        borderWidth:0.4
    },
    ImageWrapper:{
        height:64,
        width:64,
        borderRadius:32,
        borderWidth:0.4,
        borderColor:'#C7C7CC',
        marginRight:10,
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:"Raleway_500Medium",
        marginBottom:8
    },
    userMessage:{
        fontSize:12,
        fontWeight:400,
        fontFamily:"Raleway_400Regular"
    },
    activeStatus:{
        fontSize:12,
        fontWeight:'400',
        fontFamily: 'Raleway_400Regular',
        color:'rgba(0, 0, 0, 0.4)'
    },
    statusWrapper:{
        justifyContent:'center',
        alignItems:'center'
    },
    activeIndicator:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#4CD964'
    },
    offlineIndicator:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#FF2424' 
    }

})