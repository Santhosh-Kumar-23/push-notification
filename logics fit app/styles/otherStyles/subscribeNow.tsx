import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const SubscribeNowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: RFPercentage(1),
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionSubContainer: {
    alignItems: 'flex-start',
    flex: 0.9375,
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1),
  },
  itemContainer: {
    alignItems: 'flex-start',
    flex: 0.33,
    justifyContent: 'center',
  },
  itemDiscountContainer: {
    borderRadius: RFPercentage(0.5),
    left: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(0.5),
    paddingVertical: RFPercentage(0.3),
  },
  itemTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  skeletonConatiner: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(14),
    width: '100%',
  },
});

export default SubscribeNowStyles;
