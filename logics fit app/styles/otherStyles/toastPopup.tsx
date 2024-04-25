import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const ToastPopupStyles = StyleSheet.create({
  buttonContainer: {gap: RFPercentage(2)},
  imageContainer: {
    alignSelf: 'center',
    height: RFPercentage(7),
    width: RFPercentage(7),
  },
  linearGradientContainer: {
    borderRadius: RFPercentage(2),
    paddingHorizontal: RFPercentage(3),
    paddingVertical: RFPercentage(3),
  },
  titleContentContainer: {
    paddingVertical: RFPercentage(2),
    gap: RFPercentage(1),
  },
});

export default ToastPopupStyles;
