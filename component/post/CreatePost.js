import { StyleSheet, Text, View, SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import {Feather} from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import * as Yup from 'yup'
import { Formik } from 'formik'
import bbstyles from '../Styles'
import axios from 'axios'
import { AuthContext } from '../Context'
import {Picker} from '@react-native-picker/picker';
import MainImage from '../Image/MainImage'

const validationSchema = Yup.object().shape({
    name:Yup.string().required(),
    category:Yup.string().required(),
    stock:Yup.string().required(),
    size:Yup.string().required(),
    brand:Yup.string().required(),
    color:Yup.string().required(),
    original:Yup.string().required(),
    price:Yup.string().required(),
    type:Yup.string().required(),
    detail:Yup.string().required(),
    image1:Yup.string().required()
})

export default function CreatePost({navigation}) {
    const[colors,setColors] = useState([])
    const[sizes,setSizes] = useState([])
    const[brands,setBrands] = useState([])
    const[categories,setCategories] = useState([])
    const[showBrand,setShowBrand] = useState(false)

    const data = useContext(AuthContext)
    const {token} = data

    const config = {
        headers:{
            'access-token': token
        }
    }


    navigation.setOptions({
       headerShown:true,
       headerRight:()=>(
          <TouchableOpacity >
              <Text>Post</Text>
          </TouchableOpacity>
       )
    })
       
    

    useEffect(() => {
        axios.get('/frontend/createpost',config).then(response=>{
             console.log(response.data)
            setColors(response.data.colors)
            setSizes(response.data.sizes)
            setCategories(response.data.categories)
            setBrands(response.data.brands)
        })
     }, [])

     function createPost(values){
         console.log(values)
         return false
        axios.post('/product/create/post',values,config).then(response=>{
            console.log(response.data)
       }).catch(err=>{
           console.log(err.request.response)
       })
    }

     function brandValue(item,setFieldValue){
        setFieldValue('brand',item)
        if(item=="others"){
            setShowBrand(true)
        }else setShowBrand(false)
     }


     function renderChildren(categories,n){
         var inc = n;
        function increment(n){
            var ele = "\u00A0 \u00A0 \u00A0"
            inc += 1;
            return ele.repeat(n)
        }
         if(categories&&categories.length!=0){
             const arr=[]
             categories.map(category=>{
               arr.push(<Picker.Item  label={increment(n)+ category.name} value={category._id} />,renderChildren(category.childrens,inc))
             })
             return arr
         }
     }

     function calcEarning(e,setFieldValue){
       var  price= e.target.value
       var profit = price- price*20/100
       console.log(profit)
       setFieldValue('earning_price',profit)
   
     }
    




  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
     <ScrollView style={{position:'relative'}} >
        <View style={styles.container}>
        
        <Formik 
           initialValues={{name:'',detail:'',category:'',stock:'',size:'',brand:'',color:'',original:'',price:'',earning_price:'',type:'',image1:'',custombrand:'',image2:'',image3:'',image4:''}}
           onSubmit={(values)=>createPost(values)}
           validationSchema={validationSchema}
           >
           {({handleChange,handleSubmit,errors,values,setFieldValue,touched,handleBlur})=>(
               <>
               <MainImage/>
               {/* <Image source={require('../../assets/post.png')} style={styles.userImage} ></Image>

               <View style={styles.row}>
                <View style={styles.cameraContainer}>
                    <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                </View>
                <View style={styles.cameraContainer}>
                    <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                </View>
                <View style={styles.cameraContainer}>
                    <Feather name='camera' size={40} color="#C4C4C4BF"></Feather>
                </View>
                </View>
                    <View style={styles.uploadBtn}>
                    <Text style={{fontSize:13,fontFamily:'Raleway_500Medium',color:'#868686'}}>Upload Photos</Text>
                    </View> */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>What are you selling? (Required)</Text>
                        <TextInput
                        style={styles.input}
                        keyboardType='default'
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur('name')}
                         />
                         {errors.name && touched.name?(
                            <Text style={styles.error}>{errors.name}</Text>
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
                <Text style={styles.error}>{errors.detail}</Text>
                ):(null)}
            </View>

            <View style={styles.selectForm}>
                <Text style={styles.label}>Category (Required)</Text>
                <Picker
                    style={styles.input}
                     selectedValue={values.category}
                        onValueChange={itemValue =>
                        setFieldValue('category',itemValue)
                    }>
                  <Picker.Item  label="Selelct Product Category" value="" />
                    {categories.map(category=>{
                        return(
                           
                            [<Picker.Item  label={category.name} value={category._id} />,
                            renderChildren(category.childrens,1)] 
                        )
                    })}
                </Picker>
                {errors.category && touched.category?(
                            <Text style={styles.error}>{errors.category}</Text>
                         ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Quantity (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 onChangeText={handleChange("stock")}
                 onBlur={handleBlur('stock')}
                 ></TextInput>
                   {errors.stock && touched.stock?(
                            <Text style={styles.error}>{errors.stock}</Text>
                         ):(null)}
            </View>
            <View style={styles.selectForm}>
                <Text style={styles.label}>Color (Required)</Text>
                <Picker
                    style={styles.input}
                     selectedValue={values.color}
                        onValueChange={itemValue =>
                        setFieldValue('color',itemValue)
                    }
                    onBlur={handleBlur('color')}
                    >
               <Picker.Item  label="Selelct Product Color" value="" />
                    {colors.map(color=>{
                        return(
                            
                            <Picker.Item  label={color.name} value={color._id} />
                        )
                    })}
                </Picker>
                {errors.color && touched.color?(
                <Text style={styles.error}>{errors.color}</Text>
                ):(null)}
            </View>
            <View style={styles.selectForm}>
                <Text style={styles.label}>Brand (Optional)</Text>
                <Picker
                    style={styles.formcontrol}
                    selectedValue={values.brand}
                        onValueChange={itemValue =>
                        brandValue(itemValue,setFieldValue)}
                        onBlur={handleBlur('brand')}
                    >
                     <Picker.Item  label="Selelct Brand" value="" />
                    {brands.map(brand=>{
                        return(
                            <Picker.Item  label={brand.name} value={brand._id} />
                           
                        )
                    })}
                    <Picker.Item  label="Others.." value="others"  />
                </Picker>
                    
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
                        <Text style={styles.error}>{errors.custombrand}</Text>
                    </View>
                    ):(null)}
                    
                <Text style={styles.error}>{errors.brand}</Text>
            </View>
            <View style={styles.selectForm}>
                <Text style={styles.label}>Size (Required)</Text>
                <Picker
                    style={styles.formcontrol}
                     selectedValue={values.size}
                        onValueChange={itemValue =>
                        setFieldValue('size',itemValue)
                    }
                    onBlur={handleBlur('size')}
                    >
               <Picker.Item  label="Selelct Product Size" value="" />
                    {sizes.map(size=>{
                        return(
                            <Picker.Item  label={size.name} value={size._id} />
                        )
                    })}
                </Picker>
                {touched.size && errors.size?(
                    <Text style={styles.error}>{errors.size}</Text>
                ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Original Price(Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 onChangeText={handleChange("original")}
                onBlur={handleBlur('original')}
                 ></TextInput>
                {touched.original && errors.original?(
                    <Text style={styles.error}>{errors.original}</Text>
                ):(null)}
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Listing Price (Required)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 onChangeText={handleChange("price")}
                onBlur={handleBlur('price')}
                onChange={(e)=>calcEarning(e,setFieldValue)}
                 ></TextInput>
                  {touched.price && errors.price?(
                    <Text style={styles.error}>{errors.price}</Text>
                ):(null)}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Your Earning (When Sold)</Text>
                <TextInput
                 keyboardType='default'
                 style={styles.input}
                 value={values.earning_price}
                 ></TextInput>
            </View>

            <View style={styles.selectForm}>
                <Text style={styles.label}>Product Type (Required)</Text>
                <Picker
                    style={styles.input}
                     selectedValue={values.type}
                        onValueChange={itemValue =>
                        setFieldValue('type',itemValue)
                    }>
                             <Picker.Item  label="Selelct Product Type" value="" />
                            <Picker.Item  label="Rent" value="rent" />
                            <Picker.Item  label="Sale" value="sale" />
                </Picker>
                {touched.type && errors.type?(
                    <Text style={styles.error}>{errors.type}</Text>
                ):(null)}
            </View>
            <TouchableWithoutFeedback onPress={handleSubmit}>
                <Text style={bbstyles.btnPrimary}>Submit</Text>
                </TouchableWithoutFeedback>

               </>
           )}
               </Formik>
        </View>
     </ScrollView>
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20
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
        padding:10,
        borderBottomColor:'#C4C4C4BF',
        borderBottomWidth:1,
        marginBottom:20
    },
    label:{
        color:'#868686',
        fontSize:15,
        fontFamily:'Raleway_600SemiBold',
        marginBottom:10
    },
    input:{
       fontSize:17,
       fontWeight:'500',
       fontFamily:"Raleway_500Medium",
       borderWidth:0,
       borderBottomColor:'#C9C9C9',
        borderBottomWidth:1
    },
})