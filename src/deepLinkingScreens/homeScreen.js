import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'blue'}}>Home Screen</Text>
        <Button
          title="Press me"
          onPress={() => {
            navigation.navigate('settings');
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
