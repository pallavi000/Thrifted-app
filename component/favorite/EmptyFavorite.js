import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptyFavorite = () => {
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1,padding:20}}>
        <View style={{flex:1, alignItems:'center',justifyContent:'center',paddingBottom:90}}>
            <View>
                <Image source={require('../../assets/empty-favorite.png')} style={styles.image} />
            </View>
            <Text style={styles.header}>No Likes</Text>
            <Text style={styles.subtitle}>You have no notifications right now.</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.goBack()}>
                <View><Text style={styles.loginText}>Go Back</Text></View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default EmptyFavorite

const styles = StyleSheet.create({})