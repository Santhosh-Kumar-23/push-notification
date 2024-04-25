import React, {FC} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Constants from '../utils/constants';

const CustomStatusBar: FC<Interfaces.StatusBarInterface> = (
  props: Interfaces.StatusBarInterface,
) => {
  // Props Variables
  const {backgroundColor, barStyle} = props;

  // Other Variables
  const insets: EdgeInsets = useSafeAreaInsets();
  const statusBarHeight: number = StatusBar.currentHeight || insets.top;

  return (
    <View
      style={{
        height:
          Platform.OS == Constants.IOS
            ? insets.top
            : statusBarHeight / RFPercentage(1),
        backgroundColor,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

export default CustomStatusBar;
