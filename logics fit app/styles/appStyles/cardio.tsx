import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const CardioStyles = StyleSheet.create({
  container: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  skeletonCardioCardConatiner: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(17.25),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  skeletonCardioContainer: {
    height: RFPercentage(2.8),
    width: '50%',
  },
});

export default CardioStyles;
