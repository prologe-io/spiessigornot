import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Card, CardTitle } from "../Card";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { isLoaded, isEmpty } from "react-redux-firebase";
import firebase from "firebase/app";

import Header from "../Header";

const getRandomNumber = () => {
  const min = Math.ceil(Number.MIN_VALUE);
  const max = Math.ceil(Number.MAX_VALUE);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDocument = async () => {
  const querySnapshot = await firebase
    .firestore()
    .collection("units")
    .where("random", ">=", getRandomNumber())
    .orderBy("random")
    .limit(1)
    .get();
  let contender;
  querySnapshot.forEach((doc) => (contender = { id: doc.id, ...doc.data() }));
  return contender;
};

const Contender = ({ contender, onVote }) => {
  return (
    <View key={contender.id}>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={onVote}>
        <Card style={{ marginBottom: 12 }}>
          <CardTitle>{contender.name}</CardTitle>
          <Image
            style={{
              width: 180,
              height: 180,
            }}
            source={{ uri: contender.photo }}
          />
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export const Contenders = ({ disabled }) => {
  const firestore = useFirestore();

  const [contender1, setContender1] = useState([]);
  const [contender2, setContender2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const initContender = async () => {
      setLoading(true);

      const result1 = await getRandomDocument();
      const result2 = await getRandomDocument();
      if (result2.id === result1.id) {
        return initContender();
      }
      setContender1(result1);
      setContender2(result2);

      setLoading(false);
    };
    initContender();
  }, [round]);

  const handleVote = (winner, loser) => {
    if (disabled) {
      return;
    }
    const increment = firebase.firestore.FieldValue.increment(1);
    firestore.collection("units").doc(winner).update({ wins: increment });
    firestore.collection("units").doc(loser).update({ losses: increment });
    setRound(round + 1);
  };

  return (
    <View style={styles.contenderView}>
      {!loading && (
        <>
          <Contender
            contender={contender1}
            onVote={() => handleVote(contender1.id, contender2.id)}
          />
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
            OR
          </Text>
          <Contender
            contender={contender2}
            onVote={() => handleVote(contender2.id, contender1.id)}
          />
        </>
      )}
    </View>
  );
};

export default () => {
  const auth = useSelector(
    (state) => state.firebase.auth,
    () => false
  );

  const isSignedIn = isLoaded(auth) && !isEmpty(auth);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>What is more Spiessig?</Text>
        {!isSignedIn && (
          <Text style={styles.title}>Sign up to be able to vote</Text>
        )}

        <Contenders disabled={!isSignedIn} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  contenderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "pink",
    paddingTop: 16,
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 42,
    color: "white",
    textAlign: "center",
    paddingBottom: 32,
  },
  image: {
    height: 170,
    width: 170,
  },
  button: {
    backgroundColor: "white",
  },
});
