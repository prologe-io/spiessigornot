import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Card, CardTitle } from "../Card";
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { isLoaded, isEmpty } from "react-redux-firebase";
import firebase from "firebase/app";

import Header from "../Header";
import Button from "../Button";

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

export const Contender = ({ contender, onVote = () => null, title }) => {
  const firebase = useFirebase();
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    firebase
      .storage()
      .ref(`${contender.photoName}_300x300`)
      .getDownloadURL()
      .then((url) => setPhotoUrl(url))
      .catch((e) => console.log(e));
  });

  return (
    <View key={contender.id}>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={onVote}>
        <Card style={{ marginBottom: 12 }}>
          {title && <CardTitle>{title}</CardTitle>}
          <CardTitle>{contender.name}</CardTitle>
          <Image
            style={{
              width: 180,
              height: 180,
            }}
            source={{ uri: photoUrl }}
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
  const navigation = useNavigation();

  const isSignedIn = isLoaded(auth) && !isEmpty(auth);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.main}>
        <Text style={styles.title}>what is more spießig?</Text>
        {!isSignedIn && (
          <Button
            style={{ maxWidth: 250 }}
            onPress={() => navigation.navigate("Login")}
            primary
          >
            Register to vote
          </Button>
        )}

        {isSignedIn && <Contenders disabled={!isSignedIn} />}
      </View>
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
  main: {
    height: "100%",
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: 'center',
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 30,
    width: '100%',
    color: "#262627",
    textAlign: "center",
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "rgb(242, 242, 242)",
    marginBottom: 32,
  },
  image: {
    height: 170,
    width: 170,
  },
});
