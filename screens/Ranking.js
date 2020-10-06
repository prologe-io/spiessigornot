import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Header from "../components/Header";

import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

import Contender from "../components/Contender";
import Background from "../components/Background";

export default () => {
  useFirestoreConnect(() => [
    { collection: "units", orderBy: ["wins", "desc"] },
  ]);
  const units = useSelector((state) => state.firestore.ordered.units);

  if (units && units.length === 0) {
    return "Loading";
  }

  return (
    <Background>
      <Header>Top 20</Header>
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
              <View key={contender.id}>
                <Contender
                  contender={contender}
                  title={
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#BDBDBD",
                        fontStyle: "italic",
                      }}
                    >
                      #{index + 1}
                    </Text>
                  }
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 16,
  },
});
