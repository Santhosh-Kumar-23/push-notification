import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import DotsStyles from '../../styles/otherStyles/dots';

const Dots: FC<Interfaces.DotsInterface> = (
  props: Interfaces.DotsInterface,
) => {
  // Props Variables
  const {
    currentIndex,
    customContainerStyle,
    numberOfDots,
    onPress = (index: number) => {},
    size = Constants.ZERO_EIGHT,
  } = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();

  return (
    <View style={[DotsStyles.container, customContainerStyle]}>
      {Array.from(Array(numberOfDots).keys()).flatMap(
        (_: number, index: number) => (
          <Pressable
            onPress={(): void => {
              onPress(index);
            }}
            style={[
              DotsStyles.individualContainer,
              Styles.backgroundColor(colors.primary),
              Styles.borderColor(
                currentIndex == index ? Colors.TRANSPARENT : colors.surface,
              ),
              Styles.imageView(
                RFPercentage(size),
                RFPercentage(currentIndex == index ? 4 : size),
              ),
              {
                borderRadius: RFPercentage(size) / 2,
                marginLeft: index != Constants.ZERO ? RFPercentage(1) : 0,
                opacity: currentIndex >= index ? 1 : 0.3,
              },
            ]}
            key={index}
          />
        ),
      )}
    </View>
  );
};

export default Dots;
