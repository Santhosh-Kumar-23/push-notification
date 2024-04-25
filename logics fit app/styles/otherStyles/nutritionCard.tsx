import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const NutritionCardStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: RFPercentage(1),
    paddingHorizontal: RFPercentage(0.4),
    paddingVertical: RFPercentage(0.4),
  },
  cardInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: RFPercentage(1),
  },
  detailsItemContainer: {
    marginVertical: RFPercentage(0.125),
    width: '48.75%',
  },
  detailsItemSubContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailsItemUnitValueContainer: {
    paddingHorizontal: RFPercentage(0.25),
    top: 0.75,
  },
});

export default NutritionCardStyles;
