import React, { useContext, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import InstaStory from "react-native-insta-story";
import { AuthContext } from "../Context";
import { imageLink } from "../ImageLink";
import CreateStory from "./CreateStory";

function Story({ stories }) {
  const { userImage } = useContext(AuthContext);
  const bottomSheetRef = useRef();
  return (
    <>
      <InstaStory
        unPressedBorderColor="#663399"
        pressedBorderColor="#663399"
        avatarSize={70}
        data={stories}
        duration={10}
        onStart={(item) => console.log(item)}
        onClose={(item) => console.log("close: ", item)}
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
                <Text style={styles.plusIcon}>+</Text>
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
      <CreateStory bottomSheetRef={bottomSheetRef} />
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
    backgroundColor: "#0095f6",
    borderRadius: "50%",
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
