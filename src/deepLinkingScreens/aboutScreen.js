import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import {NotificationContext} from '../../App';

const AboutScreen = ({navigation, route}) => {
  const notificationPayload = useContext(NotificationContext);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'blue'}}>About Screen</Text>

        <Text>
          {notificationPayload?.notificationPaylaod?.notification?.body ?? null}
        </Text>
        <Text>
          {notificationPayload?.notificationPaylaod?.notification?.title ??
            null}
        </Text>
        {/* <Button
          title="Press me"
          onPress={() => {
            navigation.navigate('settings');
          }}
        /> */}
      </View>
    </View>
  );
};

export default AboutScreen;
