import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { makeFetchRequest } from "../utils/fetchUtil";
import Icon from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import { DatePicker } from "../Components/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { ownerActions } from "../Store/ownerSlice";
import environment from "../environment";

const feedAmount = ["50", "100", "150", "200"];

export const FeedScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    morningTime: "",
    morningAmount: "",
    afternoonTime: "",
    afternoonAmount: "",
    eveningTime: "",
    eveningAmount: "",
    extraTime: "",
    extraAmount: "",
  });
  const { owner_id } = useSelector((state) => state?.auth?.ownerData);
  const dispatch = useDispatch();

  console.log({ owner_id });

  // get stored settings
  useEffect(() => {
    const getStoredSettings = async () => {
      try {
        const response = await makeFetchRequest(
          `${environment.API_URL}/get-auto-feed/${owner_id}`
        );

        // console.log(response?.data[0]);

        // if (response?.data.length===0) setFormData([]);

        if (!response.isError) {
          setFormData(response?.data[0]);
          dispatch(ownerActions?.updateOwnerData(response?.data[0]));
        }
      } catch (err) {
        console.log(err);
      }
    };

    getStoredSettings();
  }, []);

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
      const BodyData = {
        ...formData,
        owner_id: owner_id,
      };
      if (!BodyData) return alert("Form fields cannot by empty!");
      const data = await makeFetchRequest(
        "http://192.168.0.105:5000/api/v1/manage-auto-feed",
        {
          method: "PUT",
          body: JSON.stringify(BodyData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log(data);
      alert(data?.data);

      dispatch(ownerActions.updateOwnerData(BodyData));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* form  */}
        <View style={styles.form}>
          <View>
            <Text style={styles.h2}>
              Customize timing for automatic feeding for your pet in your
              absence.
            </Text>
          </View>
          {/* divider */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Morning</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputStyle}
                value={formData?.morningTime}
              />
              <DatePicker
                onUpdate={(val) => handleChange({ morningTime: val })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Feed Amount (in gm)</Text>
              <SelectDropdown
                buttonStyle={styles.selectStyle}
                defaultValue={formData?.morningAmount}
                data={feedAmount}
                defaultButtonText="Select any amount"
                onSelect={(selectedItem) => {
                  handleChange({ morningAmount: selectedItem });
                }}
              />
            </View>
          </View>
          {/* divider */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Afternoon</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputStyle}
                value={formData?.afternoonTime}
                // value={
                //   formData.afternoonTime
                //     ? new Date(formData.afternoonTime).toLocaleTimeString() +
                //       " PM"
                //     : "00:00 PM"
                // }
              />
              <DatePicker
                onUpdate={(val) => handleChange({ afternoonTime: val })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Feed Amount (in gm)</Text>
              <SelectDropdown
                buttonStyle={styles.selectStyle}
                defaultValue={formData?.afternoonAmount}
                data={feedAmount}
                defaultButtonText="Select any amount"
                onSelect={(selectedItem) => {
                  handleChange({ afternoonAmount: selectedItem });
                }}
              />
            </View>
          </View>
          {/* divider */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Evening</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputStyle}
                value={formData?.eveningTime}
              />
              <DatePicker
                onUpdate={(val) => handleChange({ eveningTime: val })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Feed Amount (in gm)</Text>
              <SelectDropdown
                buttonStyle={styles.selectStyle}
                defaultValue={formData?.eveningAmount}
                data={feedAmount}
                defaultButtonText="Select any amount"
                onSelect={(selectedItem) => {
                  handleChange({ eveningAmount: selectedItem });
                }}
              />
            </View>
          </View>
          {/* divider */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Extra Slot (Optional)</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputStyle}
                value={formData?.extraTime}
                // value={
                //   formData.extraTime
                //     ? new Date(formData.extraTime).toLocaleTimeString() +
                //       `${
                //         new Date(formData.extraTime)
                //           .toLocaleTimeString()
                //           .slice(0, 2) > 12
                //           ? " PM"
                //           : " AM"
                //       }`
                //     : "00:00 AM/PM"
                // }
              />
              <DatePicker
                onUpdate={(val) => handleChange({ extraTime: val })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Feed Amount (in gm)</Text>
              <SelectDropdown
                buttonStyle={styles.selectStyle}
                defaultValue={formData?.extraAmount}
                data={feedAmount}
                defaultButtonText="Select any amount"
                onSelect={(selectedItem) => {
                  handleChange({ extraAmount: selectedItem });
                }}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle} onPress={submitForm}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Save Settings
              </Text>
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
  form: {
    marginVertical: 30,
    marginHorizontal: 15,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
  },
  inputStyle: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#f2f2f2",
    color: "#000",
  },
  selectStyle: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputGroup: {
    flexDirection: "column",
    marginVertical: 10,
  },
  label: {
    color: "#8a8787",
    marginBottom: 4,
  },
  divider: {
    marginVertical: 5,
    borderBottomWidth: 2,
  },
  h1: {
    fontSize: 19,
    fontWeight: "600",
    color: "#282929",
  },
  h2: {
    fontSize: 17,
    fontWeight: "600",
    color: "#282929",
  },
  p: {
    fontSize: 16,
    color: "#3d4040",
    textTransform: "capitalize",
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
});
