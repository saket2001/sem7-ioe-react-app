import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { Loader } from "../Components/Loader";
import { ownerActions } from "../Store/ownerSlice";
// import { NavigationHeader } from "../Components/NavigationHeader";
import { makeFetchRequest } from "../utils/fetchUtil";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (val) => {
    setFormData((prev) => {
      return {
        ...prev,
        ...val,
      };
    });
  };

  const submitForm = async () => {
    try {
      setIsLoading(true);
      const BodyData = {
        ...formData,
      };
      if (!BodyData) return alert("Form fields cannot by empty!");
      const data = await makeFetchRequest(
        // `${process.env.REACT_APP_API_PORT}/owner-sign-in`,
        `http://192.168.0.105:5000/api/v1/owner-sign-in`,
        {
          method: "POST",
          body: JSON.stringify(BodyData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log(data?.data);

      setIsLoading(false);
      alert(data?.message);

      if (!data?.isError) {
        // dispatch(ownerActions.updateOwnerData(data?.data[0]));
        dispatch(ownerActions.updateOwnerData(data?.data));
        dispatch(ownerActions.toggleAuth());
        navigation.navigate("Home");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  if (isLoading)
    return <Loader text="Loading..."/>

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* header component  */}
        {/* <NavigationHeader /> */}
        {/* header */}
        <View style={styles.header_col}>
          <Text style={styles.header_h1}>Hello</Text>
          <Text style={styles.header_h1}>Welcome Back</Text>
          <Text style={styles.header_p}>
            Great Seeing you back! Enter your details to quickly getting back to
            awesomeness
          </Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(val) => handleChange({ email: val })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={(val) => handleChange({ password: val })}
            />
          </View>

          {/* button */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle} onPress={submitForm}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Sign In</Text>
            </Pressable>
          </View>
          {/* link */}
          <Text style={styles.linkStyle}>
            Don't have an account? {""}
            <Text
              style={styles.linkStyleLink}
              onPress={() => navigation.navigate("Register")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#CDF0EA",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    marginVertical: 20,
  },
  header_col: {
    justifyContent: "center",
    padding: 20,
  },
  header_h1: {
    fontSize: 25,
    color: "#1e1f1e",
    fontWeight: "700",
  },
  header_p: {
    fontSize: 16,
    color: "#4b4d4b",
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
  form: {
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  inputStyle: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#f5f5f5",
    color: "#000",
  },
  inputGroup: {
    flexDirection: "column",
    marginVertical: 10,
  },
  label: {
    color: "#323333",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: "#212121",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  linkStyle: {
    textAlign: "center",
  },
  linkStyleLink: {
    color: "blue",
    marginHorizontal: 10,
  },
});
