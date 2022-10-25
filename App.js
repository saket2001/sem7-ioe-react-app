import React, { useEffect, useState } from "react";
import { RootNavigator } from "./Components/RootNavigator";
import { makeFetchRequest } from "./utils/fetchUtil";
import { Alert, ActivityIndicator } from "react-native";
import { Loader } from "./Components/Loader";
import { useSelector } from "react-redux";
import environment from "./environment";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const owner_data = useSelector((state) => state?.auth?.ownerData);
  console.log(owner_data.owner_id);

  useEffect(() => {
    // function for detecting any motion of pet new feeder
    const checkForMotion = async () => {
      try {
        const data = await makeFetchRequest(`${environment.API_URL}/check-motion`);

        if (!data?.isError && data?.data && data?.data === "Motion Detected") {
          console.log(data);
          // alert user via notification
          // alert("It looks like your pet wants food, \nDo you want to feed him?")
          Alert.alert(
            "Hello Owner!",
            "It looks like your pet wants food, \nDo you want to feed him?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async () => {
                  setIsLoading(true);
                  const body = {
                    owner_id: owner_data?.owner_id.toString(),
                    amountGiven: "100g",
                    date: new Date().toDateString(),
                    time: new Date().toLocaleTimeString(),
                    type_of_action: "Fed by owner",
                    food_brand: "meow meow dry food",
                    food_type: "dry",
                  };
                  const response = await makeFetchRequest(
                    "http://192.168.0.105:5000/api/v1/feed-pet",
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
                    Alert.alert("Hello Owner!", response?.message, [
                      { text: "Ok" },
                    ]);
                  }
                },
              },
            ]
          );
          // store input of user and do acc to it
        }
      } catch (err) {
        console.log(err);
      }
    };

    // function for feeding pet automatically
    const autoFeed = async (toFeed, time) => {
      try {
        if (toFeed > 0) {
          setIsLoading(true);
          // feed request
          let body = {
            owner_id: owner_data.owner_id,
            amountGiven: toFeed + "gm",
            date: new Date().toDateString(),
            time: time,
            type_of_action: "Automatic Fed",
            food_brand: "meow meow dry food",
            food_type: "dry",
          };
          const response = await makeFetchRequest(
            "http://192.168.0.105:5000/api/v1/feed-pet",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "content-type": "application/json",
              },
            }
          );

          setIsLoading(false);
          if (response && !response?.isError) {
            Alert.alert("Hello Owner!", response?.message, [{ text: "OK" }]);
          }
        }
      } catch (err) {
        console.warn("An error occurred please restart the app!")
      }
    };

    setInterval(async () => {
      checkForMotion();
    }, 5000);

    setInterval(async () => {
      // checkForMotion();

      // check time
      if (owner_data) {
        let currTime = new Date().toLocaleTimeString()?.slice(0, 5);
        let toFeed = 0;
        // 1. for morning
        if (currTime == owner_data?.morningTime?.slice(0, 5)) {
          toFeed = owner_data?.morningTime;
          await autoFeed(toFeed, owner_data?.morningTime);
        }
        // 2. for afternoon
        if (currTime == owner_data?.afternoonTime?.slice(0, 5)) {
          toFeed = owner_data?.afternoonAmount;
          await autoFeed(toFeed, owner_data?.afternoonTime);
        }
        // 3. for evening
        if (currTime == owner_data?.eveningTime?.slice(0, 5)) {
          toFeed = owner_data?.eveningTime;
          await autoFeed(toFeed, owner_data?.eveningTime);
        }
        // 4. for extra
        if (currTime === owner_data?.extraTime?.slice(0, 5)) {
          toFeed = owner_data?.extraTime;
          await autoFeed(toFeed, owner_data?.extraTime);
        }
      }
    }, 2000);
  });

  if (isLoading) {
    return <Loader text={"Feeding your pet..."} />;
  }

  return <RootNavigator />;
};
