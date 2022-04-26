import { StyleSheet, Text, View,SafeAreaView, ScrollView,Image ,Dimensions,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import Filter from '../Product/filters/Filter'
import axios from 'axios'
import { imageLink } from '../ImageLink'

export default function CategoryPage({navigation,route}) {
   const[filter,setFilter] = useState(false)
   const[pageNo,setPageNo] = useState(1)
   const[sorting,setSorting] = useState('-_id')
   const[products,setProducts] = useState([])
   const[brands,setBrands] = useState([])
   const[colors,setColors] = useState([])
   const[totalProduct,setTotalProduct] = useState(24)

   const[brand_id,setBrand_id] = useState([])
   const[color_id,setColor_id]= useState([])
   const[minprice,setMinprice] = useState([])
   const[maxprice,setMaxprice] = useState([])

   const[category_id,setCategory_id] = useState([])
   const[currentcatId,setCurrentcatId] = useState(null)
   const[itemsPerPage,setItemsPerPage] = useState(24)

 

   const category = route.params

   useEffect(() => {
    if(brand_id && brand_id.length!=0|| color_id &&color_id.length!=0 || minprice &&minprice.length!=0 || category_id && category_id.length!=0) {
        filterProducts()
    }else{
        getProducts()
    }
   }, [pageNo,sorting,brand_id,color_id,category_id,minprice])
   
   async function getProducts(){
      
       try {
        const data = {
            category_slug:category.slug,
            pageNo,
            sorting
        }
        var response = await axios.post('/category/filter',data)
        console.log(response.data)
        setProducts(response.data.products)
        setBrands(response.data.brands)
        setColors(response.data.colors)
        setCurrentcatId(response.data.category._id)
        setTotalProduct(response.data.count)
       } catch (error) {
           console.log(error.message)
       }
   }


   async function filterProducts(){
        var data={
            brand_id,
            color_id,
            minprice,
            maxprice,
            category_id,
            pageNo,
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
                pageNo,
                sorting
            }
        }

        try {
            var response= await axios.post('/category/checkfilter',data)
            var x = response.data.products.filter((v,i,a)=>a.findIndex(t=>(t._id === v._id))===i)
                setProducts(x)
                setTotalProduct(response.data.total)

                var currentPageNo = response.data.total/itemsPerPage
                currentPageNo=  Math.ceil(currentPageNo)
                if(currentPageNo<pageNo){
                    setPageNo(currentPageNo)
                }
        } catch (error) {
            
        }
   }

  return (
      filter?(
          <Filter 
              setFilter= {setFilter}
              brand_id = {brand_id}
              color_id = {color_id}
              minprice = {minprice}
              maxprice = {maxprice}
              setBrand_id = {setBrand_id}
              setColor_id = {setColor_id}
              setMaxprice = {setMaxprice}
              setMinprice = {setMinprice}
              colors= {colors}
              brands = {brands}
          />
      ):(
    <SafeAreaView style={{backgroundColor:'white',flex:1}} >
    <ScrollView >
    <View style={styles.row}>
    <TouchableOpacity style={styles.sortContainer} onPress={()=>setFilter(true)}>
      <Ionicons name='filter' size={20}></Ionicons>
      <Text style={styles.filter}>Filters</Text>
    </TouchableOpacity>
    <View style={styles.sortContainer}>
    <MaterialCommunityIcons name='swap-vertical' size={20}></MaterialCommunityIcons>
        <Text style={styles.filter}>Price: lowest to high</Text>
    </View>
    </View>
    
    <View style={styles.container}>
        {products.map(product=>{
        return(
            <View style={styles.productWrapper}>
            <Image source={{uri:imageLink+product.image}} style={styles.productImage}></Image>
            <View style={styles.detailWrapper}>
            <Text style={styles.productName} numberOfLines={2} >{product.name}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:5, marginRight:5}}>Brands</Text>
                <Text>{product.brand_id?.name}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:5,marginRight:5}}>Price</Text>
                <Text style={{fontWeight:'700',fontFamily:'Raleway_700Bold',marginVertical:5}}>Rs.{product.price}</Text>
            </View>
            </View>
        </View>
        )
    })}
    </View>
    </ScrollView>
    </SafeAreaView>
      )
  )
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20,
        paddingBottom:15,
        borderBottomColor:'#3C3C434A',
        borderBottomWidth:0.5,
        marginBottom:15
    },
    sortContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    filter:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Raleway_400Regular',
        marginLeft:5
    },
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        
     
    },
    productImage:{
        height:210,
        resizeMode:'cover'

    },
    productWrapper:{
      
        width:(Dimensions.get('window').width-30)/2,
        marginRight:10,
        marginBottom:10,

        
    },
    productName:{
        fontSize:12,
        fontWeight:'500',
        marginVertical:5,
        fontFamily:'Raleway_600SemiBold'
    },
    detailWrapper:{
        padding:10,
        shadowColor: "#ddd",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 5,

        elevation: 7,
    }

})