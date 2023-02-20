import axios from "axios";
import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../Context";
import { imageLink } from "../ImageLink";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";
import FastImage from "react-native-fast-image";

export default function ProductDetail({ navigation, route }) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyOrdered, setAlreadyOrdered] = useState(false);
  const [like, setLike] = useState(false);
  const sheetRef = useRef(null);
  const fall = new Animated.Value(1);
  const IsFocused = useIsFocused();
  const [product, setProduct] = useState(route.params);

  const data = useContext(AuthContext);
  const {
    cartCount,
    setCartCount,
    config,
    cartItems,
    decode,
    setSelectedProduct,
    selectedProduct,
  } = data;
  const { getCartItems } = data;

  useEffect(() => {
    setSelectedProduct(route.params);
  }, []);

  useEffect(() => {
    if (selectedProduct._id) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const initialize = React.useCallback(() => {
    const isInCart = cartItems.find(
      (item) => item.product_id?._id == product._id
    );
    if (isInCart) {
      setProduct({ ...product, stock: product.stock - isInCart.quantity });
    }
    if (product?.likes.find((like) => like.user_id == decode._id)) {
      setLike(true);
    }
  });

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (product.seller_id._id == decode._id) {
      checkIfInOrder();
    }
  }, [decode]);

  const checkIfInOrder = useCallback(async () => {
    try {
      const data = {
        product_id: product._id,
      };
      const response = await axios.post("/order/ongoing", data, config);
      setAlreadyOrdered(true);
      customSuccessNotification(
        "This product has been already ordered. Please prepare the parcel and handover to our agent."
      );
    } catch (error) {
      // No Order Ongoing for this product
    }
  }, []);

  const addLike = useCallback(async () => {
    try {
      const data = {
        action: like ? "unlike" : "like",
      };
      const response = await axios.post(
        "/post/like/post/" + product._id,
        data,
        config
      );
      setLike(!like);
      if (like) {
        setProduct({ ...product, likes_count: product.likes_count - 1 });
      } else {
        setProduct({ ...product, likes_count: product.likes_count + 1 });
      }
    } catch (error) {
      if (like) {
        setProduct({ ...product, likes_count: product.likes_count + 1 });
      } else {
        setProduct({ ...product, likes_count: product.likes_count - 1 });
      }
      setLike(like);
    }
  }, [like, product]);

  const addtocart = async (pid) => {
    try {
      setIsSubmitting(true);
      const data = {
        pid,
        quantity: 1,
      };
      const response = await axios.post("/addtocart/cart", data, config);
      setIsSubmitting(false);
      sheetRef.current.snapTo(0);
      getCartItems(token);
      setCartCount(cartCount + 1);
      setProduct({ ...product, stock: product.stock - 1 });
    } catch (err) {
      if (err.request.status == 410) {
        // Out Of Stock
        setProduct({ ...product, stock: 0 });
      }
      setIsSubmitting(false);
      apiErrorNotification(error);
    }
  };

  const parseImages = useCallback((image, images) => {
    var arr = [imageLink + image];
    if (images && images.length) {
      images.forEach((image) => {
        arr.push(imageLink + image);
      });
    }
    return arr;
  });

  const numberWithCommas = useCallback((x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const getFollowersCount = useCallback((user) => {
    if (user.followers && user.followers.length > 0) {
      const num = user.followers.length;
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k";
      }
      return numberWithCommas(num);
    }
    return 0;
  }, []);

  const renderContent = useCallback(() => (
    <View
      style={{
        backgroundColor: "#fff",
        height: 300,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="cart-outline" size={60} color="#000" />
      <Text
        style={{
          fontFamily: "Raleway_700Bold",
          fontSize: 24,
        }}
      >
        Product Added to cart!
      </Text>
      <TouchableOpacity
        onPress={() => sheetRef.current.snapTo(1)}
        style={[styles.loginBtn, { borderRadius: 0 }]}
      >
        <Text style={styles.loginText}>Back to Shopping</Text>
      </TouchableOpacity>
    </View>
  ));

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0]}
        borderRadius={10}
        initialSnap={1}
        renderContent={renderContent}
        callbackNode={fall}
        enabledContentTapInteraction={false}
      />

      <ScrollView>
        <Animated.View
          style={{
            opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ zIndex: 7 }}>
            <View style={styles.detailImage}>
              <SliderBox
                images={parseImages(product.image, product.feature_image)}
                ImageComponent={__DEV__ ? Image : FastImage}
                ImageComponentStyle={styles.productImage}
                dotColor="#663399"
                resizeMode="contain"
                imageLoadingColor="#663399"
                pagingEnabled
                enablePinchable={__DEV__ ? false : true}
              />
            </View>
          </View>

          <View style={styles.detailContainer}>
            <View style={styles.productName}>
              <Text style={styles.name}>{product.name}</Text>
            </View>

            <View style={styles.productreview}>
              <TouchableOpacity
                onPress={() => addLike()}
                style={{ marginRight: 5 }}
              >
                {like ? (
                  <MaterialCommunityIcons
                    name="cards-heart"
                    size={25}
                    color="red"
                  ></MaterialCommunityIcons>
                ) : (
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={25}
                    color="black"
                  ></MaterialCommunityIcons>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Comments", product._id)}
              >
                <Image
                  source={require("../../assets/icons/Comment.png")}
                  style={styles.smallIcon}
                />
              </TouchableOpacity>

              <View>
                <Image
                  source={require("../../assets/icons/Share.png")}
                  style={styles.smallIcon}
                />
              </View>
            </View>
            <View style={styles.typeWrapper}>
              <Text style={styles.productname}>
                {product.likes_count} Likes
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Comments", product._id)}
              style={styles.typeWrapper}
            >
              <Text style={styles.viewComment}>
                View All {product.comments_count} Comments
              </Text>
            </TouchableOpacity>

            <View style={styles.productFeature}>
              <View style={styles.sizeWrapper}>
                <Text style={styles.featureName}>Size</Text>
                <View style={styles.productFeatureWrapper}>
                  <Text style={styles.featureValue}>
                    {product.size_id?.name}
                  </Text>
                </View>
              </View>
              <View style={styles.sizeWrapper}>
                <Text style={styles.featureName}>Type</Text>
                <View style={styles.productFeatureWrapper}>
                  <Text style={styles.featureValue}>{product.type}</Text>
                </View>
              </View>
              <View style={styles.sizeWrapper}>
                <Text style={styles.featureName}>Brand</Text>
                <View style={styles.productFeatureWrapper}>
                  <Text style={styles.featureValue}>
                    {product.brand_id?.name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.productDetailWrapper}>
              <Text style={styles.detailHeader}>Description</Text>
              {showFullDesc ? (
                <>
                  <Text style={styles.productDetail}>{product.detail}</Text>
                  <TouchableOpacity
                    onPress={() => setShowFullDesc(!showFullDesc)}
                    style={styles.seemore}
                  >
                    <Feather
                      name="arrow-left"
                      size={20}
                      color={"#663399"}
                    ></Feather>
                    <Text style={styles.fullDesc}>Hide Full description</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.productDetail} numberOfLines={4}>
                    {product.detail}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowFullDesc(!showFullDesc)}
                    style={styles.seemore}
                  >
                    <Text style={styles.fullDesc}>Full description</Text>
                    <Feather
                      name="arrow-right"
                      size={20}
                      color={"#663399"}
                    ></Feather>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.productDetailWrapper}>
              <Text style={styles.detailHeader}>About this seller</Text>
              <View style={styles.shopWrapper}>
                <Image
                  source={{ uri: imageLink + product.seller_id?.image }}
                  style={styles.sellerImage}
                />
                <View>
                  <Text style={styles.sellerName}>
                    {product.seller_id?.name}
                  </Text>
                  <Text style={styles.sellerEmail}>
                    {product.seller_id?.email}
                  </Text>
                  <Text style={styles.sellerFollowers}>
                    {getFollowersCount(product.seller_id)} followers
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("My Closet", product.seller_id)
                }
                style={styles.shopFeatureWrapper}
              >
                <Text style={styles.featureValue}>View Seller</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.productPrice}>
                    <Text style={styles.priceTitle}>Total</Text>
                    <Text style={styles.priceValue}>Rs. {product.price}</Text>
                </View> */}
          </View>
        </Animated.View>
      </ScrollView>
      {isSubmitting ? (
        <View style={{ borderTopWidth: 1, borderTopColor: "#E3E3E3" }}>
          <TouchableOpacity style={styles.loginBtn}>
            <ActivityIndicator size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : alreadyOrdered ? (
        <View style={{ borderTopWidth: 1, borderTopColor: "#E3E3E3" }}>
          <TouchableOpacity style={styles.loginBtnDisabled}>
            <Text style={styles.loginText}>
              Order in Process (रु {product.price})
            </Text>
          </TouchableOpacity>
        </View>
      ) : product.seller_id._id == decode._id ? (
        <View style={{ borderTopWidth: 1, borderTopColor: "#E3E3E3" }}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate("Edit Post", product)}
          >
            <Text style={styles.loginText}>Edit Product</Text>
          </TouchableOpacity>
        </View>
      ) : product.stock <= 0 ? (
        <View style={{ borderTopWidth: 1, borderTopColor: "#E3E3E3" }}>
          <TouchableOpacity style={styles.loginBtnDisabled}>
            <Text style={styles.loginText}>
              Out of Stock (रु {product.price})
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ borderTopWidth: 1, borderTopColor: "#E3E3E3" }}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => addtocart(product._id)}
          >
            <Text style={styles.loginText}>
              Add to cart (रु {product.price})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sellerName: {
    fontFamily: "Raleway_500Medium",
  },
  sellerEmail: {
    fontFamily: "Raleway_400Regular",
    color: "rgba(0, 0, 0, 0.5)",
    marginVertical: 2,
  },
  sellerFollowers: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  shopWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  sellerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  productreview: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  viewComment: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    color: "rgba(0, 0, 0, 0.5)",
    marginBottom: 10,
  },
  smallIcon: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  activeIcon: {
    height: 25,
    width: 25,
    marginRight: 5,
    color: "red",
  },
  productWrapper: {
    marginBottom: 20,
  },
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  userimage: {
    height: 34,
    width: 34,
    borderWidth: 2,
    borderColor: "rebeccapurple",
    padding: 5,
    borderRadius: 17,
  },
  username: {
    fontSize: 16,
    textTransform: "capitalize",
    marginLeft: 6,
  },
  product: {},

  typeWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  productname: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    width: 180,
  },
  type: {
    fontSize: 14,
    paddingHorizontal: 9,
    paddingVertical: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    textTransform: "capitalize",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 5,
  },
  size: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  brand: {
    fontSize: 15,
    marginLeft: 5,
  },
  productreview: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  reviewicon: {
    marginRight: 10,
  },

  detailImage: {
    backgroundColor: "#f5f5ff",
    paddingVertical: 30,
    zIndex: 8,
  },
  productImage: {
    width: Dimensions.get("window").width,
    height: 300,
    resizeMode: "contain",
    flex: 1,
  },
  detailContainer: {
    flex: 1,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 30,
  },
  name: {
    fontSize: 28,
    lineHeight: 33,
    fontFamily: "Raleway_600SemiBold",
  },
  productName: {
    marginBottom: 0,
  },

  productFeature: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featureName: {
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Raleway_700Bold",
    marginBottom: 10,
  },
  loginBtnDisabled: {
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    width: Dimensions.get("window").width - 60,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#cccccc",
    color: "#666666",
    alignSelf: "center",
  },
  featureValue: {
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "Raleway_700Bold",
    textTransform: "capitalize",
  },
  shopFeatureWrapper: {
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 0.3,
    width: Dimensions.get("window").width - 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  productFeatureWrapper: {
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 0.3,
    width: (Dimensions.get("window").width - 60) / 3,
    alignItems: "center",
  },
  productDetailWrapper: {
    marginTop: 25,
  },
  detailHeader: {
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Raleway_700Bold",
    marginVertical: 10,
  },
  productDetail: {
    fontSize: 15,
    fontWeight: "400",
    opacity: 0.5,
    fontFamily: "Raleway_400Regular",
    marginBottom: 10,
  },

  seemore: {
    flexDirection: "row",
    alignItems: "center",
  },

  fullDesc: {
    color: "#663399",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Raleway_700Bold",
    marginRight: 5,
  },
  productPrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  priceTitle: {
    fontSize: 17,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
  },
  priceValue: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Raleway_700Bold",
    color: "#663399",
  },
  loginBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width - 60,
    backgroundColor: "#663399",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  loginText: {
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
});
