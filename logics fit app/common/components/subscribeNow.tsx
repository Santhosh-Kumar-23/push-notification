import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {Card, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Interfaces from '../../configs/ts/interfaces';
import SubscribeNowStyles from '../../styles/otherStyles/subscribeNow';
import SubscriptionCardStyles from '../../styles/otherStyles/subscriptionCard';
import * as Styles from '../styles';
import * as Colors from '../utils/colors';
import * as Constants from '../utils/constants';
import SkeletonPlaceholder from './skeletonPlaceholder';

const SubscribeNow: FC<Interfaces.SubscribeNowInterface> = (
  props: Interfaces.SubscribeNowInterface,
) => {
  // Props Variables
  const {customCardStyle, loading = false, navigation, subscriptions} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const {CommonStyles} = Styles;
  const checkForSubscriptions: boolean =
    Array.isArray(subscriptions) && subscriptions.length > Constants.ZERO;

  // Functions
  const renderSubscriptionItem = (
    item: Interfaces.SubscriptionCardDataInterface,
    index: number,
  ): React.JSX.Element => {
    const currency: string = item.currency;

    const discount: null | number = item.discount;

    const checkForDiscount: boolean = Boolean(discount);

    const price: number = item.price;

    const title: string = item.title;

    return (
      <View key={index} style={SubscribeNowStyles.itemContainer}>
        <View style={SubscribeNowStyles.itemTitleContainer}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Bold',
              colors.surface,
              RFPercentage(1.875),
              'center',
            )}>
            {title}
          </Text>
          {checkForDiscount && (
            <View
              style={[
                Styles.backgroundColor(colors.primary),
                SubscribeNowStyles.itemDiscountContainer,
              ]}>
              <Text
                style={Styles.textView(
                  RFPercentage(1),
                  'Roboto-Regular',
                  colors.surface,
                  RFPercentage(1.172),
                )}>
                {discount} {Constants.PERCENTAGE_SYM}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[
            Styles.textView(
              RFPercentage(1.4),
              'Roboto-Bold',
              colors.primary,
              RFPercentage(1.641),
              'center',
            ),
            Styles.paddingVertical(0, RFPercentage(0.5)),
          ]}>
          {currency} {price}
        </Text>
      </View>
    );
  };

  return (
    <View style={[Styles.margin(0, RFPercentage(1)), customCardStyle]}>
      {!loading ? (
        <Card
          contentStyle={[
            Styles.borderColor(colors.primary),
            SubscriptionCardStyles.cardContainer,
          ]}
          mode={Constants.CD_MODE_OUTLINED}
          onPress={(): void => {
            navigation.navigate(Constants.SUBSCRIPTIONS);
          }}
          style={Styles.backgroundColor(Colors.DARK_GRAY)}>
          <Card.Content>
            <Text
              style={Styles.textView(
                RFPercentage(2.2),
                'Roboto-Regular',
                colors.surface,
                RFPercentage(2.8),
              )}>
              {Constants.SUBSCRIBE_NOW}
            </Text>
            {checkForSubscriptions && (
              <>
                <View style={SubscribeNowStyles.container}>
                  {subscriptions
                    .slice(Constants.ZERO, Constants.THREE)
                    .flatMap(
                      (
                        item: Interfaces.SubscriptionCardDataInterface,
                        index: number,
                      ) => renderSubscriptionItem(item, index),
                    )}
                </View>
                <View style={SubscribeNowStyles.descriptionContainer}>
                  <View style={[Styles.flex(0.0625), CommonStyles.centered]}>
                    <MaterialIcons
                      color={Colors.GREEN}
                      name={Constants.ICON_INFO}
                      size={RFPercentage(2)}
                    />
                  </View>
                  <View style={SubscribeNowStyles.descriptionSubContainer}>
                    <Text
                      style={Styles.textView(
                        RFPercentage(1.2),
                        'Roboto-Regular',
                        colors.surface,
                        RFPercentage(1.406),
                      )}>
                      {Constants.SUBSCRIBE_DESCRIPTION}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </Card.Content>
        </Card>
      ) : (
        <SkeletonPlaceholder>
          <View style={SubscribeNowStyles.skeletonConatiner} />
        </SkeletonPlaceholder>
      )}
    </View>
  );
};

export default SubscribeNow;
