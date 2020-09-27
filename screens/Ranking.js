import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import Header from "../Header";

import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { Contender } from "./Feed";

export default () => {
  useFirestoreConnect(() => [
    { collection: "units", orderBy: ["wins", "desc"] },
  ]);
  const units = useSelector((state) => state.firestore.ordered.units);

  if (units && units.length === 0) {
    return "Loading";
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {units &&
            units.length > 0 &&
            units.map((contender, index) => (
              <View co={console.log(contender)}key={contender.id}>
                <Contender
                  contender={contender}
                  title={
                    <Text style={{ fontSize: 18, color: "#BDBDBD", fontStyle: 'italic' }}>
                      #{index + 1}
                    </Text>
                  }
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    paddingTop: 16,
  },
  text: {
    fontSize: 42,
  },
});
