import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const CounterInputStyles = StyleSheet.create({
  inputContainer: {
    borderRadius: RFPercentage(1),
    borderWidth: RFPercentage(0.125),
    justifyContent: 'center',
    height: RFPercentage(5),
    marginHorizontal: RFPercentage(2),
    paddingHorizontal: RFPercentage(1.3),
    width: RFPercentage(8.5),
  },
});

export default CounterInputStyles;
