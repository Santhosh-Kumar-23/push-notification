import {Platform, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const isTablet: boolean = DeviceInfo.isTablet();

const ProfileStyles = StyleSheet.create({
  bodyInfoContainer: {
    backgroundColor: Colors.DARK_GRAY,
    borderRadius: RFPercentage(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1.6),
  },
  buttonsContainer: {
    paddingVertical: RFPercentage(1.8),
  },
  container: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(3.6),
  },
  otherSettingsContainer: {
    backgroundColor: Colors.DARK_GRAY,
    borderRadius: RFPercentage(1),
    marginTop: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1.5),
  },
  settingsContainer: {
    backgroundColor: Colors.DARK_GRAY,
    borderRadius: RFPercentage(1),
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1.5),
  },
  settingsIconLabelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  settingsIconContainer: {
    alignItems: 'center',
    backgroundColor: Colors.GAINSBORO,
    borderRadius: RFPercentage(5),
    height: RFPercentage(2.6),
    justifyContent: 'center',
    width: RFPercentage(2.6),
  },
  settingsItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonBodyInfoContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(7),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  skeletonDPContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(10),
    height: RFPercentage(9.175),
    width: RFPercentage(9.175),
  },
  skeletonEditMyProfileContainer: {
    alignSelf: 'center',
    height: RFPercentage(2.4),
    marginVertical: RFPercentage(0.5),
    width: '32.5%',
  },
  skeletonEmailContainer: {
    alignSelf: 'center',
    height: RFPercentage(2.4),
    marginTop: RFPercentage(1),
    width: '62.5%',
  },
  skeletonNameContainer: {
    alignSelf: 'center',
    height: RFPercentage(2.4),
    width: '50%',
  },
  skeletonOtherSettingsContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(10.3875),
    marginTop: RFPercentage(1),
    width: '100%',
  },
  skeletonSettingsContainerI: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(29.375),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  skeletonSettingsContainerII: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(24.65),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  skeletonSettingsContainerIII: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(19.875),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  skeletonSubscribeNowCardConatiner: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(14.25),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  subscriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: RFPercentage(1),
  },
  subscriptionDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subscriptionDescriptionSubContainer: {
    alignItems: 'flex-start',
    flex: 0.9375,
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1),
  },
  subscriptionItemContainer: {
    alignItems: 'flex-start',
    flex: 0.33,
    justifyContent: 'center',
  },
  subscriptionItemTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  switchContainer: {
    ...Platform.select({
      android: {
        transform: [{scaleX: isTablet ? 1.5 : 1}, {scaleY: isTablet ? 1.5 : 1}],
      },
      ios: {
        transform: [
          {scaleX: isTablet ? 1 : 0.625},
          {scaleY: isTablet ? 1 : 0.625},
        ],
      },
    }),
  },
  toogleButtonItemConatiner: {height: RFPercentage(2.4)},
  verticalDividerContainer: {flexDirection: 'row', alignItems: 'center'},
});

export default ProfileStyles;
