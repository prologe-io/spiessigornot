import React from "react";
import { View, Button } from "react-native";

export default ({ navigation }) => {
  const upload = () => {
    navigation.navigate("Upload");
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="+" onPress={upload} />
    </View>
  );
};
