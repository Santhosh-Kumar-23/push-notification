import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

// TextInput Styles
export const TextInputStyles = StyleSheet.create({
  defautContainerStyle: {
    borderRadius: RFPercentage(5),
    borderWidth: 1,
    flexDirection: 'row',
    height: RFPercentage(5),
    justifyContent: 'space-between',
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(3),
  },
  defaultIconContainerStyle: {
    alignItems: 'center',
    flex: 0.05,
    justifyContent: 'center',
  },
  defaultIconStyle: {width: RFPercentage(2.4), height: RFPercentage(2.4)},
  defaultTextInputContainerStyle: {
    flex: 0.95,
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1),
  },
});
