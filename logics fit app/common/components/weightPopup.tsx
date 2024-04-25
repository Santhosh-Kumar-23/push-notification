import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Dialog, MD3Theme, Portal, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import WeightPopupStyles from '../../styles/otherStyles/weightPopup';

const WeightPopup: FC<Interfaces.WeightPopupInterface> = (
  props: Interfaces.WeightPopupInterface,
) => {
  // Props Variables
  const {
    onDismiss,
    onRetain = (weight: string) => {},
    value = '',
    visible = false,
  } = props;

  // UseState Variables
  const [weight, setWeight] = useState<string>('');

  // Other Variables
  const {ButtonStyles, TextInputStyles} = Styles;
  const {colors}: MD3Theme = useTheme();
  const checkForSameWeight: boolean = weight == value;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      setWeight(value);

      return (): void => {
        isFocus = false;
      };
    }, [value]),
  );

  // Functions
  const renderWeight = (): React.JSX.Element => {
    return (
      <>
        <View style={WeightPopupStyles.titleContentContainer}>
          <Text
            style={Styles.textView(
              RFPercentage(2.2),
              'Saira-Bold',
              colors.inverseSurface,
              RFPercentage(2.64),
              'center',
            )}>
            {Constants.ENTER_WEIGHT} ({Constants.KG_UNIT})
          </Text>
        </View>
        <View
          style={[
            Styles.backgroundColor(colors.surface),
            Styles.borderColor(colors.surface),
            WeightPopupStyles.textInputContainer,
          ]}>
          <TextInput
            autoCapitalize={Constants.TI_CAP_WORDS}
            autoComplete={Constants.TI_COM_NAME}
            keyboardType={Constants.TI_KT_NUMBER_PAD}
            maxLength={Constants.TWO}
            onChangeText={(txt: string): void => {
              setWeight(txt);
            }}
            placeholder={Constants.WEIGHT}
            placeholderTextColor={colors.onSurface}
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Regular',
              colors.background,
            )}
            value={weight}
          />
        </View>
      </>
    );
  };

  const renderButtons = (): React.JSX.Element => {
    const renderCancel = (): React.JSX.Element => {
      return (
        <View style={WeightPopupStyles.buttonContainer}>
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
            {Constants.CANCEL}
          </Button>
        </View>
      );
    };

    const renderSave = (): React.JSX.Element => {
      return (
        <View style={WeightPopupStyles.buttonContainer}>
          <Button
            contentStyle={ButtonStyles.defaultContentStyle}
            disabled={checkForSameWeight}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={() => {
              onRetain(weight);
            }}
            style={[
              Styles.backgroundColor(colors.primary),
              ButtonStyles.defaultStyle,
            ]}
            textColor={colors.secondary}>
            {Constants.SAVE}
          </Button>
        </View>
      );
    };

    return (
      <View style={WeightPopupStyles.buttonsContainer}>
        {renderCancel()}
        {renderSave()}
      </View>
    );
  };

  return (
    <Portal>
      <Dialog
        dismissable={!false}
        onDismiss={onDismiss}
        style={Styles.backgroundColor(Colors.TRANSPARENT)}
        visible={visible}>
        <LinearGradient
          colors={Colors.TOASTPOPUP_GRADIENT}
          style={WeightPopupStyles.linearGradientContainer}>
          <Dialog.Content>
            {renderWeight()}
            {renderButtons()}
          </Dialog.Content>
        </LinearGradient>
      </Dialog>
    </Portal>
  );
};

export default WeightPopup;
