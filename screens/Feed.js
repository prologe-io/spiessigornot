import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useFirebase, useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default () => {
  useFirebaseConnect("gegenstand");
  const firebase = useFirebase()
  const gegenstand = useSelector((state) => state.firebase.ordered.gegenstand);

  const handleUpVote = (key, votes) => {
    firebase.update(`gegenstand/${key}`, {votes:  votes + 1})

  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {gegenstand &&
        gegenstand.map((item, index) => (
          <View key={item.key}>
            <Text>
              {index + 1}. {item.value.name} - {item.value.votes} votes
            </Text>
            <Image
              style={{ minWidth: 100, minHeight: 100}}
              source={{
                uri: item.value.photo,
              }}
            />
            <Button onPress={() => handleUpVote(item.key, item.value.votes)} title={`✨`}/>
          </View>
        ))}
    </View>
  );
};
