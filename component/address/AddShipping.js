import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext, districts, zipcodes } from "../Context";
import bbstyles from "../Styles";
import axios from "axios";
import { apiErrorNotification } from "../ErrorHandle";
import AddressPicker from "./AddressPicker";
import ZipCodePicker from "./ZipCodePicker";

const validationSchema = Yup.object().shape({
  district: Yup.string().required(),
  city: Yup.string().required(),
  street: Yup.string().required(),
  phone: Yup.string().required(),
  name: Yup.string().required().required(),
  zipcode: Yup.number().required(),
});

export default function AddShipping({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const [showPicker, setShowPicker] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: "Select District",
  });
  const [filterZipCodes, setFilterZipCodes] = useState([]);
  const [selectedZipCode, setSelectedZipCode] = useState({
    zipcode: "Select Zip Code",
  });

  const data = useContext(AuthContext);
  const { token } = data;
  const config = {
    headers: {
      "access-token": token,
    },
  };

  const add = async (values) => {
    try {
      var errors = Object.values(formRef.current.errors);
      if (errors && errors.length > 0) {
        Alert.alert("Error", errors[0]);
        return;
      }
      setIsSubmitting(true);
      await axios.post("/address", values, config);
      Alert.alert("Success", "Address has been added");
      setIsSubmitting(false);
      navigation.goBack();
    } catch (error) {
      setIsSubmitting(false);
      apiErrorNotification(error);
    }
  };

  useEffect(() => {
    formRef.current.setFieldValue("district", selectedDistrict.name);
    var zipcodesFilter = zipcodes.filter(
      (zip) => zip.district == selectedDistrict.name
    );
    setFilterZipCodes(zipcodesFilter);
  }, [selectedDistrict]);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {showPicker === "districts" && (
        <AddressPicker
          navigation={navigation}
          selectedSelect={selectedDistrict}
          setSelectedSelect={setSelectedDistrict}
          setShowAddressPicker={setShowPicker}
          selects={districts}
        />
      )}
      {showPicker === "zipcodes" && (
        <ZipCodePicker
          navigation={navigation}
          selectedSelect={selectedZipCode}
          setSelectedSelect={setSelectedZipCode}
          setShowAddressPicker={setShowPicker}
          selects={filterZipCodes}
        />
      )}

      <ScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{
              district: "",
              city: "",
              street: "",
              phone: "",
              name: "",
              zipcode: "",
            }}
            innerRef={formRef}
            onSubmit={(values) => add(values)}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors, handleBlur, touched }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    selectionColor="#663399"
                  ></TextInput>
                  {touched.name && errors.name ? (
                    <Text style={bbstyles.error}>{errors.name}</Text>
                  ) : null}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>District</Text>
                  <TouchableOpacity onPress={() => setShowPicker("districts")}>
                    <View style={styles.selectField}>
                      <Text
                        style={{
                          color: "black",
                          textTransform: "capitalize",
                          fontSize: 16,
                        }}
                      >
                        {selectedDistrict.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {errors.district && touched.district ? (
                    <Text style={bbstyles.error}>{errors.district}</Text>
                  ) : null}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>City</Text>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                    selectionColor="#663399"
                  ></TextInput>
                  {touched.city && errors.city ? (
                    <Text style={bbstyles.error}>{errors.city}</Text>
                  ) : null}
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Street</Text>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    onChangeText={handleChange("street")}
                    onBlur={handleBlur("street")}
                    selectionColor="#663399"
                  ></TextInput>

                  {touched.street && errors.street ? (
                    <Text style={bbstyles.error}>{errors.street}</Text>
                  ) : null}
                </View>

                {selectedDistrict.id && (
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Zip Code (Postal Code)</Text>
                    <TouchableOpacity onPress={() => setShowPicker("zipcodes")}>
                      <View style={styles.selectField}>
                        <Text
                          style={{
                            color: "black",
                            textTransform: "capitalize",
                            fontSize: 16,
                          }}
                        >
                          {selectedZipCode.zipcode}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {errors.zipcode && touched.zipcode ? (
                      <Text style={bbstyles.error}>{errors.zipcode}</Text>
                    ) : null}
                  </View>
                )}

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Phone</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    selectionColor="#663399"
                  ></TextInput>

                  {touched.phone && errors.phone ? (
                    <Text style={bbstyles.error}>{errors.phone}</Text>
                  ) : null}
                </View>

                {isSubmitting ? (
                  <TouchableOpacity style={styles.loginBtn}>
                    <ActivityIndicator size={24} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.login}>Save Address</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  selectField: {
    borderBottomColor: "#C4C4C4BF",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 30,
  },
  formGroup: {
    paddingBottom: 5,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#868686",
    marginBottom: 5,
  },
  input: {
    fontSize: 17,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    borderWidth: 0,
    borderBottomColor: "#C9C9C9",
    borderBottomWidth: 1,
  },
  loginBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width - 40,
    backgroundColor: "#663399",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  login: {
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
});
