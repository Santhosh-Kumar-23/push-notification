import React, {useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  Linking,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Camera from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

const UploadScreen = ({email = '', profileImage = ''}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [retrive, setRetrive] = useState(null);

  console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKK', retrive);

  const panelRef = useRef(null);

  const selectLibrary = () => {
    const options = {
      maxWidth: 1000,
      maxHeight: 2000,
    };

    launchImageLibrary(options, response => {
      console.log('RESPONSE:::::::', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('URIIIII:::::', source);
        uploadImage(source);
        console.log('IMAGE::::', image);
      }
    });
  };

  const selectImage = () => {
    const options = {
      maxWidth: 1000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      console.log('RESPONSE:::::::', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('URIIIII:::::', source);
        uploadImage(source);
        console.log('IMAGE::::', image);
      }
    });
  };

  const uploadImage = async image => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    // setTransferred(0);
    // Using storage from Firebase you can trigger the image upload
    //It is important to note that the filename has to be passed as a reference as well as the image URI using putFile in the order described below.
    const task = storage().ref(filename).putFile(uploadUri);
    console.log('TASK:::::::::::', task);
    //return response
    task.on('state_changed', snapshot => {
      setUploading(false);
      console.log('IMAGE UPLOAD RETURNED REPOSNDE::::', snapshot);

      // setTransferred(
      //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      // );
    });

    //state full fill agura varaikum wait pannum
    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);

    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const url = await storage().ref(filename).getDownloadURL();
            console.log('DOWNLOAD URL:::::', url);

            // here

            firestore()
              .collection('UserDetails')
              .doc(email)
              .update({
                profile: url,
              })
              .then(() => {
                console.log('User updated!');
              });

            Snackbar.show({
              text: 'Upload Successfully',
              duration: Snackbar.LENGTH_LONG,
            });

            setRetrive(url);
          },
        },
      ],
    );

    setImage(null);
  };

  const modal = () => {
    return (
      <BottomSheet
        isOpen={false}
        sliderMinHeight={0}
        ref={ref => (panelRef.current = ref)}>
        {onScrollEndDrag => (
          <View onScrollEndDrag={onScrollEndDrag}>
            <Text style={{color: 'black', fontWeight: '800'}}>
              Profile photo
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.bootomIcon, {marginHorizontal: 40}]}
                onPress={() => {
                  selectImage();
                  panelRef.current.togglePanel();
                }}>
                <Camera name="camera" size={20} color={'black'} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bootomIcon}
                onPress={() => {
                  selectLibrary();
                  panelRef.current.togglePanel();
                }}>
                <Camera name="image" size={20} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </BottomSheet>
    );
  };

  const profile = () => {
    return (
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => {
          panelRef.current.togglePanel();
        }}>
        {Boolean(retrive) ? (
          <>
            <Image
              source={{uri: Boolean(retrive) ? retrive : profileImage}}
              style={{height: 100, width: 100, borderRadius: 170}}
            />
            <View style={styles.progressBarContainer}>
              {/* <Progress.Bar progress={transferred} size={100} width={20} /> */}
            </View>
          </>
        ) : (
          <Image
            source={require('../assets/profile.png')}
            style={{height: 100, width: 100, borderRadius: 170}}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {profile()}
      {modal()}
    </View>
  );
};
export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f0ffff',
    flex:1,
    // paddingBottom: 400,
  },
  bootomIcon: {
    borderRadius: 170,
    backgroundColor: '#f0ffff',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginVertical: 15,
  },
  selectButton: {
    // borderRadius: 170,
    width: 100,
    // height: 100,
  },
  uploadButton: {
    borderRadius: 10,
    width: 170,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});
