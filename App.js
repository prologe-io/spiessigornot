import React, { useEffect, useState } from "react";
import { View } from "react-native";

import * as firebase from "firebase";
import * as Facebook from 'expo-facebook';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';

import AppNavigation from "./Navigation";

const rrfConfig = {
  userProfile: 'users'
};

const fbConfig = {
  apiKey: "AIzaSyDzE6TjEKpqAwaCD7DUQHuu0udEe4JoRQ8",
  authDomain: "expo-firebase-auth-718eb.firebaseapp.com",
  databaseURL: "https://expo-firebase-auth-718eb.firebaseio.com",
  projectId: "expo-firebase-auth-718eb",
  storageBucket: "expo-firebase-auth-718eb.appspot.com",
  messagingSenderId: "104778066778",
  appId: "1:104778066778:web:875cbdddacd671d2046163"
};

firebase.initializeApp(fbConfig);

Facebook.initializeAsync('282533162846455')

const rootReducer = combineReducers({
  firebase: firebaseReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

export default () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AppNavigation />
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
