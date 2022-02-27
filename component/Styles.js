import ImageTile from 'expo-image-picker-multiple/src/ImageTile'
import {StyleSheet} from 'react-native'



const bbstyles = StyleSheet.create({
    body: {
        backgroundColor: '#f5f5ff',
    },
    h1:{
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
      error:{
        color:'red',
        marginTop:5
    },  
    link: {
        color: 'rebeccapurple'
    },
    loginTitle: {
        marginBottom: 30,
        fontSize: 20,
        fontWeight: 'bold'
    },
    formControl: {
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 20,
    },
    btnPrimary: {
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 'auto',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
    },
    secondary:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 'auto',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        borderColor:'#ddd',
        borderWidth:1,
        marginTop:30
    },
    
    buyNow: {
        backgroundColor: '#55c0a9',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 'auto',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        marginVertical: 10
    }, 
    container:{
        padding:20,
        flex:1,
        backgroundColor:'#fff'

    },

      alertDanger:{
        color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth:1,
    paddingVertical:8,
    paddingHorizontal:10,
    textTransform:'capitalize',
    marginBottom:15
      },

    alertSuccess:{
    color: '#155724',
    backgroundColor:'#d4edda',
    borderColor: '#c3e6cb',
    borderWidth:1,
    paddingVertical:8,
    paddingHorizontal:10,
    textTransform:'capitalize',
    marginBottom:15
      }
})

export default bbstyles