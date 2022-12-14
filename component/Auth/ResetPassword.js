import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import bbstyles from "../Styles";
import * as Yup from "yup";
import { Formik } from "formik";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required(),
  confirmPassword: Yup.string().required(),
  code: Yup.string().required(),
});

export default function ResetPassword({ route }) {
  const verificationId = route.params;
  const resetPassword = React.useCallback(async (data) => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        data.code
      );
      await signInWithCredential(firebaseAuth, credential);
      var response = await axios.post("/user/reset/password", data);
      customSuccessNotification("Your password has been successfully updated");
    } catch (error) {
      apiErrorNotification(error);
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>
          <View style={styles.loginForm}>
            <Text style={styles.login}>Reset Password</Text>
            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
                code: "",
              }}
              onSubmit={(values) => resetPassword(values)}
              validationSchema={validationSchema}
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                handleBlur,
                touched,
              }) => (
                <>
                  <View style={styles.formgroup}>
                    <View style={styles.labelWrapper}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={"#868686"}
                      ></Ionicons>
                      <Text style={styles.label}>New Password</Text>
                    </View>
                    <TextInput
                      keyboardType="default"
                      secureTextEntry={true}
                      style={styles.inputField}
                      onChangeText={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      selectionColor="#663399"
                    ></TextInput>
                    {touched.newPassword && errors.newPassword ? (
                      <Text style={bbstyles.error}>{errors.newPassword}</Text>
                    ) : null}
                  </View>

                  <View style={styles.formgroup}>
                    <View style={styles.labelWrapper}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={"#868686"}
                      ></Ionicons>
                      <Text style={styles.label}>Confirm Password</Text>
                    </View>
                    <TextInput
                      keyboardType="default"
                      secureTextEntry={true}
                      style={styles.inputField}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      selectionColor="#663399"
                    ></TextInput>
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <Text style={bbstyles.error}>
                        {errors.confirmPassword}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.formgroup}>
                    <View style={styles.labelWrapper}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={"#868686"}
                      ></Ionicons>
                      <Text style={styles.label}>OTP Code</Text>
                    </View>
                    <TextInput
                      keyboardType="default"
                      style={styles.inputField}
                      onChangeText={handleChange("code")}
                      onBlur={handleBlur("code")}
                      selectionColor="#663399"
                    ></TextInput>
                    {touched.code && errors.code ? (
                      <Text style={bbstyles.error}>{errors.code}</Text>
                    ) : null}
                  </View>

                  <TouchableOpacity onPress={handleSubmit}>
                    <View>
                      <Text style={styles.loginBtn}>Submit</Text>
                    </View>
                  </TouchableOpacity>
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
    paddingTop: Dimensions.get("window").height / 15,
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
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Raleway_700Bold",
    color: "#868686",
    marginLeft: 5,
  },
  inputField: {
    paddingVertical: 7,
    paddingHorizontal: 10,
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
    fontWeight: "700",
    fontSize: 20,
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#663399",
    borderRadius: 10,
    marginTop: 70,
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
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
