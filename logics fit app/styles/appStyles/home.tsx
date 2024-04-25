import {Platform, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const HomeStyles = StyleSheet.create({
  bottomNavigationBarContainer: {
    height: RFPercentage(8),
    justifyContent: 'center',
    paddingVertical: RFPercentage(1),
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: Colors.BLACK_01,
        shadowOffset: {height: -4, width: 0},
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
    }),
  },
  newNotificationsCountsContainer: {
    borderRadius: RFPercentage(1.6) / 2,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default HomeStyles;
