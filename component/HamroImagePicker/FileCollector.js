import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

const { height, width } = Dimensions.get("screen");

const FileCollector = ({ onSelectImage }) => {
  const [images, setImages] = useState([]);
  const [multipleSelected, setMultipleSelected] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      var fetchParams = {
        first: 100,
        sortBy: "creationTime",
      };
      if (Platform.OS === "android") {
        delete fetchParams.groupTypes;
      }
      const { assets, ...pageInfo } = await MediaLibrary.getAssetsAsync({
        ...fetchParams,
      });
      setImages(assets);
      setInitLoading(false);
      onSelectImage(assets[0]);
    } catch (error) {
      console.log(error);
    }
  }

  function selectedImage(item, index) {
    console.log("hii");
    onSelectImage(item);
    const copyImages = [...images];
    for (const item of copyImages) {
      if (item.selected) item.selected = false;
    }
    copyImages[index].selected = true;
    console.log(copyImages[index]);
    setImages(copyImages);
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="fade" transparent={true} visible={initLoading}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000080",
            paddingHorizontal: 10,
            paddingVertical: height / 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#fcab16" />
        </View>
      </Modal>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        initialNumToRender={10}
        removeClippedSubviews
        data={images}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              marginBottom: 1,
              marginRight: 1,
            }}
            onPress={() => selectedImage(item, index)}
          >
            <ImageBackground
              style={{ width: width / 3, height: 200 }}
              source={{ uri: item.uri }}
            >
              {item.selected ? (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    opacity: 0.5,
                  }}
                />
              ) : null}
            </ImageBackground>
            {multipleSelected ? (
              <View
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "#2473f0",
                  height: 25,
                  width: 25,
                  borderRadius: 100,
                  borderColor: "#FFFFFF",
                  borderWidth: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "500", fontSize: 12, color: "#FFFFFF" }}
                >
                  {index + 1}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              height: 45,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Text
                style={{ fontWeight: "600", fontSize: 16, color: "#FFFFFF" }}
              >
                Gallery
              </Text>
              <Image
                resizeMode="contain"
                style={{
                  marginLeft: 10,
                  width: 15,
                  height: 15,
                  tintColor: "#FFFFFF",
                }}
                source={require("../../assets/down_a.png")}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setMultipleSelected(!multipleSelected)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: !multipleSelected
                    ? "rgba(255,255,255,0.2)"
                    : "#2473f0",
                  height: 35,
                  width: 35,
                  borderRadius: 100,
                  marginRight: 8,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}
                  source={require("../../assets/multi-copy.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  height: 35,
                  width: 35,
                  borderRadius: 100,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 20, height: 20, tintColor: "#FFFFFF" }}
                  source={require("../../assets/camera-bw.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FileCollector;

const styles = StyleSheet.create({});
