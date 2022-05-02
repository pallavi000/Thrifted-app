import { StyleSheet, TouchableOpacity, Button, Text, View } from 'react-native'
import React from 'react'
import { Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


const Sort = (props) => {

    function changeSorting(sort) {
        props.setSorting(sort)
        props.sheetRef.current.snapTo(1)
    }

    const renderHeader = () =>(
        <>
        <View style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            paddingTop: 20,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            borderTopWidth: 1,
            borderTopColor: '#ddd',
        }}>
            <Text
            style={{
                fontFamily: "Raleway_600SemiBold",
                fontSize: 20,
                color: 'black',
                borderTopWidth: 5,
                borderTopColor: '#663399',              
                paddingTop: 5,
                borderRadius: 3
            }}
            >Sort By</Text>
        </View>
        </>
    )
    const renderContent = () => (
        <View
        style={{
            backgroundColor: '#fff',
            height:300
        }}
        >
        <TouchableOpacity onPress={()=>changeSorting('popular')}  style={props.sorting=="popular" ? styles.optionsWrapperSelected : styles.optionsWrapper}>
            <Text style={props.sorting=="popular" ? styles.optionsSelected : styles.options}>Popular</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>changeSorting('-_id')}  style={props.sorting=="-_id" ? styles.optionsWrapperSelected : styles.optionsWrapper}>
            <Text style={props.sorting=="-_id" ? styles.optionsSelected : styles.options}>Newest</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>changeSorting('lowest')} style={props.sorting=="lowest" ? styles.optionsWrapperSelected : styles.optionsWrapper}>
            <Text style={props.sorting=="lowest" ? styles.optionsSelected : styles.options}>Price: lowest to high</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>changeSorting('highest')}  style={props.sorting=="highest" ? styles.optionsWrapperSelected : styles.optionsWrapper}>
            <Text style={props.sorting=="highest" ? styles.optionsSelected : styles.options}>Price: highest to low</Text>
        </TouchableOpacity>
        </View>
  );
  return (
    <>
      <BottomSheet
        ref={props.sheetRef}
        snapPoints={[300, 0]}
        borderRadius={10}
        initialSnap={1}
        enabledContentTapInteraction={false}
        renderHeader={renderHeader}
        renderContent={renderContent}
        callbackNode={props.fall}
      />
    </>
  )
}

export default Sort

const styles = StyleSheet.create({
    optionsWrapper:{
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    optionsWrapperSelected:{
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#663399',
    },
    options: {
        fontFamily: "Raleway_400Regular",
        fontSize: 16,
        color: 'black'
    },
    optionsSelected: {
        fontFamily: "Raleway_400Regular",
        fontSize: 16,
        color: 'white'
    }
})