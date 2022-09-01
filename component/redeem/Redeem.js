import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Raleway_600SemiBold } from "@expo-google-fonts/raleway";
import * as Yup from "yup";
import { Formik } from "formik";
import bbstyles from "../Styles";
import { AuthContext } from "../Context";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { apiErrorNotification } from "../ErrorHandle";

const validationSchema = Yup.object().shape({
  balance: Yup.number()
    .required()
    .min(100, "Withdraw amount should be greater than 100"),
  account_detail: Yup.string().required(),
  payment_method: Yup.string().required(),
});

export default function Redeem({ navigation, route }) {
  const data = useContext(AuthContext);
  const { token } = data;
  const user = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = {
    headers: {
      "access-token": token,
    },
  };

  const RedeemForm = React.useCallback(async (data) => {
    setIsSubmitting(true);
    try {
      if (user.balance < data.balance) {
        return Alert.alert(
          "Error",
          "Your balance is less than requested amount."
        );
      }
      var response = await axios.post("/user/withdraw", data, config);
      Alert.alert("Success", "Your transaction request has been submitted");
      navigation.navigate("Redeemption History");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      apiErrorNotification(error);
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar backgroundColor="#663399" barStyle="light-content" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Redeem</Text>
          <Formik
            initialValues={{
              balance: "",
              account_detail: "",
              payment_method: "",
            }}
            onSubmit={(values) => RedeemForm(values)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
              values,
              handleBlur,
            }) => (
              <>
                <View style={styles.loginForm}>
                  <Text style={styles.balance}>
                    Balance:&nbsp; Rs. {user.balance}
                  </Text>

                  <View style={styles.formgroup}>
                    <View style={styles.labelWrapper}>
                      <Text style={styles.label}>Payment Method</Text>
                    </View>

                    <Picker
                      style={styles.formControl}
                      onBlur={handleBlur("payment_method")}
                      selectedValue={values.payment_method}
                      onValueChange={(itemValue) =>
                        setFieldValue("payment_method", itemValue)
                      }
                    >
                      <Picker.Item label="Selelct Payment Method" value="" />
                      <Picker.Item label="FonePay" value="fonepay" />
                      <Picker.Item label="Esewa" value="esewa" />
                    </Picker>
                    {touched.payment_method & errors.payment_method ? (
                      <Text style={{ color: "red" }}>
                        {errors.payment_method}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.formgroup}>
                    <View style={styles.labelWrapper}>
                      <Text style={styles.label}>Account No./ID</Text>
                    </View>
                    <TextInput
                      keyboardType="default"
                      style={styles.inputField}
                      onChangeText={handleChange("account_detail")}
                      onBlur={handleBlur("account_detail")}
                      selectionColor="#663399"
                    ></TextInput>
                    {errors.account_detail && touched.account_detail ? (
                      <Text style={bbstyles.error}>
                        {errors.account_detail}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.formgroup}>
                    <View style={styles.labelWrapper}>
                      <Text style={styles.label}>Amount</Text>
                    </View>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.inputField}
                      onChangeText={handleChange("balance")}
                      onBlur={handleBlur("balance")}
                      selectionColor="#663399"
                    ></TextInput>
                    {errors.balance && touched.balance ? (
                      <Text style={bbstyles.error}>{errors.balance}</Text>
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
                      <Text style={styles.login}>Redeem</Text>
                    </TouchableOpacity>
                  )}
                </View>
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
    backgroundColor: "#663399",
  },

  title: {
    fontWeight: "800",
    fontSize: 50,
    color: "white",
    fontFamily: "Raleway_800ExtraBold",
    padding: 20,
    paddingVertical: 30,
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
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1,
  },
  labelWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  balance: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Raleway_700Bold",
    color: "#868686",
    marginBottom: 20,
    color: "#222",
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
  login: {
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
