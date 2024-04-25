import React, {FC} from 'react';
import {Pressable, Text, View} from 'react-native';
import {MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Interfaces from '../../configs/ts/interfaces';
import CounterStyles from '../../styles/otherStyles/counter';
import * as Styles from '../styles';
import * as Constants from '../utils/constants';
import CounterInput from './counterInput';

const Counter: FC<Interfaces.CounterInterface> = (
  props: Interfaces.CounterInterface,
) => {
  // Props Variables
  const {
    customContainerStyle,
    iconColor,
    keyboardType,
    label,
    maxLength,
    onChangeText,
    placeholder,
    placeholderColor,
    unit,
    value,
  } = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();

  // Functions
  const renderHeader = (): React.JSX.Element => {
    return (
      <View style={CounterStyles.headerConatiner}>
        <View style={CounterStyles.labelContainer}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Bold',
              colors.surface,
              RFPercentage(1.875),
            )}>
            {label}
          </Text>
        </View>
        <View style={CounterStyles.unitContainer}>
          <Text
            style={Styles.textView(
              RFPercentage(1),
              'Roboto-Regular',
              colors.onSurface,
              RFPercentage(1.172),
            )}>
            {unit}
          </Text>
        </View>
      </View>
    );
  };

  const renderCounter = (): React.JSX.Element => {
    const handleCounter = (action: string): void => {
      let updateValue: number = value ? Number(value) : Constants.ZERO;

      switch (action) {
        case Constants.DECREMENT:
          updateValue =
            updateValue > Constants.ZERO
              ? updateValue - Constants.ONE
              : Constants.ZERO;
          break;

        case Constants.INCREMENT:
          updateValue = updateValue + Constants.ONE;
          break;

        default:
          break;
      }

      onChangeText(updateValue ? updateValue.toString() : '');
    };

    return (
      <View style={CounterStyles.container}>
        <Pressable
          onPress={(): void => {
            handleCounter(Constants.DECREMENT);
          }}
          style={CounterStyles.iconContainer}>
          <MaterialIcons
            color={iconColor}
            name={Constants.REMOVE}
            size={RFPercentage(3.2)}
          />
        </Pressable>
        <CounterInput
          customContainerStyle={customContainerStyle}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onChangeText={(txt: string) => {
            onChangeText(txt);
          }}
          placeholder={placeholder}
          placeholderColor={placeholderColor}
          value={value}
        />
        <Pressable
          onPress={(): void => {
            handleCounter(Constants.INCREMENT);
          }}
          style={CounterStyles.iconContainer}>
          <MaterialIcons
            color={iconColor}
            name={Constants.ADD}
            size={RFPercentage(3.2)}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={Styles.padding(0, RFPercentage(1.5))}>
      {renderHeader()}
      {renderCounter()}
    </View>
  );
};

export default Counter;
