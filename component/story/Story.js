import { Feather } from "@expo/vector-icons";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import InstaStory from "react-native-insta-story";
import { AuthContext } from "../Context";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../ErrorHandle";
import { imageLink } from "../ImageLink";
import FastImage from "react-native-fast-image";
import Animated, {
  Easing,
  EasingNode,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

function Story({
  stories,
  setStories,
  bottomSheetRef,
  setStoryPicker,
  storySubmitted,
  setStorySubmitted,
}) {
  const { userImage } = useContext(AuthContext);
  const currentStoryRef = useRef();
  const { config, decode } = useContext(AuthContext);

  async function DeleteStory() {
    try {
      setStorySubmitted(true);
      DeleteStoryState();
      const id = currentStoryRef.current.story._id;
      const response = await axios.delete("/story/" + id, config);
      setStorySubmitted(false);
      customSuccessNotification("Story deleted.");
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  function DeleteStoryState() {
    var newData = [...stories];
    newData[currentStoryRef.current.dataIndex].stories = newData[
      currentStoryRef.current.dataIndex
    ].stories.filter((story) => story._id != currentStoryRef.current.story._id);
    if (!newData[currentStoryRef.current.dataIndex].stories.length) {
      newData.splice(currentStoryRef.current.dataIndex, 1);
    }
    setStories(newData);
  }

  const RenderItem = React.useCallback(() => {
    return (
      <InstaStory
        unPressedBorderColor="#663399"
        pressedBorderColor="#663399"
        avatarSize={70}
        data={stories}
        duration={10}
        customCloseComponent={<Feather name="x" size={16} color="white" />}
        currentStoryRef={currentStoryRef}
        ListItemRightHeaderComponent={(story) => {
          return story.user_id == decode._id ? (
            <TouchableOpacity onPress={() => DeleteStory()}>
              <Feather name="trash" size={16} color="white" />
            </TouchableOpacity>
          ) : null;
        }}
        customSwipeUpComponent={(story) => {
          return (
            <View>
              <Text
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "500",
                  alignSelf: "center",
                  alignItems: "center",
                  maxWidth: Dimensions.get("window").width - 50,
                }}
              >
                {story?.swipeText}
              </Text>
            </View>
          );
        }}
        ImageComponent={__DEV__ ? Image : FastImage}
        HeaderComponent={
          <View style={{ marginTop: 10, marginBottom: 3 }}>
            <TouchableOpacity
              onPress={() => setStoryPicker(true)}
              style={styles.story_image_container}
            >
              <Image
                style={styles.story_image}
                source={{
                  uri: imageLink + userImage,
                }}
              />
              <View style={styles.createStory}>
                <Text style={styles.plusIcon}>
                  <Feather name="plus" color="white" />
                </Text>
              </View>
              <Text style={styles.yourStory}>Your story</Text>
            </TouchableOpacity>
          </View>
        }
        ImageCircleStyle={{ borderWidth: 2, borderColor: "#fff" }}
        ImageListItemStyle={{ resizeMode: "contain" }}
      />
    );
  }, [stories, bottomSheetRef]);

  return (
    <>
      <RenderItem />

      {storySubmitted ? (
        <ProgressAnimation storySubmitted={storySubmitted} />
      ) : null}

      <View
        style={{
          marginTop: 2,
          marginBottom: 10,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      ></View>
    </>
  );
}

const ProgressAnimation = ({ storySubmitted }) => {
  const startValues = useSharedValue(0);
  const lgs = useAnimatedStyle(() => ({
    width: `100%`,
    height: 3,
    backgroundColor: "#663399",
    position: "absolute",
    top: 0,
    left: startValues.value,
  }));

  useEffect(() => {
    console.log(storySubmitted);
    if (storySubmitted) {
      startValues.value = 0;
      startValues.value = withRepeat(
        withTiming(Dimensions.get("window").width, { duration: 800 }),
        -1,
        true,
        (finished) => {
          const resultStr = finished
            ? "All repeats are completed"
            : "withRepeat cancelled";
          console.log(resultStr);
        }
      );
    }
  }, [storySubmitted]);

  return (
    <View
      style={{
        position: "relative",
        height: 3,
        backgroundColor: "#4CAF50",
        marginTop: 15,
      }}
    >
      <Animated.View style={lgs}></Animated.View>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  yourStory: {
    marginTop: 3,
    textAlign: "center",
    alignItems: "center",
    fontSize: 11,
  },
  createStory: {
    height: 25,
    width: 25,
    backgroundColor: "#663399",
    borderRadius: 12.5,
    position: "absolute",
    right: 0,
    bottom: 7,
    borderWidth: 2,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
  },
  story_image: {
    height: 72,
    width: 72,
    resizeMode: "cover",
    borderRadius: 35,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  story_image_container: {
    height: 72,
    width: 72,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginRight: 10,
  },
});
