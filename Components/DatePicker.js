import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";

export const DatePicker = ({ onUpdate, mode ='time'}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let val = '';
    val = mode === "date" ? date : date.toLocaleTimeString();
    onUpdate(val);
    hideDatePicker();
  };

  return (
    <View>
      <Pressable style={styles.iconMargin} onPress={showDatePicker}>
        <Icon name="calendar" size={35} />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  iconMargin: {
    margin: 10,
  },
});