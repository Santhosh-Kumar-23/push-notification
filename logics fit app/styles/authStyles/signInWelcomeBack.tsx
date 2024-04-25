import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const SignInWelcomeBackStyles = StyleSheet.create({
  loginWithDifferentAccountContainer: {
    paddingBottom: RFPercentage(3.2),
    paddingHorizontal: RFPercentage(3.6),
    paddingTop: RFPercentage(1.6),
  },
  signInWelcomeBackContainer: {
    backgroundColor: Colors.TRANSPARENT,
    flex: 0.875,
    justifyContent: 'flex-end',
  },
  welcomeBackContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default SignInWelcomeBackStyles;
