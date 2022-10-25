import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../Pages/HomeScreen";
import { ProfileScreen } from "../Pages/ProfileScreen";
import { FeedScreen } from "../Pages/FeedScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { RecordsScreen } from "../Pages/RecordsScreen";
import { RegisterScreen } from "../Pages/RegisterScreen";
import { LoginScreen } from "../Pages/LoginScreen";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const tabBarOptions = {
  activeTintColor: "#000",
  style: {
    height: "10%",
  },
};

export const RootNavigator = () => {
  const isLoggedIn = useSelector((state) => state?.auth.isLoggedIn);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={tabBarOptions} initialRouteName="Login">
        {!isLoggedIn ? (
          <>
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <Icon name="unlock" color={"#000"} size={30} />
                ),
              }}
            />
            <Tab.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => <Icon name="user" color={"#000"} size={30} />,
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => <Icon name="home" color={"#000"} size={30} />,
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => <Icon name="user" color={"#000"} size={30} />,
              }}
            />
            <Tab.Screen
              name="Feed Schedule"
              component={FeedScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <Icon name="hourglass-1" color={"#000"} size={28} />
                ),
              }}
            />
            <Tab.Screen
              name="Feed Records"
              component={RecordsScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <Icon name="archive" color={"#000"} size={28} />
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
