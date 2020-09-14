import React from "react";
import { View, Text, Image, Button, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from 'expo-constants';


const getRandomNumber = () => {
  const min = Math.ceil(Number.MIN_VALUE);
  const max = Math.ceil(Number.MAX_VALUE);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default () => {
  const firestore = useFirestore();
  useFirestoreConnect(() => [
    { collection: "spiessigItem", orderBy: ["votes", 'desc'] },
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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {gegenstand &&
        gegenstand.length > 0 &&
        gegenstand.map((item, index) => (
          <View key={item.id}>
            <Text>
              {index + 1}. {item.name} - {item.votes} votes
            </Text>
            <Image
              style={{ minWidth: 100, minHeight: 100 }}
              source={{ uri: item.photo }}
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

