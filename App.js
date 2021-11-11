import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native!</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "red",
    borderWidth: 1,
  },
  text: {
    fontSize: 50,
    color: "crimson",
  },
});
