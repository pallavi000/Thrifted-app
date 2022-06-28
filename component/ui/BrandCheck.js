import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import Checkbox from 'expo-checkbox'

export default function BrandCheck(props) {
    const [isChecked, setChecked] = useState(false);

    useEffect(()=>{
      if(props.brand_ids.includes(props.brand._id)){
        setChecked(true)
      }
    },[])

    function brandChange() {
        setChecked(!isChecked)
        props.brand_filter(props.brand._id)
    }

  return (
    <Checkbox
    style={styles.checkbox}
    value={isChecked}
    onValueChange={brandChange}
    color={isChecked ? '#663399' : undefined}
  />
  )
}


const styles = StyleSheet.create({
    checkbox: {
        margin: 8,
        padding:10,
        borderColor:'#C4C4C4',
      },
})