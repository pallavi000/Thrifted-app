import { StyleSheet,Image, SafeAreaView, ScrollView, Text, View ,Dimensions, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { AuthContext } from '../Context'
import axios from 'axios'
import bbstyles from '../Styles'
import { imageLink } from '../ImageLink'
import { useIsFocused } from '@react-navigation/native'

export default function Profile({navigation}) {
    const[user,setUser] = useState()
    const[loader,setLoader] = useState(true)
    const isFocused = useIsFocused()
    const data = useContext(AuthContext)
    const {token} = data
    const config = {
        headers:{
            'access-token': token
        }
    }

    const getUser = React.useCallback(async ()=>{
        try {
            const response = await axios.get('/user/currentuser',config)
            setUser(response.data.user)
            setLoader(false)
        } catch (error) {
            
        }
    },[])

    useEffect(() => {
        getUser()
    }, [isFocused])
    
  return (
<SafeAreaView style={{backgroundColor:'white',flex:1}} >
{loader?(
<View style={bbstyles.loaderContainer}>
    <ActivityIndicator size={'large'} color='#663399'/>
</View>
):(
     <ScrollView style={{position:'relative'}} >
        <View style={styles.cardWrapper}>
            <View style={styles.card}>
            <Image style={styles.userImg} source={{uri:imageLink+user.image}}></Image>
            <Text style={[styles.userName,{marginTop:30,marginBottom:10}]}>{user.name}</Text>
                <View style={styles.emailContainer}>
                <Feather name="mail" size={20}></Feather>
                <Text style={styles.mail}>{user.email}</Text>
                </View>
                <View style={styles.emailContainer}>
                <FontAwesome name='money' size={20}></FontAwesome>
                <Text style={styles.mail}>रु {user.balance}</Text>
                </View>
            </View>
            {/* <View style={styles.card}>
            <View style={styles.titleWrapper}>
                <Text style={styles.userName}>Edit</Text>
                <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
           
            </View> */}

            <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Edit Profile', user)}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Edit Profile</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Change Password')}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Change Password</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('My Orders')}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Order History</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Setting')}>
            <View style={styles.titleWrapper}>
            <Text style={styles.userName}>Notification</Text>
            <FontAwesome5 name="angle-right" size={20}></FontAwesome5>
            </View>
            </TouchableOpacity>



        </View>
    </ScrollView>
)}
</SafeAreaView>
  )
}

const styles = StyleSheet.create({

    MainHeader:{
        fontSize:37,
        fontWeight:'700',
        fontFamily:'Raleway_700Bold',
        marginBottom:20,
        marginBottom:60
    },
    cardWrapper:{
        padding:20,
        paddingHorizontal:30,
        paddingTop: 60
    },
    
    card:{
        backgroundColor:'#f5f5ff',
        padding:15,
        borderRadius:10,
        marginBottom:30,
        width: Dimensions.get('window').width-60,
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
        fontFamily:'Raleway_600SemiBold',
        textAlign:'center',

    },
    userImg:{
        height:76,
        width:76,
        resizeMode:'cover',
        position:'absolute',
        top:-38,
        left:0,
        borderRadius:38,
        transform: [{translateX:(Dimensions.get('window').width-128)/2}],
        borderWidth:0.4,
        borderColor:'#c4c4c4',
        
    },
    titleWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }

})