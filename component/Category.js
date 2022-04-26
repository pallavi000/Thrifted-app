import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableOpacity,Image, Dimensions , useWindowDimensions,Modal, Pressable} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import bbstyles from './Styles';
import { imageLink } from './ImageLink';
import {FontAwesome} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';





const Category = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const[filterModalVisible,setFilterModalVisible] = useState(false)
    
    const[products,setProducts] = useState([])
    const[categories,setCategories] = useState([])
    const[brands,setBrands] = useState([])
    const[colors,setColors] = useState([])
    
    const[brand_id,setBrand_id] = useState([])
    const[color_id,setColor_id]= useState([])
    const[minprice,setMinprice] = useState([])
    const[maxprice,setMaxprice] = useState([])
    const[category_id,setCategory_id] = useState([])
    const[currentcatId,setCurrentcatId] = useState(null)
    const[currentCategory,setCurrentCategory] = useState([])

    const[selectedCategory,setSelectedCategory]= useState()
    const[selectedBrand,setSelectedBrand] = useState()
    const[selectedPrice,setSelectedPrice] = useState()
    const[selectedColor,setSelectedColor] = useState()




     const[totalProduct,setTotalProduct] = useState(24)
    const[pageno,setPageno] = useState(1)
    const[itemsPerPage,setItemsPerPage] = useState(24)
    const[sorting,setSorting] = useState('-_id')
    const[isShow,setIsShow] = useState(false)


    const {navigation,route} = props

       const [prices,setPrices] = useState([
        {
            minprice:0,
            maxprice:1000,
            isChecked:false,
            id:1
        },
        {
            minprice:1000,
            maxprice:2000,
            isChecked:false,
            id:2
        },
        {
            minprice:2000,
            maxprice:5000,
            isChecked:false,
            id:3
        },
        {
            minprice:5000,
            maxprice:8000,
            isChecked:false,
            id:4
        },
        {
            minprice:8000,
            maxprice:10000,
            isChecked:false,
            id:5
        },
        {
            minprice:10000,
            maxprice:15000,
            isChecked:false,
            id:6
        }

    ])
            useEffect(() => {
            
            const data={
                category_slug:'footwear',
                pageNo:pageno,
                sorting
            }    
            if(brand_id && brand_id.length!=0|| color_id &&color_id.length!=0 || minprice &&minprice.length!=0 || category_id && category_id.length!=0) {
                getProduct()
            } else {
                axios.post('/category/filter',data).then(response=>{
                setProducts(response.data.products)
               
                
                var temp_brands = []
                response.data.brands.map(brand=>{
                    if(temp_brands.some(temp=>temp.name == brand.name)){
                    }else{
                        temp_brands.push(brand)
                    }
                })
                setBrands(temp_brands)
                setCategories(response.data.categories)
                setCurrentcatId(response.data.category._id)
                setCurrentCategory(response.data.category)
                setColors(response.data.colors)
                setTotalProduct(response.data.count)
              
                
            }).catch(err=>{
                console.log(err)
            })
            }  
            
        
        }, [props,pageno,sorting,brand_id,color_id,category_id,minprice])




    function getProduct() {

        var data={
            brand_id,
            color_id,
            minprice,
            maxprice,
            category_id,
            pageNo:pageno,
            sorting
        }
    
        if(category_id && category_id.length>0){
        } else {
             data={
                brand_id,
                color_id,
                minprice,
                maxprice,
                category_id:[currentcatId],
                pageNo:pageno,
                sorting
            }
        }     
 
        axios.post('/category/checkfilter',data).then(response=>{
            console.log(response.data)
            var x = response.data.products.filter((v,i,a)=>a.findIndex(t=>(t._id === v._id))===i)
            setProducts(x)
            setTotalProduct(response.data.total)
            


            var currentPageNo = response.data.total/itemsPerPage
            currentPageNo=  Math.ceil(currentPageNo)
            if(currentPageNo<pageno){
                setPageno(currentPageNo)
            }

        }).catch(err=>{
            console.log(err)
        })
    }




    
    function brand_filter(id){
        setSelectedBrand(id)
        if(id){
setBrand_id([id])
        }else{
            setBrand_id([])
            
        }
            
    }


    function color_filter(id){
        setSelectedColor(id)
        if(id){
            setColor_id([id])
        }else{
            setColor_id([])
        }
    }

        function price_filter(value){
            setSelectedPrice(value)
            var price = value.split('|')
            var min = price[0]
            var max = price[1]

            
           if(max!='false'){
             setMaxprice([max])  
             setMinprice([min])
           }else{
               setMaxprice([])
               setMinprice([])
           }
        }

function category_filter(id){
    setSelectedCategory(id)
if(id){
  setCategory_id([id])
}else{
    setCategory_id([])
}
  

// if(category_id.includes(id)){
//     var x = category_id.filter(cate=>cate !=id)
//     setCategory_id(x)
// console.log(x)
// }else{
//     var y = [...category_id,id]
//     console.log(y)
//     setCategory_id(y)
// }
}


function closetSort(e){
    if(e.target.value=="date"){

        setSorting('-_id')
    }
    if(e.target.value=="alphabet"){

        setSorting('name')
    }

}


function paginate(value){
    setPageno(value)
}






    return (
       <ScrollView style={[styles.container,bbstyles.bgWhite]}>
        {/* sort Modal */}
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       >

             <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
          <View style={styles.modalHeader}>
           <TouchableOpacity onPress={()=>setModalVisible(false)}>
               <View style={styles.modalClose}>
                   <FontAwesome  name="times-circle" size={20} color={'red'}/>
                  
               </View>
           </TouchableOpacity>
          </View>

            <View style={styles.modalContent}>
                <Picker
                    selectedValue={sorting}
                    onValueChange={(itemValue, itemIndex) =>
                        setSorting(itemValue)
                    }>
                    <Picker.Item label="Date" value="-_id" />
                    <Picker.Item label="Alphabet" value="name" />
                    </Picker>
            </View>


          </View>
        </View>
        </Modal>

    {/* filter modal */}
          <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
       >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <View style={styles.modalHeader}>
           <TouchableOpacity onPress={()=>setFilterModalVisible(false)}>
               <View style={styles.modalClose}>
                   <FontAwesome  name="times-circle" size={20} color={'red'}/>
                  
               </View>
           </TouchableOpacity>
          </View>

            <ScrollView style={styles.modalContent}>
            <View style={styles.pickerWrapper}>
                    <Text style={styles.filterTitle}>Categories</Text>
                <Picker
                selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                       category_filter(itemValue)
                    }>
                    <Picker.Item label = "All" value=""/>
                        {categories.map(category=>{
                            return(
                                <Picker.Item label={category.name} value={category._id} />
                            )
                        })}
                </Picker>
                </View>

                <View style={styles.pickerWrapper}>
                    <Text style={styles.filterTitle}>Brands</Text>
                <Picker
                selectedValue={selectedBrand}
                    onValueChange={(itemValue, itemIndex) =>
                       brand_filter(itemValue)
                    }>
                    <Picker.Item label = "All" value=""/>
                        {brands.map(brand=>{
                            return(
                                <Picker.Item label={brand.name} value={brand._id} />
                            )
                        })}
                </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Text style={styles.filterTitle}>Colors</Text>
                <Picker
                    selectedValue={selectedColor}
                    onValueChange={(itemValue, itemIndex) =>
                       color_filter(itemValue)
                    }>
                    <Picker.Item label = "All" value=""/>
                        {colors.map(color=>{
                            return(
                                <Picker.Item label={color.name} value={color._id} />
                            )
                        })}
                </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Text style={styles.filterTitle}>Prices</Text>
                <Picker
                selectedValue={selectedPrice}
                    onValueChange={(itemValue, itemIndex) =>
                       price_filter(itemValue)
                    }>
                
                    <Picker.Item label = "All" value={`false|false`}/>
                        {prices.map(price=>{
                            return(
                                <Picker.Item label={`Rs. ${price.minprice} - Rs. ${price.maxprice}`} value={`${price.minprice}|${price.maxprice}`} />
                            )
                        })}
                </Picker>
                </View>
            </ScrollView>

          </View>
        </View>
        </Modal>


    
        <View style={styles.filterWrapper}>
         <View style={styles.sort} >
         <TouchableWithoutFeedback style={styles.sort}   onPress={()=>setModalVisible(true) }>
        
         <FontAwesome name="sort" size={15} color={'rebeccapurple'}/>
        <Text style={styles.sorttext}> Sort</Text>
       </TouchableWithoutFeedback>
         </View>
            <View style={styles.filter}>
             <TouchableWithoutFeedback  style={styles.filter}  onPress={()=>setFilterModalVisible(true)}> <FontAwesome  name="filter" size={15} color={'rebeccapurple'}/><Text style={styles.sorttext}> Filter</Text></TouchableWithoutFeedback>
                </View>
        </View>
        <View style={bbstyles.container}>
            <View style={styles.wrapper}>
            {products.map(product=>{
                return(
                 <View style={styles.productWrapper}>
                    <Image style={styles.productImage} source={{uri:imageLink+product.image}}/>
                    <View style={styles.detailWrapper}>
                        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                        <Text style={styles.brand}>{product.brand_id?.name}</Text>
                        <View style={styles.sizeWrapper}>
                            <Text style={styles.price}>Rs. {product.price}</Text> <Text>|</Text> <Text style={styles.size}>Size: {product.size_id?.name}</Text>
                        </View>
                    </View>
                 </View>
                )
            })}
            </View>
        </View>
        </ScrollView>

        
    )
}


const styles = StyleSheet.create({
    filterWrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
 marginBottom:5,

        padding:10,
        textAlign:'center',
       paddingVertical:15
    },
    container:{
        backgroundColor:'#fff'
    },
    sort:{
     flex:2,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center'
    },
    filter:{
    flex:2,
    flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
    },
    sorttext:{
        fontWeight:'500',
        fontSize:16
    },
    wrapper:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
        
    },
    productWrapper:{
     width: (Dimensions.get('window').width/2)-28,
     marginRight:8,
     marginBottom:15

    },
    productImage:{
        height:150,
        width:'auto',
        resizeMode:'cover'

    },
    detailWrapper:{
        marginTop:15,
        display:'flex',
    },
    productName:{
        fontSize:16,
        fontWeight:'600',
        marginBottom:5
    },
    brand:{
        fontSize:15,
        fontWeight:'500',
        marginBottom:5
    },
    sizeWrapper:{
        display:'flex',
        flexDirection:'row',
    
    },
    price:{
        fontSize:15,
        fontWeight:'bold',
        marginRight:5
    },
    size:{
        fontSize:15,
        fontWeight:'500',
        marginLeft:5
    },
     centeredView: {
    flex: 1, 
  },
  modalView: {
   
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,

    flex:1,
    width:Dimensions.get('window').width
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
  modalClose:{
    
  },
  modalHeader:{
    //   borderBottomWidth:1,
    //   borderBottomColor:'#ddd',
      padding:15,
     flexDirection:'row',
     justifyContent:'flex-end',
      shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent:{
      margin:10
  },
  pickerWrapper:{
      marginBottom:5,
      padding:5,
      borderBottomColor:'#ddd',
      borderBottomWidth:1,
      paddingBottom:10
  },
  filterTitle:{
    fontSize:16,
    fontWeight:'500',
    marginBottom:3
  }
    


})

export default Category
