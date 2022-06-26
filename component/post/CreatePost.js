import { StyleSheet, Text, View, SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,TouchableWithoutFeedback, Dimensions, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React,{useEffect,useState,useContext,useRef} from 'react'
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import * as Yup from 'yup'
import { Formik } from 'formik'
import bbstyles from '../Styles'
import axios from 'axios'
import { AuthContext } from '../Context'
import {Picker} from '@react-native-picker/picker';
import MainImage from '../Image/MainImage'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import CategorySelect from './selects/CategorySelect'
import SimpleSelect from './selects/SimpleSelect'
import BrandSelect from './selects/BrandSelect'

const validationSchema = Yup.object().shape({
    image1:Yup.string().required('Image is required'),
    name:Yup.string().required('Product Name is required'),
    detail:Yup.string().required('Product Detail is required'),
    category:Yup.string().required('Category is required'),
    stock:Yup.number().required('Quantity is required'),
    size:Yup.string().required('Product Size is required'),
    brand:Yup.string().required('Brand is required'),
    color:Yup.string().required('Color is required'),
    original:Yup.number().required('Original Price is required'),
    price:Yup.number().required('Price is required'),
    type:Yup.string().required('Product Type is required'),
})

export default function CreatePost({navigation}) {
    const[colors,setColors] = useState([])
    const[sizes,setSizes] = useState([])
    const[brands,setBrands] = useState([])
    const[categories,setCategories] = useState([])
    const[showBrand,setShowBrand] = useState(false)
    const formRef = useRef();
    const sheetRef = useRef(null)
    const openCameraRef = useRef()
    const selectImageRef = useRef()
    const fill = new Animated.Value(1)
    const[earningPrice, setEarningPrice] = useState()
    const[openSelectField, setOpenSelectField] = useState(null)
    const [productTypes, setProductTypes] = useState([
        {
            _id: 'rent',
            name: 'Rent'
        },
        {
            _id: 'sale',
            name: 'Sale'
        }
    ])
    const [selectedCategory, setSelectedCategory] = useState({name:"Select Category"})
    const [selectedColor, setSelectedColor] = useState({name:"Select Color"})
    const [selectedSize, setSelectedSize] = useState({name:"Select Product Size"})
    const [selectedType, setSelectedType] = useState({name: 'Select Product Type'})
    const [selectedBrand, setSelectedBrand] = useState({name: 'Select Brand'})

    const data = useContext(AuthContext)
    const {token} = data

    const config = {
        headers:{
            'access-token': token
        }
    }

    function addPost() {
        var errors = Object.values(formRef.current.errors)
        if(errors && errors.length>0) {
            Alert.alert('Error', errors[0])
            return
        }
        formRef.current.handleSubmit()
    }

    const changeHeader = React.useCallback(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTitleAlign: 'center',
            headerRight:()=>(
                    <TouchableOpacity onPress={()=>addPost()}>
                        <Text style={{fontFamily:"Raleway_700Bold", fontSize: 16, color: '#663399', marginRight: 10}}>Post <MaterialCommunityIcons name='send-circle-outline' size={16} color='#663399'/></Text>
                    </TouchableOpacity>
            )
        })
    })

    useEffect(()=>{
        changeHeader()
        getSelectFields()
    },[])

    const getSelectFields = React.useCallback(async ()=>{
        try {
            const response = await axios.get('/frontend/createpost',config)
            setColors(response.data.colors)
            setSizes(response.data.sizes)
            setCategories(response.data.categories)
            setBrands(response.data.brands)
        } catch (error) {
            
        }
    })

    const createPost = React.useCallback(async(values)=>{
        try {
            const response = await axios.post('/product/create/post',values,config)
        } catch (error) {
            
        }
    })

    const calcEarning = React.useCallback((value)=>{
        formRef.current.setFieldValue('price',value)
        var  price= value
        var profit = price- price*20/100
        formRef.current.setFieldValue('earning_price',profit)
        setEarningPrice(profit.toString())
    })

     useEffect(()=>{
         formRef.current.setFieldValue('category', selectedCategory._id)
     },[selectedCategory])
     
     useEffect(()=>{
         formRef.current.setFieldValue('color', selectedColor._id)
     },[selectedColor])
     useEffect(()=>{
         formRef.current.setFieldValue('size', selectedSize._id)
     },[selectedSize])
     useEffect(()=>{
         formRef.current.setFieldValue('type', selectedType._id)
     },[selectedType])
     useEffect(()=>{
         formRef.current.setFieldValue('brand', selectedBrand._id)
     },[selectedBrand])

     
     const renderHeader = React.useCallback(() =>(
        <>
        <View style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            paddingTop: 20,
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
            >Choose Image</Text>
        </View>
        </>
    ))

    const renderContent = React.useCallback(()=>{
        return(
            <View
            style={{
                backgroundColor: '#fff',
                height:300
            }}
            >
            <TouchableOpacity onPress={()=>selectImageRef.current()} style={[styles.loginBtn,{borderRadius:0}]}>
                <Image style={styles.cameraIcon} source={require('../../assets/gallery.png')}/><Text style={styles.loginText}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>openCameraRef.current()} style={[styles.loginBtn,{borderRadius:0}]}>
                <Image style={styles.cameraIcon} source={require('../../assets/camera.png')}/><Text style={styles.loginText}>Open Camera</Text>
            </TouchableOpacity>
            </View>
        )
    })


  return (
    <>
    {openSelectField==="category" ? (
        <CategorySelect
            categories={categories}
            navigation={navigation}
            setOpenSelectField={setOpenSelectField}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
        />
    ):(null)}

    {openSelectField==="color" ? (
        <SimpleSelect
        selects={colors}
        selectedSelect={selectedColor}
        setOpenSelectField={setOpenSelectField}
        setSelectedSelect={setSelectedColor}
        navigation={navigation}
        />
    ):(null)}

    {openSelectField==="size" ? (
        <SimpleSelect
        selects={sizes}
        selectedSelect={selectedSize}
        setOpenSelectField={setOpenSelectField}
        setSelectedSelect={setSelectedSize}
        navigation={navigation}
        />
    ):(null)}

    {openSelectField==="type" ? (
        <SimpleSelect
        selects={productTypes}
        selectedSelect={selectedType}
        setOpenSelectField={setOpenSelectField}
        setSelectedSelect={setSelectedType}
        navigation={navigation}
        />
    ):(null)}

    {openSelectField==="brand" ? (
        <BrandSelect
        brands={brands}
        selectedSelect={selectedBrand}
        setOpenSelectField={setOpenSelectField}
        setSelectedSelect={setSelectedBrand}
        navigation={navigation}
        />
    ):(null)}


    <SafeAreaView style={{backgroundColor:'white',flex:1}} >

<KeyboardAvoidingView
keyboardVerticalOffset={-500}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
>

<BottomSheet
            ref={sheetRef}
            snapPoints={[300, 0]}
            borderRadius={10}
            initialSnap={1}
            enabledContentTapInteraction={false}
            renderHeader={renderHeader}
            renderContent={renderContent}
            callbackNode={fill}
      />

     <ScrollView style={{position:'relative'}} >

    

        <Animated.View style={[styles.container,{
            opacity: Animated.add(0.3, Animated.multiply(fill, 1.0))
        }]}>
        
        <Formik
            innerRef={formRef}
           initialValues={{name:'',detail:'',category:'',stock:'',size:'',brand:'',color:'',original:'',price:'',earning_price:'',type:'',image1:'',custombrand:'',image2:'',image3:'',image4:''}}
           onSubmit={(values)=>createPost(values)}
           validationSchema={validationSchema}
           >
           {({handleChange,handleSubmit,errors,values,setFieldValue,touched,handleBlur})=>(
               <>
               <MainImage
                   sheetRef={sheetRef}
                   openCameraRef={openCameraRef}
                   selectImageRef={selectImageRef}
               />
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>What are you selling? (Required)</Text>
                        <TextInput
                        style={styles.input}
                        keyboardType='default'
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur('name')}
                         />
                         {errors.name && touched.name?(
                            <Text style={bbstyles.error}>{errors.name}</Text>
                         ):(null)}
                    </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Tell buyers about your selling (Required)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    onChangeText={handleChange("detail")}
                    onBlur={handleBlur('detail')}
                />
                {errors.detail && touched.detail?(
                <Text style={bbstyles.error}>{errors.detail}</Text>
                ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Category (Required)</Text>
                <TouchableOpacity onPress={()=>setOpenSelectField('category')}>
                <View style={styles.selectField}>
                <Text style={{color: 'black',textTransform:'capitalize'}}>{selectedCategory.name}</Text>
                
                </View>
                </TouchableOpacity>
                {errors.category && touched.category?(
                    <Text style={bbstyles.error}>{errors.category}</Text>
                    ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Quantity (Required)</Text>
                <TextInput
                 keyboardType='numeric'
                 style={styles.input}
                 onChangeText={handleChange("stock")}
                 onBlur={handleBlur('stock')}
                 ></TextInput>
                   {errors.stock && touched.stock?(
                            <Text style={bbstyles.error}>{errors.stock}</Text>
                         ):(null)}
            </View>
            
            <View style={styles.formGroup}>
                <Text style={styles.label}>Color (Required)</Text>
                <TouchableOpacity onPress={()=>setOpenSelectField('color')}>
                <View style={styles.selectField}>
                <Text style={{color: 'black',textTransform:'capitalize'}}>{selectedColor.name}</Text>
                </View>
                </TouchableOpacity>
                
                
                {errors.color && touched.color?(
                <Text style={bbstyles.error}>{errors.color}</Text>
                ):(null)}
            </View>
            
            <View style={styles.formGroup}>
                <Text style={styles.label}>Brand (Optional)</Text>
                <TouchableOpacity onPress={()=>setOpenSelectField('brand')}>
                <View style={styles.selectField}>
                <Text style={{color: 'black',textTransform:'capitalize'}}>{selectedBrand.name}</Text>
                </View>
                </TouchableOpacity>
                
                    
                    {showBrand?(
                        <View>
                        <Text style={styles.title}>Your brand name</Text>
                        <TextInput
                        style={styles.formcontrol}
                            keyboardType='default'
                            placeholder="Enter brand name"
                            onChangeText={handleChange("custombrand")}
                            onBlur={handleBlur.custombrand}
                        />
                        <Text style={bbstyles.error}>{errors.custombrand}</Text>
                    </View>
                    ):(null)}
                    
                <Text style={bbstyles.error}>{errors.brand}</Text>
            </View>
            
            <View style={styles.formGroup}>
                <Text style={styles.label}>Size (Required)</Text>
                <TouchableOpacity onPress={()=>setOpenSelectField('size')}>
                <View style={styles.selectField}>
                <Text style={{color: 'black',textTransform:'capitalize'}}>{selectedSize.name}</Text>
                </View>
                </TouchableOpacity>
                
                {touched.size && errors.size?(
                    <Text style={bbstyles.error}>{errors.size}</Text>
                ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Original Price(Required)</Text>
                <TextInput
                 keyboardType='numeric'
                 style={styles.input}
                 onChangeText={handleChange("original")}
                onBlur={handleBlur('original')}
                 ></TextInput>
                {touched.original && errors.original?(
                    <Text style={bbstyles.error}>{errors.original}</Text>
                ):(null)}
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Listing Price (Required)</Text>
                <TextInput
                 keyboardType='numeric'
                 style={styles.input}
                 onChangeText={(value)=>calcEarning(value)}
                onBlur={handleBlur('price')}
                 ></TextInput>
                  {touched.price && errors.price?(
                    <Text style={bbstyles.error}>{errors.price}</Text>
                ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Your Earning (When Sold)</Text>
                <TextInput
                 keyboardType='numeric'
                 value={earningPrice}
                 style={styles.input}
                 editable={false}
                 ></TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Product Type (Required)</Text>
                <TouchableOpacity onPress={()=>setOpenSelectField('type')}>
                <View style={styles.selectField}>
                <Text style={{color: 'black',textTransform:'capitalize'}}>{selectedType.name}</Text>
                </View>
                </TouchableOpacity>
               
                {touched.type && errors.type?(
                    <Text style={bbstyles.error}>{errors.type}</Text>
                ):(null)}
            </View>
               </>
           )}
               </Formik>
        </Animated.View>
     </ScrollView>
     </KeyboardAvoidingView>
     </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    cameraIcon:{
        height:30,
        width:30,
    },
    loginBtn:{
    paddingVertical:10,
    paddingHorizontal:10,
    width:Dimensions.get('window').width-60,
    backgroundColor:'#663399',
    borderRadius:10,
    marginTop:20,
    marginBottom:20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    },
    loginText:{
    textAlign:'center',
    fontFamily:'Raleway_700Bold',
    fontWeight:'700',
    fontSize:18,
    color:'white',
    marginLeft: 5
    },
    formcontrol: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily:"Raleway_400Regular",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 5,
        // marginTop: 10,
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    cameraContainer:{
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
        marginVertical:20
    },
    textSecondary:{
        color:'#868686',
        fontSize:15,
        fontFamily:'Raleway_600SemiBold'

    },
    formGroup:{
        marginBottom:20,
    },
    selectForm:{
        borderBottomColor:'#C4C4C4BF',
        borderBottomWidth:1,
        justifyContent: 'center'
    },
    selectField: {
        borderBottomColor:'#C4C4C4BF',
        borderBottomWidth:1,
        justifyContent: 'center',
        height: 30
    },
    label:{
        color:'#868686',
        fontSize:12,
        fontFamily:'Raleway_600SemiBold',
        marginBottom:5
    },
    input:{
       fontSize:17,
       fontWeight:'500',
       fontFamily:"Raleway_500Medium",
       borderWidth:0,
       paddingBottom: 5,
       borderBottomColor:'#C9C9C9',
        borderBottomWidth:1
    },
})