import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Modal from "react-native-modalbox";
import { FlatList } from "react-native-gesture-handler";

const AlbumPicker = ({
  showAlbums,
  selectedAlbum,
  albums,
  handleAlbumClick,
}) => {
  return (
    <Modal
      isOpen={showAlbums}
      style={{
        position: "relative",
        backgroundColor: "transparent",
      }}
      coverScreen={false}
      swipeToClose={false}
      backdropPressToClose={true}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          width: Dimensions.get("window").width / 3,
          height: Dimensions.get("window").height - 70,
          backgroundColor: "#222",
          top: 70,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={albums}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => handleAlbumClick(item)}
                style={{ padding: 10, paddingVertical: 20 }}
              >
                <Text
                  style={{
                    color: selectedAlbum.id == item.id ? "grey" : "white",
                    fontSize: 18,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default AlbumPicker;

const styles = StyleSheet.create({});
