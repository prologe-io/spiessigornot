import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppLoading } from "expo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import Feed from "./screens/Feed";
import Ranking from "./screens/Ranking";
import SignIn from "./screens/SignIn";
import Upload from "./screens/Upload";

const Tab = createBottomTabNavigator();

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
        <Tab.Screen name="Ranking" component={Ranking} />
        <Tab.Screen name="Play" component={Feed} />
        {isSignedIn && allowedEmails.includes(auth.email) && (
          <Tab.Screen name="Submit" component={Upload} />
        )}
        {!isSignedIn && <Tab.Screen name="Login" component={SignIn} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
