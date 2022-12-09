import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingViewBase,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { imageLink } from "../ImageLink";
import Modal from "react-native-modalbox";

const StoryPicker = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { setFieldValue, values, touched, errors } = useFormikContext();
  const [swipeText, setSwipeText] = useState("");
  const inputRef = useRef();
  const [showTextField, setShowTextField] = useState(false);

  useEffect(() => {
    props.openCameraRef.current = openCamera;
    props.selectImageRef.current = selectImage;
    getRequestPermission();
    getCameraPermission();
  }, []);

  useEffect(() => {
    props.openCameraRef.current = openCamera;
    props.selectImageRef.current = selectImage;
  }, []);

  const getRequestPermission = React.useCallback(async () => {
    const { granted } = await imagePicker.getMediaLibraryPermissionsAsync();
    if (!granted) {
      const result = await imagePicker.requestMediaLibraryPermissionsAsync();
      if (!result.granted) {
        Alert.alert("Error", "Permission denied");
      }
    }
  });

  const getCameraPermission = React.useCallback(async () => {
    const { granted } = await imagePicker.getCameraPermissionsAsync();
    if (!granted) {
      const result = await imagePicker.requestCameraPermissionsAsync();
      if (!result.granted) {
        Alert.alert("Error", "Permission denied");
      }
    }
  });

  async function selectImage() {
    const result = await imagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (!result.cancelled) {
      setFieldValue(`image`, `data:image/png;base64, ${result.base64}`);
      setModalVisible(true);
      props.sheetRef.current.snapTo(1);
    }
  }
  async function openCamera() {
    const result = await imagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.cancelled) {
      setFieldValue(`image`, `data:image/png;base64, ${result.base64}`);
      setModalVisible(true);
      props.sheetRef.current.snapTo(1);
    }
  }

  function submitForm() {
    setModalVisible(false);
    props.handleSubmit();
  }

  return (
    <Modal
      style={{
        flex: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
      isOpen={modalVisible}
      onClosed={() => setModalVisible(false)}
      position="center"
      swipeToClose
      swipeArea={250}
      backButtonClose
      coverScreen={true}
    >
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 60,
          position: "relative",
        }}
      >
        <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
          <Image
            source={{ uri: values.image }}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height - 60,
              resizeMode: "contain",
            }}
          />
        </TouchableWithoutFeedback>

        <Text
          style={{
            position: "absolute",
            bottom: 20,
            padding: 5,
            backgroundColor: "black",
            color: "white",
            fontWeight: "500",
            alignSelf: "center",
          }}
        >
          {swipeText}
        </Text>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            height: Dimensions.get("window").height - 60,
          }}
        >
          <TextInput
            ref={inputRef}
            keyboardType="default"
            onFocus={() => setShowTextField(true)}
            onBlur={() => setShowTextField(false)}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: 5,
              display: showTextField ? "flex" : "none",
            }}
            onChangeText={(text) => setSwipeText(text)}
          />
        </View>
      </View>

      <View style={{ height: 60, alignItems: "flex-end", marginRight: 20 }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#663399",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={submitForm}
        >
          <MaterialIcons name="chevron-right" color={"white"} size={24} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default StoryPicker;

const styles = StyleSheet.create({});
