import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

const BottomSheetComponent = ({
  sheetRef,
  fill = new Animated.Value(1),
  selectImageRef,
  openCameraRef,
}) => {
  const renderHeader = React.useCallback(() => (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          alignItems: "center",
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: "#ddd",
        }}
      >
        <Text
          style={{
            fontFamily: "Raleway_600SemiBold",
            fontSize: 20,
            color: "black",
            borderTopWidth: 5,
            borderTopColor: "#663399",
            paddingTop: 5,
            borderRadius: 3,
          }}
        >
          Choose Image
        </Text>
      </View>
    </>
  ));

  const renderContent = React.useCallback(() => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: 300,
        }}
      >
        <TouchableOpacity
          style={[styles.loginBtn, { borderRadius: 0 }]}
          onPress={() => selectImageRef.current()}
        >
          <Image
            style={styles.cameraIcon}
            source={require("../assets/gallery.png")}
          />
          <Text style={styles.loginText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginBtn, { borderRadius: 0 }]}
          onPress={() => selectImageRef.current()}
        >
          <Image
            style={styles.cameraIcon}
            source={require("../assets/camera.png")}
          />
          <Text style={styles.loginText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose
        snapPoints={[300, 0]}
        borderRadius={10}
        initialSnap={1}
        enabledContentTapInteraction={false}
        renderHeader={renderHeader}
        renderContent={renderContent}
        enabledGestureInteraction={true}
        callbackNode={fill}
      />
    </>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cameraIcon: {
    height: 30,
    width: 30,
  },
  loginBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width - 60,
    backgroundColor: "#663399",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
    fontSize: 18,
    color: "white",
    marginLeft: 5,
  },
  formcontrol: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 5,
    // marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cameraContainer: {
    padding: 25,
    borderColor: "#C4C4C4BF",
    borderWidth: 0.5,
  },
  userImage: {
    height: 150,
    width: 170,
    resizeMode: "cover",
    borderColor: "#C4C4C4BF",
    borderWidth: 0.5,
    margin: "auto",
    marginBottom: 30,
    alignItems: "center",
  },
  uploadBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: "#C4C4C480",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  textSecondary: {
    color: "#868686",
    fontSize: 15,
    fontFamily: "Raleway_600SemiBold",
  },
  formGroup: {
    marginBottom: 20,
  },
  selectForm: {
    borderBottomColor: "#C4C4C4BF",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  selectField: {
    borderBottomColor: "#C4C4C4BF",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 30,
  },
  label: {
    color: "#868686",
    fontSize: 12,
    fontFamily: "Raleway_600SemiBold",
    marginBottom: 5,
  },
  input: {
    fontSize: 17,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    borderWidth: 0,
    paddingBottom: 5,
    borderBottomColor: "#C9C9C9",
    borderBottomWidth: 1,
  },
});
