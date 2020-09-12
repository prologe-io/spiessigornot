import React from "react";
import { View, Text, Image } from "react-native";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default () => {
  useFirebaseConnect("gegenstand");
  const gegenstand = useSelector((state) => state.firebase.ordered.gegenstand);
  console.log(gegenstand);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {gegenstand &&
        gegenstand.map((item, index) => (
          <View key={item.key}>
            <Text>
              {index + 1}. {item.value.name}
            </Text>
            <Image
              style={{ minWidth: 100, minHeight: 100}}
              source={{
                uri: item.value.photo,
              }}
            />
          </View>
        ))}
    </View>
  );
};
