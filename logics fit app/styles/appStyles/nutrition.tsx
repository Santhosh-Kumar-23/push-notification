import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const NutritionStyles = StyleSheet.create({
  container: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  skeletonNutritionCardConatiner: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(14.75),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  skeletonNutritionContainer: {
    height: RFPercentage(2.8),
    width: '50%',
  },
});

export default NutritionStyles;
