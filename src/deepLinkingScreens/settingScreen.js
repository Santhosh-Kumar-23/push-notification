import React, {useContext} from 'react';
import {Button, Text, View} from 'react-native';
import {NotificationContext} from '../../App';

const SettingsScreen = ({navigation, route}) => {
  const notificationPayload = useContext(NotificationContext);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'blue'}}>Settings Screen</Text>
        <Button
          title="Press me"
          onPress={() => {
            navigation.navigate('about');
          }}
        />
        <Text>
          {notificationPayload?.notificationPaylaod?.notification?.body ?? null}
        </Text>
        <Text>
          {notificationPayload?.notificationPaylaod?.notification?.title ??
            null}
        </Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
