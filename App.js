import React from "react";
import {StyleSheet, Text, View} from "react-native";
import logo from './assets/logo.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{
        width: 305,
        height: 305
      }}/>
      <Text style={styles.brand}>fotoMI</Text>
      <Text style={styles.tagline}>Share Fotos with Family!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fdff",
    alignItems: "center",
    justifyContent: "center"
  },
  brand: {
    fontSize: 40,
    fontWeight: 'normal',
    color: '#0018cc'
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#0018cc'
  }
});
