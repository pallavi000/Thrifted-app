import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import HamroImagePicker from "../HamroImagePicker/HamroImagePicker";
import { useFormikContext } from "formik";
import * as FileSystem from "expo-file-system";
import { NativeModules } from "react-native";

const CustomImagePicker = ({ data: imageData }) => {
  const [imagePicker, setImagePicker] = useState(false);
  const { setFieldValue, values, touched, errors } = useFormikContext();

  const handleSubmit = async ({ hasMultiple, data }) => {
    const base64 = await FileSystem.readAsStringAsync(data.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setFieldValue(`${imageData.name}`, `data:image/png;base64, ${base64}`);
  };

  return (
    <View>
      <HamroImagePicker
        handlePickerClose={setImagePicker}
        enablePicker={imagePicker}
        handleSubmit={handleSubmit}
        enableEditor={true}
        enableMultiSelect={false}
        headerText="Select Image"
      />
      {imageData.isCover ? (
        <TouchableOpacity onPress={() => setImagePicker(true)}>
          {values?.[imageData.name] ? (
            <Image
              source={{ uri: values?.[imageData.name] }}
              style={styles.userImage}
            ></Image>
          ) : (
            <View style={[styles.cameraContainer, { height: 150, width: 170 }]}>
              <Feather name="camera" size={40} color="#C4C4C4BF"></Feather>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setImagePicker(true)}>
          {values?.[imageData.name] ? (
            <Image
              source={{ uri: values?.[imageData.name] }}
              style={styles.upload}
            ></Image>
          ) : (
            <View style={styles.cameraContainer}>
              <Feather name="camera" size={40} color="#C4C4C4BF"></Feather>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
export default CustomImagePicker;

const styles = StyleSheet.create({
  multipleImage: {
    width: Dimensions.get("window").width / 4 - 20,
    height: 70,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  cameraContainer: {
    width: Dimensions.get("window").width / 3 - 20,
    height: 90,
    padding: 25,
    borderColor: "#C4C4C4BF",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    height: 150,
    width: 170,
    resizeMode: "cover",
    borderColor: "#C4C4C4BF",
    borderWidth: 0.5,
    margin: "auto",
    marginBottom: 20,
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
    width: "100%",
    alignItems: "center",
  },
  textSecondary: {
    color: "#868686",
    fontSize: 15,
    fontFamily: "Raleway_600SemiBold",
  },
  uploadButton: {
    backgroundColor: "green",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  uploadImage: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  uploadImageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  upload: {
    width: Dimensions.get("window").width / 3 - 20,
    height: 90,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
  },

  iconwrap: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    paddingHorizontal: 15,
  },
  modalIcon: {
    right: 0,
  },
  imageModal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  cameraIcon: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: "#f5f5ff",
    marginHorizontal: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    width: "50%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
