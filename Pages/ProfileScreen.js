import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { makeFetchRequest } from "../utils/fetchUtil";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { ownerActions } from "../Store/ownerSlice";

export const ProfileScreen = ({ navigation }) => {
  const [ownerData, setOwnerData] = useState(null);
  const dispatch = useDispatch();
  const { owner_id } = useSelector((state) => state?.auth.ownerData);

  useEffect(() => {
    const getOwnerDetail = async () => {
      try {
        const data = await makeFetchRequest(
          `http://192.168.0.105:5000/api/v1/get-details/${owner_id}`
        );

        if (!data) return setOwnerData(null);

        if (data && !data?.isError) setOwnerData(data);
      } catch (err) {
        alert(err);
      }
    };
    getOwnerDetail();
  }, []);

  const logoutHandler = () => {
    dispatch(ownerActions.ownerLogout());
    dispatch(ownerActions.toggleAuth());
  };

  if (!ownerData || ownerData === [])
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ padding: 20, fontWeight: "600", fontSize: 22 }}>
              User Log in required!
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  
  const deleteHandler = async () => {
    try {
      const response = await makeFetchRequest(
        `http://192.168.0.105:5000/api/v1/delete-owner/${owner_id}`
      );

      if (data && !data?.isError) {
        setOwnerData([]);
        dispatch(ownerActions.ownerLogout());
        dispatch(ownerActions.toggleAuth());
      } 
    } catch (err) {
      
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.header_row}>
            <Text style={styles.header_h1}>My Profile</Text>
          </View>
          <View style={styles.header_col}>
            <Text style={styles.header_h1}>Hello !</Text>
            <Text style={styles.header_p}>{ownerData?.data?.full_name}</Text>
          </View>
        </View>
        <View style={styles.list}>
          {/* 1 */}
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="user" size={25} color="#4848d2" />
              {/* <Text style={styles.p_label}>
                Full name 
              </Text> */}
            </Text>
            <Text style={styles.p}>{ownerData?.data?.full_name}</Text>
          </View>
          {/* 2 */}
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="envelope" size={25} color="#4848d2" />
            </Text>
            <Text style={styles.p}>{ownerData?.data?.email}</Text>
          </View>
          {/* 3 */}
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="vcard" size={25} color="#4848d2" />
            </Text>
            <Text style={styles.p}>{ownerData?.data?.pet_name}</Text>
          </View>
          {/* 4 */}
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="tag" size={25} color="#4848d2" />
            </Text>
            <Text style={styles.p}>{ownerData?.data?.pet_breed}</Text>
          </View>
          {/* 5 */}
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="tag" size={25} color="#4848d2" />
            </Text>
            <Text style={styles.p}>{ownerData?.data?.pet_category}</Text>
          </View>
          {/* 6 */}
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="calendar" size={25} color="#4848d2" />
            </Text>
            <Text style={styles.p}>{ownerData?.data?.pet_age}</Text>
          </View>

          {/* buttons */}
          <View style={styles.button}></View>
          <View style={styles.buttonContainer}>
            {/* logout */}
            <Pressable style={styles.button}>
              <Button
                color={"#8c8ce5"}
                title="Logout"
                onPress={() => logoutHandler()}
              />
            </Pressable>
            {/* edit profile */}
            {/* <Pressable style={styles.button}>
            <Button color={"#8c8ce5"} title="Edit Profile" onPress={() => {}} />
          </Pressable> */}
            {/* delete acc */}
            <Pressable style={styles.button} onPress={() => deleteHandler()}>
              <Button color={"#eb291e"} title="Delete Account" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDF0EA",
    paddingVertical: 20,
    marginVertical: 10,
  },
  header_col: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
    backgroundColor: "#4848d2",
    color: "#fff",
  },
  list: {
    flexDirection: "column",
    // margin: 10,
    borderRadius: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#F9F9F9",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    marginHorizontal: 10,
  },
  header_h1: {
    fontSize: 23,
    color: "#fff",
  },
  header_p: {
    fontSize: 23,
    color: "#fff",
    fontWeight: "600",
  },
  header_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
  p_label: {
    fontSize: 16,
    color: "#000",
    // textTransform: "capitalize",
    fontWeight: "600",
  },
  button: {
    marginVertical: 5,
  },
  buttonContainer: {
    margin: 10,
  },
});
