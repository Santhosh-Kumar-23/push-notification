import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import UploadScreen from './UploadScreen';

const Task = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#f0ffff', flex: 1}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 10,
          marginHorizontal: 60,
          borderRadius: 7,
          elevation: 10,
          marginTop: 10,
        }}
        onPress={() => {
          navigation.navigate('taskOne');
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: '700'}}>
          Task No 1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 10,
          marginHorizontal: 60,
          borderRadius: 7,
          elevation: 10,
          marginTop: 10,
        }}
        onPress={() => {
          navigation.navigate('taskTwo');
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: '700'}}>
          Task No 2
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Task;
