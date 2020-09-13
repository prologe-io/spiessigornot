import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default () => {
  const firestore = useFirestore();
  useFirestoreConnect(() => [
    { collection: "spiessigItem", orderBy: ["votes"]},
  ]);
  const gegenstand = useSelector(
    (state) => state.firestore.ordered.spiessigItem
  );

  const handleUpVote = (key, votes) => {
    firestore
      .collection("spiessigItem")
      .doc(key)
      .set({ id: key, votes: votes + 1 }, {merge: true});
  };

  console.log(gegenstand)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {gegenstand &&
        gegenstand.map((item, index) => (
          <View key={item.id}>
            <Text>
              {index + 1}. {item.name} - {item.votes} votes
            </Text>
            <Image
              style={{ minWidth: 100, minHeight: 100 }}
              source={{uri: item.photo}}
            />
            <Button
              onPress={() => handleUpVote(item.id, item.votes)}
              title={`✨`}
            />
          </View>
        ))}
    </View>
  );
};
