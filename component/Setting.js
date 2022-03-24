import { View, Text,ScrollView,StyleSheet, TouchableWithoutFeedback ,TouchableOpacity} from 'react-native';
import React from 'react';
import bbstyles from './Styles';
import { FontAwesome } from '@expo/vector-icons';

const Setting = ({navigation}) => {

  return (
    <ScrollView style={[bbstyles.container,bbstyles.bgWhite]}>
        <View style={styles.setting}>
        <TouchableOpacity onPress={()=>navigation.navigate('My Closet')} >
            <View style={styles.settingLink}>
            <FontAwesome name='female' size={15}  /><Text style={styles.link} >My Closet</Text>
            </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>navigation.navigate('Profile')} >
           <View style={styles.settingLink}>
             <FontAwesome name='user' size={15}  /><Text style={styles.link}>My Profile</Text>
            </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>navigation.navigate('Order History')} >
           <View style={styles.settingLink}>
             <FontAwesome name='shopping-cart' size={15}  /><Text style={styles.link}>My Purchases</Text>
            </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>navigation.navigate('Address')} >
         <View style={styles.settingLink}>
             <FontAwesome name='map-marker' size={15}  /><Text style={styles.link}>Address</Text>
            </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>navigation.navigate('Sales History')} >
         <View style={styles.settingLink}>
             <FontAwesome name='history' size={15}  /><Text style={styles.link}>My Sales</Text>
            </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>navigation.navigate('Payouts')} >
         <View style={styles.settingLink}>
             <FontAwesome name='credit-card-alt' size={15}  /><Text style={styles.link}>Payouts</Text>
            </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>navigation.navigate('Logout')} >
         <View style={styles.settingLink}>
             <FontAwesome name='sign-out' size={15}  /><Text style={styles.link}>Logout</Text>
            </View>
        </TouchableOpacity>
        </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    settingLink:{
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
      paddingVertical:15,
     flexDirection:'row',
     alignItems:'center'
    

    },
    link:{
        marginLeft:5,
        fontWeight:'500'
    }
})


export default Setting;
