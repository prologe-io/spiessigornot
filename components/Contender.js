import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Card, CardTitle } from "./Card";
import { useFirebase } from "react-redux-firebase";

export default ({ contender, onVote = () => null, title }) => {
  const firebase = useFirebase();
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    firebase
      .storage()
      .ref(`${contender.photoName}_300x300`)
      .getDownloadURL()
      .then((url) => setPhotoUrl(url))
      .catch((e) => console.log(e));
  }, []);

  return (
    <View key={contender.id}>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={onVote}>
        <Card style={{ marginBottom: 12 }}>
          {title && <CardTitle>{title}</CardTitle>}
          <CardTitle>{contender.name}</CardTitle>
          <Image
            style={{
              width: 180,
              height: 180,
            }}
            source={{ uri: photoUrl }}
          />
        </Card>
      </TouchableOpacity>
    </View>
  );
};
