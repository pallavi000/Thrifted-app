import React, { useState,useEffect,useContext, useMemo } from 'react'
import { View, Text, TextInput, StyleSheet,TouchableWithoutFeedback, ScrollView,Button } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import bbstyles from './Styles'
import axios from 'axios'
import { AuthContext } from './Context'
import {Picker} from '@react-native-picker/picker';
import MainImage from './Image/MainImage'



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
    image:Yup.string().required()
    
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
    
     
    return (
        <ScrollView style={bbstyles.container}>
        
            <Formik 
           initialValues={{name:'',detail:'',category:'',stock:'',size:'',brand:'',color:'',original:'',price:'',earning_price:'',type:'',image:'',custombrand:''}}
           onSubmit={(values)=>createPost(values)}
           validationSchema={validationSchema}
           
           >
           {({handleChange,handleSubmit,errors,setFieldValue})=>(
               <>
               <MainImage/>
               <Text style={styles.title}>Product Name</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    placeholder="Enter product name"
                    onChange={handleChange("name")}
                />
                  <Text style={styles.error}>{errors.name}</Text>

                <Text style={styles.title}>Description</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    placeholder="Product Description"
                    onChange={handleChange("detail")}
                />
                <Text style={styles.error}>{errors.detail}</Text>

                <Text style={styles.title}>Category</Text>
                <Picker
                    style={styles.formcontrol}
                        onValueChange={itemValue =>
                        setFieldValue('category',itemValue)
                    }>
                  <Picker.Item  label="Selelct Product Category" value="" />
                    {categories.map(category=>{
                        return(
                            <>
                            <Picker.Item  label={category.name} value={category._id} />
                            <Nasted categories= {category.childrens} n={1}/>
                            </>
                        )
                    })}
                </Picker>
                <Text style={styles.error}>{errors.category}</Text>

                <Text style={styles.title}>Product Quantity</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    placeholder="Product quantity"
                    onChange={handleChange("stock")}
                />
                <Text style={styles.error}>{errors.stock}</Text>

                <Text style={styles.title}>Product Size</Text>
                <Picker
                    style={styles.formcontrol}
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
                            onChange={handleChange("custombrand")}
                        />
                        <Text style={styles.error}>{errors.custombrand}</Text>
                    </View>
                    ):(null)}
                    





                <Text style={styles.error}>{errors.brand}</Text>

                <Text style={styles.title}>Color</Text>
                <Picker
                    style={styles.formcontrol}
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
                    onChange={handleChange("original")}
                />
                <Text style={styles.error}>{errors.original}</Text>
                <Text style={styles.title}>Listing Price</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    placeholder="Product listing price"
                    onChange={handleChange("price")}
                />
                <Text style={styles.error}>{errors.price}</Text>

                <Text style={styles.title}>Your Earning(when sold)</Text>
                <TextInput
                style={styles.formcontrol}
                    keyboardType='default'
                    onChange={handleChange("earning_price")}
                />
                <Text style={styles.error}>{errors.earning_price}</Text>
                <Text style={styles.title}>Product Type</Text>
                <Picker
                    style={styles.formcontrol}
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
                <>
                <Picker.Item  label= {increment(n) + category.name} value={category._id} />
                <Nasted categories={category.childrens} n={inc}/>
                </>
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
