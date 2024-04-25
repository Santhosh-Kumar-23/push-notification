import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const WorkOutCardStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: RFPercentage(1),
    paddingHorizontal: RFPercentage(0.4),
    paddingVertical: RFPercentage(0.4),
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(1),
    paddingVertical: RFPercentage(0.8),
  },
  detailsDescriptionLabelContainer: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1),
  },
  detailsPlayVideoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailsSNoContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(0.5),
    padding: RFPercentage(0.5),
  },
  detailsweightContainer: {
    borderRadius: RFPercentage(2),
    padding: RFPercentage(0.5),
    marginRight: RFPercentage(2),
  },
});

export default WorkOutCardStyles;
