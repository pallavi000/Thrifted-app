import React,{useEffect, useState} from 'react'
import { View, Text, Button, Image, Modal, Pressable, StyleSheet, Dimensions, KeyboardAvoidingViewBase } from 'react-native'
import * as imagePicker from 'expo-image-picker'
import { useFormikContext } from 'formik'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'




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
          <TouchableOpacity   onPress={() => setModalVisible(!modalVisible)}>
          <Text>close</Text>
             
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
      <View style={styles.upload}>
      {values.image1?(
      <Image style={styles.multipleImage} source={{uri:values.image1}}/>
      ):(
        <FontAwesome name="camera" size={30} color={'#ddd'} ></FontAwesome>
      )}
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>toggleImage(2)}>
      <View style={styles.upload}>
      {values.image2?(
      <Image style={styles.multipleImage} source={{uri:values.image2}}/>
      ):(
        <FontAwesome name="camera" size={30} color={'#ddd'} ></FontAwesome>
      )}
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>toggleImage(3)}>
      <View style={styles.upload}>
      {values.image3?(
      <Image style={styles.multipleImage} source={{uri:values.image3}}/>
      ):(
        <FontAwesome name="camera" size={30} color={'#ddd'} ></FontAwesome>
      )}
      </View>
      </TouchableOpacity>

      <TouchableOpacity  onPress={()=>toggleImage(4)}>
      <View style={styles.upload}>
      {values.image4?(
      <Image style={styles.multipleImage} source={{uri:values.image4}}/>
      ):(
        <FontAwesome name="camera" size={30} color={'#ddd'} ></FontAwesome>
      )}
      </View>
      </TouchableOpacity>
      
    </View>

    <View style={styles.uploadButton}>
      <TouchableOpacity onPress={()=>multiImage()}>
        <Text style={styles.uploadImage}>Upload Images</Text>
      </TouchableOpacity>
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
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20
  },
 upload:{
    width:(Dimensions.get('window').width/4)-20,
    height:70,
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
        position:'absolute',
        right:0,
        top:-10,  
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
