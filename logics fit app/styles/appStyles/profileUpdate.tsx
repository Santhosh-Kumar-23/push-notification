import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const ProfileUpdateStyles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  cardContainer: {
    backgroundColor: Colors.DARK_GRAY,
    borderRadius: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1.5),
  },
  container: {
    flex: 1,
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  textInputMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonHeightWeightContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(13),
    marginTop: RFPercentage(2),
    width: '100%',
  },
  skeletonUserInfoContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(19),
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    height: RFPercentage(2),
    marginTop: RFPercentage(0.5),
  },
});

export default ProfileUpdateStyles;
