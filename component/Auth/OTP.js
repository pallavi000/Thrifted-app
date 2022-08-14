import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import bbstyles from "../Styles";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("OTP Code is required."),
});

const OTP = ({
  isSubmitting,
  registerForm,
  verificationId,
  firebaseAuth,
  setIsSubmitting,
}) => {
  async function submitHandler(data) {
    try {
      setIsSubmitting(true);
      const credential = PhoneAuthProvider.credential(
        verificationId,
        data.code
      );
      await signInWithCredential(firebaseAuth, credential);
      setIsSubmitting(false);
      await registerForm();
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Some Error Occurred.");
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm OTP</Text>
        <View style={styles.loginForm}>
          <Text style={styles.login}>Confirm OTP</Text>
          <Formik
            initialValues={{
              code: "",
            }}
            onSubmit={(values) => submitHandler(values)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, handleChange, handleBlur, touched, errors }) => (
              <>
                <View style={styles.formgroup}>
                  <View style={styles.labelWrapper}>
                    <Ionicons
                      name="person"
                      size={14}
                      color={"#868686"}
                    ></Ionicons>
                    <Text style={styles.label}>OTP Code</Text>
                  </View>
                  <TextInput
                    keyboardType="default"
                    style={styles.inputField}
                    onChangeText={handleChange("code")}
                    onBlur={handleBlur("code")}
                  ></TextInput>
                  {touched.code && errors.code ? (
                    <Text style={bbstyles.error}>{errors.code}</Text>
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
                    <Text style={styles.loginText}>Submit</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

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

export default OTP;
