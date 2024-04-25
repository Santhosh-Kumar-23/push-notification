import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const BiometricsStyles = StyleSheet.create({
  buttonContainer: {gap: RFPercentage(2)},
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

export default BiometricsStyles;
