import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  useColorScheme
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ErrorMessageComponents from '../components/ErrorMsg';
import Snackbar from 'react-native-snackbar';
import base64 from 'react-native-base64';
import User from 'react-native-vector-icons/Entypo';
import Phone from 'react-native-vector-icons/FontAwesome5';
import Email from 'react-native-vector-icons/Zocial';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useTheme} from '@react-navigation/native';

const SignUp = ({navigation}) => {
  const {colors} = useTheme();
  const DarkMode = useColorScheme() == 'dark';
  const [dark, setDark] = useState(false);

  useFocusEffect((useCallback(() => {
    setDark(DarkMode)
  }, [DarkMode])))



  //state Variables
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState();

  //error state variables
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //check state variables
  const [checkEmail, setCheckEmail] = useState(null);

  //  const a= async() => {
  //   const user = await firestore().collection('Users').get();
  //   console.log("RETURN:::::::::::",user);
  // }
  //  console.log(a());

  
  const handleRandomOtp = limit => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++) {
      OTP = OTP + digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const handleSignup = () => {
    setLoading(true);

    if (
      Boolean(name) &&
      Boolean(email) &&
      Boolean(phoneNumber) &&
      Boolean(password) &&
      !Boolean(checkEmail)
    ) {
      const randomOtp = handleRandomOtp(4);
      console.log('Random Number Generator!', randomOtp);

      firestore()
        .collection('UserDetails')
        .doc(email)
        .set({
          name: name,
          phoneNumber: phoneNumber,
          password: password,
          email: email,
          isVerified: false,
          otp: randomOtp,
        })
        .then(res => {
          setLoading(false);
          Snackbar.show({
            text: 'Otp sent successfully',
            duration: Snackbar.LENGTH_LONG,
          });
          navigation.navigate('otp', {
            otp: randomOtp,
            email: email,
            name: name,
            password:password,
            phoneNumber:phoneNumber
          });
        })
        .catch(e => {
          setLoading(false);
          Snackbar.show({
            text: 'Please Try Again',
            duration: Snackbar.LENGTH_LONG,
          });
        });
    } else {
      setLoading(false);
      handleErrorMessage();
    }
  };

  const handleErrorMessage = () => {
    setNameError(!Boolean(name));
    setEmailError(!Boolean(email));
    validate(email);
    setPhoneNumberError(!Boolean(phoneNumber));
    setPasswordError(!Boolean(password));
  };

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setCheckEmail(!reg.test(text));
  };

  return (
    <ScrollView style={{  backgroundColor: dark ? colors.card : 'white', flex: 1}}>
       <StatusBar backgroundColor={dark?colors.card:"white"} barStyle={dark?"light-content":'light-content'} />
      <View style={{marginHorizontal: 30, flex: 1, marginTop: 105}}>
        <Text style={[Styles.welcome,{color:dark?"white":"black",fontFamily:"Syne-SemiBold"}]}>Create New Acccount</Text>
        <Text style={[Styles.text,{color:dark?"white":"black"}]}>Name</Text>
        <View>
          <View style={Styles.ele}>
            <TextInput
              value={name}
              style={Styles.input}
              placeholderTextColor={dark?"gray":"black"}
              placeholder="Enter Name"
              onChangeText={item => {
                setNameError(!Boolean(item));
                setName(item);
              }}
            />
          </View>
          <View style={{position: 'absolute', top: 12, left: 8}}>
            <User name="user" size={20} color={'black'} />
          </View>
        </View>

        {nameError ? (
          <ErrorMessageComponents name="Name is required*" />
        ) : (
          <></>
        )}
        <Text style={[Styles.text,{color:dark?"white":"black"}]}>Phone Number</Text>
        <View>
          <View style={Styles.ele}>
            <TextInput
              onChangeText={item => {
                setPhoneNumberError(!Boolean(item));
                setPhoneNumber(item);
              }}
              maxLength={10}
              style={Styles.input}
              placeholder="Enter Phone Number"
              keyboardType="number-pad"
              placeholderTextColor={dark?"gray":"gray"}
            />
          </View>
          <View style={{position: 'absolute', top: 13, left: 8}}>
            <Phone name="phone-alt" size={18} color={'black'} />
          </View>
        </View>
        {phoneNumberError ? (
          <ErrorMessageComponents name="Phone number is required*" />
        ) : (
          <></>
        )}
        <Text style={[Styles.text,{color:dark?"white":"black"}]}>E-Mail</Text>
        <View>
          <View style={Styles.ele}>
            <TextInput
              onChangeText={item => {
                setEmailError(!Boolean(item));
                setEmail(item);
                validate(item);
              }}
              // onEndEditing={(event) => {
              //   console.log(event)
              //   firestore()
              //     .collection('UserDetails')
              //     .doc(email)
              //     .get()
              //     .then(res => {
              //       console.log('ON EDITING::::::::', res);
              //     });
              // }}
              style={Styles.input}
              placeholder="Enter Email"
              placeholderTextColor={dark?"gray":"gray"}
              keyboardType="email-address"
            />
          </View>
          <View style={{position: 'absolute', top: 12, left: 8}}>
            <Email name="email" size={20} color={'black'} />
          </View>
        </View>
        {emailError ? (
          <ErrorMessageComponents name="Email id is required*" />
        ) : checkEmail ? (
          <ErrorMessageComponents name="Email id is invalid" />
        ) : (
          <></>
        )}
        <Text style={[Styles.text,{color:dark?"white":"black"}]}>Password</Text>
        <View>
          <View style={Styles.ele}>
            <TextInput
              onChangeText={item => {
                setPasswordError(!Boolean(item));
                const encoding = base64.encode(item);
                console.log('CONSOLE:::::::', encoding);
                setPassword(encoding);
              }}
              secureTextEntry={true}
              style={Styles.input}
              placeholder="Enter Password"
              placeholderTextColor={dark?"gray":"gray"}
            />
          </View>
          <View style={{position: 'absolute', top: 13, left: 8}}>
            <Icon name="password" size={20} color={'black'} />
          </View>
        </View>
        {passwordError ? (
          <ErrorMessageComponents name="Password is required*" />
        ) : (
          <></>
        )}

        <TouchableOpacity
          style={Styles.login}
          onPress={() => {
            handleSignup();
          }}>
          {!loading ? (
            <Text
              style={{textAlign: 'center', fontWeight: '600', color: 'black'}}>
              Sign Up
            </Text>
          ) : (
            <ActivityIndicator size="small" color="white" />
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'flex-end',
          }}>
          <Text style={{marginHorizontal: 5, color: dark?"white":"black", marginBottom: 10}}>
            Already Registered?
          </Text>

          <Text
            style={{color: 'blue'}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Sign In
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const Styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 7,
    paddingHorizontal: 40,
  },
  ele: {
    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  login: {
    backgroundColor: '#00ff7f',
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 60,
    elevation: 5,
    marginTop: 30,
  },
  welcome: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    color: 'black',
    fontFamily:"Syne-SemiBold"
  },
  errorMessage: {
    color: 'red',
    fontWeight: '500',
    marginTop: 5,
  },
});
