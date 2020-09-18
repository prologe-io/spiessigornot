import React, { useState } from "react";
import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";

import Constants from "expo-constants";
import { useFirebase } from "react-redux-firebase";

import Header from "../Header";
import Input from "../Input";
import Button from "../Button";

export default () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    firebase.login({ email, password });
  };

  const signUp = async () => {
    await firebase.createUser({ email, password });
    await firebase.login({ email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.view}>
        <Input
          style={{width: '100%', marginBottom: 24 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={{width: '100%', marginBottom: 36 }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', height: 100}}>
          <Button primary onPress={signUp}>
            Sign Up
          </Button>
          <Button onPress={signIn}>Login</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    padding: 32,
  },
  text: {
    fontSize: 42,
  },
});
