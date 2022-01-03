import React,{useEffect} from 'react'
import { View, Text, Button, Image } from 'react-native'
import * as imagePicker from 'expo-image-picker'
import { useFormikContext } from 'formik'

const MainImage = () => {


async function getRequestPermission(){
    const {granted} = await imagePicker.getMediaLibraryPermissionsAsync()
    if(!granted){
        alert("Permission denied")
    }
}

const {setFieldValue,values,touched,errors} = useFormikContext()


useEffect(() => {
   getRequestPermission()
}, [])

async function selectImage(){
    const result = await imagePicker.launchImageLibraryAsync()
    if(!result.cancelled){
        setFieldValue('image',result.uri)
    }
}


    return (
        <View>
         <Button title="upload image" onPress={()=>selectImage()}/>
         {values.image?(
            <Image source={{uri:values.image}} style={{width:200,height:200}}/>
           ):(null)}
            {touched.image?( <Text style={{color:'red'}}>{errors.image}</Text>):(null)}
        </View>
    )
}

export default MainImage
