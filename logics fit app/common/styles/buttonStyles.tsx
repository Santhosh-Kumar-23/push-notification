import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

// Button Styles
export const ButtonStyles = StyleSheet.create({
  contentStyleForImage: {height: RFPercentage(5.6), top: RFPercentage(0.5)},
  contentStyleForRightIcon: {
    flexDirection: 'row-reverse',
    height: RFPercentage(5.6),
  },
  defaultContentStyle: {
    height: RFPercentage(5.6),
  },
  defaultIconStyle: {height: RFPercentage(2.4), width: RFPercentage(2.4)},
  defaultLabelStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: RFPercentage(1.8),
    lineHeight: RFPercentage(2.16),
    textAlign: 'center',
  },
  defaultStyle: {
    borderRadius: RFPercentage(5),
  },
  outlinedStyle: {
    borderWidth: 1,
  },
});
