import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const DashboardStyles = StyleSheet.create({
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
  container: {
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  nutritionCardChartContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nutritionCardNutritionsContainer: {
    alignSelf: 'center',
    flex: 0.675,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(1.2),
  },
  nutritionCardNutritionsItemContainer: {
    borderLeftWidth: RFPercentage(0.3),
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1.2),
    width: '50%',
  },
  nutritionCardNutritionsItemUnitValueContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  skeletonNutritionCardContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(18.5),
    width: '100%',
  },
  skeletonStepsContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(9.5),
    width: '100%',
  },
  skeletonWellnessCardContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(25),
    width: '100%',
  },
  stepsCardStepsUnitValueContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  wellnessCardWellnessesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wellnessCardWellnessesItemContainer: {
    borderRadius: RFPercentage(1),
    borderWidth: RFPercentage(0.1),
    marginVertical: RFPercentage(1),
    padding: RFPercentage(1),
    width: '48.75%',
  },
});

export default DashboardStyles;
