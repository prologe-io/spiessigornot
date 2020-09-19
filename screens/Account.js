import React from "react";
import { View} from "react-native";
import { Text } from "react-native";
import { useFirebase } from "react-redux-firebase";
import Button from '../Button'

export default () => {
  const firebase = useFirebase();
  const handleLogout = () => {
    firebase.logout();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={handleLogout}>
        <Text>Log out</Text>
      </Button>
    </View>
  );
};
