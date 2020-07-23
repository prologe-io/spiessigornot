import React, { useState, useEffect } from "react";
import { View, Image, Button } from "react-native";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { useFirebase } from 'react-redux-firebase'

export default () => {
  const [ hasImageBeenPicked, setHasImageBeenPicked ] = useState(false);
  const [ imageUri, setImageUri ] = useState();
  const firebase = useFirebase();

  useEffect(() => {
    const pickImage = async () => {
      // Ask for camera roll permissions
      await Permissions.askAsync(Permissions.CAMERA_ROLL);

      // Launch camera roll image picker
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      // Set image URI
      if (!pickerResult.cancelled) {
        setImageUri(pickerResult.uri);
      }
    }

    pickImage();
  }, [])

  const upload = (uri) => {

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUri &&
        <>
          <Image source={{uri: imageUri}} style={{ width: '80%', height: undefined, aspectRatio: 4/3 }} />
          <Button title="Upload" onPress={() => upload(imageUri)} />
        </>
      }
    </View>
  );
};
