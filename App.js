import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import logo from "./assets/logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";

import { SplashScreen } from "expo";

export default function App() {
  SplashScreen.preventAutoHide();
  setTimeout(SplashScreen.hide, 5000);
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    if (Platform.OS === "web") {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image is available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.tagline}>Share Fotos with Family!</Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
  },
  brand: {
    fontSize: 40,
    fontWeight: "normal",
    color: "#0018cc",
  },
  tagline: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#0018cc",
    textTransform: "uppercase",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    borderRadius: 15,
    borderColor: "grey",
    backgroundColor: "#323edd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "yellow",
    margin: 5,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    margin: 5,
  },
});
