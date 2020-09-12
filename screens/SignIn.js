import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

import { useFirebase } from "react-redux-firebase";


export default () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    firebase.login({email, password});
  }


  const signUp = async () => {
    await firebase.createUser({email, password});
    await firebase.login({email, password});
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
      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
}
