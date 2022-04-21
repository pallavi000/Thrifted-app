import React,{useEffect, useState} from 'react'
import { View, Text, Button, Image, Modal, Alert, StyleSheet, Dimensions, KeyboardAvoidingViewBase,TouchableOpacity } from 'react-native'
import * as imagePicker from 'expo-image-picker'
import { useFormikContext } from 'formik'
import { FontAwesome ,Feather} from '@expo/vector-icons'
import { imageLink } from '../ImageLink'




const MainImage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [imageIndex,setImageIndex] = useState('')

async function getRequestPermission(){
    const {granted} = await imagePicker.getMediaLibraryPermissionsAsync()
    if(!granted){
        const result = await imagePicker.requestMediaLibraryPermissionsAsync()
        if(!result.granted) {
          alert("Permission denied")
        }
    }
}

async function getCameraPermission(){
    const {granted} = await imagePicker.getCameraPermissionsAsync()
    if(!granted){
      const result = await imagePicker.requestCameraPermissionsAsync()
      if(!result.granted) {
        alert("Permission denied")
      }
    }
}


const {setFieldValue,values,touched,errors} = useFormikContext()

useEffect(() => {
   getRequestPermission()
   getCameraPermission()
}, [])

async function selectImage(){
    const result = await imagePicker.launchImageLibraryAsync()
    if(!result.cancelled){
        setFieldValue(`image${imageIndex}`,result.uri)
        setModalVisible(false)

    }
}

async function openCamera(){
    const result = await imagePicker.launchCameraAsync()
    if(!result.cancelled){
        setFieldValue(`image${imageIndex}`,result.uri)
        setModalVisible(false)
    }
}

function toggleImage(index){
  setModalVisible(true)
  setImageIndex(index)
}

function multiImage(){
}





    return (
        <View>
 
 
 <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <View  style={styles.iconwrap}>
          <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome style={styles.modalIcon} name="times-circle-o" size={20} color={'red'}></FontAwesome>
            </TouchableOpacity>


            
            </View>
            <View style={styles.imageModal}>
            <TouchableOpacity onPress={()=>openCamera()}>
                <Image style={styles.cameraIcon} source={require('../../assets/camera.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>selectImage()}>
            <Image style={styles.cameraIcon} source={require('../../assets/gallery.png')}/>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>

    


    <View style={styles.uploadImageWrapper}>
    <TouchableOpacity onPress={()=>toggleImage(1)}>
  {values.image1?(
    <Image source={{uri:values.image1}} style={styles.userImage} ></Image>
  ):(
    <View style={styles.cameraContainer}>
      <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
    </View>
  )}
</TouchableOpacity>


               <View style={styles.row}>
               <TouchableOpacity onPress={()=>toggleImage(2)}>
               {values.image2?(
                <Image source={{uri:values.image2}} style={styles.upload} ></Image>
              ):(
                <View style={styles.cameraContainer}>
                  <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                </View>
              )}
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>toggleImage(3)}>
               {values.image3?(
                  <Image source={{uri:values.image3}} style={styles.upload} ></Image>
                ):(
                  <View style={styles.cameraContainer}>
                    <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                  </View>
                )}
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>toggleImage(4)}>
               {values.image4?(
                    <Image source={{uri:values.image4}} style={styles.upload} ></Image>
                  ):(
                    <View style={styles.cameraContainer}>
                      <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                    </View>
                  )}
                </TouchableOpacity>
                </View>
                     <View style={styles.uploadBtn}>
                    <Text style={{fontSize:13,fontFamily:'Raleway_500Medium',color:'#868686'}}>Upload Photos</Text>
                    </View> 
    
   

      

     
      
    </View>


      
    {/* <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
         {values.image?(
            <Image source={{uri:values.image}} style={{width:200,height:200}}/>
           ):(null)}
            {touched.image?( <Text style={{color:'red'}}>{errors.image}</Text>):(null)}
        </View>
    )
}

const styles = StyleSheet.create({

  multipleImage:{
    width:(Dimensions.get('window').width/4)-20,
    height:70,
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  
    width:'100%'
},
cameraContainer:{
  width:(Dimensions.get('window').width/3)-20,
  height:90,
  padding:25,
    borderColor:'#C4C4C4BF',
    borderWidth:0.5
},
userImage:{
    height:150,
    width:170,
    resizeMode:'cover',
    borderColor:'#C4C4C4BF',
    borderWidth:0.5,
    margin:'auto',
    marginBottom:30,
    alignItems:'center'
},
uploadBtn:{
    paddingHorizontal:20,
    paddingVertical:8,
    borderColor:'#C4C4C480',
    borderWidth:1,
    textAlign:'center',
    borderRadius:5,
    marginVertical:20,
    width:'100%',
   alignItems:'center'
},
textSecondary:{
    color:'#868686',
    fontSize:15,
    fontFamily:'Raleway_600SemiBold'

},
  uploadButton:{
    backgroundColor:'green',
    paddingHorizontal:15,
    paddingVertical:5,
    borderRadius:5
  },
  uploadImage:{
    color:'white',
    fontWeight:'500',
    textAlign:'center'
  },
  uploadImageWrapper:{
    alignItems:'center',
    marginBottom:20
  },
 upload:{
    width:(Dimensions.get('window').width/3)-20,
    height:90,
    borderWidth:1,
    borderColor:'#ddd',
    textAlign:'center',
    margin:'auto',
    lineHeight:70,
    display:'flex',
    justifyContent:'center'
  },
  

    iconwrap:{
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        width:'100%',
        paddingHorizontal:15
        
    },
    modalIcon:{
     
        right:0,
     
     
        
         
    },
    imageModal:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        padding:20
    },
    cameraIcon:{
        height:40,
        width:40,
        borderWidth:1,
        borderColor:'#f5f5ff',
        marginHorizontal:10
    },
    
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        width:'50%',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
})

export default MainImage
