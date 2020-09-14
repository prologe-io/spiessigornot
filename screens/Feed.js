import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

const getRandomNumber = () => {
  const min = Math.ceil(Number.MIN_VALUE);
  const max = Math.ceil(Number.MAX_VALUE);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default () => {
  const firestore = useFirestore();
  useFirestoreConnect(() => [
    { collection: "spiessigItem", orderBy: ["votes", "desc"] },
  ]);
  const gegenstand = useSelector(
    (state) => state.firestore.ordered.spiessigItem
  );

  const handleUpVote = (key, votes) => {
    firestore
      .collection("spiessigItem")
      .doc(key)
      .set({ id: key, votes: votes + 1 }, { merge: true });
  };

  const item1 = gegenstand[0];
  const item2 = gegenstand[4];
  return (
    <View>
      <Text>What is more Spiessig</Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View key={item1.id}>
          <Text>{item1.name}</Text>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: item1.photo }}
          />

          <Button
            onPress={() => handleUpVote(item1.id, item1.votes)}
            title={`✨`}
          />
        </View>
        <Text>vs</Text>
        <View key={item2.id}>
          <Text>{item2.name}</Text>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: item2.photo }}
          />

          <Button
            onPress={() => handleUpVote(item2.id, item2.votes)}
            title={`✨`}
          />
        </View>
      </View>
    </View>
  );
};
