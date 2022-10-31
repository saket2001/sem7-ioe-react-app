import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RecordItem } from "./RecordItem";
import { makeFetchRequest } from "../utils/fetchUtil";
import { DatePicker } from "./DatePicker";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";
import environment from "../environment";

export const RecordList = ({
  showTopBar = true,
  showFilter = false,
  showAll = true,
}) => {
  const [ShowAll, setShowAll] = useState(showAll);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [newRecordData, setNewRecordData] = useState();
  const [recordData, setRecordData] = useState();
  const [filterVal, setFilterVal] = useState();
  const { owner_id } = useSelector((state) => state?.auth?.ownerData);

  useEffect(() => {
    const getFeedingRecords = async () => {
      try {
        setIsLoading(true);
        setRecordData([]);
        const date = filterVal
          ? new Date(filterVal).toDateString()
          : new Date().toDateString();
        const data = await makeFetchRequest(
          `${environment.API_URL}/get-feeding-details-by-date/${owner_id}/${date}`
        );

        setIsLoading(false);
        if (data && !data?.isError && data.data.length > 0) {
          setRecordData(data.data);
          setNewRecordData([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFeedingRecords();
  }, [filterVal, refreshed]);

  if (recordData && newRecordData?.length < 1 && !ShowAll) {
    let temp = [];
    recordData?.forEach((d, i) => {
      if (i <= 5) temp.push(d);
    });
    setNewRecordData(temp);
  }

  if (isLoading) {
    return <Loader text={"Loading pet data..."} />;
  }

  return (
    <View style={styles.container}>
      {showTopBar && <View style={styles.divider}></View>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.h1}>Recent</Text>
        <View style={{flexDirection:"row"}}>
          <Text
            style={styles.showAll}
            onPress={() => {
              setRefreshed((prev) => !prev);
            }}
          >
            Refresh
          </Text>
          <Text
            style={styles.showAll}
            onPress={() => {
              setShowAll((prev) => !prev);
            }}
          >
            {ShowAll ? "Show less" : "Show all"}
          </Text>
        </View>
      </View>
      {showFilter && (
        <View style={styles.filterContainer}>
          <View style={styles.filterBtn}>
            <DatePicker
              mode="date"
              onUpdate={(date) => {
                setFilterVal(new Date(date).toDateString())
              }}
            />
          </View>
        </View>
      )}
      {recordData?.length === 0 && (
        <View style={{alignItems:'center'}}>
          <Text style={styles.p}>Not Records found for today's date</Text>
        </View>
      )}
      {ShowAll
        ? recordData?.map((d) => <RecordItem data={d} key={d?._id} />)
        : newRecordData?.map((d) => <RecordItem data={d} key={d?._id} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  h1: {
    fontSize: 19,
    fontWeight: "700",
    marginVertical: 12,
    color: "#313136",
  },
  showAll: {
    color: "#5e5e5c",
    fontSize: 17,
    marginHorizontal: 5,
    fontWeight: "600",
  },
  p: {
    fontSize: 15,
    marginVertical: 5,
  },
  divider: {
    borderTopWidth: 2,
  },
  filterContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  filterBtn: {
    alignItems: "center",
    width: 70,
    borderRadius: 10,
    borderWidth: 1,
  },
});
