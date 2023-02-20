import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useContext, useRef } from "react";
import BottomSheetComponent from "../BottomSheetComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import StoryPicker from "./StoryPicker";
import { AuthContext, timeSince } from "../Context";
import axios from "axios";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";
import { imageLink } from "../ImageLink";

const validationSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
  swipeText: Yup.string().optional(),
});

const CreateStory = ({ bottomSheetRef, setStories, fill }) => {
  const openCameraRef = useRef();
  const selectImageRef = useRef();
  const formRef = useRef();
  const { config } = useContext(AuthContext);

  async function createStory(values) {
    try {
      const response = await axios.post("/story", values, config);
      addToStories(response.data);
      customSuccessNotification("Story created.");
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  function addToStories(story) {
    story.user_image = imageLink + story.user_image;
    story.story_image = imageLink + story.story_image;
    story.story_video = imageLink + story.story_video;
    story.date = timeSince(story.createdAt);
    setStories((prevStories) => {
      const duplicateStories = [...prevStories];
      var existingIndex = duplicateStories.findIndex(
        (st) => st.user_id == story.user_id
      );
      if (existingIndex != -1) {
        duplicateStories[existingIndex].stories.push(story);
        return duplicateStories;
      } else {
        var newStory = {
          user_id: story.user_id,
          user_image: story.user_image,
          user_name: story.user_name,
          _id: story._id,
          stories: [story],
        };
        return [newStory, ...duplicateStories];
      }
    });
  }

  return (
    <>
      <BottomSheetComponent
        sheetRef={bottomSheetRef}
        openCameraRef={openCameraRef}
        selectImageRef={selectImageRef}
        fill={fill}
      />
      <Formik
        innerRef={formRef}
        initialValues={{
          image: "",
          swipeText: "",
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
    </>
  );
};

export default CreateStory;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
