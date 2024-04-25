import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const NetworkStyles = StyleSheet.create({
  backOnlineContainer: {
    backgroundColor: Colors.GREEN,
    paddingVertical: RFPercentage(0.5),
  },
  noConnectionContainer: {
    backgroundColor: Colors.RED,
    paddingVertical: RFPercentage(0.5),
  },
});

export default NetworkStyles;
