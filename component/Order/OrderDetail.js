import { StyleSheet, Text, View,SafeAreaView,ScrollView,Image,Dimensions } from 'react-native'
import React from 'react'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'

export default function OrderDetail() {
return (
<SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.orderDetail}>
                <Text style={styles.orderNo}>Order No 1947034</Text>
                <Text style={styles.orderDate}>05-12-2022</Text>
            </View>

            <View style={styles.orderDetail}>
                <View style={styles.row}>
                    <Text style={styles.orderDate}>Tracking number</Text>
                    <Text style={styles.orderValue}> IW3475453455</Text>
                </View>
                <Text style={styles.delivered}>Delivered</Text>
            </View>
            <Text style={styles.orderValue}>3 items</Text>
            <View style={styles.addressCard}>
                <View style={styles.row}>
                    <Image source={require('../../assets/order1.png')} style={styles.image}></Image>
                    <View>
                        <Text style={styles.name}>Pullover</Text>
                        <Text style={styles.brand}>Nike</Text>
                        <View style={styles.row}>
                            <View style={[styles.row,{marginRight:5}]}>
                                <Text style={styles.brand}>Color: </Text>
                                <Text style={styles.value}>Gray</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.brand}>Size: </Text>
                                <Text style={styles.value}>L</Text>
                            </View>
                        </View>
                        <View style={styles.spaceBtwn}>
                            <View style={styles.row}>
                                <Text style={styles.brand}>Quantity: </Text>
                                <Text style={styles.value}>1</Text>
                            </View>
                            <Text style={styles.orderValue}>Rs.2</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.addressCard}>
               
                    <View style={styles.row}>
                        <Image source={require('../../assets/order1.png')} style={styles.image}></Image>
                        <View >
                            <Text style={styles.name}>Pullover</Text>
                            <Text style={styles.brand}>Nike</Text>
                            <View style={styles.row}>
                                <View style={[styles.row,{marginRight:5}]}>
                                    <Text style={styles.brand}>Color: </Text>
                                    <Text style={styles.value}>Gray</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.brand}>Size: </Text>
                                    <Text style={styles.value}>L</Text>
                                </View>
                            </View>
                            <View style={styles.spaceBtwn}>
                                <View style={styles.row}>
                                    <Text style={styles.brand}>Quantity: </Text>
                                    <Text style={styles.value}>1</Text>
                                </View>
                                <Text style={styles.orderValue}>Rs.2</Text>
                            </View>

                        </View>
                    </View>
            </View>

            <View style={styles.shipping} >
                <Text style={styles.orderTitle}>Order Information</Text>
                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.shippingTitle}>Shipping Address</Text>
                    </View>
                    <View style={styles.half}>
                        <Text style={styles.shippingValue}>Hetauda-1, Hetauda, Makwanpur, 44107, Nepal</Text>
                    </View>
                </View>


                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.shippingTitle}>Payment method:</Text>
                    </View>
                    <View style={styles.half}>
                        <Text style={styles.shippingValue}>Esewa</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.shippingTitle}>Delivery method:</Text>
                    </View>
                    <View style={styles.half}>
                        <Text style={styles.shippingValue}>Express, 2 days, Rs. 200</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <View style={styles.half}>
                            <Text style={styles.shippingTitle}>Discount:</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.half}>
                            <Text style={styles.shippingValue}>0%</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.shippingTitle}>Total Amount</Text>
                    </View>
                    <View style={styles.half}>
                        <Text style={styles.shippingValue}>Rs. 500</Text>
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
row:{
flexDirection:'row',
alignItems:'center'

},
orderDetail:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
marginBottom:13,

},
orderNo:{
fontSize:16,
fontWeight:'600',
fontFamily:'Raleway_600SemiBold',
},
orderDate:{
fontWeight:'400',
fontSize:14,
fontFamily:'Raleway_400Regular'
},
orderValue:{
fontSize:14,
fontWeight:'500',
fontFamily:'Raleway_500Medium',
marginLeft:4
},
delivered:{
color:'#4CD964',
fontSize:14,
fontWeight:'500',
fontFamily:'Raleway_500Medium',
},
addressCard:{
backgroundColor:'#f5f5ff',
padding:0,
borderRadius:10,
marginTop:30,
shadowColor: "rgba(0, 0, 0, 0.3)",
shadowOffset: {
width: 0,
height: 4,
},
shadowOpacity: 0.6,
shadowRadius: 3,
elevation: 1,



},
image:{
height:140,
width:120,
resizeMode:'cover',
borderRadius:10,
marginRight:10
},
productDetail:{
padding:10,
flexDirection:'row',
justifyContent:'space-between',

},
name:{
fontSize:16,
fontWeight:'700',
fontFamily:'Raleway_600SemiBold',
marginBottom:8,
},
brand:{
fontSize:14,
fontWeight:'400',
fontFamily:'Raleway_400Regular',
marginBottom:8
},
value:{
fontSize:14,
fontWeight:'600',
fontFamily:'Raleway_600SemiBold',
marginBottom:8,
marginHorizontal:5
},
spaceBtwn:{
flexDirection:'row',
justifyContent:'space-between',

},
shippingTitle:{
    fontSize:14,
    fontFamily:"Raleway_400Regular",
    fontWeight:'500',
    color:'#455154',

},
shippingValue:{
    fontSize:14,
    fontFamily:"Raleway_500Medium",
    fontWeight:'500',

},
shipping:{
    marginVertical:30,
    flex:1
},
orderTitle:{
    fontFamily:"Raleway_600SemiBold",
    fontSize:16,
    fontWeight:'600',
    marginBottom:15
},

half:{
    width:(Dimensions.get('window').width-40)/2,
    marginBottom:10

}




})