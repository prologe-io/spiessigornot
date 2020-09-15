import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { isLoaded, isEmpty } from "react-redux-firebase";

const getRandomNumber = () => {
  const min = Math.ceil(Number.MIN_VALUE);
  const max = Math.ceil(Number.MAX_VALUE);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const Contender = () => {
  const firestore = useFirestore();
  const [contender, setContender] = useState({});

  useEffect(() => {
    const getRandomDocument = async () => {
      const querySnapshot = await firestore
        .collection("units")
        .where("random", ">=", getRandomNumber())
        .orderBy("random")
        .limit(1)
        .get();
      let contender;
      querySnapshot.forEach((doc) => (contender = doc.data()));
      setContender(contender);
    };
    getRandomDocument();
  }, []);

  const contenders = [contender];
  return (
    <View style={styles.scrollView}>
      {contenders.map((contender) => {
        return (
          <View key={contender.id} style={{ minHeight: 200 }}>
            <TouchableOpacity>
              <Image style={styles.image} source={{ uri: contender.photo }} />

              <Text style={styles.text}>{contender.name || "unamed"}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
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
        <Contender />

        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 24 }}>OR</Text>
        <Contender />
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
    textAlign: 'center'
  },
  title: {
    fontSize: 42,
    color: "white",
  },
  image: {
    height: 150,
    width: 150,
  },
  button: {
    backgroundColor: "white",
  },
});
