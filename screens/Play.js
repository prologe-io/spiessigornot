import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import Constants from "expo-constants";

import firebase from "firebase/app";

import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { useFirestore, isLoaded, isEmpty } from "react-redux-firebase";

import Contender from "../components/Contender";
import Header from "../components/Header";
import Button from "../components/Button";

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

e;
export const Contenders = ({ disabled }) => {
  const firestore = useFirestore();

  const [contender1, setContender1] = useState([]);
  const [contender2, setContender2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const initContender = async () => {
      setLoading(true);

      try {
        const result1 = await getRandomDocument();
        const result2 = await getRandomDocument();
        if (!result1) {
          return initContender();
        }
        if (!result2) {
          return initContender();
        }

        if (result2.id === result1.id) {
          return initContender();
        }
        setContender1(result1);
        setContender2(result2);
      } catch (e) {
        console.log(e);
      }

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
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <Contender
            contender={contender1}
            onVote={() => handleVote(contender1.id, contender2.id)}
          />
          <Text style={{ fontSize: 18 }}>OR</Text>
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
  const navigation = useNavigation();

  const isSignedIn = isLoaded(auth) && !isEmpty(auth);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Text style={styles.title}>what's more spießig?</Text>
        {!isSignedIn && (
          <Button
            style={{ maxWidth: 250, margin: "auto" }}
            onPress={() => navigation.navigate("Login")}
            primary
          >
            Register to vote
          </Button>
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
    height: "100%",
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 18,
    width: "100%",
    color: "#262627",
    textAlign: "center",
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: "rgb(242, 242, 242)",
  },
  image: {
    height: 170,
    width: 170,
  },
});
