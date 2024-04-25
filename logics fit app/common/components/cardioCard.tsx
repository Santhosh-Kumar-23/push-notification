import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {Card, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Assets from '../../assets';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import CardioCardStyles from '../../styles/otherStyles/cardioCard';
import * as Styles from '../styles';

const CardioCard: FC<Interfaces.CardioCardInterface> = (
  props: Interfaces.CardioCardInterface,
) => {
  // Props Variables
  const {index, item, onPress} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const {CommonStyles} = Styles;
  const duration: string = item?.duration ?? '';
  const image: string = item?.imageUrl ?? '';
  const imageType: string = item?.imageType ?? '';
  const equipment: string = item?.equipment ?? '';
  const reps: string = item?.reps ?? '';
  const status: string = item?.status ?? '';
  const title: string = item?.title ?? '';

  return (
    <View key={index} style={Styles.margin(0, RFPercentage(1))}>
      <Card
        contentStyle={CardioCardStyles.cardContainer}
        mode={Constants.CD_MODE_CONTAINED}
        onPress={onPress}
        style={Styles.backgroundColor(Colors.DARK_GRAY)}>
        <Card.Content style={CardioCardStyles.cardInnerContainerI}>
          <View style={CardioCardStyles.cardLabelContainerI}>
            <Text
              style={Styles.textView(
                RFPercentage(1.8),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(2.109),
              )}>
              {equipment}
            </Text>
          </View>
          <View style={CardioCardStyles.cardLabelContainerII}>
            <Text
              style={Styles.textView(
                RFPercentage(1),
                'Roboto-Regular',
                colors.primary,
                RFPercentage(1.172),
                'right',
              )}>
              {status}
            </Text>
          </View>
        </Card.Content>
        <Card.Content style={CardioCardStyles.cardInnerContainerII}>
          <View
            style={[
              CommonStyles.centered,
              Styles.imageView(RFPercentage(9), RFPercentage(9)),
              CardioCardStyles.imageContainer,
            ]}>
            <Image
              resizeMode={Constants.COVER}
              source={{uri: `data:image/${imageType};base64,${image}`}}
              style={Styles.imageView('100%', '100%')}
            />
          </View>
          <View
            style={[
              Styles.flex(1),
              Styles.paddingHorizontal(RFPercentage(1.5), 0),
              Styles.paddingVertical(RFPercentage(0.75), RFPercentage(0.75)),
            ]}>
            <Text
              style={Styles.textView(
                RFPercentage(1.6),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(1.875),
              )}>
              {title}
            </Text>
            <View style={CardioCardStyles.durationContainer}>
              <Image
                resizeMode={Constants.COVER}
                source={Assets.TIMER}
                style={Styles.imageView(RFPercentage(1.8), RFPercentage(1.8))}
                tintColor={colors.outlineVariant}
              />
              <View style={Styles.paddingHorizontal(RFPercentage(0.5), 0)}>
                <Text
                  style={Styles.textView(
                    RFPercentage(1.2),
                    'Roboto-Regular',
                    colors.outlineVariant,
                    RFPercentage(1.406),
                  )}>
                  {duration}
                </Text>
              </View>
            </View>
            <View style={CardioCardStyles.repsContainer}>
              <Image
                resizeMode={Constants.COVER}
                source={Assets.CALENDAR}
                style={Styles.imageView(RFPercentage(1.8), RFPercentage(1.8))}
                tintColor={colors.outlineVariant}
              />
              <View style={Styles.paddingHorizontal(RFPercentage(0.5), 0)}>
                <Text
                  style={Styles.textView(
                    RFPercentage(1.2),
                    'Roboto-Regular',
                    colors.outlineVariant,
                    RFPercentage(1.406),
                  )}>
                  {reps}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CardioCard;
