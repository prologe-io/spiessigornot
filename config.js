import React from "react";

import Constants from "expo-constants";


import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { createStore, combineReducers } from "redux";

import { Provider } from "react-redux";

import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";

import { createFirestoreInstance, firestoreReducer } from "redux-firestore";


const rrfConfig = {
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  appId,
} = Constants.manifest.extra;

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

export default ({ children }) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      {children}
    </ReactReduxFirebaseProvider>
  </Provider>
);
