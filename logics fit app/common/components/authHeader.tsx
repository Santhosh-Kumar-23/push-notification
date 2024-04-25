import {StackActions, useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Image, Pressable, View} from 'react-native';
import {MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Assets from '../../assets';
import * as Interfaces from '../../configs/ts/interfaces';
import AuthHeaderStyles from '../../styles/otherStyles/authHeader';
import * as Styles from '../styles';
import * as Constants from '../utils/constants';

const AuthHeader: FC<Interfaces.AuthHeaderInterface> = (
  props: Interfaces.AuthHeaderInterface,
) => {
  // Props Variables
  const {onClose, showClose = true, showLogo = true} = props;

  // Other Variables
  const navigation: any = useNavigation();
  const {colors}: MD3Theme = useTheme();
  const {CommonStyles} = Styles;

  // Functions
  const renderLogo = (): React.JSX.Element => {
    return (
      <View style={AuthHeaderStyles.logoContainer}>
        <View style={CommonStyles.authLogoContainer}>
          <Image
            source={Assets.LOGO}
            resizeMode={Constants.COVER}
            style={Styles.imageView('100%', '100%')}
          />
        </View>
      </View>
    );
  };

  const renderClose = (): React.JSX.Element => {
    return (
      <Pressable
        onPress={(): void => {
          onClose ? onClose() : navigation.dispatch(StackActions.pop());
        }}
        style={AuthHeaderStyles.closeContainer}>
        <MaterialIcons
          color={colors.surface}
          name={Constants.VI_MI_CLOSE}
          size={RFPercentage(2.4)}
        />
      </Pressable>
    );
  };

  return (
    <View style={AuthHeaderStyles.headerContainer}>
      {showLogo && renderLogo()}
      {showClose && renderClose()}
    </View>
  );
};

export default AuthHeader;
