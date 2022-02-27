import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableOpacity,Image } from 'react-native'
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import bbstyles from './Styles';
import { imageLink } from './ImageLink';


const Category = ({navigation,route}) => {
    
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

    const[pageno,setPageno] = useState(1)
    const[itemsPerPage,setItemsPerPage] = useState(12)
    const[start,setStart]= useState(0)
    const[end,setEnd] = useState(12)

    

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
        category_slug:route.params.slug
        }       
      axios.post('/category/filter',data).then(response=>{
          console.log(response.data)

       setProducts(response.data.products)
                var temp_brands = []
                response.data.brands.map(brand=>{
                    if(temp_brands.some(temp=>temp.name == brand.name)){
                    }else{
                        brand.isChecked= false
                        temp_brands.push(brand)
                    }
                })
                setBrands(temp_brands)

               const tempCat =  response.data.categories.map(cat=>{
                    cat.isChecked=false
                    return cat                   
                })
                setCategories(tempCat)
                setCurrentcatId(response.data.category._id)
              const tempColor = response.data.colors.map(color=>{
                  color.isChecked = false
                  return color
              })
                setColors(tempColor)

      }).catch(err=>{
          console.log(err.request.response)
      })
    }, [])


    function getProduct(catid,bid,cid,min,max) {  
        var data={
            brand_id:bid,
            color_id:cid,
            minprice:min,
            maxprice:max,
            category_id:catid
        }    

      
           if(catid && catid.length>0){
           } else {
             data={
                brand_id:bid,
                color_id:cid,
                minprice:min,
                maxprice:max,
                category_id:[currentcatId],
            }
           }     

           console.log(data)
               
           axios.post('/category/checkfilter',data).then(response=>{
               console.log(response.data)
               var x = response.data.filter((v,i,a)=>a.findIndex(t=>(t._id === v._id))===i)
               setProducts(x)
            }).catch(err=>{
                console.log(err.request.response)
            })
        }

      
function category_filter(id){

    let temp = categories.map((category) => {
      if (id === category._id) {
        return { ...category, isChecked: !category.isChecked };
      }
      return category;
    });
    setCategories(temp);


    if(category_id.includes(id)){
        var x = category_id.filter(cate=>cate !=id)
        setCategory_id(x)
        getProduct(x,brand_id,color_id,minprice,maxprice);

    }else{
        var y = [...category_id,id]
        setCategory_id(y)
        getProduct(y,brand_id,color_id,minprice,maxprice);
    }
}


 function brand_filter(id){

let temp = brands.map((brand) => {
      if (id === brand._id) {
        return { ...brand, isChecked: !brand.isChecked };
      }
      return brand;
    });
    setBrands(temp);

    if(brand_id.includes(id)){
        var x = brand_id.filter(br=>br !=id)
        setBrand_id(x)
        getProduct(category_id,x,color_id,minprice,maxprice);
    }else{
        var b = [...brand_id, id];
        setBrand_id(b)
        getProduct(category_id,b,color_id,minprice,maxprice);

    }
}

        function color_filter(id){
        let temp = colors.map((color) => {
            if (id === color._id) {
                return { ...color, isChecked: !color.isChecked };
            }
            return color;
            });
            setColors(temp);


            if(color_id.includes(id)){
                var y = color_id.filter(c=>c!=id)
                setColor_id(y)
                getProduct(category_id,brand_id,y,minprice,maxprice);

            
            }else{
                var z = [...color_id,id]
                setColor_id(z)
                getProduct(category_id,brand_id,z,minprice,maxprice);

               
            }

        }

           function price_filter(id,min,max){

            let temp = prices.map((price) => {
            if (id === price.id) {
                return { ...price, isChecked: !price.isChecked };
            }
            return price;
            });
            setPrices(temp);

            if(minprice.includes(min) && maxprice.includes(max)){
                var x = minprice.filter(m=>m!=min)
                var y = maxprice.filter(x=>x!=max)
                setMinprice(x)
                setMaxprice(y)
                getProduct(category_id,brand_id,color_id,x,y);

              
            }else{
            var x = [...minprice,min]
            var y = [...maxprice,max]
            setMaxprice(y)
            setMinprice(x)
            getProduct(category_id,brand_id,color_id,x,y);
           
            }
          
        }




    return (
       <ScrollView style={bbstyles.container}>
            <Text style={bbstyles.h1}>Categories</Text>
            <View style={{height:150}}>
              <ScrollView >
            {categories.map(category=>{
                return(
                    <View style={styles.section}>
                        <Checkbox style={styles.checkbox} value={category.isChecked} onValueChange={()=>category_filter(category._id)} />
                        <Text style={styles.paragraph}>{category.name}</Text>
                    </View>
                )
            })}
            </ScrollView>
            </View>
             <Text style={bbstyles.h1}>Brands</Text>
            
             <View style={{height:150}}>
              <ScrollView >
            {brands.map(brand=>{
                return(
                    <View style={styles.section}>
                        <Checkbox style={styles.checkbox} value={brand.isChecked} onValueChange={()=>brand_filter(brand._id)} />
                        <Text style={styles.paragraph}>{brand.name}</Text>
                    </View>
                )
            })}
            </ScrollView>
            </View>
            

             <Text style={bbstyles.h1}>Colors</Text>
            {colors.map(color=>{
                return(
                    <View style={styles.section}>
                        <Checkbox style={styles.checkbox} value={color.isChecked} onValueChange={()=>color_filter(color._id)} />
                        <Text style={styles.paragraph}>{color.name}</Text>
                    </View>
                )
            })}
        <Text style={bbstyles.h1}>Prices</Text>
            {prices.map(price=>{
                return(
                    <View style={styles.section}>
                        <Checkbox style={styles.checkbox} value={price.isChecked} onValueChange={()=>price_filter(price.id,price.minprice,price.maxprice)} />
                        <Text style={styles.paragraph}>Rs. {price.minprice} - Rs.{price.maxprice}</Text>
                    </View>
                )
            })}


<View style={styles.productWrapper}>
          {/* <Text style={bbstyles.h1}>New Arrival</Text> */}
          {products.map(product=>{
                            return(
                            <TouchableOpacity onPress={()=>navigation.navigate('productdetail',product)} style={styles.itemWrapper}>
                            <Image source={{uri:imageLink+product.image}} style={styles.itemImage}/>
                            <View style={styles.detailWrapper}>
                            <Text style={styles.itemName} numberOfLines={3}>{product.name}</Text>
                            <Text style={styles.itemSize}>Size: {product.size_id?.name}</Text>
                             <Text style={styles.itemPrice}>Rs.{product.price}</Text>
                            </View>
                         </TouchableOpacity>
                       
                            )
                        })}
          </View>

       </ScrollView>

    )
}

const styles = StyleSheet.create({
  container: {

    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
itemWrapper:{
        flexDirection:'row',
    
       paddingVertical:20
     
    },
    itemImage:{
        height:150,
      
        resizeMode:'cover',
        flex:2 
    },
    detailWrapper:{
        marginLeft:15,
        flex:3
    },
    itemName:{
        fontSize:17,
        fontWeight:'bold',
        marginBottom:5,
        textTransform:'capitalize'
    },
    itemSize:{
        fontSize:16,
        fontWeight:'500',
        marginBottom:5,
        textTransform:'capitalize'

    },
        itemPrice:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:5
    },

  product:{
        flex:1,
        flexDirection:'row',
        margin:20
    },
 
    

    

    productImage:{
        height:200,
        resizeMode:'contain',
        flex:2
    },

    productDesc:{
        fontWeight:'500',
        fontSize:16,
        flex:3,
        marginLeft:20,
    },
    productWrapper:{
   
      margin:15
    },
    productTitle:{
        fontWeight:'500',
        fontSize:16,
        marginBottom:5,
        textTransform:'capitalize'
    },
    productPrice:{
        fontWeight:'bold',
        marginBottom:5
    },
    productCategory:{
        textTransform:'capitalize'
    },


});

export default Category
