import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import AlbumPicker from "./AlbumPicker";
import * as imagePicker from "expo-image-picker";
import Header from "./Header";

const { height, width } = Dimensions.get("screen");
const imageHeight = height / 3;

const FileCollector = ({
  submitSingleData,
  initLoading,
  setInitLoading,
  ImageComponent,
  enableAlbums,
  enableMultiSelect,
  enableCameraCapture,
  multiSelectOptions,
  modalRef,
  headerText,
  submitMultipleData,
  multipleSelectEnabled,
}) => {
  const [images, setImages] = useState([]);
  const [multipleSelected, setMultipleSelected] = useState(
    multipleSelectEnabled
  );
  const [resultCount, setResultCount] = useState(100);
  const [skip, setSkip] = useState(null);
  const [lastItem, setLastItem] = useState(undefined);
  const [albums, setAlbums] = useState([{ id: null, title: "Gallery" }]);
  const [selectedAlbum, setSelectedAlbum] = useState({
    id: null,
    title: "Gallery",
  });
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [showAlbums, setShowAlbums] = useState(false);
  const [selectedImagesId, setSelectedImagesId] = useState([]);
  const [enableDone, setEnableDone] = useState(false);

  useEffect(() => {
    if (enableAlbums) {
      getAlbums();
    }
    return () => {
      setSkip(null);
      setResultCount(100);
      setLastItem(undefined);
      setHasMoreImages(true);
      setSelectedAlbum({ id: null, title: "Gallery" });
      setAlbums([{ id: null, title: "All" }]);
      setImages([]);
      setMultipleSelected(false);
    };
  }, []);

  useEffect(() => {
    fetchImages();
  }, [selectedAlbum]);

  function NextPageImages() {
    if (initLoading) return;
    if (!hasMoreImages) return;
    fetchImages();
  }

  async function getAlbums() {
    try {
      const albumsData = await MediaLibrary.getAlbumsAsync();
      setAlbums([...albums, ...albumsData]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchImages() {
    try {
      let lastItemID = lastItem?.endCursor ? lastItem.endCursor : undefined; // for iOS
      var fetchParams = {
        first: resultCount,
        sortBy: "default",
        after: Platform.OS === "android" ? `${skip}` : lastItemID,
        album: selectedAlbum?.id ? selectedAlbum : undefined,
      };
      if (!skip) {
        delete fetchParams.after;
        setSkip(resultCount);
      } else {
        setSkip(resultCount + skip);
      }
      const { assets, ...pageInfo } = await MediaLibrary.getAssetsAsync({
        ...fetchParams,
      });

      if (assets.length) {
        setImages([...images, ...assets]);
        setLastItem(pageInfo);
        setInitLoading(false);
      } else {
        setHasMoreImages(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAlbumClick(album) {
    setHasMoreImages(true);
    setShowAlbums(false);
    setSkip(null);
    setLastItem(null);
    setImages([]);
    setSelectedAlbum(album);
    setSelectedImagesId([]);
  }

  useEffect(() => {
    if (enableCameraCapture) {
      getCameraPermission();
    }
  }, [enableCameraCapture]);

  const getCameraPermission = React.useCallback(async () => {
    const { granted } = await imagePicker.getCameraPermissionsAsync();
    if (!granted) {
      const result = await imagePicker.requestCameraPermissionsAsync();
      if (!result.granted) {
        Alert.alert("Error", "Permission denied");
      }
    }
  });

  async function openCamera() {
    const result = await imagePicker.launchCameraAsync({});
    if (!result.cancelled) {
      submitSingleData({ id: Math.random(), ...result });
    }
  }

  async function selectedImage(item, index) {
    if (Platform.OS == "ios") {
      var iosImg = await MediaLibrary.getAssetInfoAsync(item);
      item.uri = iosImg.localUri;
    }

    submitSingleData(item);
  }

  useEffect(() => {
    if (selectedImagesId.length >= multiSelectOptions.minimumImageCount) {
      setEnableDone(true);
    } else {
      setEnableDone(false);
    }
  }, [multiSelectOptions, selectedImagesId]);

  function multiSelectImage(item, index) {
    if (selectedImagesId.includes(item.id)) {
      //Remove
      let copySelectedImagesId = [...selectedImagesId];
      copySelectedImagesId = copySelectedImagesId.filter((c) => c != item.id);
      setSelectedImagesId(copySelectedImagesId);
    } else {
      //Add
      if (
        multiSelectOptions.maximumImageCount != -1 &&
        selectedImagesId.length === multiSelectOptions.maximumImageCount
      ) {
        return Alert.alert("Error", "Maximum images allowed exceeds.");
      }
      setSelectedImagesId((prev) => [...prev, item.id]);
    }
  }

  async function multiSelectSubmit() {
    if (selectedImagesId.length < multiSelectOptions.minimumImageCount) {
      return Alert.alert(
        "Error",
        `You must select at least ${multiSelectOptions.minimumImageCount} image.`
      );
    }
    const data = images.filter((img) => selectedImagesId.includes(img.id));
    if (Platform.OS == "ios") {
      var arr = [];
      for (const asset of data) {
        var iosImg = await MediaLibrary.getAssetInfoAsync(asset);
        asset.uri = iosImg.localUri;
        arr.push(asset);
      }

      submitMultipleData(arr);
    } else {
      submitMultipleData(data);
    }
  }

  const renderHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 15,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => (enableAlbums ? setShowAlbums(true) : null)}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: "#FFFFFF",
          }}
        >
          {selectedAlbum.title}
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

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {enableMultiSelect ? (
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
        ) : null}
        {enableCameraCapture ? (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.2)",
              height: 35,
              width: 35,
              borderRadius: 100,
            }}
            onPress={openCamera}
          >
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20, tintColor: "#FFFFFF" }}
              source={require("../../assets/camera-bw.png")}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  const renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          marginBottom: 1,
          marginRight: 1,
        }}
        onPress={() =>
          enableMultiSelect && multipleSelected
            ? multiSelectImage(item, index)
            : selectedImage(item, index)
        }
      >
        <ImageComponent
          style={{
            width: width / 3,
            height: imageHeight - 70,
          }}
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
        </ImageComponent>
        {multipleSelected ? (
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: selectedImagesId.includes(item.id)
                ? "#4CAF50"
                : "#2473f0",
              height: 25,
              width: 25,
              borderRadius: 100,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedImagesId.includes(item.id) ? (
              <Image
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  tintColor: "#FFFFFF",

                  alignSelf: "center",
                }}
                source={require("../../assets/check.png")}
              />
            ) : (
              <Text
                style={{ fontWeight: "500", fontSize: 12, color: "#FFFFFF" }}
              >
                {index + 1}
              </Text>
            )}
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="slide" transparent={true} visible={initLoading}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#000008",
            paddingHorizontal: 10,
            paddingVertical: height / 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#663399" />
        </View>
      </Modal>

      <Header
        modalRef={modalRef}
        headerText={headerText}
        multiSelectOptions={multiSelectOptions}
        enableMultiSelect={enableMultiSelect}
        enableDone={enableDone}
        multiSelectSubmit={multiSelectSubmit}
      />

      {showAlbums ? (
        <AlbumPicker
          showAlbums={showAlbums}
          selectedAlbum={selectedAlbum}
          albums={albums}
          handleAlbumClick={handleAlbumClick}
        />
      ) : null}

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        initialNumToRender={10}
        removeClippedSubviews
        data={images}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItems}
        onEndReached={NextPageImages}
        onEndReachedThreshold={4}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default FileCollector;

const styles = StyleSheet.create({});
