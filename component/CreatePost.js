import React, { useState,useEffect,useContext, useMemo } from 'react'
import { View, Text, TextInput, StyleSheet,TouchableWithoutFeedback, ScrollView,Button } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import bbstyles from './Styles'
import axios from 'axios'
import { AuthContext } from './Context'
import {Picker} from '@react-native-picker/picker';
import MainImage from './Image/MainImage'
import { tan } from 'react-native-reanimated'
import { saveToLibraryAsync } from 'expo-media-library'



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


const CreatePost = () => {
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
        <ScrollView style={[bbstyles.container, bbstyles.bgWhite]}>
        
            <Formik 
           initialValues={{name:'',detail:'',category:'',stock:'',size:'',brand:'',color:'',original:'',price:'',earning_price:'',type:'',image1:'',custombrand:'',image2:'',image3:'',image4:''}}
           onSubmit={(values)=>createPost(values)}
           validationSchema={validationSchema}
           
           >
           {({handleChange,handleSubmit,errors,setFieldValue,values})=>(
               <>
               <MainImage/>
               <Text style={styles.title}>Product Name</Text>
                <TextInput
                style={styles.input}
                    keyboardType='default'
                    placeholder="Enter product name"
                    onChangeText={handleChange("name")}
                />
                  <Text style={styles.error}>{errors.name}</Text>

                <Text style={styles.title}>Description</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    placeholder="Product Description"
                    onChangeText={handleChange("detail")}
                />
                <Text style={styles.error}>{errors.detail}</Text>

                <Text style={styles.title}>Category</Text>
                <Picker
                    style={styles.formcontrol}
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
                <Text style={styles.error}>{errors.category}</Text>

                <Text style={styles.title}>Product Quantity</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    placeholder="Product quantity"
                    onChangeText={handleChange("stock")}
                />
                <Text style={styles.error}>{errors.stock}</Text>

                <Text style={styles.title}>Product Size</Text>
                <Picker
                    style={styles.formcontrol}
                     selectedValue={values.size}
                        onValueChange={itemValue =>
                        setFieldValue('size',itemValue)
                    }>
               <Picker.Item  label="Selelct Product Size" value="" />
                    {sizes.map(size=>{
                        return(
                            <Picker.Item  label={size.name} value={size._id} />
                        )
                    })}
                </Picker>
                <Text style={styles.error}>{errors.size}</Text>

                <Text style={styles.title}>Brand</Text>
                <Picker
                    style={styles.formcontrol}
                    selectedValue={values.brand}
                        onValueChange={itemValue =>
                        brandValue(itemValue,setFieldValue)
                        
                    }>
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
                        />
                        <Text style={styles.error}>{errors.custombrand}</Text>
                    </View>
                    ):(null)}
                    
                <Text style={styles.error}>{errors.brand}</Text>

                <Text style={styles.title}>Color</Text>
                <Picker
                    style={styles.formcontrol}
                     selectedValue={values.color}
                        onValueChange={itemValue =>
                        setFieldValue('color',itemValue)
                    }>
               <Picker.Item  label="Selelct Product Color" value="" />
                    {colors.map(color=>{
                        return(
                            
                            <Picker.Item  label={color.name} value={color._id} />
                        )
                    })}
                </Picker>
                <Text style={styles.error}>{errors.color}</Text>




                <Text style={styles.title}>Original Price</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    placeholder="Product original price"
                    onChangeText={handleChange("original")}
                />
                <Text style={styles.error}>{errors.original}</Text>
                <Text style={styles.title}>Listing Price</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    placeholder="Product listing price"
                    onChangeText={
                        handleChange('price')
                        
                    }

                    onChange={(e)=>calcEarning(e,setFieldValue)}
                />
                <Text style={styles.error}>{errors.price}</Text>

                <Text style={styles.title}>Your Earning(when sold)</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    value={values.earning_price}

                />
                <Text style={styles.error}>{errors.earning_price}</Text>
                <Text style={styles.title}>Product Type</Text>
                <Picker
                    style={styles.formcontrol}
                     selectedValue={values.type}
                        onValueChange={itemValue =>
                        setFieldValue('type',itemValue)
                    }>
                             <Picker.Item  label="Selelct Product Type" value="" />
                            <Picker.Item  label="Rent" value="rent" />
                            <Picker.Item  label="Sale" value="sale" />
                </Picker>
                <Text style={styles.error}>{errors.type}</Text>

                <TouchableWithoutFeedback onPress={handleSubmit}>
                <Text style={bbstyles.btnPrimary}>Submit</Text>
                </TouchableWithoutFeedback>
                </> 
           )}
           </Formik>
        </ScrollView>
    )
}


function Nasted({categories, n}){

  
    var inc = n;
    function increment(n){
      var ele = "\u00A0 \u00A0 \u00A0"
      inc += 1;
      return ele.repeat(n)
    }

  

    return(
        categories.map(category=>{
            return(
                [
                <Picker.Item  label= {increment(n) + category.name} value={category._id} />,
                renderPickerItem(category.childrens)
                ]
            )
        })
    )
}

const styles = StyleSheet.create({
    container:{
        margin:20
    },
    error:{
        color:'red',
        marginTop:5
    },
    title:{
        fontSize:20,
        fontWeight:'500',
        marginTop:20
    },
    formcontrol: {
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 10,
    },
    customBrand:{
        display:'none'
    }
})


export default CreatePost
