import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";
import bbstyles from "../Styles";
import axios from "axios";
import { AuthContext } from "../Context";
import MainImage from "../Image/MainImage";
import CategorySelect from "./selects/CategorySelect";
import SimpleSelect from "./selects/SimpleSelect";
import BrandSelect from "./selects/BrandSelect";
import {
  apiErrorNotification,
  customErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";
import MakeSeller from "./MakeSeller";
import BottomSheetComponent from "../BottomSheetComponent";
import Animated from "react-native-reanimated";
import CustomImagePicker from "./CustomImagePicker";
import HamroImagePicker from "../HamroImagePicker/HamroImagePicker";
import * as FileSystem from "expo-file-system";

const validationSchema = Yup.object().shape({
  image1: Yup.string().required("Image is required"),
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

const dummyImageData = [
  {
    isCover: false,
    name: "image2",
  },
  {
    isCover: false,
    name: "image3",
  },
  {
    isCover: false,
    name: "image4",
  },
];

const initPickupOptions = [
  {
    _id: "Door",
    name: "Pickup From Home",
  },
  {
    _id: "Branch",
    name: "Drop to Branch",
  },
];

const initProductTypes = [
  {
    _id: "rent",
    name: "Rent",
  },
  {
    _id: "sale",
    name: "Sale",
  },
];

const initSelectedCategory = {
  name: "Select Category",
};
const initSelectedColor = { name: "Select Color" };
const initSelectedSize = {
  name: "Select Product Size",
};
const initSelectedProductType = {
  name: "Select Product Type",
};
const initSelectedBrand = { name: "Select Brand" };
const initSelectedPickupOption = {
  name: "Select Pickup option",
};

function CreatePost({ navigation }) {
  const { isSeller } = useContext(AuthContext);

  if (!isSeller) return <MakeSeller navigation={navigation} />;

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showBrand, setShowBrand] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const formRef = useRef();
  const sheetRef = useRef(null);
  const openCameraRef = useRef();
  const selectImageRef = useRef();
  const fill = new Animated.Value(1);
  const [earningPrice, setEarningPrice] = useState();
  const [openSelectField, setOpenSelectField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [pickupOptions, setPickupOptions] = useState(initPickupOptions);
  const [productTypes, setProductTypes] = useState(initProductTypes);
  const [selectedCategory, setSelectedCategory] =
    useState(initSelectedCategory);
  const [selectedColor, setSelectedColor] = useState(initSelectedColor);
  const [selectedSize, setSelectedSize] = useState(initSelectedSize);
  const [selectedType, setSelectedType] = useState(initSelectedProductType);
  const [selectedBrand, setSelectedBrand] = useState(initSelectedBrand);
  const [commission, setCommission] = useState(0);
  const [pickupCharge, setPickupCharge] = useState(0);
  const [selectedPickupOption, setSelectedPickupOption] = useState(
    initSelectedPickupOption
  );

  const data = useContext(AuthContext);
  const { token } = data;

  const config = {
    headers: {
      "access-token": token,
    },
  };

  function addPost() {
    var errors = Object.values(formRef.current.errors);
    if (errors && errors.length > 0) {
      customErrorNotification(errors[0]);
      return;
    }
    formRef.current.handleSubmit();
  }

  const handleMultipleImageSubmit = async ({ hasMultiple, data }) => {
    if (hasMultiple) {
      data.map(async (image, index) => {
        const base64 = await FileSystem.readAsStringAsync(image.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        formRef.current.setFieldValue(
          `image${index + 1}`,
          `data:image/png;base64, ${base64}`
        );
      });
    } else {
      const base64 = await FileSystem.readAsStringAsync(data.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      formRef.current.setFieldValue(
        `image1`,
        `data:image/png;base64, ${base64}`
      );
    }
  };

  const loadingHeader = React.useCallback(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: "center",
      headerRight: () => (
        <View
          style={{
            backgroundColor: "#663399",
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginRight: 5,
            borderRadius: 5,
            opacity: 0.7,
          }}
        >
          <ActivityIndicator size={"small"} color="#fff" />
        </View>
      ),
    });
  });

  const changeHeader = React.useCallback(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: "center",
      headerRight: () => (
        <TouchableOpacity onPress={() => addPost()}>
          <Text
            style={{
              fontFamily: "Raleway_700Bold",
              fontSize: 16,
              color: "#663399",
              marginRight: 10,
            }}
          >
            Post{" "}
            <MaterialCommunityIcons
              name="send-circle-outline"
              size={16}
              color="#663399"
            />
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (isSeller) {
      changeHeader();
      getSelectFields();
    }
  }, [isSeller]);

  const getSelectFields = React.useCallback(async () => {
    try {
      const response = await axios.get("/frontend/createpost", config);
      setColors(response.data.colors);
      setSizes(response.data.sizes);
      setCategories(response.data.categories);
      setBrands(response.data.brands);
      setCommission(response.data.commission);
      setPickupCharge(response.data.pickupCharge);
    } catch (error) {}
  });

  const createPost = React.useCallback(async (values) => {
    loadingHeader();
    try {
      const response = await axios.post("/product/create/post", values, config);
      customSuccessNotification("Post has been created.");
      formRef.current.resetForm();
      setSelectedCategory(initSelectedCategory);
      setSelectedColor(initSelectedColor);
      setSelectedBrand(initSelectedBrand);
      setSelectedSize(initSelectedSize);
      setSelectedType(initSelectedProductType);
      setSelectedPickupOption(initSelectedPickupOption);
      navigation.navigate("landing");
    } catch (error) {
      apiErrorNotification(error);
    }
    changeHeader();
  });

  useEffect(() => {
    formRef.current.setFieldValue("category", selectedCategory._id);
  }, [selectedCategory]);

  const calcEarning = React.useCallback((value) => {
    formRef.current.setFieldValue("price", value);
    var price = value;
    var profit = price - (price * commission) / 100;
    if (formRef.current.values.pickupOption == "Door") {
      profit = profit - pickupCharge;
    }
    formRef.current.setFieldValue("earning_price", profit);
    setEarningPrice(profit.toString());
  });

  useEffect(() => {
    formRef.current.setFieldValue("pickupOption", selectedPickupOption._id);
    if (selectedPickupOption._id == "Door") {
      setEarningPrice((parseInt(earningPrice) - pickupCharge).toString());
      formRef.current.setFieldValue(
        "earning_price",
        parseInt(earningPrice) - pickupCharge
      );
    }
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

      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <HamroImagePicker
          handlePickerClose={setImagePicker}
          enablePicker={imagePicker}
          handleSubmit={handleMultipleImageSubmit}
          enableEditor={true}
          enableMultiSelect={true}
          headerText="Select Image"
          multipleSelectEnabled={true}
          multiSelectOptions={{ minimumImageCount: 1, maximumImageCount: 4 }}
        />
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

          <ScrollView style={{ position: "relative" }}>
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
                  name: "",
                  detail: "",
                  category: "",
                  stock: "",
                  size: "",
                  brand: "",
                  color: "",
                  original: "",
                  price: "",
                  earning_price: "",
                  type: "",
                  image1: "",
                  custombrand: "",
                  image2: "",
                  image3: "",
                  image4: "",
                  pickupOption: "",
                }}
                onSubmit={(values) => createPost(values)}
                validationSchema={validationSchema}
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
                    {/* <MainImage
                      sheetRef={sheetRef}
                      openCameraRef={openCameraRef}
                      selectImageRef={selectImageRef}
                    /> */}

                    <View style={styles.uploadImageWrapper}>
                      <CustomImagePicker
                        data={{
                          isCover: true,
                          name: "image1",
                        }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          marginTop: 20,
                        }}
                      >
                        {dummyImageData.map((data) => {
                          return (
                            <CustomImagePicker data={data} key={data.name} />
                          );
                        })}
                      </View>

                      <TouchableOpacity
                        onPress={() => setImagePicker(true)}
                        style={styles.uploadBtn}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Raleway_500Medium",
                            color: "#868686",
                          }}
                        >
                          Upload Photos
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.label}>
                        What are you selling? (Required)
                      </Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="default"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        selectionColor="#663399"
                        value={values.name}
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
                        selectionColor="#663399"
                        multiline={true}
                        value={values.detail}
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
                        selectionColor="#663399"
                        value={values.stock}
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
                            value={values.custombrand}
                          />
                          <Text style={bbstyles.error}>
                            {errors.custombrand}
                          </Text>
                        </View>
                      ) : null}

                      {touched.brand && errors.brand ? (
                        <Text style={bbstyles.error}>{errors.brand}</Text>
                      ) : null}
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
                      <Text style={styles.label}>Original Price(Required)</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={handleChange("original")}
                        onBlur={handleBlur("original")}
                        selectionColor="#663399"
                        value={values.original}
                      ></TextInput>
                      {touched.original && errors.original ? (
                        <Text style={bbstyles.error}>{errors.original}</Text>
                      ) : null}
                    </View>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Listing Price (Required)</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={(value) => calcEarning(value)}
                        onBlur={handleBlur("price")}
                        selectionColor="#663399"
                        value={values.price}
                      ></TextInput>
                      {touched.price && errors.price ? (
                        <Text style={bbstyles.error}>{errors.price}</Text>
                      ) : null}
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Your Earning (When Sold)</Text>
                      <TextInput
                        keyboardType="numeric"
                        value={earningPrice}
                        style={styles.input}
                        editable={false}
                        selectionColor="#663399"
                      ></TextInput>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Product Type (Required)</Text>
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
                      <Text style={styles.label}>Pickup Option (Required)</Text>
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
    </>
  );
}

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  uploadImageWrapper: {
    alignItems: "center",
    marginBottom: 20,
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
