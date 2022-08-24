import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Share,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../Context";
import { imageLink } from "../ImageLink";
import { Raleway_500Medium } from "@expo-google-fonts/raleway";
// import { SliderBox } from "react-native-image-slider-box";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ExpoFastImage from "expo-fast-image";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";

import { SliderBox } from "react-native-image-slider-box";

export default React.memo(function Action(props) {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const { navigation } = props;
  const [product, setProduct] = useState(props.product);
  const [doubleClick, setDoubleClick] = useState(0);
  const data = useContext(AuthContext);
  const { token, decode } = data;
  const config = {
    headers: {
      "access-token": token,
    },
  };

  const handle = useRef();

  const currentValue = useSharedValue(1);
  const scaleHeart = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: currentValue.value ? currentValue.value : 1 }],
  }));

  const mStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scaleHeart.value, 0) }],
  }));

  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const xCurrent = useSharedValue(0);
  const yCurrent = useSharedValue(0);
  const xPrevious = useSharedValue(0);
  const yPrevious = useSharedValue(0);
  const scaleCurrent = useSharedValue(1);
  const scalePrevious = useSharedValue(1);

  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = 400;

  const pinchHandler = useAnimatedGestureHandler({
    onStart: (event) => {
      if (event.numberOfPointers == 2) {
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      }
    },
    onActive: (event) => {
      if (event.numberOfPointers == 2) {
        // On Android, the onStart event gives 0,0 for the focal
        // values, so we set them here instead too.
        if (event.oldState === 2) {
          focalX.value = event.focalX;
          focalY.value = event.focalY;
        }
        scaleCurrent.value = event.scale;
        xCurrent.value = (1 - scaleCurrent.value) * (focalX.value - WIDTH / 2);
        yCurrent.value = (1 - scaleCurrent.value) * (focalY.value - HEIGHT / 2);
      }
    },
    onCancel: () => {
      focalX.value = 0;
      focalY.value = 0;
      xCurrent.value = 0;
      yCurrent.value = 0;
      xPrevious.value = 0;
      yPrevious.value = 0;
      scaleCurrent.value = 1;
      scalePrevious.value = 1;
    },
    onEnd: () => {
      focalX.value = 0;
      focalY.value = 0;
      xCurrent.value = 0;
      yCurrent.value = 0;
      xPrevious.value = 0;
      yPrevious.value = 0;
      scaleCurrent.value = 1;
      scalePrevious.value = 1;
    },
  });

  const pinchHandlerStateChange = (event) => {
    //start
    if (event.nativeEvent.state === State.ACTIVE) {
      props.setEnableScroll(false);
    }
    // ends
    if (event.nativeEvent.oldState === State.ACTIVE) {
      props.setEnableScroll(true);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: xCurrent.value },
        { translateY: yCurrent.value },
        { scale: scaleCurrent.value },
        { translateX: xPrevious.value },
        { translateY: yPrevious.value },
        { scale: scalePrevious.value },
      ],
    };
  });

  useEffect(() => {
    if (props.product?.likes.find((like) => like.user_id == decode._id)) {
      setLike(true);
    }
  }, []);

  const addLike = useCallback(async () => {
    currentValue.value = withSpring(0.1, undefined, (isFinished) => {
      if (isFinished) {
        currentValue.value = withSpring(1);
      }
    });
    scaleHeart.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scaleHeart.value = withSpring(0);
      }
    });
    try {
      const data = {
        action: like ? "unlike" : "like",
      };
      if (like) {
        setProduct({ ...product, likes_count: product.likes_count - 1 });
      } else {
        setProduct({ ...product, likes_count: product.likes_count + 1 });
      }
      setLike(!like);
      const response = await axios.post(
        "/post/like/post/" + props.product._id,
        data,
        config
      );
    } catch (error) {
      if (like) {
        setProduct({ ...product, likes_count: product.likes_count + 1 });
      } else {
        setProduct({ ...product, likes_count: product.likes_count - 1 });
      }
      setLike(like);
    }
  }, [like]);

  const parseImages = useCallback((image, images) => {
    var arr = [imageLink + image];
    images.forEach((image) => {
      arr.push(imageLink + image);
    });
    return arr;
  }, []);

  const singleOrDoubleClick = useCallback(
    (item) => {
      if (doubleClick >= 1) {
        if (handle.current) {
          clearTimeout(handle.current);
        }
        setDoubleClick(0);
        // Double Clicked
        addLike();
      } else {
        setDoubleClick(doubleClick + 1);
        handle.current = setTimeout(() => {
          setDoubleClick(0);
          // Single Click
          navigation.navigate("Product Detail", item);
        }, 300);
      }
    },
    [doubleClick]
  );

  const onShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `${item.name} \n\n रु ${item.price} \n\n${imageLink}/product-detail/${item._id}`,
      });
      if (result.action === Share.sharedAction) {
        // shared
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Product Detail", product)}
      >
        <View style={{ marginBottom: 5 }} key={product._id}>
          <TouchableOpacity
            onPress={() => navigation.navigate("My Closet", product.seller_id)}
            style={styles.userWrapper}
          >
            <Image
              style={styles.userimage}
              source={{ uri: imageLink + product.seller_id?.image }}
            ></Image>
            <Text style={styles.username}>{product.seller_id?.name}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.productWrapper}>
        <View style={styles.product}>
          {/* <FlatList
            data={parseImages(product.image, product.feature_image)}
            keyExtractor={item=>item}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            initialNumToRender={1}
            renderItem={({item})=>(
                <TouchableWithoutFeedback onPress={()=>singleOrDoubleClick(product)}>
                    <Image style={styles.productImage} source={{uri:item}}></Image>
                </TouchableWithoutFeedback>
            )}
            /> */}

          <Animated.View style={[styles.bigHeart, mStyle]}>
            <MaterialCommunityIcons
              name="cards-heart"
              size={130}
              color="white"
              style={styles.bigHeartIcon}
            />
          </Animated.View>

          {product.stock <= 0 ? (
            <View style={styles.isSold}>
              <Text style={styles.isSoldText}>Sold</Text>
            </View>
          ) : null}

          <GestureHandlerRootView style={{ flex: 1, zIndex: 99 }}>
            <TapGestureHandler onActivated={() => singleOrDoubleClick(product)}>
              <View style={styles.productImage}>
                <PinchGestureHandler
                  onGestureEvent={pinchHandler}
                  onHandlerStateChange={pinchHandlerStateChange}
                >
                  {/* <ExpoFastImage
                        uri={imageLink+product.image} // image address
                        cacheKey={product._id} // could be a unque id
                        style={styles.productImage} // your custom style object
                        // any supported props by Image
                    /> */}
                  <Animated.Image
                    source={{ uri: imageLink + product.image }}
                    style={[styles.productImage, animatedStyle]}
                  />
                </PinchGestureHandler>
              </View>
            </TapGestureHandler>
          </GestureHandlerRootView>

          {/* <SliderBox
            images={parseImages(product.image, product.feature_image)}
            ImageComponentStyle={styles.productImage}
            dotColor="#663399"
            imageLoadingColor="#663399"
            activeOpacity={1}
            onCurrentImagePressed={() => singleOrDoubleClick(product)}
            pagingEnabled
          /> */}

          <View style={styles.productreview}>
            <TouchableOpacity
              onPress={() => addLike()}
              style={{ marginRight: 5 }}
            >
              {like ? (
                <Animated.View style={rStyle}>
                  <MaterialCommunityIcons
                    name="cards-heart"
                    size={25}
                    color="red"
                  />
                </Animated.View>
              ) : (
                <Animated.View style={rStyle}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={25}
                    color="black"
                  />
                </Animated.View>
              )}
            </TouchableOpacity>

            {/* <View>
                <Image source={require('../../assets/icons/Shop.png')} style={styles.smallIcon}/>
                </View> */}

            <TouchableOpacity
              onPress={() => navigation.navigate("Comments", product._id)}
            >
              <Image
                source={require("../../assets/icons/Comment.png")}
                style={styles.smallIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onShare(product)}>
              <Image
                source={require("../../assets/icons/Share.png")}
                style={styles.smallIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.typeWrapper}>
            <Text style={styles.productname}>{product.likes_count} Likes</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Product Detail", product)}
          >
            <View style={styles.typeWrapper}>
              <View>
                <Text style={styles.productname} numberOfLines={1}>
                  {product.name}
                </Text>
              </View>
              <View>
                <Text style={styles.type}>{product.type}</Text>
              </View>
            </View>
            <View style={styles.detailWrapper}>
              <Text style={styles.price}>Rs. {product.price}</Text>
              <Text>|</Text>
              <Text style={styles.size}>Size: {product.size_id?.name}</Text>
              <Text>|</Text>
              <Text style={styles.brand}>{product.brand_id?.name}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Comments", product._id)}
            style={styles.typeWrapper}
          >
            <Text style={styles.viewComment}>
              View All {product.comments_count} Comments
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  bigHeartIcon: {
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.95,
    shadowRadius: 35,
    elevation: 20,
    shadowColor: "#000",
  },
  bigHeart: {
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 70,
    top: 130,
    zIndex: 3,
  },
  isSold: {
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.35,
    shadowRadius: 35,
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: "#fa4a0c",
    position: "absolute",
    right: 20,
    top: 350,
    alignContent: "center",
    zIndex: 4,
  },
  isSoldText: {
    fontFamily: "Raleway_500Medium",
    color: "white",
  },

  productreview: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  viewComment: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    color: "rgba(0, 0, 0, 0.5)",
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
    paddingVertical: 5,
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
  productImage: {
    height: 400,
    width: Dimensions.get("window").width,
    resizeMode: "cover",
    zIndex: 99,
  },
  typeWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,

    marginBottom: 5,
  },
  detailWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  productname: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    width: 180,
  },
  type: {
    fontSize: 14,
    paddingHorizontal: 10,
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
    paddingHorizontal: 10,
  },
  reviewicon: {
    marginRight: 10,
  },
});
