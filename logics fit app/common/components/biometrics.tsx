import React, {FC} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Dialog, MD3Theme, Portal, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Assets from '../../assets';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import BiometricsStyles from '../../styles/otherStyles/biometrics';

const Biometrics: FC<Interfaces.BiometricsInterface> = (
  props: Interfaces.BiometricsInterface,
) => {
  // Props Variables
  const {fetchingStatus, mode, onDismiss, onRetain, visible} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const {ButtonStyles, CommonStyles} = Styles;
  const checkForMode: boolean = Boolean(mode);
  let content: string, imageSource: ImageSourcePropType, title: string;

  switch (mode) {
    case Constants.BIO_FACEID:
      imageSource = Assets.FACE_ID;
      title = Constants.SIGN_IN_WITH_FACE_ID;
      content = Constants.ACTIVATE_FACE_ID_CONTENT;
      break;

    case Constants.BIO_BIOMETRICS:
    case Constants.BIO_TOUCHID:
      imageSource = Assets.TOUCH_ID;
      title = Constants.SIGN_IN_WITH_TOUCH_ID;
      content = Constants.ACTIVATE_TOUCH_ID_CONTENT;
      break;

    default:
      imageSource = Assets.TOUCH_ID;
      title = Constants.NO_BIOMETRICS;
      content = Constants.ACTIVATE_DEFAULT_CONTENT;
      break;
  }

  return (
    <Portal>
      <Dialog
        onDismiss={onDismiss}
        style={Styles.backgroundColor(Colors.TRANSPARENT)}
        visible={visible}>
        <LinearGradient
          colors={Colors.BIOMETRICS_GRADIENT}
          style={BiometricsStyles.linearGradientContainer}>
          <Dialog.Content>
            <View style={CommonStyles.centered}>
              <Image
                resizeMode={Constants.COVER}
                source={imageSource}
                style={Styles.imageView(RFPercentage(7), RFPercentage(7))}
                tintColor={Colors.WHITE}
              />
            </View>
            <View style={BiometricsStyles.titleContentContainer}>
              <Text
                style={Styles.textView(
                  RFPercentage(2.2),
                  'Saira-Bold',
                  Colors.WHITE,
                  RFPercentage(2.64),
                  'center',
                )}>
                {title}
              </Text>
              <Text
                style={Styles.textView(
                  RFPercentage(1.6),
                  'Roboto-Regular',
                  Colors.WHITE,
                  RFPercentage(1.875),
                  'center',
                )}>
                {content}
              </Text>
            </View>
            <View style={BiometricsStyles.buttonContainer}>
              {checkForMode && (
                <Button
                  contentStyle={ButtonStyles.defaultContentStyle}
                  labelStyle={ButtonStyles.defaultLabelStyle}
                  loading={fetchingStatus}
                  mode={Constants.B_MODE_ELEVATED}
                  onPress={(): void => {
                    onRetain();
                  }}
                  style={[
                    Styles.backgroundColor(colors.primary),
                    ButtonStyles.defaultStyle,
                  ]}
                  textColor={colors.secondary}>
                  {fetchingStatus ? Constants.LOADING : Constants.ACTIVATE}
                </Button>
              )}
              <Button
                contentStyle={ButtonStyles.defaultContentStyle}
                labelStyle={ButtonStyles.defaultLabelStyle}
                mode={Constants.B_MODE_ELEVATED}
                onPress={onDismiss}
                style={[
                  Styles.backgroundColor(colors.surface),
                  ButtonStyles.defaultStyle,
                ]}
                textColor={colors.secondary}>
                {checkForMode
                  ? Constants.I_WILL_DO_IT_LATER
                  : Constants.PROCEED}
              </Button>
            </View>
          </Dialog.Content>
        </LinearGradient>
      </Dialog>
    </Portal>
  );
};

export default Biometrics;
