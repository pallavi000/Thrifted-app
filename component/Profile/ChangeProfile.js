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
import React, { useContext, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import bbstyles from "../Styles";
import axios from "axios";
import { AuthContext } from "../Context";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  bio: Yup.string(),
});

const ChangeProfile = ({ navigation, route }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = route.params;
  const data = useContext(AuthContext);
  const { config } = data;

  const changeProfile = React.useCallback(async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/user/change/profile", data, config);
      setIsSubmitting(false);
      customSuccessNotification("User info updated.");
      navigation.goBack();
    } catch (error) {
      apiErrorNotification(error);
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{ name: user.name, bio: user.bio }}
            onSubmit={(values) => changeProfile(values)}
            enableReinitialize
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
                    defaultValue={user.name}
                    selectionColor="#663399"
                  ></TextInput>
                  {touched.name && errors.name ? (
                    <Text style={bbstyles.error}>{errors.name}</Text>
                  ) : null}
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Bio</Text>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    onChangeText={handleChange("bio")}
                    onBlur={handleBlur("bio")}
                    defaultValue={user.bio}
                    selectionColor="#663399"
                    multiline={true}
                  ></TextInput>
                  {touched.bio && errors.bio ? (
                    <Text style={bbstyles.error}>{errors.name}</Text>
                  ) : null}
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    keyboardType="email-address"
                    style={styles.input}
                    defaultValue={user.email}
                    selectionColor="#663399"
                    editable={false}
                  ></TextInput>
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
                    <Text style={styles.login}>Update Profile</Text>
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

export default ChangeProfile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formGroup: {
    paddingBottom: 5,
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Raleway_700Bold",
    color: "#868686",
    marginLeft: 5,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomColor: "#c4c4c4",
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
