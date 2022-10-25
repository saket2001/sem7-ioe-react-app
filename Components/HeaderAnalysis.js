import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { makeFetchRequest } from "../utils/fetchUtil";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

export const HeaderAnalysis = () => {
  const { owner_id } = useSelector((state) => state?.auth?.ownerData);
  const [data, setData] = useState();
  const [refreshed, setRefreshed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDataAnalyzed = async () => {
      try {
        setIsLoading(true);
        const response = await makeFetchRequest(
          `http://192.168.0.105:5000/api/v1/pet-analysis/${owner_id}/${new Date().toDateString()}`
        );

        setIsLoading(false);
        if (response && !response.isError) setData(response?.data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getDataAnalyzed();
  }, [refreshed]);

  if (isLoading) return <Loader text="Hold tight! Getting your pet analysis" />;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.p}>Today's Total</Text>
          <Text style={styles.p}>Consumption</Text>
          <Text style={styles.h1}>{data?.todaysTotal} gm</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.p}>This Week's</Text>
          <Text style={styles.p}>Consumption</Text>
          <Text style={styles.h1}>{data?.weeksTotal} gm</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.p}>This Month's</Text>
          <Text style={styles.p}>Consumption</Text>
          <Text style={styles.h1}>{data?.monthsTotal} gm</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.p}>No of Time</Text>
          <Text style={styles.p}>You Fed Pet</Text>
          <Text style={styles.h1}>{data?.noOfTimesFedToday} time</Text>
        </View>
      </View>
      <View style={styles.refreshBox}>
        <Text onPress={() => setRefreshed((prev) => !prev)}>Refresh</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  refreshBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 4,
    marginHorizontal:10,
  },
  box: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },
  h1: {
    fontSize: 19,
    fontWeight: "600",
    color: "#282929",
    paddingVertical: 5,
  },
  p: {
    fontSize: 15,
    color: "#3d4040",
  },
});
