import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const SubscribeStyles = StyleSheet.create({
  buttonsContainer: {
    paddingVertical: RFPercentage(1.8),
  },
  container: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  genderContainer: {
    alignItems: 'center',
    borderRadius: RFPercentage(1),
    borderWidth: RFPercentage(0.125),
    height: RFPercentage(5),
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1.3),
  },
  sectionSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: RFPercentage(1.5),
  },
  skeletonUserInfoContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    marginVertical: RFPercentage(1),
    height: RFPercentage(54.5),
    width: '100%',
  },
  userInfoContainer: {
    backgroundColor: Colors.DARK_GRAY,
    borderRadius: RFPercentage(1),
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1),
  },
});

export default SubscribeStyles;
