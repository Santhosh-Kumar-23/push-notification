import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const TaskTwo = ({navigation}) => {
  const input = useRef(null);
  const inputInterval = useRef(null);

  const[timer,setTimer]=useState("")
  //state variables
  const [time, setTime] = useState(null);
  // const [intervall, setIntervall] = useState(null);

  //Error variables
  const [errorTime, setErrorTime] = useState(false);
  const [errorInterval, setErrorInterval] = useState(false);

  const a=()=>{
    let counter=time
    // const minutes = Math.floor(timer / 60);
    const b=setInterval(()=>{
        console.log(counter)
        setTimer(counter)
        counter--
        if (counter < 0 ) {
            clearInterval(b);
            console.log('Ding!');
          }
    },1000)
    
  }

  return (
    <View style={{backgroundColor: '#f0ffff', flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Text style={Styles.title}>SET TIMER</Text>
        <Text style={Styles.text}>Time</Text>
        <View style={Styles.view}>
          <TextInput
            ref={input}
            style={Styles.input}
            placeholder="Enter time"
            keyboardType="number-pad"
            onChangeText={item => {
              setTime(item);
              setErrorTime(!Boolean(item));
            }}
          />
        </View>
        {errorTime ? (
          <Text style={Styles.error}>Time is required!</Text>
        ) : (
          <></>
        )}
        {/* <Text style={Styles.text}>Interval</Text>
        <View style={Styles.view}>
          <TextInput
            ref={inputInterval}
            style={Styles.input}
            keyboardType="number-pad"
            placeholder="Enter interval"
            onChangeText={item => {
              setIntervall(item);
              setErrorInterval(!Boolean(item));
            }}
          />
        </View>
        {errorInterval ? (
          <Text style={Styles.error}>Interval is required!</Text>
        ) : (
          <></>
        )} */}
        <View style={Styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              setTime(null);
              setErrorTime(false);
              // setErrorInterval(false);
              input.current.clear();
              // inputInterval.current.clear();
            }}
            style={[
              Styles.button,
              {backgroundColor: 'black', marginHorizontal: 8},
            ]}>
            <Text style={Styles.buttonText}>CLEAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Styles.button}
            onPress={() => {
              if (Boolean(time) ) {
                a()
              } else {
                setErrorTime(true);
                // setErrorInterval(true);
              }
            }}>
            <Text style={[Styles.buttonText, {color: 'black'}]}>
              START TIMER
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[Styles.text,{fontSize:30,textAlign:"center",marginTop:20}]} onPress={()=>{
            
        }}>{timer} s</Text>
      </View>
    </View>
  );
};

export default TaskTwo;

const Styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  view: {
    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#00ff7f',
    padding: 10,
    borderRadius: 5,
    flex: 0.5,
    elevation: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },
  btnContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
  },
  error: {
    marginHorizontal: 20,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});
