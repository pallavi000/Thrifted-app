import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Yup from "yup";
import { Formik } from "formik";
import bbstyles from "../Styles";
import axios from "axios";
import { AuthContext } from "../Context";
import Animated from "react-native-reanimated";
import CategorySelect from "./selects/CategorySelect";
import SimpleSelect from "./selects/SimpleSelect";
import BrandSelect from "./selects/BrandSelect";
import EditMainImage from "../Image/EditMainImage";
import {
  apiErrorNotification,
  customErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";
import BottomSheetComponent from "../BottomSheetComponent";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product Name is required"),
  detail: Yup.string().required("Product Detail is required"),
  category: Yup.string().required("Category is required"),
  stock: Yup.number().required("Quantity is required"),
  size: Yup.string().required("Product Size is required"),
  brand: Yup.string().required("Brand is required"),
  color: Yup.string().required("Color is required"),
  original: Yup.number().required("Original Price is required"),
  price: Yup.number().required("Price is required"),
  type: Yup.string().required("Product Type is required"),
  pickupOption: Yup.string().required("Pickup option is required"),
});

const EditPost = ({ navigation, route }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState(route.params);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showBrand, setShowBrand] = useState(false);
  const formRef = useRef();
  const sheetRef = useRef(null);
  const openCameraRef = useRef();
  const selectImageRef = useRef();
  const fill = new Animated.Value(1);
  const [earningPrice, setEarningPrice] = useState(0);
  const [openSelectField, setOpenSelectField] = useState(null);
  const [pickupOptions, setPickupOptions] = useState([
    {
      _id: "Door",
      name: "Pickup From Home",
    },
    {
      _id: "Branch",
      name: "Drop to Branch",
    },
  ]);
  const [productTypes, setProductTypes] = useState([
    {
      _id: "rent",
      name: "Rent",
    },
    {
      _id: "sale",
      name: "Sale",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(product.category_id);
  const [selectedColor, setSelectedColor] = useState(product.color_id);
  const [selectedSize, setSelectedSize] = useState(product.size_id);
  const [selectedType, setSelectedType] = useState({});
  const [selectedBrand, setSelectedBrand] = useState(product.brand_id);
  const [selectedPickupOption, setSelectedPickupOption] = useState({
    name: product.pickupOption,
    _id: product.pickupOption,
  });

  const data = useContext(AuthContext);
  const { token, selectedProduct, setSelectedProduct } = data;

  const config = {
    headers: {
      "access-token": token,
    },
  };

  const getProductType = React.useCallback((type) => {
    var type = productTypes.find((pt) => pt._id == type);
    if (type) {
      return type;
    }
    return { name: "Select Product Type" };
  });

  function editPost() {
    var errors = Object.values(formRef.current.errors);
    if (errors && errors.length > 0) {
      customErrorNotification(errors[0]);
      return;
    }
    formRef.current.handleSubmit();
  }

  const changeHeader = React.useCallback((value) => {
    if (value) {
      navigation.setOptions({
        headerShown: true,
        headerRight: () => (
          <View>
            <Text
              style={{
                fontFamily: "Raleway_700Bold",
                fontSize: 16,
                color: "#663399",
                marginRight: 10,
              }}
            >
              Updating...
            </Text>
          </View>
        ),
      });
    } else {
      navigation.setOptions({
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity onPress={() => editPost()}>
            <Text
              style={{
                fontFamily: "Raleway_700Bold",
                fontSize: 16,
                color: "#663399",
                marginRight: 10,
              }}
            >
              Update{" "}
              <MaterialCommunityIcons
                name="send-circle-outline"
                size={16}
                color="#663399"
              />
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  });

  useEffect(() => {
    changeHeader(isSubmitting);
  }, [isSubmitting]);

  const getSelectFields = React.useCallback(async () => {
    try {
      const response = await axios.get("/frontend/createpost", config);
      setColors(response.data.colors);
      setSizes(response.data.sizes);
      setCategories(response.data.categories);
      setBrands(response.data.brands);
    } catch (error) {}
  });

  const updatePost = React.useCallback(async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        "/product/edit/post/" + product._id,
        values,
        config
      );
      setSelectedProduct(response.data);
      setIsSubmitting(false);
      customSuccessNotification("Product detail updated.");
      navigation.goBack();
    } catch (error) {
      setIsSubmitting(false);
      apiErrorNotification(error);
    }
  });

  const calcEarning = React.useCallback((value) => {
    formRef.current.setFieldValue("price", value.toString());
    var price = value;
    var profit = price - (price * 20) / 100;
    formRef.current.setFieldValue("earning_price", profit.toString());
    setEarningPrice(profit.toString());
  });

  useEffect(() => {
    getSelectFields();
    setSelectedType(getProductType(product.type));
    calcEarning(product.price);
  }, []);

  useEffect(() => {
    formRef.current.setFieldValue("category", selectedCategory._id);
  }, [selectedCategory]);

  useEffect(() => {
    formRef.current.setFieldValue("pickupOption", selectedPickupOption._id);
  }, [selectedPickupOption]);

  useEffect(() => {
    formRef.current.setFieldValue("color", selectedColor._id);
  }, [selectedColor]);
  useEffect(() => {
    formRef.current.setFieldValue("size", selectedSize._id);
  }, [selectedSize]);
  useEffect(() => {
    formRef.current.setFieldValue("type", selectedType._id);
  }, [selectedType]);
  useEffect(() => {
    formRef.current.setFieldValue("brand", selectedBrand._id);
  }, [selectedBrand]);

  return (
    <>
      {openSelectField === "category" ? (
        <CategorySelect
          categories={categories}
          navigation={navigation}
          setOpenSelectField={setOpenSelectField}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          initChangeHeader={changeHeader}
        />
      ) : null}

      {openSelectField === "color" ? (
        <SimpleSelect
          selects={colors}
          selectedSelect={selectedColor}
          setOpenSelectField={setOpenSelectField}
          setSelectedSelect={setSelectedColor}
          navigation={navigation}
          initChangeHeader={changeHeader}
        />
      ) : null}

      {openSelectField === "size" ? (
        <SimpleSelect
          selects={sizes}
          selectedSelect={selectedSize}
          setOpenSelectField={setOpenSelectField}
          setSelectedSelect={setSelectedSize}
          navigation={navigation}
          initChangeHeader={changeHeader}
        />
      ) : null}

      {openSelectField === "type" ? (
        <SimpleSelect
          selects={productTypes}
          selectedSelect={selectedType}
          setOpenSelectField={setOpenSelectField}
          setSelectedSelect={setSelectedType}
          navigation={navigation}
          initChangeHeader={changeHeader}
        />
      ) : null}

      {openSelectField === "pickupOption" ? (
        <SimpleSelect
          selects={pickupOptions}
          selectedSelect={selectedPickupOption}
          setOpenSelectField={setOpenSelectField}
          setSelectedSelect={setSelectedPickupOption}
          navigation={navigation}
          initChangeHeader={changeHeader}
        />
      ) : null}

      {openSelectField === "brand" ? (
        <BrandSelect
          brands={brands}
          selectedSelect={selectedBrand}
          setOpenSelectField={setOpenSelectField}
          setSelectedSelect={setSelectedBrand}
          navigation={navigation}
          initChangeHeader={changeHeader}
        />
      ) : null}

      {isSubmitting ? (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
          <View style={bbstyles.loaderContainer}>
            <ActivityIndicator size={100} color="#663399" />
            <Text style={styles.payProcessing}>Updating Post</Text>
            <Text style={styles.subtitle}>Please wait...</Text>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={-500}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <BottomSheetComponent
              sheetRef={sheetRef}
              openCameraRef={openCameraRef}
              selectImageRef={selectImageRef}
              fill={fill}
            />

            <ScrollView>
              <Animated.View
                style={[
                  styles.container,
                  {
                    opacity: Animated.add(0.3, Animated.multiply(fill, 1.0)),
                  },
                ]}
              >
                <Formik
                  innerRef={formRef}
                  initialValues={{
                    name: product.name,
                    detail: product.detail,
                    category: product.category_id?._id,
                    stock: product.stock,
                    size: product.size_id?._id,
                    brand: product.brand_id?._id,
                    color: product.color_id?._id,
                    original: product.original,
                    price: product.price,
                    earning_price: earningPrice,
                    type: product.type,
                    image1: "",
                    custombrand: "",
                    image2: "",
                    image3: "",
                    image4: "",
                    pickupOptions: product.pickupOption,
                  }}
                  onSubmit={(values) => updatePost(values)}
                  validationSchema={validationSchema}
                  enableReinitialize
                >
                  {({
                    handleChange,
                    handleSubmit,
                    errors,
                    values,
                    setFieldValue,
                    touched,
                    handleBlur,
                  }) => (
                    <>
                      <EditMainImage
                        sheetRef={sheetRef}
                        openCameraRef={openCameraRef}
                        selectImageRef={selectImageRef}
                        mainImage={product.image}
                        featureImages={product.feature_image}
                      />
                      <View style={styles.formGroup}>
                        <Text style={styles.label}>
                          What are you selling? (Required)
                        </Text>
                        <TextInput
                          style={styles.input}
                          keyboardType="default"
                          onChangeText={handleChange("name")}
                          onBlur={handleBlur("name")}
                          defaultValue={product.name}
                          selectionColor="#663399"
                        />
                        {errors.name && touched.name ? (
                          <Text style={bbstyles.error}>{errors.name}</Text>
                        ) : null}
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>
                          Tell buyers about your selling (Required)
                        </Text>
                        <TextInput
                          style={styles.input}
                          keyboardType="default"
                          onChangeText={handleChange("detail")}
                          onBlur={handleBlur("detail")}
                          defaultValue={product.detail}
                          multiline={true}
                          selectionColor="#663399"
                        />
                        {errors.detail && touched.detail ? (
                          <Text style={bbstyles.error}>{errors.detail}</Text>
                        ) : null}
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Category (Required)</Text>
                        <TouchableOpacity
                          onPress={() => setOpenSelectField("category")}
                        >
                          <View style={styles.selectField}>
                            <Text
                              style={{
                                color: "black",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedCategory.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        {errors.category && touched.category ? (
                          <Text style={bbstyles.error}>{errors.category}</Text>
                        ) : null}
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Quantity (Required)</Text>
                        <TextInput
                          keyboardType="numeric"
                          style={styles.input}
                          onChangeText={handleChange("stock")}
                          onBlur={handleBlur("stock")}
                          defaultValue={`${product.stock}`}
                          selectionColor="#663399"
                        ></TextInput>
                        {errors.stock && touched.stock ? (
                          <Text style={bbstyles.error}>{errors.stock}</Text>
                        ) : null}
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Color (Required)</Text>
                        <TouchableOpacity
                          onPress={() => setOpenSelectField("color")}
                        >
                          <View style={styles.selectField}>
                            <Text
                              style={{
                                color: "black",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedColor.name}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        {errors.color && touched.color ? (
                          <Text style={bbstyles.error}>{errors.color}</Text>
                        ) : null}
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Brand (Optional)</Text>
                        <TouchableOpacity
                          onPress={() => setOpenSelectField("brand")}
                        >
                          <View style={styles.selectField}>
                            <Text
                              style={{
                                color: "black",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedBrand.name}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        {showBrand ? (
                          <View>
                            <Text style={styles.title}>Your brand name</Text>
                            <TextInput
                              style={styles.formcontrol}
                              keyboardType="default"
                              placeholder="Enter brand name"
                              onChangeText={handleChange("custombrand")}
                              onBlur={handleBlur.custombrand}
                              selectionColor="#663399"
                            />
                            <Text style={bbstyles.error}>
                              {errors.custombrand}
                            </Text>
                          </View>
                        ) : null}

                        <Text style={bbstyles.error}>{errors.brand}</Text>
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Size (Required)</Text>
                        <TouchableOpacity
                          onPress={() => setOpenSelectField("size")}
                        >
                          <View style={styles.selectField}>
                            <Text
                              style={{
                                color: "black",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedSize.name}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        {touched.size && errors.size ? (
                          <Text style={bbstyles.error}>{errors.size}</Text>
                        ) : null}
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>
                          Original Price(Required)
                        </Text>
                        <TextInput
                          keyboardType="numeric"
                          style={styles.input}
                          onChangeText={handleChange("original")}
                          onBlur={handleBlur("original")}
                          defaultValue={`${product.original}`}
                          selectionColor="#663399"
                        ></TextInput>
                        {touched.original && errors.original ? (
                          <Text style={bbstyles.error}>{errors.original}</Text>
                        ) : null}
                      </View>
                      <View style={styles.formGroup}>
                        <Text style={styles.label}>
                          Listing Price (Required)
                        </Text>
                        <TextInput
                          keyboardType="numeric"
                          style={styles.input}
                          onChangeText={(value) => calcEarning(value)}
                          onBlur={handleBlur("price")}
                          defaultValue={`${product.price}`}
                          selectionColor="#663399"
                        ></TextInput>
                        {touched.price && errors.price ? (
                          <Text style={bbstyles.error}>{errors.price}</Text>
                        ) : null}
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>
                          Your Earning (When Sold)
                        </Text>
                        <TextInput
                          keyboardType="numeric"
                          value={earningPrice}
                          style={styles.input}
                          editable={false}
                          selectionColor="#663399"
                        ></TextInput>
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>
                          Product Type (Required)
                        </Text>
                        <TouchableOpacity
                          onPress={() => setOpenSelectField("type")}
                        >
                          <View style={styles.selectField}>
                            <Text
                              style={{
                                color: "black",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedType.name}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        {touched.type && errors.type ? (
                          <Text style={bbstyles.error}>{errors.type}</Text>
                        ) : null}
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.label}>
                          Pickup Option (Required)
                        </Text>
                        <TouchableOpacity
                          onPress={() => setOpenSelectField("pickupOption")}
                        >
                          <View style={styles.selectField}>
                            <Text
                              style={{
                                color: "black",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedPickupOption.name}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        {touched.pickupOption && errors.pickupOption ? (
                          <Text style={bbstyles.error}>
                            {errors.pickupOption}
                          </Text>
                        ) : null}
                      </View>
                    </>
                  )}
                </Formik>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
};

export default EditPost;

const styles = StyleSheet.create({
  payProcessing: {
    fontWeight: "700",
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    color: "#663399",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#663388",
    marginTop: 10,
    textAlign: "center",
  },
  container: {
    padding: 20,
  },
  cameraIcon: {
    height: 30,
    width: 30,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
    fontSize: 18,
    color: "white",
    marginLeft: 5,
  },
  formcontrol: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 5,
    // marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cameraContainer: {
    padding: 25,
    borderColor: "#C4C4C4BF",
    borderWidth: 0.5,
  },
  userImage: {
    height: 150,
    width: 170,
    resizeMode: "cover",
    borderColor: "#C4C4C4BF",
    borderWidth: 0.5,
    margin: "auto",
    marginBottom: 30,
    alignItems: "center",
  },
  uploadBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: "#C4C4C480",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  textSecondary: {
    color: "#868686",
    fontSize: 15,
    fontFamily: "Raleway_600SemiBold",
  },
  formGroup: {
    marginBottom: 20,
  },
  selectForm: {
    borderBottomColor: "#C4C4C4BF",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  selectField: {
    borderBottomColor: "#C4C4C4BF",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 30,
  },
  label: {
    color: "#868686",
    fontSize: 12,
    fontFamily: "Raleway_600SemiBold",
    marginBottom: 5,
  },
  input: {
    fontSize: 17,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    borderWidth: 0,
    paddingBottom: 5,
    borderBottomColor: "#C9C9C9",
    borderBottomWidth: 1,
  },
});
