import React,{useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Loader } from "../Components/Loader";
import { makeFetchRequest } from "../utils/fetchUtil";

export const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    pet_name: "",
    pet_age: "",
    pet_category: "",
    pet_breed: "",
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
        "http://192.168.36.189:5000/api/v1/owner-sign-up",
        {
          method: "POST",
          body: JSON.stringify(BodyData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log(data);
      
      setIsLoading(false);
      alert(data?.message);

      if (!data?.isError) {
        navigation.navigate("Login");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  if (isLoading)
    return <Loader text="Hold tight! Registering you and your pet to our app.."/>

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* header */}
        <View style={styles.header_col}>
          <Text style={styles.header_h1}>Sign Up</Text>
          <Text style={styles.header_p}>
            Enter your and pet's details to start an automated feeding life for
            pet!
          </Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(val) => handleChange({ full_name: val })}
            />
          </View>
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
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pet Name</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(val) => handleChange({ pet_name: val })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pet Category</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(val) => handleChange({ pet_category: val })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pet Breed</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(val) => handleChange({ pet_breed: val })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pet Age</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(val) => handleChange({ pet_age: val })}
            />
          </View>
          {/* button */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle} onPress={submitForm}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Submit Details
              </Text>
            </Pressable>
          </View>
          {/* link */}
          <Text style={styles.linkStyle}>
            Don't have an account? {""}
            <Text
              style={styles.linkStyleLink}
              onPress={() => navigation.navigate("Login")}
            >
              Sign In
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
    backgroundColor: "#CDF0EA",
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
    fontWeight: "600",
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
    flex: 1,
    padding: 20,
    borderRadius: 20,
    margin: 10,
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
