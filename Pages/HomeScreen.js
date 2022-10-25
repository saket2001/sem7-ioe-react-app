import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Header } from "../Components/Header";
import { HeaderAnalysis } from "../Components/HeaderAnalysis";
import { QuickActions } from "../Components/QuickActions";
import { RecordList } from "../Components/RecordList";

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <HeaderAnalysis/>
        <QuickActions />
        <RecordList showAll={false} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDF0EA",
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
});
