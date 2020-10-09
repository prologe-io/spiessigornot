import React from "react";

import { Text } from "react-native";

import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";

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

const NavItem = ({ children, icon }) => (
  <LinearGradient
    colors={["#6454FA", "#7062FB"]}
    start={[0.45, 0.0]}
    end={[0.9, 1.0]}
    style={{
      borderRadius: 13,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      flexDirection: "row",
    }}
  >
    {icon}
    {children && (
      <Text style={{ marginLeft: 6, color: "white", fontWeight: "bold" }}>
        {children}
      </Text>
    )}
  </LinearGradient>
);

const ICON_SIZE = 16;
export default () => {
  const auth = useSelector((state) => state.firebase.auth);
  const isSignedIn = isLoaded(auth) && !isEmpty(auth);

  // small hack to only allow certain users to upload pictures
  // configure in .env with EXPO_ALLOWED_EMAILS
  const { allowedEmails = [] } = Constants.manifest.extra;

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: { height: 70, backgroundColor: "white" },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <NavItem
                icon={
                  <FontAwesome name="list" size={ICON_SIZE} color="white" />
                }
              >
                {focused && "Ranking"}
              </NavItem>
            ),
          }}
          name="Ranking"
          component={Ranking}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <NavItem
                icon={
                  <AntDesign name="play" size={ICON_SIZE} color={"white"} />
                }
              >
                {focused && "Play"}
              </NavItem>
            ),
          }}
          name="Play"
          component={Play}
        />
        {isSignedIn && allowedEmails.includes(auth.email) && (
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <NavItem
                  icon={
                    <AntDesign name="camera" size={ICON_SIZE} color={"white"} />
                  }
                >
                  {focused && "Submit"}
                </NavItem>
              ),
            }}
            name="Submit"
            component={Upload}
          />
        )}
        {!isSignedIn && (
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <NavItem
                  icon={
                    <MaterialCommunityIcons
                      name="face-profile"
                      size={ICON_SIZE}
                      color={"white"}
                    />
                  }
                >
                  {focused && "Login"}
                </NavItem>
              ),
            }}
            name="Login"
            component={SignIn}
          />
        )}
        {isSignedIn && (
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <NavItem
                  icon={
                    <MaterialCommunityIcons
                      name="face-profile"
                      size={ICON_SIZE}
                      color={"white"}
                    />
                  }
                >
                  {focused && "Account"}
                </NavItem>
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
