import { StyleSheet, View, ScrollView, Text, Alert } from "react-native";
import React from "react";
import { RecordList } from "../Components/RecordList";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { makeFetchRequest } from "../utils/fetchUtil";
import { useSelector } from "react-redux";
import environment from "../environment";

export const RecordsScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width - 20;
  const owner_data = useSelector((state) => state?.auth?.ownerData);
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const getWeeklyData = async () => {
      try {
        const response = await makeFetchRequest(
          `${environment.API_URL}/pet-weekly-analysis/${owner_data?.owner_id}`
        );

        if (response && !response?.isError) {
          // converting obj to array
          const temp = Object.keys(response?.data).map(
            (key) => response?.data[key]
          );
          setChartData(temp);
        }
      } catch (err) {
        Alert.alert(
          "Something went wrong",
          "Looks like some error occurred from our side. Please try again with restarting the app!"
        );
        console.log(err);
      }
    };

    getWeeklyData();

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* show data based on filters like weekly, monthly */}
        {chartData && (
          <>
            <Text style={styles.h1}>Weekly Analysis</Text>
            <View style={styles.barChartContainer}>
              <BarChart
                data={{
                  labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
                  datasets: [
                    {
                      data: chartData,
                    },
                  ],
                }}
                width={screenWidth} // from react-native
                height={250}
                yAxisSuffix=" gm"
                withInnerLines={false}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#ede8e8",
                  backgroundGradientFrom: "#2748db",
                  backgroundGradientTo: "#1c3cc9",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `#ede8e8`,
                  labelColor: (opacity = 1) => `#ede8e8`,
                  style: {
                    borderRadius: 16,
                    padding: 10,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "1",
                    stroke: "#ffa726",
                  },
                  barPercentage: 0.8,
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </>
        )}
        {/* records */}
        <RecordList showTopBar={false} showFilter={true} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDF0EA",
    paddingVertical: 30,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  barChartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  header_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-between",
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
});
