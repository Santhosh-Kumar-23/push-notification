import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const CounterStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: RFPercentage(1.5),
  },
  iconContainer: {
    alignItems: 'center',
    flex: 0.125,
    justifyContent: 'center',
  },
  headerConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    alignItems: 'flex-start',
    flex: 0.5,
    justifyContent: 'center',
  },
  unitContainer: {
    alignItems: 'flex-end',
    flex: 0.5,
    justifyContent: 'center',
  },
});

export default CounterStyles;
