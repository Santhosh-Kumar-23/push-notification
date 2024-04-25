import {Platform, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const PaymentOptionsStyles = StyleSheet.create({
  paymentOptionsContainer: {
    borderBottomWidth: 0,
    borderTopLeftRadius: RFPercentage(2.5),
    borderTopRightRadius: RFPercentage(2.5),
    borderTopWidth: RFPercentage(0.125),
    marginTop: 'auto',
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(3.6),
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: Colors.BLACK_025,
        shadowOffset: {height: -20, width: 0},
        shadowOpacity: 1,
        shadowRadius: 20,
      },
    }),
  },
});

export default PaymentOptionsStyles;
