import { StyleSheet,Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'

export default function Profile() {
  return (
<SafeAreaView style={{backgroundColor:'white',flex:1}} >
     <ScrollView style={{position:'relative'}} >
        <View style={styles.cardWrapper}>
        <Text style={styles.MainHeader}>My Profile</Text>
            <View style={styles.card}>
            <Image style={styles.userImg} source={require('../../assets/Saly-10.png')}></Image>
            <Text style={styles.userName}>John Sudo</Text>
                <View style={styles.emailContainer}>
                <Feather name="mail" size={20}></Feather>
                <Text style={styles.mail}>bgattaraipallavi4@gmail.com</Text>
                </View>
                <View style={styles.emailContainer}>
                <FontAwesome name='money' size={20}></FontAwesome>
                <Text style={styles.mail}>bgattaraipallavi4@gmail.com</Text>
                </View>
            </View>
            <View style={styles.card}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Edit</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
           
            </View>

            <View style={styles.card}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Change Password</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
            </View>

            <View style={styles.card}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Order History</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
            </View>

            <View style={styles.card}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Cards</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
            </View>

            <View style={styles.card}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Notification</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
            </View>



        </View>
    </ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({

    MainHeader:{
        fontSize:37,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        marginBottom:20
    },
    cardWrapper:{
        padding:20,
        paddingHorizontal:30,
       
    
    },
    
    card:{
        backgroundColor:'#f5f5ff',
        padding:20,
        borderRadius:10,
        marginBottom:30,
        shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.6,
            shadowRadius: 3,
            elevation: 1,

      
    
    },
    emailContainer:{

        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10
    },
    mail:{
        fontSize:15,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        marginLeft:10
    },
    userName:{
        fontSize:18,
        fontWeight:'600',
        fontFamily:'Raleway_600SemiBold'
    },
    userImg:{
        height:76,
        width:76,
        resizeMode:'cover',
        position:'absolute',
        top:0,
        left:0,
        borderRadius:40
    },
    titleWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }

})