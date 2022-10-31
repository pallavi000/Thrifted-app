import {
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useContext, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import bbstyles from "../Styles";
import { firebaseAuth, firebaseApp } from "../../firebaseConfig";
import { PhoneAuthProvider } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import OTP from "./OTP";
import { apiErrorNotification } from "../ErrorHandle";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email("Email is required."),
  password: Yup.string().required("Password is Required."),
  name: Yup.string().required("Full Name is Required."),
  phone: Yup.string()
    .min(10)
    .max(10)
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Phone Number is required."),
});

export default function Register({ navigation }) {
  const { setIsLoggedIn, setToken } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captchaRef = useRef(null);
  const [otpScreen, setOtpScreen] = useState(false);
  const [formData, setFormData] = useState();
  const [verificationId, setVerificationId] = useState(null);

  const sendOTP = async (data) => {
    try {
      setIsSubmitting(true);
      data.phone = "+977" + data.phone;
      const phoneProvider = new PhoneAuthProvider(firebaseAuth);
      const response = await phoneProvider.verifyPhoneNumber(
        data.phone,
        captchaRef.current
      );
      setVerificationId(response);
      setOtpScreen(true);
      setIsSubmitting(false);
    } catch (error) {
      apiErrorNotification(error);
      setIsSubmitting(false);
    }
  };

  async function verifyEmail(data) {
    try {
      setFormData(data);
      setIsSubmitting(true);
      const response = await axios.post("/user/check/email", data);
      await sendOTP(data);
    } catch (error) {
      setIsSubmitting(false);
      apiErrorNotification(error);
    }
  }

  const registerForm = async () => {
    try {
      setIsSubmitting(true);
      var response = await axios.post("/user/all", formData);
      if (response.data) {
        await AsyncStorage.setItem("token", response.data.token);
        setIsSubmitting(false);
        setToken(response.data.token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setOtpScreen(false);
      setIsSubmitting(false);
      apiErrorNotification(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <FirebaseRecaptchaVerifierModal
        ref={captchaRef}
        firebaseConfig={firebaseAuth.config}
      />

      <StatusBar backgroundColor="#663399" barStyle="light-content" />
      {otpScreen ? (
        <OTP
          registerForm={registerForm}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          verificationId={verificationId}
          firebaseAuth={firebaseAuth}
          setOtpScreen={setOtpScreen}
        />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>
            <View style={styles.loginForm}>
              <Text style={styles.login}>Register</Text>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  phone: "",
                }}
                onSubmit={(values) => verifyEmail(values)}
                validationSchema={validationSchema}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  touched,
                  errors,
                }) => (
                  <>
                    <View style={styles.formgroup}>
                      <View style={styles.labelWrapper}>
                        <Ionicons
                          name="person"
                          size={14}
                          color={"#868686"}
                        ></Ionicons>
                        <Text style={styles.label}>Full Name</Text>
                      </View>
                      <TextInput
                        keyboardType="default"
                        style={styles.inputField}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        selectionColor="#663399"
                      ></TextInput>
                      {touched.name && errors.name ? (
                        <Text style={bbstyles.error}>{errors.name}</Text>
                      ) : null}
                    </View>
                    <View style={styles.formgroup}>
                      <View style={styles.labelWrapper}>
                        <Ionicons
                          name="mail-outline"
                          size={14}
                          color={"#868686"}
                        ></Ionicons>
                        <Text style={styles.label}>Email</Text>
                      </View>
                      <TextInput
                        keyboardType="email-address"
                        style={styles.inputField}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        selectionColor="#663399"
                      ></TextInput>
                      {touched.email && errors.email ? (
                        <Text style={bbstyles.error}>{errors.email}</Text>
                      ) : null}
                    </View>

                    <View style={styles.formgroup}>
                      <View style={styles.labelWrapper}>
                        <Ionicons
                          name="mail-outline"
                          size={14}
                          color={"#868686"}
                        ></Ionicons>
                        <Text style={styles.label}>Phone</Text>
                      </View>
                      <TextInput
                        keyboardType="phone-pad"
                        style={styles.inputField}
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        placeholder="98XXXXXXXX"
                        selectionColor="#663399"
                        placeholderTextColor={"#868686"}
                      ></TextInput>
                      {touched.phone && errors.phone ? (
                        <Text style={bbstyles.error}>{errors.phone}</Text>
                      ) : null}
                    </View>

                    <View style={styles.formgroup}>
                      <View style={styles.labelWrapper}>
                        <Ionicons
                          name="lock-closed-outline"
                          size={14}
                          color={"#868686"}
                        ></Ionicons>
                        <Text style={styles.label}>Password</Text>
                      </View>
                      <TextInput
                        keyboardType="default"
                        secureTextEntry={true}
                        style={styles.inputField}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        selectionColor="#663399"
                      ></TextInput>
                      {touched.password && errors.password ? (
                        <Text style={bbstyles.error}>{errors.password}</Text>
                      ) : null}
                    </View>

                    {isSubmitting ? (
                      <TouchableOpacity style={styles.loginBtn}>
                        <ActivityIndicator size={24} color="#fff" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.loginBtn}
                      >
                        <Text style={styles.loginText}>Register</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </Formik>

              <Text style={styles.already}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={styles.create}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#663399",
  },

  title: {
    fontWeight: "800",
    fontSize: 50,
    color: "white",
    fontFamily: "Raleway_800ExtraBold",
    padding: 20,
    paddingVertical: Dimensions.get("window").height / 15,
  },
  loginForm: {
    backgroundColor: "white",
    color: "black",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    flex: 1,
    padding: 30,
  },
  login: {
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
    marginBottom: 30,
  },
  formgroup: {
    marginBottom: 20,
  },
  labelWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Raleway_700Bold",
    color: "#868686",
    marginLeft: 5,
  },
  inputField: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1,
  },
  forgot: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#663399",
    marginTop: 10,
  },
  loginBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width - 60,
    backgroundColor: "#663399",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 0,
  },
  loginText: {
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
  create: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#663399",
    marginTop: 10,
    textAlign: "center",
  },
  already: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#868686",
    marginTop: 20,
    textAlign: "center",
  },
});
