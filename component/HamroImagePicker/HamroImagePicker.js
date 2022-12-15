import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import FileCollector from "./FileCollector";

const HamroImagePicker = () => {
  const [selectedImageData, setSelectedImageData] = useState("");
  const cropper = useRef();

  const onSelectImage = (data) => {
    const { node } = data;
    setSelectedImageData(node);
  };

  const onCropped = () => {
    cropper.current.crop().then((cropImageUri) => {
      console.log(cropImageUri);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <View
        style={{
          alignItems: "center",
          height: 60,
          width: 420,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          backgroundColor: "rgba(100, 100, 100, 0.2)",
        }}
      >
        <View style={{ marginLeft: 10, flexDirection: "row" }}>
          <TouchableOpacity onPress={() => console.log("closing")}>
            <MaterialIcons name="close" size={25} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 25,
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            New Post
          </Text>
        </View>
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity onPress={() => onCropped()}>
            <MaterialIcons name="arrow-forward" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <SectionList
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          sections={[
            {
              isHeader: true,
              data: ["Pizza"],
            },
            {
              isHeader: false,
              data: ["French Fries"],
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section }) =>
            section.isHeader && selectedImageData ? (
              <Text styles={{ color: "white" }}>Cropper</Text>
            ) : null
          }
          renderItem={({ item, section, index }) =>
            !section.isHeader ? (
              <FileCollector onSelectImage={onSelectImage} />
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default HamroImagePicker;

const styles = StyleSheet.create({});
