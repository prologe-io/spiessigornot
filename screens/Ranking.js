import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

export default () => {
  useFirestoreConnect(() => [
    { collection: "spiessigItem", orderBy: ["votes", "desc"] },
  ]);
  const gegenstand = useSelector(
    (state) => state.firestore.ordered.spiessigItem
  );

  if (gegenstand && gegenstand.length === 0) {
    return "Loading";
  }

  return (
    <SafeAreaView style={styles.container}>
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
          {gegenstand &&
            gegenstand.length > 0 &&
            gegenstand.map((item, index) => (
              <View key={item.id}>
                <Text>
                  {index + 1}. {item.name} - {item.votes} votes
                </Text>
                <Image
                  style={{
                    margin: 24,
                    minWidth: 300,
                    minHeight: 300,
                    boxShadow: "1px 4px 14px -2px rgba(0, 0, 0, 0.27)",
                  }}
                  source={{ uri: item.photo }}
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
    backgroundColor: "pink",
  },
  text: {
    fontSize: 42,
  },
});
