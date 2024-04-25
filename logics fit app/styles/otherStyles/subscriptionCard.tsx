import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const SubscriptionCardStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: RFPercentage(1),
    borderWidth: RFPercentage(0.25),
    paddingHorizontal: RFPercentage(0.4),
  },
  discountContainer: {
    borderRadius: RFPercentage(0.5),
    left: RFPercentage(1),
    paddingHorizontal: RFPercentage(0.5),
    paddingVertical: RFPercentage(0.3),
  },
  dotsContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(0.667) / 2,
    borderWidth: RFPercentage(0.125),
    marginHorizontal: RFPercentage(0.5),
    top: RFPercentage(0.1),
  },
  mySubscriptionContainer: {
    alignItems: 'center',
    borderBottomLeftRadius: RFPercentage(0.5),
    borderBottomRightRadius: RFPercentage(0.5),
    height: RFPercentage(2.2),
    justifyContent: 'center',
    left: RFPercentage(1.375),
    width: RFPercentage(9.3),
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default SubscriptionCardStyles;
