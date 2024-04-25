import React, {FC} from 'react';
import {Image, Modal, Platform, View} from 'react-native';
import {Button, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Assets from '../../assets';
import * as Interfaces from '../../configs/ts/interfaces';
import PaymentOptionsStyles from '../../styles/otherStyles/paymentOptions';
import * as Styles from '../styles';
import * as Colors from '../utils/colors';
import * as Constants from '../utils/constants';

const PaymentOptions: FC<Interfaces.PaymentOptionsInterface> = (
  props: Interfaces.PaymentOptionsInterface,
) => {
  // Props Variables
  const {visible, onRequestClose, transparent = true} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const {ButtonStyles} = Styles;
  const checkForIOS: boolean = Platform.OS == Constants.IOS;

  // Functions
  const renderApplePay = (): React.JSX.Element => {
    const renderIcon = (): React.JSX.Element => {
      return (
        <Image
          resizeMode={Constants.CONTAIN}
          source={Assets.APPLE_PAY}
          style={Styles.imageView(RFPercentage(3.2), RFPercentage(6.405))}
        />
      );
    };

    return (
      <Button
        children={null}
        contentStyle={ButtonStyles.contentStyleForImage}
        icon={(): React.JSX.Element => renderIcon()}
        mode={Constants.B_MODE_ELEVATED}
        onPress={(): void => {}}
        style={[
          Styles.backgroundColor(colors.surface),
          ButtonStyles.defaultStyle,
        ]}
      />
    );
  };

  const renderPayByCard = (): React.JSX.Element => {
    return (
      <Button
        contentStyle={ButtonStyles.defaultContentStyle}
        labelStyle={ButtonStyles.defaultLabelStyle}
        mode={Constants.B_MODE_ELEVATED}
        onPress={(): void => {}}
        style={[
          Styles.backgroundColor(colors.primary),
          ButtonStyles.defaultStyle,
          checkForIOS && Styles.marginVertical(0, RFPercentage(2)),
        ]}
        textColor={colors.secondary}>
        {Constants.PAY_BY_CARD}
      </Button>
    );
  };

  const renderCancel = (): React.JSX.Element => {
    return (
      <Button
        contentStyle={ButtonStyles.defaultContentStyle}
        labelStyle={ButtonStyles.defaultLabelStyle}
        mode={Constants.B_MODE_ELEVATED}
        onPress={onRequestClose}
        style={[
          Styles.backgroundColor(Colors.TRANSPARENT),
          Styles.borderColor(colors.surface),
          ButtonStyles.defaultStyle,
          ButtonStyles.outlinedStyle,
          Styles.marginVertical(0, RFPercentage(2)),
        ]}
        textColor={colors.surface}>
        {Constants.CANCEL}
      </Button>
    );
  };

  return (
    <Modal
      animationType={Constants.RN_ML_AT_SLIDE}
      onRequestClose={onRequestClose}
      transparent={transparent}
      visible={visible}>
      <View
        style={[
          Styles.backgroundColor(colors.background),
          Styles.borderColor(colors.onSurface),
          PaymentOptionsStyles.paymentOptionsContainer,
        ]}>
        {checkForIOS && renderApplePay()}
        {renderPayByCard()}
        {renderCancel()}
      </View>
    </Modal>
  );
};

export default PaymentOptions;
