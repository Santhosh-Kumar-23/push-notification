import React, {FC, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Card, Divider, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import * as Assets from '../../assets';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import UpdateStyles from '../../styles/appStyles/update';

const Update: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Other Variables
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const {colors}: MD3Theme = useTheme();
  const {CommonStyles} = Styles;
  // const checkForUpdate: boolean =
  // Array.isArray(cardios) && cardios.length > Constants.ZERO;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const loader: boolean = fetchingStatus || refreshing;

  const updates = [
    {
      title: 'Current Weight',
      unit: '90Kg',
      date: '02/4/2024 at 9:00pm',
      images: [
        {
          imageSource: Constants.BASE1,
        },
        {
          imageSource: Constants.BASE,
        },
        {
          imageSource: Constants.BASE1,
        },
      ],
      bodyQuality: [
        {
          point: 4.8,
          label: 'Sleep',
          icon: Assets.SLEEP,
        },
        {
          point: 5.8,
          label: 'Stress',
          icon: Assets.STRESS,
        },
        {
          point: 4.8,
          label: 'Hunger',
          icon: Assets.HUNGER,
        },
        {
          point: 4.8,
          label: 'Energy',
          icon: Assets.FATIGUE,
        },
      ],
    },
  ];

  const onRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, Constants.SET_TIMEOUT_2500);
  };

  const renderDivider = (isVertical: boolean = !false) => {
    return isVertical ? (
      <View style={UpdateStyles.verticalDividerContainer}>
        <Divider />
        <View
          style={[
            Styles.backgroundColor(colors.primary),
            Styles.imageView(RFPercentage(3.6), RFPercentage(0.325)),
          ]}
        />
      </View>
    ) : (
      <Divider style={Styles.margin(0, RFPercentage(1))} />
    );
  };

  const renderUpdate = (): React.JSX.Element => {
    return !loader ? (
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text
            style={Styles.textView(
              RFPercentage(2.2),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(2.8),
            )}>
            {Constants.UPDATE}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Regular',
              colors.primary,
              RFPercentage(2.8),
            )}>
            {Constants.ADD_PICTURES}
          </Text>
        </View>
        <View style={CommonStyles.centered}>
          <MaterialIcons
            onPress={() => {
              navigation.navigate(Constants.UPDATION);
            }}
            color={colors.primary}
            name={Constants.ADD}
            size={RFPercentage(3)}
          />
        </View>
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={UpdateStyles.skeletonUpdateContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderUpdates = (): React.JSX.Element => {
    const renderUpdateCardSkeleton = (): React.JSX.Element => {
      return (
        <SkeletonPlaceholder>
          <View style={UpdateStyles.skeletonUpdateCardConatiner} />
        </SkeletonPlaceholder>
      );
    };

    const renderNoUpdates = () => {
      return (
        <View style={[Styles.flex(1), CommonStyles.centered]}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(2),
              'center',
            )}>
            {Constants.NO_UPDATES_FOUND}
          </Text>
        </View>
      );
    };

    return (
      <View style={[Styles.flex(1), Styles.margin(0, RFPercentage(1.6))]}>
        {!fetchingStatus ? (
          true ? (
            <FlatList
              data={updates}
              keyExtractor={(
                _: Interfaces.UpdateCardDataInterface,
                index: number,
              ): string => index.toString()}
              renderItem={({item, index}): any => {
                return !loader ? (
                  <View key={index} style={Styles.margin(0, RFPercentage(1))}>
                    <Card
                      contentStyle={UpdateStyles.cardContainer}
                      mode={Constants.CD_MODE_CONTAINED}
                      // onPress={onPress}
                      style={Styles.backgroundColor(Colors.DARK_GRAY)}>
                      <Card.Content style={UpdateStyles.cardInnerContainerI}>
                        <View style={UpdateStyles.cardLabelContainerI}>
                          <Text
                            style={Styles.textView(
                              RFPercentage(1.8),
                              'Roboto-Bold',
                              colors.surface,
                              RFPercentage(2.109),
                            )}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={UpdateStyles.cardLabelContainerII}>
                          <Text
                            style={Styles.textView(
                              RFPercentage(1.8),
                              'Roboto-Regular',
                              colors.primary,
                              RFPercentage(2.109),
                              'right',
                            )}>
                            {item.unit}
                          </Text>
                        </View>
                      </Card.Content>
                      <Card.Content
                        style={{
                          marginVertical: RFPercentage(1.5),
                        }}>
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                          }}>
                          {item.images.flatMap((lol, index) => {
                            return (
                              <View style={{width: '33.33%'}} key={index}>
                                <View
                                  style={[
                                    Styles.imageView(
                                      RFPercentage(10),
                                      RFPercentage(10),
                                    ),
                                  ]}>
                                  <Image
                                    resizeMode="cover"
                                    style={{
                                      height: '100%',
                                      width: '100%',
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${lol.imageSource}`,
                                    }}
                                  />
                                </View>
                              </View>
                            );
                          })}
                        </View> */}
                        <FlatList
                          scrollEnabled={false}
                          data={item.images}
                          style={{
                            backgroundColor: colors.surface,
                          }}
                          numColumns={3}
                          renderItem={({item, index}): any => {
                            return (
                              <Image
                                key={index}
                                height={100}
                                resizeMode="cover"
                                style={{
                                  aspectRatio: Constants.ONE,
                                  flex: Constants.ONE / Constants.THREE,
                                  margin: 0.3,
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                                width={100}
                                source={{
                                  uri: `data:image/png;base64,${item.imageSource}`,
                                }}
                              />
                            );
                          }}
                        />
                      </Card.Content>
                      <Card.Content
                        style={{
                          marginVertical: RFPercentage(1.5),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginEnd: RFPercentage(2),
                          }}>
                          {item.bodyQuality.map((item, index) => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <View>{renderDivider(true)}</View>
                                <View
                                  style={{
                                    marginLeft: RFPercentage(1),
                                  }}>
                                  <Text
                                    style={Styles.textView(
                                      RFPercentage(2.0),
                                      'Roboto-Regular',
                                      colors.surface,
                                      RFPercentage(2.344),
                                    )}>
                                    {item.point}
                                  </Text>
                                  <Text
                                    style={Styles.textView(
                                      RFPercentage(1.2),
                                      'Roboto-Regular',
                                      colors.surface,
                                      RFPercentage(1.406),
                                    )}>
                                    {item.label}
                                  </Text>
                                </View>
                                <View>
                                  <Image
                                    resizeMode={Constants.COVER}
                                    source={item.icon}
                                    style={Styles.imageView(
                                      RFPercentage(2.0),
                                      RFPercentage(2.0),
                                    )}
                                    tintColor={colors.surface}
                                  />
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      </Card.Content>
                      <Card.Content>
                        <Text
                          style={Styles.textView(
                            RFPercentage(1.0),
                            'Roboto-Regular',
                            colors.onSurface,
                            RFPercentage(1.174),
                          )}>
                          {item.date}
                        </Text>
                      </Card.Content>
                    </Card>
                  </View>
                ) : (
                  renderUpdateCardSkeleton()
                );
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderNoUpdates()
          )
        ) : (
          <>
            {renderUpdateCardSkeleton()}
            {renderUpdateCardSkeleton()}
            {renderUpdateCardSkeleton()}
            {renderUpdateCardSkeleton()}
            {renderUpdateCardSkeleton()}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={Styles.screenContainer(colors.background)}>
      <ScrollView
        contentContainerStyle={[
          CommonStyles.defaultFlexGrow,
          UpdateStyles.container,
        ]}
        keyboardShouldPersistTaps={Constants.SCROLL_PERSIST_TAPS_HANDLED}
        refreshControl={
          <RefreshControl
            enabled={true}
            onRefresh={(): void => {
              onRefresh();
            }}
            refreshing={refreshing}
            tintColor={colors.primary}
          />
        }
        // scrollEnabled={checkForCardios}
        showsVerticalScrollIndicator={false}>
        {renderUpdate()}
        {renderUpdates()}
      </ScrollView>
    </View>
  );
};

export default Update;
