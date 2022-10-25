import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { RecordList } from "../Components/RecordList";

export const RecordsScreen = ({ navigation }) => {
 
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* show data based on filters like weekly, monthly */}
              <RecordList showTopBar={false} showFilter={true} />
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
    marginVertical: 30,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
    backgroundColor: "#4848d2",
    color: "#fff",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  list: {
    flexDirection: "column",
    paddingVertical: 30,
    margin: 10,
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
    textTransform: "capitalize",
  },
  p_label: {
    fontSize: 16,
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});
