import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { AppLoading } from "expo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import Feed from "./screens/Feed";
import Ranking from "./screens/Ranking";
import SignIn from "./screens/SignIn";
import Upload from "./screens/Upload";
import Account from "./screens/Account";

const Tab = createBottomTabNavigator();

const color = "#2f80ed";

export default () => {
  const auth = useSelector(
    (state) => state.firebase.auth,
    () => false
  );
  const profile = useSelector((state) => state.firebase.profile);
  const isSignedIn = isLoaded(auth) && !isEmpty(auth);

  if (!isLoaded(auth)) {
    return <AppLoading />;
  }

  if (isSignedIn && !isLoaded(profile)) {
    return <AppLoading />;
  }
  const allowedEmails = [
    "ben@prologe.io",
    "laurent@prologe.io",
    "alex@prologe.io",
  ];

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <FontAwesome name="list" size={24} color={color} />
            ),
          }}
          name="Ranking"
          component={Ranking}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => <AntDesign name="play" size={24} color={color} />,
          }}
          name="Play"
          component={Feed}
        />
        {isSignedIn && allowedEmails.includes(auth.email) && (
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <AntDesign name="camera" size={24} color={color} />
              ),
            }}
            name="Submit"
            component={Upload}
          />
        )}
        {!isSignedIn && (
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="face-profile"
                  size={24}
                  color={color}
                />
              ),
            }}
            name="Login"
            component={SignIn}
          />
        )}
        {isSignedIn && (
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="face-profile"
                  size={24}
                  color={color}
                />
              ),
            }}
            name="Account"
            component={Account}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
