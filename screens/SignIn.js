import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import Constants from "expo-constants";
import { useFirebase } from "react-redux-firebase";

import Header from "../Header";
import Input from "../Input";
import Button from "../Button";
import { DismissKeyboard } from "./Upload";

export default () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    await firebase.login({ email, password });
  };

  const signUp = async () => {
    setLoading(true);
    await firebase.createUser({ email, password });
    await firebase.login({ email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <DismissKeyboard>
        <View style={styles.view}>
          <Input
            style={{ width: "100%", marginBottom: 24 }}
            placeholder="Email"
            autoCompleteType="email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={{ width: "100%", marginBottom: 36 }}
            autoCompleteType="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              height: 100,
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Button disabled={loading} primary onPress={signUp}>
                  Sign Up
                </Button>
                <Button disabled={loading} onPress={signIn}>
                  Login
                </Button>
              </>
            )}
          </View>
        </View>
      </DismissKeyboard>
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
