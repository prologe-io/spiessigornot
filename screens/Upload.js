import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase/app";
import { withFirebase, withFirestore } from "react-redux-firebase";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "uuid";

const getRandomNumber = () => {
  const min = Math.ceil(Number.MIN_VALUE);
  const max = Math.ceil(Number.MAX_VALUE);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

console.disableYellowBox = true;
class App extends React.Component {
  state = {
    image: "",
    uploading: false,
    name: "",
    isSubmitted: false,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image, name } = this.state;

    const isDisabled = image.length === 0 || name.length === 0;
    return (
      <View
        style={{
          backgroundColor: "pink",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {this.state.isSubmitted && (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
              marginHorizontal: 15,
            }}
          >
            Spießig successfuly added!
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <TextInput
            placeholder="Enter spießig name"
            onChangeText={(value) => this.setState({ name: value })}
            value={this.state.name}
            style={{
              height: 30,
              marginBottom: 64,
              backgroundColor: "white",
              width: "100%",
            }}
          ></TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={this._pickImage} title="Camera Roll" />
          <View style={{ height: 24 }}></View>

          <Button onPress={this._takePhoto} title="Take a photo" />
        </View>
        <TouchableOpacity
          style={!isDisabled ? styles.button : styles.buttonDisabled}
          disabled={isDisabled}
          onPress={() => this._handleImagePicked(this.state.pickerResult)}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
      </View>
    );
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.setState({ pickerResult, image: pickerResult.uri });
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this.setState({ pickerResult, image: pickerResult.uri });
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        // only able to set a single picture at the moment
        await this.props.firestore.collection("units").add({
          name: this.state.name,
          photo: uploadUrl,
          random: getRandomNumber(),
        });
        this.setState({ image: uploadUrl });
        this.setState({isSubmitted: true})
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);
  console.log(blob);

  // We're done with the blob, close and release it
  //  blob.close();

  return await snapshot.ref.getDownloadURL();
}
export default withFirestore(App);

const styles = StyleSheet.create({
  button: {
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderBottomRightRadius: 33,
    borderBottomLeftRadius: 33,
    backgroundColor: "#3366FF",
    marginTop: 24,
    marginBottom: 24,
    minWidth: 150,
    minHeight: 30,
    justifyContent: 'center'
  },
  buttonDisabled: {
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderBottomRightRadius: 33,
    borderBottomLeftRadius: 33,
    backgroundColor: "grey",
    marginTop: 24,
    marginBottom: 24,
    minWidth: 150,
    minHeight: 30,

    justifyContent: 'center'
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonContainer: {
    width: 350,
  },
});
