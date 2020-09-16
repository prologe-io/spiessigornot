import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { isLoaded, isEmpty } from "react-redux-firebase";
import firebase from "firebase/app";

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

const Contender = ({ contender }) => {
  return (
    <View key={contender.id}>
      <TouchableOpacity>
        <Image style={styles.image} source={{ uri: contender.photo }} />

        <Text style={styles.text}>{contender.name || "unamed"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Contenders = () => {
  const [contender1, setContender1] = useState([]);
  const [contender2, setContender2] = useState([]);

  useEffect(() => {
    const initContender = async () => {
      const result1 = await getRandomDocument();
      const result2 = await getRandomDocument();
      if (result2.id === result1.id) {
        return initContender();
      }
      setContender1(result1);
      setContender2(result2);
    };
    initContender();
  }, []);

  return (
    <View style={styles.contenderView}>
      <Contender contender={contender1} />
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
        OR
      </Text>
      <Contender contender={contender2} />
    </View>
  );
};

export default () => {
  const auth = useSelector(
    (state) => state.firebase.auth,
    () => false
  );

  const isSignedIn = isLoaded(auth) && !isEmpty(auth);

  if (!isSignedIn) {
    return <Text>Sign In to be able to vote</Text>;
  }

  return (
    <SafeAreaView style={styles.scrollView}>
      <Text style={styles.title}>What is more Spiessig?</Text>
      <Contenders />
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
    flexDirection: "row",
  },
  scrollView: {
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
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
    height: 170,
    width: 170,
  },
  button: {
    backgroundColor: "white",
  },
});
