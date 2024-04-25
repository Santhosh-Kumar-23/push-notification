import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const NotificationCardStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: RFPercentage(1),
    paddingHorizontal: RFPercentage(0.4),
    paddingVertical: RFPercentage(0.4),
  },
  cardInnerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dotContainer: {
    borderRadius: RFPercentage(0.8) / 2,
    borderWidth: RFPercentage(0.14),
  },
});

export default NotificationCardStyles;
