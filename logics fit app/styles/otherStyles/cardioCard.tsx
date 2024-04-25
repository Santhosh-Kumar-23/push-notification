import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const CardioCardStyles = StyleSheet.create({
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
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: RFPercentage(1),
  },
  imageContainer: {borderRadius: RFPercentage(1), overflow: 'hidden'},
  repsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default CardioCardStyles;
