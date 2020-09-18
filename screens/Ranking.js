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
import { Card, CardTitle } from "../Card";

import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

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
            units.map((item, index) => (
              <Card style={{ marginBottom: 12 }} key={item.id}>
                <CardTitle>
                  {index + 1}. {item.name}
                </CardTitle>
                <Image
                  style={{
                    minWidth: 300,
                    minHeight: 300,
                  }}
                  source={{ uri: item.photo }}
                />
              </Card>
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
    backgroundColor: "pink",
    paddingTop: 16,
  },
  text: {
    fontSize: 42,
  },
});
