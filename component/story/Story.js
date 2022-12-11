import { Feather } from "@expo/vector-icons";
import axios from "axios";
import React, { useContext, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import InstaStory from "react-native-insta-story";
import { AuthContext } from "../Context";
import { apiErrorNotification } from "../ErrorHandle";
import { imageLink } from "../ImageLink";
import CreateStory from "./CreateStory";

function Story({ stories, setStories }) {
  const { userImage } = useContext(AuthContext);
  const bottomSheetRef = useRef();
  const currentStoryRef = useRef();
  const { token, decode } = useContext(AuthContext);
  const config = {
    headers: {
      "access-token": token,
    },
  };

  async function DeleteStory() {
    try {
      DeleteStoryState();
      const id = currentStoryRef.current.story._id;
      const response = await axios.delete("/story/" + id, config);
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
        ListItemRightHeaderComponent={
          <TouchableOpacity onPress={() => DeleteStory()}>
            <Feather name="trash" size={16} color="white" />
          </TouchableOpacity>
        }
        customSwipeUpComponent={
          <View>
            <Text>Swipe</Text>
          </View>
        }
        ImageComponent={Image}
        HeaderComponent={
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => bottomSheetRef.current.snapTo(0)}
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
        ImageComponentStyle={{ borderWidth: 2, borderColor: "#ddd" }}
        style={{
          marginTop: 5,
          marginBottom: 10,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      />
    );
  }, [stories]);

  return (
    <>
      <RenderItem />
      <CreateStory bottomSheetRef={bottomSheetRef} setStories={setStories} />
    </>
  );
}

export default Story;

const styles = StyleSheet.create({
  yourStory: {
    width: 74,
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
