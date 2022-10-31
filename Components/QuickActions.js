import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { makeFetchRequest } from "../utils/fetchUtil";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";
import environment from "../environment";

export const QuickActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { owner_id } = useSelector((state) => state?.auth?.ownerData);
  
  const clickHandler = async () => {
    try {
      setIsLoading(true);
      const body = {
        owner_id: owner_id,
        amountGiven: "100gm",
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        type_of_action: "Fed by owner",
        food_brand: "meow meow dry food",
        food_type: "dry",
      };
      const response = await makeFetchRequest(
        `${environment.API_URL}/feed-pet`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log(response);

      setIsLoading(false);
      if (response && !response?.isError) {
        Alert.alert("Hello Owner!", response?.message, [{ text: "OK" }]);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loader text="Feeding your pet..."/>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Quick Feed <Text style={styles.p}>(100gms)</Text>
      </Text>
      <Text style={styles.p}>Easily feed your pet with just one touch</Text>
      <View style={styles.buttonContainer}>
        <Button
          color={"#8c8ce5"}
          title="Feed Now"
          onPress={() => clickHandler()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#4848d2",
    marginVertical: 10,
  },
  h1: {
    color: "#fff",
    fontSize: 19,
    marginVertical: 5,
  },
  p: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: { marginVertical: 10 },
});
