import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {Card, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import NutritionCardStyles from '../../styles/otherStyles/nutritionCard';
import * as Styles from '../styles';

const NutritionCard: FC<Interfaces.NutritionCardInterface> = (
  props: Interfaces.NutritionCardInterface,
) => {
  // Props Variables
  const {index, item, onPress} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const calories: number | string = item?.calories || Constants.ZERO || '';
  const foodDetails: Interfaces.NutritionFoodDetailsInterface[] =
    item?.food_details ?? [];
  const checkForFoodDetails: boolean =
    Array.isArray(foodDetails) && foodDetails.length > Constants.ZERO;
  const title: string = item?.title ?? '';

  const description = item?.description
    ? item.description
    : foodDetails
        .slice(0, 2)
        .map(({label}) => label)
        .join(', ');

  // Functions
  const renderFoodDetails = (): React.JSX.Element => {
    return (
      <View style={NutritionCardStyles.detailsContainer}>
        {foodDetails.flatMap(
          (item: Interfaces.NutritionFoodDetailsInterface, index: number) => {
            const label: string = item.label;

            const unit: string = item.unit;

            const value: number = item.value;

            return (
              <View
                key={index}
                style={NutritionCardStyles.detailsItemContainer}>
                <View style={NutritionCardStyles.detailsItemSubContainer}>
                  <View style={Styles.padding(RFPercentage(0.5), 0)}>
                    <MaterialIcons
                      color={colors.surface}
                      name={'fiber-manual-record'}
                      size={RFPercentage(0.5)}
                    />
                  </View>
                  <Text
                    style={Styles.textView(
                      RFPercentage(1.2),
                      'Roboto-Regular',
                      colors.surface,
                      RFPercentage(1.8),
                    )}>
                    {label}
                  </Text>
                  <View
                    style={NutritionCardStyles.detailsItemUnitValueContainer}>
                    <Text
                      style={Styles.textView(
                        RFPercentage(1),
                        'Roboto-Regular',
                        colors.onSurface,
                        RFPercentage(1.8),
                      )}>
                      {value} {unit}
                    </Text>
                  </View>
                </View>
              </View>
            );
          },
        )}
      </View>
    );
  };

  return (
    <View key={index} style={Styles.margin(0, RFPercentage(1))}>
      <Card
        contentStyle={NutritionCardStyles.cardContainer}
        mode={Constants.CD_MODE_CONTAINED}
        onPress={onPress}
        style={Styles.backgroundColor(Colors.DARK_GRAY)}>
        <Card.Content style={NutritionCardStyles.cardInnerContainer}>
          <View style={NutritionCardStyles.cardLabelContainerI}>
            <Text
              style={Styles.textView(
                RFPercentage(2),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(2.344),
              )}>
              {title}
            </Text>
          </View>
          <View style={NutritionCardStyles.cardLabelContainerII}>
            <Text
              style={Styles.textView(
                RFPercentage(1.8),
                'Roboto-Regular',
                colors.primary,
                RFPercentage(2.109),
                'right',
              )}>
              {calories} {Constants.CAL_UNIT}
            </Text>
          </View>
        </Card.Content>
        <Card.Content
          style={Styles.paddingVertical(
            RFPercentage(1.25),
            RFPercentage(1.25),
          )}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(1.875),
            )}>
            {description}
          </Text>
          {checkForFoodDetails && renderFoodDetails()}
        </Card.Content>
      </Card>
    </View>
  );
};

export default NutritionCard;
