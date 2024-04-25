import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const SignInStyles = StyleSheet.create({
  signInContainer: {
    backgroundColor: Colors.TRANSPARENT,
    flex: 0.875,
    justifyContent: 'flex-end',
  },
  signUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFPercentage(3.2),
    paddingHorizontal: RFPercentage(3.6),
    paddingTop: RFPercentage(1.6),
  },
});

export default SignInStyles;
