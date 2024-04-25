import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const WeightPopupStyles = StyleSheet.create({
  buttonContainer: {
    flex: 0.475,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: RFPercentage(2),
  },
  linearGradientContainer: {
    borderRadius: RFPercentage(2),
    paddingHorizontal: RFPercentage(1.5),
    paddingVertical: RFPercentage(3),
  },
  textInputContainer: {
    borderRadius: RFPercentage(5),
    borderWidth: 1,
    height: RFPercentage(5),
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1.5),
  },
  titleContentContainer: {
    paddingVertical: RFPercentage(2),
    gap: RFPercentage(1),
  },
});

export default WeightPopupStyles;
