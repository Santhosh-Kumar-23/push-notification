import React, {useRef} from 'react';
import {TouchableOpacity, Text, View, useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import Login from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import Home from '../screens/Home';
import Task from '../screens/Settings';
import Splash from '../screens/SplashScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homee from 'react-native-vector-icons/FontAwesome5';
import Se from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cha from 'react-native-vector-icons/Entypo';
import No from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import Notification from '../screens/Notification';
import Otp from '../screens/OtpScreen';
import Chat from '../screens/ChatScreen';
import TaskOne from '../task/taskOne';
import TaskTwo from '../task/taskTwo';

function BottomTab({navigation}) {
  const Tab = createBottomTabNavigator();

  const headerRiight = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 5,
            marginHorizontal: 10,
            elevation: 10,
            borderRadius: 10,
          }}>
          <TouchableOpacity
            style={{marginHorizontal: 12}}
            onPress={async () => {
              const user = await AsyncStorage.removeItem('user');
              Snackbar.show({
                text: 'Logout Successfully',
                duration: Snackbar.LENGTH_LONG,
              });
              navigation.navigate('Login');
            }}>
            <Icon name="logout" size={25} color={'black'} />
          </TouchableOpacity>
          {/* <Text style={{marginHorizontal:12}}>Logout</Text> */}
        </View>
      </>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: 'black',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarInactiveBackgroundColor: 'black',
        // tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#f0ffff'},
          headerRight: () => headerRiight(),
          tabBarIcon: ({}) => <Homee name="home" size={20} color={'white'} />,
        }}
      />
      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({}) => <Cha name="chat" size={22} color={'white'} />,
        }}
      />

      <Tab.Screen
        name="notification"
        component={Notification}
        options={{
          headerShown: true,
          tabBarIcon: ({}) => (
            <No name="notifications" size={22} color={'white'} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Task}
        options={{
          headerShown: true,
          tabBarIcon: ({}) => <Se name="tasks" size={22} color={'white'} />,
        }}
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const Stack = createStackNavigator();
  const scheme = useColorScheme();
  const navRef = useRef(null);
  const routeNameRef = React.useRef();

  return (
    <NavigationContainer
      ref={navRef}
      onReady={() => {
        routeNameRef.current = navRef.current.getCurrentRoute().name;
      }}
      onStateChange={navigationState => {
        console.log(navigationState);
        const previousRouteName = routeNameRef.current;
        console.log('previous name', previousRouteName);
      }}
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="otp"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="taskOne"
          component={TaskOne}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="taskTwo"
          component={TaskTwo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
