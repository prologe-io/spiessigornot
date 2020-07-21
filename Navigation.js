import React from "react";
import { View } from "react-native";
import { AppLoading } from "expo";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import Feed from "./screens/Feed";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

const Stack = createStackNavigator();

export default () => {
  const auth = useSelector(
    (state: any) => state.firebase.auth,
    () => false
  );
  const profile = useSelector((state) => state.firebase.profile);
  const isSignedIn = isLoaded(auth) && !isEmpty(auth);

  if (isSignedIn && !isLoaded(profile)) {
    return <AppLoading />
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Feed" component={Feed} />
          </>
        ) : (
          <>
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
