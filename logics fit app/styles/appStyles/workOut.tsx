import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const WorkOutStyles = StyleSheet.create({
  container: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  skeletonWorkOutCardConatiner: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(20.75),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  skeletonWorkOutContainer: {
    height: RFPercentage(2.8),
    width: '50%',
  },
  videoCloseContainer: {
    position: 'absolute',
    right: RFPercentage(0.875),
    top: RFPercentage(1),
    zIndex: 1,
  },
  videoContainer: {
    position: 'absolute',
    right: RFPercentage(1),
    top: RFPercentage(1),
  },
});

export default WorkOutStyles;
