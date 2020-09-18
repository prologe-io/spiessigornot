import React from "react";
import { View, Button } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFirebase } from "react-redux-firebase";

export default () => {
  const firebase = useFirebase();
  const handleLogout = () => {
    firebase.logout();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};
