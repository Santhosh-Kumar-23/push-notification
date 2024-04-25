import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const ChangePasswordStyles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  container: {
    flex: 1,
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  skeletonLabelContainer: {
    alignSelf: 'flex-start',
    height: RFPercentage(1.875),
    width: '50%',
  },
  skeletonTextInputContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(5),
    height: RFPercentage(5),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
});

export default ChangePasswordStyles;
