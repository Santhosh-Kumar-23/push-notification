import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TaskOne = () => {
  //country
  const [value, setValue] = useState(null);
  // console.log('COUNTRY SELECTED VALUE::::', value);
  const [isFocus, setIsFocus] = useState(false);
  const [countriesData, setCountriesData] = useState(null);
  const [cityEmpty, setCityEmpty] = useState(false);

  //state
  const [stateValue, setStateValue] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [stateIsFocus, setStateIsFocus] = useState(false);

  //city
  const [cityValue, setCityValue] = useState('');
  const [cityIsFocus, setCityIsFocus] = useState(false);

  const [disableState, setDisableState] = useState(false);
  const [disableCity, setDisableCity] = useState(false);

  const countries = [
    {
      name: 'India',
      value: 'IN',
      state: [
        {id: 1, name: 'Delhi'},
        {id: 2, name: 'Maharastra'},
        {id: 3, name: 'TamilNadu'},
        {id: 4, name: 'Karnataka'},
      ],
      cities: [
        {name: 'Firozobad', stateId: 1},
        {name: 'Mumbai', stateId: 2},
        {name: 'Chennai', stateId: 3},
        {name: 'Salem', stateId: 3},
        {name: 'Bangalore', stateId: 4},
      ],
    },
    {
      name: 'Pakistan',
      value: 'PK',
      state: [
        {name: 'Lahore', id: 1},
        {name: 'Karachi', id: 2},
        {name: 'Islamabad', id: 3},
      ],
    },
    {
      name: 'Australia',
      value: 'AU',
      state: [
        {name: 'Sydney'},
        {name: 'Melborne'},
        {name: 'Brisbone'},
        {name: 'Hobart'},
      ],
    },
    {
      name: 'Malaysia',
      value: 'MAL',
      state: [],
    },
  ];
  

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: '800',
          color: 'black',
        }}>
        <Text style={{color: 'blue'}}>Dynamic</Text> Dependent Dropdown
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countries}
        search
        maxHeight={300}
        labelField="name"
        valueField="value"
        placeholder={!isFocus ? 'Select Country' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item);
          setIsFocus(false);
          let heleperArray = [];
          heleperArray.push(item);
          const checkStateKey = heleperArray.some(item =>
            item.hasOwnProperty('state'),
          );
          
          if (Boolean(checkStateKey)) {
            const stateKeyLength = heleperArray[0].state.length;

            if (stateKeyLength === 0) {
              console.log('EMPTY');
              Alert.alert('Not found state key');
              setDisableState(false);
            } else {
              console.log('NON EMPTY');
              setStateValue(heleperArray[0].state);
              setDisableState(true);
              setDisableCity(false);
            }
          } else {
            Alert.alert('FALSEe');
          }
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />

      {disableState ? (
        <Dropdown
          style={[
            styles.dropdown,
            stateIsFocus && {borderColor: 'blue', marginTop: 30},
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={stateValue}
          search
          // disable={disableState}
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={!stateIsFocus ? 'Select State' : '...'}
          searchPlaceholder="Search..."
          value={stateValue}
          onFocus={() => setStateIsFocus(true)}
          onBlur={() => setStateIsFocus(false)}
          onChange={item => {
            console.log(item.id);

            //check key in single object
            const selectedCountry = value;
            const citiesData = selectedCountry?.cities;
            const checkCityKey = Object.keys(selectedCountry).some(
              key => key === 'cities',
            );

            if (Boolean(checkCityKey)) {
              const citykeyLength = selectedCountry.cities.length;

              if (citykeyLength === 0) {
                console.log('CITIES IS EMPTY');
              } else {
                const filterCityData = citiesData.filter(
                  o => o.stateId == item.id,
                );

                setCityValue(filterCityData);
                setDisableCity(true);

                console.log('FLITER::::::::::', cityValue);
              }
            } else {
              Alert.alert('Not found city key');
            }

            setStateIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={stateIsFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      ) : (
        <></>
      )}

      {disableCity ? (
        <Dropdown
          style={[
            styles.dropdown,
            cityIsFocus && {borderColor: 'blue', marginTop: 30},
          ]}
          // disable={disableCity}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cityValue}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={!cityIsFocus ? 'Select city' : '...'}
          searchPlaceholder="Search..."
          value={cityValue}
          onFocus={() => setCityIsFocus(true)}
          onBlur={() => setCityIsFocus(false)}
          onChange={item => {
            // setCityValue(item.name);
            // setDisableCity(false);
            setCityIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={cityIsFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default TaskOne;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  dropdown: {
    // marginTop: 20,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginVertical: 20,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'yellow',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
