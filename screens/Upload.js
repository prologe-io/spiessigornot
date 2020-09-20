import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase/app";
import { constants, withFirebase, withFirestore } from "react-redux-firebase";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import Constants from "expo-constants";
import uuid from "uuid";
import Input from "../Input";
import CustomButton from "../Button";
import Header from "../Header";

const getRandomNumber = () => {
  const min = Math.ceil(Number.MIN_VALUE);
  const max = Math.ceil(Number.MAX_VALUE);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

console.disableYellowBox = true;
const initialState = {
  image: "",
  uploading: false,
  name: "", // the human readable name of the item
  isSubmitted: false,
  id: "", // uuid that will be used as a file name
};

export const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class App extends React.Component {
  state = initialState;

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image, name } = this.state;

    const readyToUpload = image?.length > 0 && name?.length > 0;

    if (this.state.isSubmitted) {
      return (
        <View
          style={{
            backgroundColor: "pink",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
              marginHorizontal: 15,
            }}
          >
            Boom!
          </Text>
          <CustomButton primary onPress={() => this.setState(initialState)}>
            Add another item
          </CustomButton>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <Header />

        <Text style={styles.title}>Upload Spießig Gegenstand</Text>
        <DismissKeyboard>
          <View style={styles.content}>
            <Input
              placeholder="Enter spießig name"
              onChangeText={(value) => this.setState({ name: value })}
              value={this.state.name}
              style={{ width: "100%", marginBottom: 36 }}
            ></Input>

            <View style={styles.buttonContainer}>
              <CustomButton primary onPress={this._pickImage} style={{minWidth: 96, minHeight: 60 }}>
                <Ionicons primary name="md-photos" size={36} color="white" />
              </CustomButton>
              <View style={{ height: 24 }}></View>

              <CustomButton primary onPress={this._takePhoto} style={{minWidth: 96}}>
                <AntDesign name="camera" size={36} color={"white"} />
              </CustomButton>
            </View>

            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}

            {readyToUpload && (
              <CustomButton
                primary
                onPress={() => this._handleImagePicked(this.state.pickerResult)}
              >
                Submit
              </CustomButton>
            )}
            <StatusBar barStyle="default" />
          </View>
        </DismissKeyboard>
      </SafeAreaView>
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
          marginBottom: 30,
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
        const uploadUrl = await this.uploadImageAsync(pickerResult.uri);
        // only able to set a single picture at the moment
        await this.props.firestore.collection("units").add({
          name: this.state.name,
          photo: uploadUrl,
          random: getRandomNumber(),
          photoName: this.state.id,
        });
        this.setState({ image: uploadUrl });
        this.setState({ isSubmitted: true });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };

  uploadImageAsync = async (uri) => {
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

    const uniqueId = uuid.v4();
    this.setState({ id: uniqueId });
    const ref = firebase.storage().ref().child(uniqueId);
    const snapshot = await ref.put(blob);
    console.log(blob);

    // We're done with the blob, close and release it
    //  blob.close();

    return await snapshot.ref.getDownloadURL();
  };
}
export default withFirestore(App);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    width: "100%",
    color: "#262627",
    textAlign: "center",
    paddingTop: 8,
    backgroundColor: "rgb(242, 242, 242)",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    //
  },
  content: {
    backgroundColor: "pink",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
});
