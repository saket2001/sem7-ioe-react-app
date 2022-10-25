import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

export const Loader = ({ text = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    top: 20,
  },
  text: {
    fontSize: 21,
    marginVertical: 5,
    fontWeight: '700',
  },
});
