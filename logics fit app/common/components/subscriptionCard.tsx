import moment from 'moment';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {Card, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import SubscriptionCardStyles from '../../styles/otherStyles/subscriptionCard';
import * as Styles from '../styles';

const SubscriptionCard: FC<Interfaces.SubscriptionCardInterface> = (
  props: Interfaces.SubscriptionCardInterface,
) => {
  // Props Variables
  const {checked = false, index, isRenew = false, item, onPress} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const currency: string = item?.currency ?? '';
  const description: string = item?.description ?? '';
  const discount: number = item?.discount ?? Constants.ZERO;
  const checkForDiscount: boolean = Boolean(discount);
  const expiryDate: Date | null = item?.expiryDate ?? null;
  const checkForExpiryDate: boolean = Boolean(expiryDate);
  const price: number = item?.price ?? Constants.ZERO;
  const status: null | string = item?.status ?? '';
  const checkForStatus: boolean = Boolean(status);
  const title: string = item?.title ?? '';
  const checkForExpiryDateAndStatus: boolean =
    checkForExpiryDate && checkForStatus && isRenew;

  return (
    <Card
      contentStyle={[
        Styles.borderColor(colors.primary),
        SubscriptionCardStyles.cardContainer,
      ]}
      key={index}
      mode={Constants.CD_MODE_OUTLINED}
      onPress={onPress}
      style={[
        Styles.backgroundColor(checked ? Colors.PRIMARY_02 : Colors.DARK_GRAY),
        Styles.margin(0, RFPercentage(0.8)),
      ]}>
      {checkForExpiryDateAndStatus && (
        <View
          style={[
            Styles.backgroundColor(colors.primary),
            SubscriptionCardStyles.mySubscriptionContainer,
          ]}>
          <Text
            style={Styles.textView(
              RFPercentage(1),
              'Roboto-Bold',
              colors.background,
              RFPercentage(1.172),
              'center',
            )}>
            {Constants.MY_SUBSCRIPTION}
          </Text>
        </View>
      )}
      <Card.Content>
        <Text
          style={[
            Styles.textView(
              RFPercentage(2.2),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(2.8),
            ),
            Styles.paddingVertical(
              RFPercentage(0.5),
              RFPercentage(checkForExpiryDateAndStatus ? 1 : 1.5),
            ),
          ]}>
          {title} {Constants.SUBSCRIPTION}
        </Text>
        <View
          style={[
            SubscriptionCardStyles.rowContainer,
            Styles.padding(0, RFPercentage(0.5)),
          ]}>
          <Text
            style={Styles.textView(
              RFPercentage(1.2),
              'Roboto-Bold',
              colors.primary,
              RFPercentage(1.641),
            )}>
            {currency} {price}
          </Text>
          {checkForDiscount && (
            <View
              style={[
                Styles.backgroundColor(colors.primary),
                SubscriptionCardStyles.discountContainer,
              ]}>
              <Text
                style={Styles.textView(
                  RFPercentage(1),
                  'Roboto-Regular',
                  colors.background,
                  RFPercentage(1.172),
                )}>
                {Constants.SAVE} {discount}
                {Constants.PERCENTAGE_SYM}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[
            Styles.textView(
              RFPercentage(1.2),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(1.406),
            ),
            Styles.paddingVertical(
              RFPercentage(checkForExpiryDateAndStatus ? 0.5 : 1),
              RFPercentage(0.5),
            ),
          ]}>
          {description}
        </Text>
        {checkForExpiryDateAndStatus && (
          <View
            style={[
              SubscriptionCardStyles.rowContainer,
              Styles.paddingVertical(0, RFPercentage(0.5)),
            ]}>
            <Text
              style={Styles.textView(
                RFPercentage(1),
                'Roboto-Bold',
                colors.onSurface,
                RFPercentage(1.172),
              )}>
              {status}
            </Text>
            <View
              style={[
                Styles.backgroundColor(Colors.GREEN),
                Styles.borderColor(colors.surface),
                Styles.imageView(RFPercentage(0.667), RFPercentage(0.667)),
                SubscriptionCardStyles.dotsContainer,
              ]}
            />
            <Text
              style={Styles.textView(
                RFPercentage(1),
                'Roboto-Bold',
                colors.onSurface,
                RFPercentage(1.172),
              )}>
              {Constants.EXPIRED_IN}{' '}
              {moment(expiryDate).format(Constants.DDMMYYYY)}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default SubscriptionCard;
