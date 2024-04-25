import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const AuthHeaderStyles = StyleSheet.create({
  closeContainer: {
    alignItems: 'flex-end',
    flex: 0.5,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    backgroundColor: Colors.TRANSPARENT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(3.4),
    paddingVertical: RFPercentage(4),
  },
  logoContainer: {
    alignItems: 'flex-start',
    flex: 0.5,
    justifyContent: 'center',
  },
});

export default AuthHeaderStyles;
