import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export const RecordItem = ({ data }) => {
  // const time = new Date(data?.time);
  const suffix = data?.time.toString().slice(0, 2) >= 12 ? " pm" : " am";
  const dateToDisplay =
    data?.date + " " + data?.time.toString().slice(0, 8) + suffix;

  if (data === undefined) return "";

  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../assets/logo.png")} />
      </View>
      <View style={styles.column}>
        {/* amount given */}
        <Text style={styles.h2}>Fed {data?.amountGiven}</Text>
        {/* action type */}
        <Text style={styles.p}>{data?.type_of_action}</Text>
        {/* fed date time */}
        <Text style={styles.p}>{dateToDisplay}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
  },
  h1: {
    fontSize: 19,
    textAlign: "center",
  },
  h2: {
    fontSize: 18,
    fontWeight: "500",
  },
  p: {
    fontSize: 14,
    color: "#a9a9a7",
  },
  divider: {
    borderTopWidth: 2,
  },
  column: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
});
