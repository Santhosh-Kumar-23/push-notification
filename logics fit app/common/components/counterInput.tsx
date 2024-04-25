import React, {FC} from 'react';
import {TextInput, View} from 'react-native';
import {MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Interfaces from '../../configs/ts/interfaces';
import CounterInputStyles from '../../styles/otherStyles/counterInput';
import * as Styles from '../styles';

const CounterInput: FC<Interfaces.CounterInputInterface> = (
  props: Interfaces.CounterInputInterface,
) => {
  // Props Variables
  const {
    customContainerStyle,
    keyboardType,
    maxLength,
    onChangeText,
    placeholder,
    placeholderColor,
    value,
  } = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();

  return (
    <View
      style={[
        Styles.backgroundColor(colors.surface),
        CounterInputStyles.inputContainer,
        customContainerStyle,
      ]}>
      <TextInput
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={Styles.textView(
          RFPercentage(1.8),
          'Roboto-Bold',
          colors.primary,
          RFPercentage(2.109),
          'center',
        )}
        value={value}
      />
    </View>
  );
};

export default CounterInput;
