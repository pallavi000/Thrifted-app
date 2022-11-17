import {
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Text,
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
import bbstyles from "../Styles";
import axios from "axios";
import { AuthContext } from "../Context";
import { apiErrorNotification } from "./../ErrorHandle";
import AddressPicker from "./AddressPicker";
import ZipCodePicker from "./ZipCodePicker";

const validationSchema = Yup.object().shape({
  district: Yup.string().required(),
  city: Yup.string().required(),
  street: Yup.string().required(),
  phone: Yup.string().required(),
  name: Yup.string().required().required(),
  municipality: Yup.string().required(),
});

export default function EditShipping({ navigation, route }) {
  const address = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const [showPicker, setShowPicker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState(address.district);
  const [selectedCity, setSelectedCity] = useState(address.city);
  const [selectedMunicipality, setSelectedMunicipality] = useState(
    address.municipality
  );

  const data = useContext(AuthContext);
  const { token } = data;
  const config = {
    headers: {
      "access-token": token,
    },
  };

  useEffect(() => {
    getLocations();
  }, []);

  async function getLocations() {
    try {
      const response = await axios.get("/location", config);
      setLocations(response.data);
      const district_array = response.data.map((a) => a.district);
      setDistricts([...new Set(district_array)]);

      const filtered_municipalities = response.data.filter(
        (loc) => loc.district == address.district
      );
      const municipalities_array = filtered_municipalities.map(
        (a) => a.municipality
      );
      setMunicipalities([...new Set(municipalities_array)]);

      const filtered_cities = response.data.filter(
        (loc) => loc.municipality == address.municipality
      );
      const cities_array = filtered_cities.map((a) => a.city);
      setCities(cities_array);

      setIsLoading(false);
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  const Edit = React.useCallback(async (data) => {
    try {
      setIsSubmitting(true);
      var response = await axios.put(
        "/address/edit/" + address._id,
        data,
        config
      );
      Alert.alert("Success", "Address has been updated");
      setIsSubmitting(false);
      navigation.goBack();
    } catch (error) {
      apiErrorNotification(error);
      setIsSubmitting(false);
    }
  }, []);

  useEffect(() => {
    if (formRef.current && selectedDistrict != "Select District") {
      formRef.current.setFieldValue("district", selectedDistrict);
      formRef.current.setFieldValue("municipality", "");
      const filtered_municipalities = locations.filter(
        (loc) => loc.district == selectedDistrict
      );
      const municipalities_array = filtered_municipalities.map(
        (a) => a.municipality
      );
      setMunicipalities([...new Set(municipalities_array)]);
      setSelectedMunicipality("Select Municipality");
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (formRef.current && selectedMunicipality != "Select Municipality") {
      formRef.current.setFieldValue("municipality", selectedMunicipality);
      formRef.current.setFieldValue("city", "");
      const filtered_cities = locations.filter(
        (loc) => loc.municipality == selectedMunicipality
      );
      const cities_array = filtered_cities.map((a) => a.city);
      setCities(cities_array);
      setSelectedCity("Select City");
    }
  }, [selectedMunicipality]);

  useEffect(() => {
    if (formRef.current && selectedCity != "Select City") {
      formRef.current.setFieldValue("city", selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (formRef.current && selectedMunicipality != "Select Municipality") {
      formRef.current.setFieldValue("municipality", selectedMunicipality);
    }
  }, [selectedMunicipality]);

  if (isLoading)
    return (
      <View style={bbstyles.loaderContainer}>
        <ActivityIndicator size={"large"} color="#663399" />
      </View>
    );

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
      {showPicker === "municipalities" && (
        <AddressPicker
          navigation={navigation}
          selectedSelect={selectedMunicipality}
          setSelectedSelect={setSelectedMunicipality}
          setShowAddressPicker={setShowPicker}
          selects={municipalities}
        />
      )}
      {showPicker === "cities" && (
        <AddressPicker
          navigation={navigation}
          selectedSelect={selectedCity}
          setSelectedSelect={setSelectedCity}
          setShowAddressPicker={setShowPicker}
          selects={cities}
        />
      )}

      <ScrollView>
        <View style={styles.container}>
          <Formik
            innerRef={formRef}
            initialValues={{
              district: address.district,
              city: address.city,
              street: address.city,
              phone: address.phone,
              name: address.name,
              zipcode: address.zipcode,
              municipality: address.municipality,
            }}
            onSubmit={(values) => Edit(values)}
            validationSchema={validationSchema}
            enableReinitialize
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
                    defaultValue={address.name}
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
                        {selectedDistrict}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {errors.district && touched.district ? (
                    <Text style={bbstyles.error}>{errors.district}</Text>
                  ) : null}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Municipality</Text>
                  <TouchableOpacity
                    onPress={() => setShowPicker("municipalities")}
                  >
                    <View style={styles.selectField}>
                      <Text
                        style={{
                          color: "black",
                          textTransform: "capitalize",
                          fontSize: 16,
                        }}
                      >
                        {selectedMunicipality}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {errors.municipality && touched.municipality ? (
                    <Text style={bbstyles.error}>{errors.municipality}</Text>
                  ) : null}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Nearby Place/Branch</Text>
                  <TouchableOpacity onPress={() => setShowPicker("cities")}>
                    <View style={styles.selectField}>
                      <Text
                        style={{
                          color: "black",
                          textTransform: "capitalize",
                          fontSize: 16,
                        }}
                      >
                        {selectedCity}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {errors.city && touched.city ? (
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
                    defaultValue={address.street}
                    selectionColor="#663399"
                  ></TextInput>

                  {touched.street && errors.street ? (
                    <Text style={bbstyles.error}>{errors.street}</Text>
                  ) : null}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Phone</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    defaultValue={address.phone?.toString()}
                    selectionColor="#663399"
                  ></TextInput>

                  {touched.phone && errors.phone ? (
                    <Text style={bbstyles.error}>{errors.phone}</Text>
                  ) : null}
                </View>

                {isSubmitting ? (
                  <TouchableOpacity style={styles.loginBtn}>
                    <ActivityIndicator size={"small"} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.login}>Update Address</Text>
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
