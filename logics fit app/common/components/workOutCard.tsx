import React, {FC, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {Card, Divider, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Assets from '../../assets';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import WorkOutCardStyles from '../../styles/otherStyles/workOutCard';
import * as Styles from '../styles';
import WeightPopup from './weightPopup';

const WorkOutCard: FC<Interfaces.WorkOutCardInterface> = (
  props: Interfaces.WorkOutCardInterface,
) => {
  // Props Variables
  const {
    index,
    item,
    onPlayVideo = (videoId: string) => {},
    onPress,
    onUpdateWeight = (weight: string, workOutId: number) => {},
  } = props;

  // UseState Variables
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [selectedWorkOutId, setSelectedWorkOutId] = useState<number>(
    Constants.ZERO,
  );
  const [weight, setWeight] = useState<string>('');

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const workOutDetails: Interfaces.WorkOutDetailsInterface[] =
    item?.workout_details ?? [];
  const checkForWorkOutDetails: boolean =
    Array.isArray(workOutDetails) && workOutDetails.length > Constants.ZERO;
  const title: string = item?.title ?? '';

  // Functions
  const renderWorkOutDetails = (): React.JSX.Element => {
    const renderItem = (
      item: Interfaces.WorkOutDetailsInterface,
      index: number,
    ): React.JSX.Element => {
      const description: string = item.description;

      const label: string = item.label;

      let sNo: number | string = index + Constants.ONE;
      sNo = index < Constants.TEN ? `${Constants.ZERO}${sNo}` : sNo;

      const url: string = item.url;

      const id: number = item.id;

      const weight: number = item.weight;

      const checkForUrl: boolean = Boolean(url);

      const videoId: string = checkForUrl
        ? url.split('?v=').pop() || url.split('/').pop() || ''
        : '';

      const checkForVideoId: boolean = Boolean(videoId);

      const checkForWeight: boolean = Boolean(weight);

      const handleCardPress = (): void => {
        setSelectedWorkOutId(id);

        setWeight(checkForWeight ? weight.toString() : '');

        setPopupVisible(true);
      };

      return (
        <Pressable
          key={index}
          style={WorkOutCardStyles.detailsContainer}
          onPress={(): void => {
            handleCardPress();
          }}>
          <View
            style={[
              Styles.backgroundColor(colors.primary),
              WorkOutCardStyles.detailsSNoContainer,
            ]}>
            <Text
              style={Styles.textView(
                RFPercentage(1.6),
                'Roboto-Bold',
                Colors.DARK_GRAY,
                RFPercentage(1.875),
                'center',
              )}>
              {sNo}
            </Text>
          </View>
          <View style={WorkOutCardStyles.detailsDescriptionLabelContainer}>
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.surface,
                RFPercentage(1.641),
              )}>
              {label}
            </Text>
            <Text
              style={Styles.textView(
                RFPercentage(1),
                'Roboto-Regular',
                colors.onSurface,
                RFPercentage(1.172),
              )}>
              {description}
            </Text>
          </View>
          {checkForWeight && (
            <View
              style={[
                Styles.backgroundColor(colors.primary),
                WorkOutCardStyles.detailsweightContainer,
              ]}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.6),
                  'Roboto-Bold',
                  Colors.DARK_GRAY,
                  RFPercentage(1.875),
                  'center',
                )}>
                {weight}
              </Text>
            </View>
          )}
          <Pressable
            onPress={(): void => {
              onPlayVideo(videoId);
            }}
            style={WorkOutCardStyles.detailsPlayVideoContainer}>
            <View style={Styles.padding(RFPercentage(0.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1),
                  'Roboto-Regular',
                  checkForVideoId ? colors.onSurface : colors.surfaceDisabled,
                  RFPercentage(1.172),
                )}>
                {Constants.PLAY_VIDEO}
              </Text>
            </View>
            <View style={Styles.padding(RFPercentage(0.5), 0)}>
              <Image
                resizeMode={Constants.COVER}
                source={Assets.VIDEO}
                style={Styles.imageView(RFPercentage(2.4), RFPercentage(2.4))}
                tintColor={
                  checkForVideoId ? colors.surface : colors.surfaceDisabled
                }
              />
            </View>
          </Pressable>
        </Pressable>
      );
    };

    return (
      <FlatList
        data={workOutDetails}
        ItemSeparatorComponent={(): React.JSX.Element => (
          <Divider style={Styles.backgroundColor(colors.onSurface)} />
        )}
        keyExtractor={(
          _: Interfaces.WorkOutDetailsInterface,
          index: number,
        ): string => index.toString()}
        renderItem={({item, index}): any => renderItem(item, index)}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const handleDismiss = (): void => {
    setSelectedWorkOutId(Constants.ZERO);

    setWeight('');

    setPopupVisible(false);
  };

  return (
    <View key={index}>
      <View style={Styles.margin(0, RFPercentage(1))}>
        <Card
          contentStyle={WorkOutCardStyles.cardContainer}
          mode={Constants.CD_MODE_CONTAINED}
          onPress={onPress}
          style={Styles.backgroundColor(Colors.DARK_GRAY)}>
          <Card.Content>
            <Text
              style={Styles.textView(
                RFPercentage(1.8),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(2.109),
              )}>
              {title}
            </Text>
          </Card.Content>
          <Card.Content
            style={Styles.paddingVertical(
              RFPercentage(1.25),
              RFPercentage(1.25),
            )}>
            {checkForWorkOutDetails && renderWorkOutDetails()}
          </Card.Content>
        </Card>
      </View>

      <WeightPopup
        onDismiss={(): void => {
          handleDismiss();
        }}
        onRetain={(weight: string): void => {
          onUpdateWeight(weight, selectedWorkOutId);

          handleDismiss();
        }}
        value={weight}
        visible={popupVisible}
      />
    </View>
  );
};

export default WorkOutCard;
