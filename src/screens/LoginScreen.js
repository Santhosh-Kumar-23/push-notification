import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  useColorScheme,
  StatusBar
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import base64 from 'react-native-base64';
import ErrorMessageComponents from '../components/ErrorMsg';
import {useFocusEffect,useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/Zocial';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {colors} = useTheme();
  const DarkMode = useColorScheme() == 'dark';//retrun true or false
  const [dark, setDark] = useState(false);
  console.log("AAAAAAAAAAAA",dark)

  useFocusEffect((useCallback(() => {
    setDark(DarkMode)
  }, [DarkMode])))
 
  



  //state variables
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userDetails, setUserDetails] = useState('');
  const [loading, setLoading] = useState(false);

  //error variables
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //check error variabls
  const [checkEmail, setCheckEmail] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
    }, []),
  );

  const handleRandomOtp = limit => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++) {
      OTP = OTP + digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const onLinkClick = () => {
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    if (Boolean(email) && Boolean(password) && !Boolean(checkEmail)) {
      setLoading(true);
      firestore()
        .collection('UserDetails')
        // Filter results
        .where('email', '==', email)
        .where('password', '==', password)
        .get()
        .then(async querySnapshot => {
          setLoading(false);
          if (querySnapshot.docs[0]) {
            setUserDetails(querySnapshot.docs[0]._data);

            const response = querySnapshot.docs[0]._data;
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', response);

            await AsyncStorage.setItem('user', JSON.stringify(response));

            

            if (querySnapshot.docs[0]._data?.isVerified) {
              navigation.navigate('home', {
                screen: 'home',
                params: {data: querySnapshot.docs[0]._data},
              });
            } else {
              const randomOtp = handleRandomOtp(4);
              //update otp
              firestore()
                .collection('UserDetails')
                .doc(email)
                .set({
                  otp: randomOtp,
                  name: querySnapshot.docs[0]._data?.name,
                  phoneNumber: querySnapshot.docs[0]._data?.phoneNumber,
                  password: querySnapshot.docs[0]._data?.password,
                  email: email,
                })
                .then(res => {
                  navigation.navigate('otp', {
                    otp: querySnapshot.docs[0]._data.otp,
                    email: querySnapshot.docs[0]._data.email,
                    otp: randomOtp,
                  });
                });
            }
          } else {
            setLoading(false);
            Snackbar.show({
              text: 'Email or Password incorrect',
              duration: Snackbar.LENGTH_LONG,
            });
          }
          setLoading(false);
        });
    } else {
      handleError();
    }
  };

  const handleError = () => {
    setEmailError(!Boolean(email));
    setPasswordError(!Boolean(password));
    validate(email);
  };

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setCheckEmail(!reg.test(text));
  };

  const handleEmailField = () => {
    return (
      <>
        <Text style={[Styles.text,{color:dark?"white":"#696969"}]}>E-Mail</Text>
        <View>
          <View
            style={{elevation: 5, borderRadius: 8, backgroundColor: 'white'}}>
            <TextInput
              onChangeText={item => {
                setEmail(item);
                setEmailError(!Boolean(item));
                validate(item);
              }}
              style={Styles.input}
              placeholder="Enter Email"
              placeholderTextColor={dark?"gray":"black"}
              keyboardType="email-address"
            />
          </View>
          <View style={{position: 'absolute', top: 10, left: 8}}>
            <Iconn name="email" size={25} color={'black'} />
          </View>
        </View>
      </>
    );
  };

  const handlePasswordField = () => {
    return (
      <>
        <Text style={[Styles.text,{color:dark?"white":"#696969"}]}>Password</Text>
        <View>
          <View
            style={{elevation: 5, borderRadius: 8, backgroundColor: 'white'}}>
            <TextInput
              secureTextEntry={true}
              onChangeText={item => {
                setPasswordError(!Boolean(item));
                const encoding = base64.encode(item);
                setPassword(encoding);
              }}
              style={Styles.input}
              placeholder="Enter Password"
              placeholderTextColor={dark?"gray":"black"}
            />
          </View>
          <View style={{position: 'absolute', top: 10, left: 8}}>
            <Icon name="password" size={25} color={'black'} />
          </View>
        </View>
      </>
    );
  };

  const handleEmailFieldCondition = () => {
    return (
      <>
        {emailError ? (
          <ErrorMessageComponents name="Email is Required*" />
        ) : checkEmail ? (
          <ErrorMessageComponents name="Email is invalid" />
        ) : (
          <></>
        )}
      </>
    );
  };

  const handlePasswordFieldCondition = () => {
    return (
      <>
        {passwordError ? (
          <ErrorMessageComponents name="Password is Required*" />
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
  
    <ScrollView
      style={{
        backgroundColor: dark ? colors.card : 'white',
        flex: 1,
        paddingTop: 100,
      }}>
       <StatusBar backgroundColor={dark?colors.card:"white"} barStyle={dark?"light-content":'light-content'} />
      <View style={{marginHorizontal: 30, flex: 0.5, marginTop: 35}}>
        <Text
          style={[
            {color: colors.text},
            {
              textAlign: 'center',
              fontWeight: '800',
              fontSize: 25,
              marginBottom: 10,
            },
          ]}>
          Welcome
        </Text>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/car.jpg')}
            style={{width: 100, height: 100, borderRadius: 150}}
          />
        </View>
        {handleEmailField()}
        {handleEmailFieldCondition()}
        {handlePasswordField()}
        {handlePasswordFieldCondition()}

        <TouchableOpacity
          style={Styles.login}
          onPress={() => {
            handleLogin();
          }}>
          {!loading ? (
            <Text
              style={{textAlign: 'center', fontWeight: '600', color: 'black'}}>
              Login
            </Text>
          ) : (
            <ActivityIndicator size="small" color="white" />
          )}
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{marginHorizontal: 5, color: dark?"white":'black'}}>
            Don't have an account?
          </Text>
          <Text style={{color: dark?"blue":"blue",textDecorationLine:"underline",textDecorationStyle:"dashed"}} onPress={onLinkClick}>
            Sign Up
          </Text>
        </View>
      </View>

      <View style={{flex: 0.5}}></View>
    </ScrollView>
  );
};

export default Login;

const Styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 45,
  },
  text: {
    color: '#696969',
    fontWeight: '600',
    fontSize: 17,
    marginTop: 20,
    marginBottom: 10,
  },
  login: {
    backgroundColor: '#00ff7f',
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 60,
    elevation: 5,
    marginTop: 20,
  },
  welcome: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    // fontWeight: '400',
    marginTop: 5,
  },
});
