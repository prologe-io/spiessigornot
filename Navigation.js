import React from "react";

import Constants from "expo-constants";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import Play from "./screens/Play";
import Ranking from "./screens/Ranking";
import SignIn from "./screens/SignIn";
import Upload from "./screens/Upload";
import Account from "./screens/Account";

const Tab = createBottomTabNavigator();

const color = "#2f80ed";

export default () => {
  const auth = useSelector((state) => state.firebase.auth);
  const isSignedIn = isLoaded(auth) && !isEmpty(auth);

  // small hack to only allow certain users to upload pictures
  // configure in .env with EXPO_ALLOWED_EMAILS
  const { allowedEmails = [] } = Constants.manifest.extra;

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
          component={Play}
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
