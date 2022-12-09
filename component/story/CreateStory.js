import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useRef } from "react";
import BottomSheetComponent from "../BottomSheetComponent";
import Animated from "react-native-reanimated";
import { Formik } from "formik";
import * as Yup from "yup";
import StoryPicker from "./StoryPicker";

const validationSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
});

const CreateStory = ({ bottomSheetRef }) => {
  const openCameraRef = useRef();
  const selectImageRef = useRef();
  const fill = new Animated.Value(1);
  const formRef = useRef();

  function createStory(value) {
    console.log("submit", value);
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <BottomSheetComponent
        sheetRef={bottomSheetRef}
        openCameraRef={openCameraRef}
        selectImageRef={selectImageRef}
        fill={fill}
      />
      <ScrollView style={{ position: "relative" }}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: Animated.add(0.3, Animated.multiply(fill, 1.0)),
            },
          ]}
        >
          <Formik
            innerRef={formRef}
            initialValues={{
              image: "",
            }}
            onSubmit={(values) => createStory(values)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              values,
              setFieldValue,
              touched,
              handleBlur,
            }) => (
              <>
                <StoryPicker
                  sheetRef={bottomSheetRef}
                  openCameraRef={openCameraRef}
                  selectImageRef={selectImageRef}
                  handleSubmit={handleSubmit}
                />
              </>
            )}
          </Formik>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateStory;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
