import React, {FC} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Dialog, MD3Theme, Portal, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import * as Assets from '../../assets';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import ToastPopupStyles from '../../styles/otherStyles/toastPopup';

const ToastPopup: FC<Interfaces.ToastPopupInterface> = (
  props: Interfaces.ToastPopupInterface,
) => {
  // Props Variables
  const {
    buttonAction,
    buttonLabel = Constants.CLOSE,
    messageDetails,
    onDismiss,
    visible = false,
  } = props;

  // Other Variables
  const {ButtonStyles} = Styles;
  const {colors}: MD3Theme = useTheme();
  const dispatch: any = useDispatch();
  const message: string = messageDetails?.message ?? '';
  const {StatusCodes} = Enums;
  const statusCode: number = messageDetails?.type ?? Constants.ZERO;
  const title: string = messageDetails?.title ?? '';
  let imageSource: ImageSourcePropType | undefined;

  // Logics
  switch (statusCode) {
    case Constants.ZERO:
      imageSource = undefined;
      break;

    case StatusCodes.INFO:
      imageSource = Assets.INFO_ROUNDED;
      break;

    case StatusCodes.NEW:
    case StatusCodes.SUCCESS:
      imageSource = Assets.TICK_ROUNDED;
      break;

    default:
      imageSource = Assets.CLOSE_ROUNDED;
      break;
  }

  // Functions
  const handleDismiss = (): void => {
    dispatch(Actions.storeToastPopup(null));
  };

  return (
    <Portal>
      <Dialog
        onDismiss={(): void => {
          onDismiss ? onDismiss() : handleDismiss();
        }}
        style={Styles.backgroundColor(Colors.TRANSPARENT)}
        visible={visible}>
        <LinearGradient
          colors={Colors.TOASTPOPUP_GRADIENT}
          style={ToastPopupStyles.linearGradientContainer}>
          <Dialog.Content>
            <View style={ToastPopupStyles.imageContainer}>
              {Boolean(imageSource) && (
                <Image
                  resizeMode={Constants.COVER}
                  source={imageSource}
                  style={Styles.imageView('100%', '100%')}
                />
              )}
            </View>
            <View style={ToastPopupStyles.titleContentContainer}>
              <Text
                style={Styles.textView(
                  RFPercentage(2.2),
                  'Saira-Bold',
                  colors.inverseSurface,
                  RFPercentage(2.64),
                  'center',
                )}>
                {title}
              </Text>
              <Text
                style={Styles.textView(
                  RFPercentage(1.6),
                  'Roboto-Regular',
                  colors.inverseSurface,
                  RFPercentage(1.875),
                  'center',
                )}>
                {message}
              </Text>
            </View>
            <View style={ToastPopupStyles.buttonContainer}>
              <Button
                contentStyle={ButtonStyles.defaultContentStyle}
                labelStyle={ButtonStyles.defaultLabelStyle}
                mode={Constants.B_MODE_ELEVATED}
                onPress={(): void => {
                  handleDismiss();

                  buttonAction && buttonAction();
                }}
                style={[
                  Styles.backgroundColor(colors.surface),
                  ButtonStyles.defaultStyle,
                ]}
                textColor={colors.secondary}>
                {buttonLabel}
              </Button>
            </View>
          </Dialog.Content>
        </LinearGradient>
      </Dialog>
    </Portal>
  );
};

export default ToastPopup;
