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
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../Context";
import bbstyles from "../Styles";
import axios from "axios";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";
import AddressPicker from "../address/AddressPicker";

const validationSchema = Yup.object().shape({
  district: Yup.string().required(),
  city: Yup.string().required(),
  street: Yup.string().required(),
  phone: Yup.string().required(),
  name: Yup.string().required(),
  municipality: Yup.string().required(),
});

const MakeSeller = ({ navigation }) => {
  const formRef = useRef();
  const [showPicker, setShowPicker] = useState(null);
  const [locations, setLocations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Select District");
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [selectedMunicipality, setSelectedMunicipality] = useState(
    "Select Municipality"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const data = useContext(AuthContext);
  const { token, setIsSeller } = data;
  const config = {
    headers: {
      "access-token": token,
    },
  };

  async function getLocations() {
    try {
      const response = await axios.get("/location", config);
      setLocations(response.data);
      const district_array = response.data.map((a) => a.district);
      setDistricts([...new Set(district_array)]);
      setIsLoading(false);
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    if (selectedDistrict != "Select District") {
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
    if (selectedMunicipality != "Select Municipality") {
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
    if (selectedCity != "Select City") {
      formRef.current.setFieldValue("city", selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedMunicipality != "Select Municipality") {
      formRef.current.setFieldValue("municipality", selectedMunicipality);
    }
  }, [selectedMunicipality]);

  function gotoMaterialBuySection() {
    setIsSeller(true);
    navigation.navigate("Packing Materials");
  }

  async function add(values) {
    try {
      setIsSubmitting(true);
      await axios.post("/user/make-seller", values, config);
      setIsSubmitting(false);
      setIsSeller(true);
      customSuccessNotification("User marked as seller.");
    } catch (error) {
      apiErrorNotification(error);
      setIsSubmitting(false);
    }
  }

  if (isLoading)
    return (
      <View style={bbstyles.loaderContainer}>
        <ActivityIndicator size={"large"} color="#663399" />
      </View>
    );

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Text
        style={{
          fontWeight: "800",
          fontSize: 20,
          fontFamily: "Raleway_800ExtraBold",
          padding: 20,
          paddingBottom: 10,
          marginBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        Become a Seller
      </Text>

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
        <Text style={bbstyles.alertSuccess}>
          Fill up your pickup location(Your Location)
        </Text>
        <View style={styles.container}>
          <Formik
            initialValues={{
              district: "",
              city: "",
              street: "",
              phone: "",
              name: "",
              municipality: "",
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
                    placeholder="FirstName LastName"
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
                  <Text style={styles.label}>City</Text>
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
                    selectionColor="#663399"
                    placeholder="XYZ-1, ABC Tol, House #1, near Landmark"
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
                    selectionColor="#663399"
                    placeholder="98XXXXXXXX"
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
                    <Text style={styles.login}>Submit</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MakeSeller;

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
    fontSize: 16,
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
