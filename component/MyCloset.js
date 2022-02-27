import React, { useContext, useState,useEffect } from 'react'
import { View, Text,Image, StyleSheet,Modal,Dimensions, ScrollView,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import axios from 'axios'
import { AuthContext } from './Context'
import bbstyles from './Styles'
import { imageLink } from './ImageLink'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import * as imagePicker from 'expo-image-picker'
import { DEFAULT_ICON_SIZE } from '@expo/vector-icons/build/createIconSet'
import {Picker} from '@react-native-picker/picker';



export default function MyCloset(props) {

    const[products,setProducts] = useState([])
    const[users,setUsers] = useState([])
    const navigation = props.navigation
    const data = useContext(AuthContext)
    const {decode} = data
    const {token} = data
    const[sorting,setSorting] = useState('-_id')
    const[modalVisible,setModalVisible] = useState(false)

     const config = {
        headers:{
            'access-token': token
        }
    }
    useEffect(() => {
        axios.post('/frontend/closet/'+decode._id).then(response=>{
            console.log(response.data)
            setProducts(response.data.product)
            setUsers(response.data.user)
            console.log('closet')
        }).catch(err=>{
            console.log(err.request.response)
        }) 
    }, [props])


    async function avatarImage(){
     const {granted} = await imagePicker.getMediaLibraryPermissionsAsync()
    if(!granted){
        alert("Permission denied")
    }else{
     const result = await imagePicker.launchImageLibraryAsync()
        if(!result.cancelled){

           const data = {
              image:result.uri
           }
           axios.post('/user/change/avatar',data,config).then(response=>{
               console.log(response.data)
              const avatarUser =  {...users,image:response.data}
              setUsers(avatarUser)
         
           }).catch(err=>{
               console.log(err.request.response)
           })
        }

    }
    }

    return (
        <ScrollView style={styles.container}>

          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       >

             <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
          <View style={styles.modalHeader}>
           <TouchableOpacity onPress={()=>setModalVisible(false)}>
               <View style={styles.modalClose}>
                   <FontAwesome  name="times-circle" size={20} color={'red'}/>
                  
               </View>
           </TouchableOpacity>
          </View>

            <View style={styles.modalContent}>
                <Picker
                    selectedValue={sorting}
                    onValueChange={(itemValue, itemIndex) =>
                        setSorting(itemValue)
                    }>
                    <Picker.Item label="Date" value="-_id" />
                    <Picker.Item label="Alphabet" value="name" />
                    </Picker>
            </View>


          </View>
        </View>
        </Modal>

        <View style={styles.filterWrapper}>
         <View style={styles.sort} >
         <TouchableOpacity style={styles.sort}   onPress={()=>setModalVisible(true) }>
         <FontAwesome name="sort" size={15} color={'rebeccapurple'}/>
        <Text style={styles.sorttext}> Sort</Text>
      
       </TouchableOpacity>
         </View>
         </View>



        <View style={styles.line}>
            <View  style={styles.product} >
                <View style={styles.productImage}>
                <TouchableOpacity onPress={()=>avatarImage()}>
                {users.image?(
                    
                 <Image source={{uri:imageLink+users.image}} style={styles.userImage}/>
                ):(
                   
                    <Image source={{uri:imageLink+'/images/camera.png'}} style={styles.userImage}/>
               )}
           </TouchableOpacity>
                  <Text style={styles.userName}>{users.name}</Text>
                    </View>
                  <View style={styles.productDesc}>
                      <Text style={styles.userDetail}>Posts</Text>
                      <Text style={styles.count}>{products.length}</Text>
                  </View>
                  </View>
                  <TouchableWithoutFeedback onPress={()=>navigation.navigate('Create Post')}>
                    <Text style={bbstyles.secondary}>Create Product</Text>
                    </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.closet}>
                    {products.map(product=>{
                        return(
                            <TouchableOpacity style={styles.closetCard} onPress={()=>navigation.navigate('productdetail',product)}>
                            <Image source={{uri:imageLink+product.image}} style={styles.postImage}/>
                            <Text numberOfLines={2} style={styles.productname}>{product.name}</Text>
                            <Text style={styles.brandname}>{product.brand_id?.name}</Text>
                            <Text style={styles.productprice}>Rs.{product.price}</Text>
                            <Text style={styles.productsize}>Size:{product.size_id?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

container:{
    margin:20
},
closetCard:{
  width:'46%',
  marginRight:10,
  marginBottom:15

},
    userImage:{
        height:100,
        width:100,
        borderRadius:50,
        textAlign:'center',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    profile:{
        margin:10, 
        display: 'flex',
        flexDirection:'row',
    },
    userName:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        textTransform:'capitalize'
    },
    imageView:{
        flex:2
    },
    detailView:{
        flex:3
    },

    product:{
        flex:1,
        flexDirection:'row',
        margin:10
    },
    productImage:{
        height:100,
        resizeMode:'contain',
      alignItems:'center'
    },

    productDesc:{
        fontWeight:'500',
        fontSize:16,
        flex:3,
        marginLeft:40,
    },
    userDetail:{
        fontWeight:'bold',
        fontSize:20,
    },
    count:{
        color:'#6b6b6b',
        fontWeight:'500',
        fontSize:19,
        
    },
    line:{
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingBottom:20
    },
    postImage:{
        height:200,
        width:'100%',
        resizeMode:'cover',
        marginBottom:5
    },

    closet:{
        marginTop:20,
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    productname:{
        fontSize:16,
        fontWeight:'600',
        marginBottom:5

    },
    brandname:{
         fontSize:16,
        fontWeight:'400',
        marginBottom:5
    },
    productprice:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:5 
    },
    productsize:{
         fontSize:16,
        fontWeight:'400',
        marginBottom:5
    },
     centeredView: {
    flex: 1, 
  },
  modalView: {
   
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,

    flex:1,
    width:Dimensions.get('window').width
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalClose:{
    
  },
  modalHeader:{
    //   borderBottomWidth:1,
    //   borderBottomColor:'#ddd',
      padding:15,
     flexDirection:'row',
     justifyContent:'flex-end',
      shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent:{
      margin:10
  },
  pickerWrapper:{
      marginBottom:5,
      padding:5,
      borderBottomColor:'#ddd',
      borderBottomWidth:1,
      paddingBottom:10
  },
  filterTitle:{
    fontSize:16,
    fontWeight:'500',
    marginBottom:3
  }
    


})
