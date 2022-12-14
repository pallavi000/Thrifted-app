import {
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import bbstyles from "../Styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { firebaseAuth } from "../../firebaseConfig";
import { PhoneAuthProvider } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "./../ErrorHandle";

const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Phone  is required"),
});

export default function ForgotPassword({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const captchaRef = useRef();

  const changePassword = React.useCallback(async (data) => {
    try {
      setIsSubmitting(true);
      // check if phone exists
      await axios.post("/user/forgot/check/phone", data);
      data.phone = "+977" + data.phone;
      const phoneProvider = new PhoneAuthProvider(firebaseAuth);
      const verifyId = await phoneProvider.verifyPhoneNumber(
        data.phone,
        captchaRef.current
      );
      setVerificationId(verifyId);
      data.code = verifyId;
      var response = await axios.post("/user/forgot/password", data);
      if (response.data) {
        customSuccessNotification("Otp has been sent to your phone.");
        navigation.navigate("resetpassword", { verificationId });
      }
      setIsSubmitting(false);
    } catch (error) {
      apiErrorNotification(error);
      setIsSubmitting(false);
    }
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <FirebaseRecaptchaVerifierModal
        ref={captchaRef}
        firebaseConfig={firebaseAuth.config}
      />
      <StatusBar backgroundColor="#663399" barStyle="light-content" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>
          <View style={styles.loginForm}>
            <Text style={styles.login}>Forgot Password</Text>
            <Formik
              initialValues={{ phone: "" }}
              onSubmit={(values) => changePassword(values)}
              validationSchema={validationSchema}
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                touched,
                handleBlur,
              }) => (
                <>
                  <View style={styles.formgroup}>
                    <View style={styles.labelWrapper}>
                      <Ionicons
                        name="mail-outline"
                        size={14}
                        color={"#868686"}
                      ></Ionicons>
                      <Text style={styles.label}>Phone Number</Text>
                    </View>
                    <TextInput
                      keyboardType="phone-pad"
                      style={styles.inputField}
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
                      onPress={handleSubmit}
                      style={styles.loginBtn}
                    >
                      <View>
                        <Text style={styles.loginText}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 30,
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
});
