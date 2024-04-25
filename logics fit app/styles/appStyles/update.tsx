import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const UpdateStyles = StyleSheet.create({
  container: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  cardContainer: {
    borderRadius: RFPercentage(1),
    paddingHorizontal: RFPercentage(0.4),
    paddingVertical: RFPercentage(0.4),
  },
  cardInnerContainerI: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInnerContainerII: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: RFPercentage(1.25),
  },
  cardLabelContainerI: {
    alignItems: 'flex-start',
    flex: 0.5,
    justifyContent: 'center',
  },
  cardLabelContainerII: {
    alignItems: 'flex-end',
    flex: 0.5,
    justifyContent: 'center',
  },
  skeletonUpdateContainer: {
    height: RFPercentage(2.8),
    width: '100%',
  },
  skeletonUpdateCardConatiner: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(35.25),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  verticalDividerContainer: {flexDirection: 'column', alignItems: 'center'},
});

export default UpdateStyles;
