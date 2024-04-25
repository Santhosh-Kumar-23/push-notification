import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const DotsStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFPercentage(3.2),
    paddingHorizontal: RFPercentage(3.6),
    paddingTop: RFPercentage(1.6),
  },
  individualContainer: {
    borderWidth: RFPercentage(0.14),
  },
});

export default DotsStyles;
