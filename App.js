import React, { useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { AppLoading } from "expo";
import * as firebase from "firebase";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

firebase.initializeApp({
  apiKey: "AIzaSyDzE6TjEKpqAwaCD7DUQHuu0udEe4JoRQ8",
  authDomain: "expo-firebase-auth-718eb.firebaseapp.com",
  databaseURL: "https://expo-firebase-auth-718eb.firebaseio.com",
  projectId: "expo-firebase-auth-718eb",
  storageBucket: "expo-firebase-auth-718eb.appspot.com",
  messagingSenderId: "104778066778",
  appId: "1:104778066778:web:875cbdddacd671d2046163"
});

const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // if the user has previously logged in
          navigation.navigate("Home");
        } else {
          // if the user has previously logged out from the app
          navigation.navigate("Login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <AppLoading />
}

const HomeScreen = () => {
  const handleSignout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text style={{fontSize: 17, textAlign: "center", margin: 20, }}>
        Home Screen
      </Text>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
    </View>
  )
}

const LoginScreen = () => {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: "Verification code has been sent to your phone.",
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
          onPress={() => showMessage(undefined)}>
          <Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );

}

const SwitchNavigator = createSwitchNavigator(
  {
    Initial: InitialScreen,
    Login: LoginScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: "Initial"
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default () => {
  return <AppContainer />
}
