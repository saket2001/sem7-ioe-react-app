import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text,Image } from "react-native";
import { makeFetchRequest } from "../utils/fetchUtil";
import { useSelector } from "react-redux";
import environment from "../environment";

export const Header = () => {
  const [ownerData, setOwnerData] = useState({});
  const { owner_id } = useSelector((state) => state?.auth?.ownerData);

  useEffect(() => {
    const getOwnerDetail = async () => {
      try {
        const data = await makeFetchRequest(
          `${environment.API_URL}/get-details/${owner_id}`
        );

        if (data && !data?.isError) setOwnerData(data);
        else setOwnerData([]);
      } catch (err) {
        console.log(err);
      }
    };
    getOwnerDetail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.profile_text}>
          <Text style={styles.p}>Welcome</Text>
          <Text style={styles.h1}>{ownerData?.data?.full_name || "Log in Required"}</Text>
        </View>
        <View>
          <Image source={require('../assets/logo.png')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profile_circle: {
    width: 70,
    height: 70,
    borderRadius: 100,
    // backgroundColor: "#C6DCE4",
  },
  profile_text: {
    flexDirection: "column",
    justifyContent: "center",
  },
  h1: {
    fontSize: 19,
    fontWeight: "600",
    color: "#282929",
  },
  p: {
    fontSize: 16,
    color: "#3d4040",
  },
});
