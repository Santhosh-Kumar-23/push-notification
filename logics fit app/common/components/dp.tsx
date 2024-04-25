import React, {FC} from 'react';
import {Image, Pressable, View} from 'react-native';
import {Avatar, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Assets from '../../assets';
import * as Functions from '../../common/utils/functions';
import * as Interfaces from '../../configs/ts/interfaces';
import DpStyles from '../../styles/otherStyles/dp';
import * as Styles from '../styles';
import * as Constants from '../utils/constants';

const Dp: FC<Interfaces.DPInterface> = (props: Interfaces.DPInterface) => {
  // Props Variables
  const {
    dp,
    isUpload = false,
    label,
    onUpload = (files: any): void => {},
    size,
  } = props;
  const checkForDp: boolean = Boolean(dp);

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const imagePickerConfigs: any = {
    cropperCircleOverlay: true,
  };

  // Functions
  const renderIcon = (): React.JSX.Element => {
    return (
      <Pressable
        onPress={(): void => {
          Functions.openGallery(imagePickerConfigs, onUpload);
        }}
        style={DpStyles.iconContainer}>
        <Image
          resizeMode={Constants.COVER}
          source={Assets.CAMERA}
          style={Styles.imageView(RFPercentage(2), RFPercentage(2))}
        />
      </Pressable>
    );
  };

  return (
    <View style={[Styles.borderColor(colors.primary), DpStyles.container]}>
      {checkForDp ? (
        <Avatar.Image
          size={size}
          source={{uri: `${Constants.BASE_64_PNG},${dp}`}}
        />
      ) : (
        <Avatar.Text
          color={colors.surface}
          label={Functions.acronym(label)}
          size={size}
        />
      )}
      {isUpload && renderIcon()}
    </View>
  );
};

export default Dp;
