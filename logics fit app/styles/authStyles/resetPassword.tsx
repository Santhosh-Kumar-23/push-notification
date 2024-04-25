import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const ResetPasswordStyles = StyleSheet.create({
  inputFieldContainer: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.SECONDARY,
    borderRadius: RFPercentage(1),
    color: Colors.BLACK,
    fontFamily: 'Roboto-Regular',
    fontSize: RFPercentage(1.6),
    height: RFPercentage(5),
    width: RFPercentage(5),
  },
  inputFieldErrorContainer: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.RED,
    borderRadius: RFPercentage(1),
    color: Colors.BLACK,
    fontFamily: 'Roboto-Regular',
    fontSize: RFPercentage(1.6),
    height: RFPercentage(5),
    width: RFPercentage(5),
  },
  logoContainer: {
    alignItems: 'center',
    flex: 0.4,
    justifyContent: 'center',
  },
  resetPasswordContainer: {
    flex: 0.475,
    justifyContent: 'space-between',
    paddingVertical: RFPercentage(3),
  },
  resendContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFPercentage(3.2),
    paddingHorizontal: RFPercentage(3.6),
    paddingTop: RFPercentage(1.6),
  },
});

export default ResetPasswordStyles;
