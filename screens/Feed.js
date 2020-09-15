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
import { isLoaded, isEmpty } from "react-redux-firebase";

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

  const auth = useSelector(
    (state) => state.firebase.auth,
    () => false
  );

  const gegenstand = useSelector(
    (state) => state.firestore.ordered.spiessigItem
  );

  const handleUpVote = (key, votes) => {
    firestore
      .collection("spiessigItem")
      .doc(key)
      .set({ id: key, votes: votes + 1 }, { merge: true });
  };

  const isSignedIn = isLoaded(auth) && !isEmpty(auth);
  const item1 = gegenstand[0];
  const item2 = gegenstand[4];

  if (!isSignedIn) {
    return <Text>Sign In to be able to vote</Text>;
  }
  return (
    <View style={styles.scrollView}>
      <Text style={styles.title}>What is more Spiessig</Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ minHeight: 200 }}>
          <Image style={styles.image} source={{ uri: item1.photo }} />

          <Text style={styles.text}>{item1.name || "unamed"}</Text>
          <Button
            onPress={() => handleUpVote(item1.id, item1.votes)}
            title={`✨This is Spießig!✨`}
          />
        </View>
        <Text style={{ color: "white" }}>OR</Text>

        <View style={{ minHeight: 200 }}>
          <Image style={styles.image} source={{ uri: item2.photo }} />

          <Text style={styles.text}>{item2.name || "unamed"}</Text>
          <Button
            onPress={() => handleUpVote(item2.id, item2.votes)}
            title={`✨This is Spießig!✨`}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    flex: 1,
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 42,
    color: "white",
  },
  image: {
    height: 150,
    width: 150,
  },
});
