import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';

const Otp = ({route, navigation}) => {
  let otpInput = useRef(null);
  const [userTypedOtp, setUserTypedOtp] = useState(null);

  const otpp = route.params.otp;
  const email = route.params.email;
  const namee = route.params.name;
  const passwordd = route.params.password;
  const phoneNumberr = route.params.phoneNumber;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black', fontSize: 20, fontWeight: '800',marginBottom:20}}>
          Enter <Text style={{color: 'blue'}}>OTP</Text>
        </Text>
        <Image
          source={require('../assets/ttp.jpg')}
          style={{height: 300, width: '100%'}}
        />
        
        <Text style={{fontWeight: '800', marginTop: 10}}>
          We sent OTP code to verify your number
        </Text>
        <OTPTextInput
          // defaultValue={"1111"}
          inputCellLength={1}
          offTintColor={'gray'}
          tintColor={'blue'}
          ref={e => (otpInput = e)}
          handleTextChange={itme => {
            setUserTypedOtp(itme);
            console.log(itme);
          }}></OTPTextInput>
        <Text style={{marginTop: 10, color: 'black', fontWeight: '700'}}>
          {otpp}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 10,
            paddingHorizontal: 40,
            marginTop: 20,
          }}
          onPress={() => {
            if (userTypedOtp == otpp) {

              // firestore().collection('UserDetails').doc(email).set({
              //   name: namee,
              //   phoneNumber: phoneNumberr,
              //   password: passwordd,
              //   email: email,
              // });

              firestore()
                .collection('UserDetails')
                .doc(email)
                .update({
                  // name: namee,
                  // phoneNumber: phoneNumberr,
                  // password: passwordd,
                  // email: email,
                  isVerified: true,
                  otp: otpp,
                })
                .then(() => {
                  console.log('verified true');
                });
              navigation.navigate('Login');
              Snackbar.show({
                text: 'You have succssfully created account',
                duration: Snackbar.LENGTH_LONG,
              });
            } else {
              Snackbar.show({
                text: 'Please enter valid otp',
                duration: Snackbar.LENGTH_LONG,
              });
            }
          }}>
          <Text style={{color: 'white', fontWeight: '700'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;
