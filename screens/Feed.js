import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default () => {
  const firestore = useFirestore();
  useFirestoreConnect(() => [{ collection: "spiessigItem" }]);
  const gegenstand = useSelector(
    (state) => state.firestore.ordered.spiessigItem
  );

  const handleUpVote = (key, votes) => {
    firestore
      .collection("spiessigItem")
      .doc(key)
      .update({ votes: votes + 1 });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {gegenstand &&
        gegenstand.map((item, index) => (
          <View key={item.key}>
            <Text>
              {index + 1}. {item.name} - {item.votes} votes
            </Text>
            <Image
              style={{ minWidth: 100, minHeight: 100 }}
              source={item.photo}
            />
            <Button
              onPress={() => handleUpVote(item.key, item.votes)}
              title={`✨`}
            />
          </View>
        ))}
    </View>
  );
};
