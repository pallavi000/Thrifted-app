import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const BrandSelect = (props) => {
    const[brands, setBrands] = useState(props.brands)
    const [selectedSelect, setSelectedSelect] = useState(props.selectedSelect)

    const changeHeader = React.useCallback(()=>{
        props.navigation.setOptions({
            headerShown:true,
            headerRight:()=>(
                <TouchableOpacity onPress={()=>doneSelect()}>
                    <Text style={{fontFamily:"Raleway_700Bold", fontSize: 16, color: '#663399', marginRight: 10}}>Done <MaterialCommunityIcons name='check-bold' size={16} color='#663399'/></Text>
                </TouchableOpacity>
            )
        })
    })

    useEffect(()=>{
        changeHeader()
    },[selectedSelect])

    function doneSelect() {
        if(!selectedSelect) return
        props.setSelectedSelect(selectedSelect)
        props.setOpenSelectField(null)
    }

    function selectBrand(item) {
        setSelectedSelect(item)
    }

    const searchBrand = React.useCallback((text)=>{
        if(text.trim().length>0) {
            let filterBrands = props.brands.filter(brand=>brand.name.includes(text))
            setBrands(filterBrands)
        } else {
            setBrands(props.brands)
        }
    })   

  return (
    <View style={styles.container}>
        <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
            <Ionicons style={styles.searchIcon} name="search" size={20} color="#979797"></Ionicons>
            <TextInput style={styles.searchText}
            keyboardType="default"
            placeholder="Search"
            onChangeText={(text)=>searchBrand(text)}
            ></TextInput>
        </View>
        </View>
        <FlatList
          data={brands}
          keyExtractor={item => item._id}
          renderItem={({ item })=>(
                <TouchableOpacity onPress={()=>selectBrand(item)} style={styles.brandFilter}>
                    <View>
                        <Text style={selectedSelect._id == item._id ? styles.selectedName : styles.name }>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
          />
    </View>
  )
}

export default BrandSelect

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1,
        height:Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 999,
        paddingBottom: 90,
        backgroundColor: 'white'
    },
    searchWrapper: {
      marginBottom: 20,
    },
    searchContainer:{
        padding:10,
        backgroundColor:'#7676801F',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        marginBottom: 10
    },
    searchText:{
        color:'#979797',
        fontSize:16,
        fontWeight:'400',
        fontFamily:'Raleway_400Regular',
        marginLeft:8,
        height:25,
        flexGrow:1
    },
    brandFilter:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        marginLeft: 20
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
      activeBrand:{
        color:'#663399'
    },
    name:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:'Raleway_600SemiBold',
        paddingVertical:5,
        paddingHorizontal:20,
        color: '#000',
        textTransform: 'capitalize'
    },
    selectedName:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:'Raleway_600SemiBold',
        paddingVertical:5,
        borderBottomColor:'#c4c4c4',
        paddingHorizontal:20,
        textTransform: 'capitalize',
        color: '#663399'
    }
})
