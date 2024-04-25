import moment from 'moment';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {Card, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import NotificationCardStyles from '../../styles/otherStyles/notificationCard';
import * as Styles from '../styles';

const NotificationCard: FC<Interfaces.NotificationCardInterface> = (
  props: Interfaces.NotificationCardInterface,
) => {
  // Props Variables
  const {index, item, onPress} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const body: string = item?.body ?? '';
  const date: Date | string = item?.date ?? '';
  const isNew: boolean = item?.isNew ?? false;
  const checkForIsNew: boolean = Boolean(isNew);

  return (
    <View key={index} style={Styles.margin(0, RFPercentage(1))}>
      <Card
        contentStyle={NotificationCardStyles.cardContainer}
        mode={Constants.CD_MODE_CONTAINED}
        onPress={onPress}
        style={Styles.backgroundColor(Colors.DARK_GRAY)}>
        <Card.Content style={NotificationCardStyles.cardInnerContainer}>
          {checkForIsNew && (
            <View
              style={[
                NotificationCardStyles.dotContainer,
                Styles.backgroundColor(colors.primary),
                Styles.borderColor(colors.surface),
                Styles.imageView(RFPercentage(0.8), RFPercentage(0.8)),
              ]}
              key={index}
            />
          )}
          <View
            style={Styles.marginHorizontal(
              checkForIsNew ? RFPercentage(0.5) : 0,
              0,
            )}>
            <Text
              style={Styles.textView(
                RFPercentage(1.2),
                'Roboto-Bold',
                colors.onSurface,
                RFPercentage(1.406),
              )}>
              {moment(date).format(Constants.l_LT)}
            </Text>
          </View>
        </Card.Content>
        <Card.Content
          style={Styles.paddingVertical(
            RFPercentage(1.25),
            RFPercentage(0.75),
          )}>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(1.641),
            )}>
            {body}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default NotificationCard;
