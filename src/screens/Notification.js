import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import UploadScreen from './UploadScreen';

const Notification = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"blue"}}>Notification Screen</Text>
        {/* <UploadScreen /> */}
      </View>
    </View>
  );
};

export default Notification;
