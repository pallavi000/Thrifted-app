import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React,{useState} from 'react'
import Checkbox from 'expo-checkbox';
import { Raleway_500Medium } from '@expo-google-fonts/raleway';

export default function BrandFilter() {
    const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView>
        <View style={styles.container}>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>Adidas Originals</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>Blend</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>Boutique Moschino</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>Naf Naf</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>Jack & Jones</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>Adidas Originals</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>Adidas Originals</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>Diesel</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}></Text>Red Valentino</View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={styles.brandName}>s.Oliver</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#663399' : undefined}
        />
            </View>
        </View>
        <View style={styles.brandFilter}>
            <View><Text style={[styles.brandName,styles.activeBrand]}>Boutique Moschino</Text></View>
            <View style={styles.brandCheck}>
            <Checkbox
          style={styles.checkbox}
          value={   true}
          onValueChange={setChecked}
          color='#663399'
        
        />
            </View>
        </View>  
        </View>
        <View style={styles.filterApplySection}>
                    <Text style={styles.discard}>Discard</Text>
                    <Text style={styles.apply}>Apply</Text>
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
        paddingVertical:15,
        paddingHorizontal:60,
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        borderColor:'#663399',
        borderWidth:0.4,
        color:'#f5f5ff',
        backgroundColor:'#663399',
        borderRadius:25,
        marginVertical:20
    },
    discard:{
        paddingVertical:15,
        paddingHorizontal:50,
        fontSize:14,
        fontFamily:"Raleway_500Medium",
        fontWeight:'500',
        borderColor:'#663399',
        borderWidth:0.4, 
        marginVertical:20,
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
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    activeBrand:{
        color:'#663399'
    }
})