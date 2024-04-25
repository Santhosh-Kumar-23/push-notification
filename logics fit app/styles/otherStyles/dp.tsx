import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const DpStyles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: RFPercentage(10),
    borderWidth: RFPercentage(0.375),
  },
  iconContainer: {
    bottom: RFPercentage(0.5),
    position: 'absolute',
    right: 0,
  },
});

export default DpStyles;
