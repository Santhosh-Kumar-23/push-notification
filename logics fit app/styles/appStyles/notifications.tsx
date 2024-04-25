import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const NotificationStyles = StyleSheet.create({
  container: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  sectionLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionLabelSubContainerI: {
    alignItems: 'flex-start',
    flex: 0.635,
    justifyContent: 'center',
  },
  sectionLabelSubContainerII: {
    alignItems: 'flex-end',
    flex: 0.3375,
    justifyContent: 'center',
  },
  skeletonNotificationCardConatiner: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(10.5),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
});

export default NotificationStyles;
