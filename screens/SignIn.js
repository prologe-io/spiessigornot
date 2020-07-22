import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

import { useFirebase } from "react-redux-firebase";

import * as Facebook from 'expo-facebook';

export default ({ navigation }) => {
  const firebase = useFirebase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    firebase.login({email, password});
  }

  const signInFacebook = async () => {
    const data = await Facebook.logInWithReadPermissionsAsync('282533162846455', { permissions: ['public_profile', 'email'] })

    if (data.type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(data.token)
      await firebase.login({ credential })
    }
  }

  const signUp = () => {
    navigation.navigate('Sign Up');
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign In with Facebook" onPress={signInFacebook} />
      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
}
