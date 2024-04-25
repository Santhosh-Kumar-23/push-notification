import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const OnBoardingsStyles = StyleSheet.create({
  backContainer: {
    alignItems: 'center',
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonsContainer: {
    backgroundColor: Colors.TRANSPARENT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(3.2),
    paddingVertical: RFPercentage(1.6),
  },
  backIndividualContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFPercentage(8),
    paddingHorizontal: RFPercentage(3.6),
    paddingTop: RFPercentage(1.6),
  },
  dotsIndividualContainer: {
    borderRadius: RFPercentage(0.8) / 2,
    borderWidth: RFPercentage(0.14),
  },
  onBoardItemContainer: {
    backgroundColor: Colors.TRANSPARENT,
    flex: 1,
    justifyContent: 'flex-end',
  },
  signInContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFPercentage(7),
    paddingHorizontal: RFPercentage(3.6),
    paddingTop: RFPercentage(1.6),
  },
  skipContainer: {
    alignItems: 'center',
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default OnBoardingsStyles;
