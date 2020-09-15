import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import {  useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

export default () => {
  useFirestoreConnect(() => [
    { collection: "units"},
  ]);
  const units = useSelector(
    (state) => state.firestore.ordered.units
  );

  if (units && units.length === 0) {
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
          {units &&
            units.length > 0 &&
            units.map((item, index) => (
              <View key={item.id}>
                <Text>
                  {index + 1}. {item.name}
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
