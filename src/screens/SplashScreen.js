import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {



  useEffect(async () => {
    const user = await AsyncStorage.getItem('user');
    if (Boolean(user)) {
      setTimeout(() => {
        navigation.navigate('home', {
          screen: 'home',
          params: {data: JSON.parse(user)},
        });
       
      }, 2000);

    } else {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    }
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 30,
          marginTop: 40,
        }}>
        welcome to my app
      </Text>
      <Image
        source={require('../assets/car.jpg')}
        style={{height: '100%', width: '100%'}}
      />
    </View>
  );
};

export default Splash;
