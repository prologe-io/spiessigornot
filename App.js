import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { Provider } from "react-redux";
import { createStore, combineReducers, compose } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";

import AppNavigation from "./Navigation";

const rrfConfig = {
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  appId,
} = Constants.manifest.extra;
console.log(projectId)
console.log(typeof projectId)

const fbConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  appId,
};

firebase.initializeApp(fbConfig);
firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};
