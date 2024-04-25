import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {FC, useCallback, useState} from 'react';
import {
  RefreshControl,
  ScaledSize,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {LineChart, PieChart} from 'react-native-gifted-charts';
import {Card, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import SubscribeNow from '../../common/components/subscribeNow';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import DashboardStyles from '../../styles/appStyles/dashboard';

const Dashboard: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Other Variables
  const dispatch: any = useDispatch();
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const {colors}: MD3Theme = useTheme();
  const {width}: ScaledSize = useWindowDimensions();
  const {StatusCodes} = Enums;
  const {CommonStyles} = Styles;
  const donutData: Interfaces.DonutDataInterface[] = [
    {
      color: Colors.PRIMARY_03,
      value: 50,
    },
    {color: Colors.PRIMARY_06, value: 55},
    {color: Colors.PRIMARY, value: 25},
    {color: Colors.ANAKIWA, value: 45},
  ];
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const lastUpdate: string =
    appReduxStates.dashboardNutritionsDetails.lastUpdate;
  const nutritions: Interfaces.DashboardNutritionCardDataInterface[] =
    appReduxStates.dashboardNutritions;
  const checkForNutritions: boolean =
    Array.isArray(nutritions) && nutritions.length > Constants.ZERO;
  const checkForNutritionsValueZeros: boolean = checkForNutritions
    ? nutritions.every(
        (nutritionData: Interfaces.DashboardNutritionCardDataInterface) =>
          nutritionData.value == Constants.ZERO,
      )
    : false;
  const totalCalories: number =
    appReduxStates.dashboardNutritionsDetails.totalCalories;
  const subscriptions: Interfaces.SubscriptionCardDataInterface[] =
    appReduxStates.subscriptions;
  const checkForsubscriptions: boolean =
    Array.isArray(subscriptions) && subscriptions.length > Constants.ZERO;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const wellnesses: Interfaces.WellnessDataInterface[] = [
    {
      label: 'Stress',
      value: 0,
    },
    {
      label: 'Energy',
      value: 0,
    },
    {
      label: 'Sleep',
      value: 0,
    },
    {
      label: 'Hunger',
      value: 0,
    },
  ];

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      loadAPIs();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
  const loadAPIs = (): void => {
    handleSubscriptionDetailsAPI();

    handleMacroDetailsAPI();
  };

  const handleMacroDetailsAPI = (): void => {
    const userId: number = user?.id ?? Constants.ZERO;

    const requestData: Interfaces.MarcoDetailsRequestInterface = {
      user_id: userId,
    };

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('MACRO DETAILS REQUEST DATA::: ', requestData);

    dispatch(
      Actions.getMacroDetails(
        requestData,
        (response: Interfaces.APIResponseInterface): void => {
          const responseData: Interfaces.MarcoDetailsResponeInterface =
            response.data;

          const responseType: number = response.type;

          switch (responseType) {
            case StatusCodes.SUCCESS:
              const lastUpdate: string = responseData.last_update;

              const macroDetails: Interfaces.DashboardNutritionCardDataInterface[] =
                responseData.macro_details;

              const totalCalories: number = responseData.total_calories;

              dispatch(Actions.storeDashboardNutritions(macroDetails));

              dispatch(
                Actions.storeDashboardNutritionsDetails({
                  lastUpdate,
                  totalCalories,
                }),
              );

              break;

            default:
              dispatch(Actions.storeDashboardNutritions([]));
              break;
          }

          setRefreshing(false);
        },
      ),
    );
  };

  const handleSubscriptionDetailsAPI = (): void => {
    const userId: number = user?.id ?? Constants.ZERO;

    const requestData: Interfaces.SubscriptionDetailsRequestInterface = {
      user_id: userId,
    };

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('SUBSCRIPTION DETAILS REQUEST DATA::: ', requestData);

    dispatch(
      Actions.getSubscriptionDetails(
        requestData,
        (response: Interfaces.APIResponseInterface): void => {
          const responseData: Interfaces.SubscriptionDetailsResponseInterface =
            response.data;

          const responseType: number = response.type;

          switch (responseType) {
            case StatusCodes.SUCCESS:
              let subscriptionDetails: Interfaces.SubscriptionCardDataInterface[] =
                responseData.subscription_details;

              subscriptionDetails = subscriptionDetails.filter(
                (lol: Interfaces.SubscriptionCardDataInterface): boolean =>
                  Boolean(lol.status),
              );

              dispatch(Actions.storeSubscriptions(subscriptionDetails));
              break;

            default:
              break;
          }

          setRefreshing(false);
        },
      ),
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    loadAPIs();
  };

  const renderSubscribeNow = (): React.JSX.Element => {
    const loader: boolean =
      (fetchingStatus && !checkForsubscriptions) || refreshing;

    return (
      <SubscribeNow
        customCardStyle={Styles.marginVertical(0, 0)}
        loading={loader}
        navigation={navigation}
        subscriptions={subscriptions}
      />
    );
  };

  const renderNutrition = (): React.JSX.Element => {
    const loader: boolean =
      (fetchingStatus && !checkForNutritions) || refreshing;

    const renderDonutCenterComponent = (): React.JSX.Element => {
      return (
        <View style={CommonStyles.centered}>
          <Text
            style={Styles.textView(
              RFPercentage(2),
              'Roboto-Bold',
              colors.surface,
              RFPercentage(2.344),
              'center',
            )}>
            {totalCalories}
          </Text>
          <Text
            style={Styles.textView(
              RFPercentage(1.2),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(1.406),
              'center',
            )}>
            {Constants.CALORIES}
          </Text>
        </View>
      );
    };

    return !loader ? (
      <Card
        contentStyle={DashboardStyles.cardContainer}
        mode={Constants.CD_MODE_CONTAINED}
        onPress={(): void => {}}
        style={Styles.backgroundColor(Colors.DARK_GRAY)}>
        <Card.Content style={DashboardStyles.cardInnerContainer}>
          <View style={DashboardStyles.cardLabelContainerI}>
            <Text
              style={Styles.textView(
                RFPercentage(1.6),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(1.875),
              )}>
              {Constants.NUTRITION}
            </Text>
          </View>
          <View style={DashboardStyles.cardLabelContainerII}>
            <Text
              style={Styles.textView(
                RFPercentage(1),
                'Roboto-Regular',
                colors.primary,
                RFPercentage(1.172),
                'right',
              )}>
              {Constants.LAST_UPDATE}{' '}
              {moment(lastUpdate).format(Constants.l_LT)}
            </Text>
          </View>
        </Card.Content>
        <Card.Content
          style={[
            DashboardStyles.cardInnerContainer,
            Styles.paddingVertical(RFPercentage(1.25), RFPercentage(1.25)),
          ]}>
          <View style={DashboardStyles.nutritionCardChartContainer}>
            <PieChart
              centerLabelComponent={(): React.JSX.Element =>
                renderDonutCenterComponent()
              }
              data={checkForNutritionsValueZeros ? donutData : nutritions}
              donut={true}
              focusOnPress={true}
              isAnimated={true}
              initialAngle={225}
              innerCircleColor={Colors.DARK_GRAY}
              innerRadius={width * 0.0875}
              radius={width * 0.1125}
              sectionAutoFocus={true}
            />
          </View>
          <View style={DashboardStyles.nutritionCardNutritionsContainer}>
            {nutritions.flatMap(
              (
                item: Interfaces.DashboardNutritionCardDataInterface,
                index: number,
              ) => {
                const color: string = item.color;

                const label: string = item.label;

                const unit: string = item.unit;

                const value: number | string = item.value;

                return (
                  <View
                    key={index}
                    style={[
                      DashboardStyles.nutritionCardNutritionsItemContainer,
                      Styles.borderColor(color),
                    ]}>
                    <View
                      style={
                        DashboardStyles.nutritionCardNutritionsItemUnitValueContainer
                      }>
                      <Text
                        style={Styles.textView(
                          RFPercentage(2),
                          'Roboto-Regular',
                          colors.surface,
                          RFPercentage(2.344),
                        )}>
                        {value}
                      </Text>
                      <Text
                        style={Styles.textView(
                          RFPercentage(1),
                          'Roboto-Regular',
                          colors.surface,
                          RFPercentage(1.172),
                        )}>
                        {unit}
                      </Text>
                    </View>
                    <Text
                      style={Styles.textView(
                        RFPercentage(1.2),
                        'Roboto-Regular',
                        colors.surface,
                        RFPercentage(1.406),
                      )}>
                      {label}
                    </Text>
                  </View>
                );
              },
            )}
          </View>
        </Card.Content>
      </Card>
    ) : (
      <SkeletonPlaceholder>
        <View style={DashboardStyles.skeletonNutritionCardContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderWellness = (): React.JSX.Element => {
    const loader: boolean = fetchingStatus || refreshing;

    return (
      <View style={Styles.marginVertical(0, RFPercentage(1.6))}>
        {!loader ? (
          <Card
            contentStyle={DashboardStyles.cardContainer}
            mode={Constants.CD_MODE_CONTAINED}
            onPress={(): void => {}}
            style={Styles.backgroundColor(Colors.DARK_GRAY)}>
            <Card.Content style={DashboardStyles.cardInnerContainer}>
              <View style={DashboardStyles.cardLabelContainerI}>
                <Text
                  style={Styles.textView(
                    RFPercentage(1.6),
                    'Roboto-Bold',
                    colors.surface,
                    RFPercentage(1.875),
                  )}>
                  {Constants.WELLNESS}
                </Text>
              </View>
              <View style={DashboardStyles.cardLabelContainerII}>
                <Text
                  style={Styles.textView(
                    RFPercentage(1),
                    'Roboto-Regular',
                    colors.primary,
                    RFPercentage(1.172),
                    'right',
                  )}>
                  {Constants.YOUR_WELLNESS_SCORE} {Constants.FOUR_FIVE}
                </Text>
              </View>
            </Card.Content>
            <Card.Content
              style={Styles.paddingVertical(
                RFPercentage(1.25),
                RFPercentage(1.25),
              )}>
              <View style={DashboardStyles.wellnessCardWellnessesContainer}>
                {wellnesses.flatMap(
                  (item: Interfaces.WellnessDataInterface, index: number) => {
                    const label: string = item.label;

                    const value: number | string = item.value;

                    return (
                      <View
                        key={index}
                        style={[
                          Styles.backgroundColor(Colors.PRIMARY_02),
                          Styles.borderColor(colors.primary),
                          DashboardStyles.wellnessCardWellnessesItemContainer,
                        ]}>
                        <Text
                          style={Styles.textView(
                            RFPercentage(1.2),
                            'Roboto-Regular',
                            colors.surface,
                            RFPercentage(1.406),
                          )}>
                          {label}
                        </Text>
                        <View style={Styles.marginVertical(0, RFPercentage(1))}>
                          <Text
                            style={Styles.textView(
                              RFPercentage(2.2),
                              'Roboto-Bold',
                              colors.surface,
                              RFPercentage(2.578),
                            )}>
                            {value}
                          </Text>
                        </View>
                      </View>
                    );
                  },
                )}
              </View>
            </Card.Content>
          </Card>
        ) : (
          <SkeletonPlaceholder>
            <View style={DashboardStyles.skeletonWellnessCardContainer} />
          </SkeletonPlaceholder>
        )}
      </View>
    );
  };

  const renderSteps = (): React.JSX.Element => {
    const loader: boolean = fetchingStatus || refreshing;

    return (
      <View style={Styles.marginVertical(0, RFPercentage(1.6))}>
        {!loader ? (
          <Card
            contentStyle={DashboardStyles.cardContainer}
            mode={Constants.CD_MODE_CONTAINED}
            onPress={(): void => {}}
            style={Styles.backgroundColor(Colors.DARK_GRAY)}>
            <Card.Content style={DashboardStyles.cardInnerContainer}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.6),
                  'Roboto-Bold',
                  colors.surface,
                  RFPercentage(1.875),
                )}>
                {Constants.STEPS}
              </Text>
            </Card.Content>
            <Card.Content
              style={Styles.paddingVertical(
                RFPercentage(1.25),
                RFPercentage(1.25),
              )}>
              <View style={DashboardStyles.stepsCardStepsUnitValueContainer}>
                <Text
                  style={Styles.textView(
                    RFPercentage(2.2),
                    'Roboto-Bold',
                    colors.surface,
                    RFPercentage(2.578),
                  )}>
                  {Constants.ZERO}
                </Text>
                <View style={Styles.paddingHorizontal(RFPercentage(0.5), 0)}>
                  <Text
                    style={Styles.textView(
                      RFPercentage(1),
                      'Roboto-Regular',
                      colors.onSurface,
                      RFPercentage(1.172),
                    )}>
                    {Constants.STEPS}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ) : (
          <SkeletonPlaceholder>
            <View style={DashboardStyles.skeletonStepsContainer} />
          </SkeletonPlaceholder>
        )}
      </View>
    );
  };

  const renderWeight = (): React.JSX.Element => {
    const loader: boolean = fetchingStatus || refreshing;

    const startOfWeek: string = moment()
      .startOf('week')
      .format(Constants.DDMMYYYY);

    const endOfWeek: string = moment().endOf('week').format(Constants.DDMMYYYY);

    return (
      <View style={Styles.marginVertical(0, RFPercentage(1.6))}>
        {!loader ? (
          <Card
            contentStyle={DashboardStyles.cardContainer}
            mode={Constants.CD_MODE_CONTAINED}
            onPress={(): void => {}}
            style={Styles.backgroundColor(Colors.DARK_GRAY)}>
            <Card.Content style={DashboardStyles.cardInnerContainer}>
              <View style={DashboardStyles.cardLabelContainerI}>
                <Text
                  style={Styles.textView(
                    RFPercentage(1.6),
                    'Roboto-Bold',
                    colors.surface,
                    RFPercentage(1.875),
                  )}>
                  {Constants.WEIGHT}
                </Text>
                <View style={Styles.paddingVertical(0, RFPercentage(0.5))}>
                  <Text
                    style={Styles.textView(
                      RFPercentage(1),
                      'Roboto-Regular',
                      colors.onSurface,
                      RFPercentage(1.172),
                    )}>
                    {Constants.THIS_WEEK} {startOfWeek} - {endOfWeek}
                  </Text>
                </View>
              </View>
              <View style={DashboardStyles.cardLabelContainerII}>
                <Text
                  style={Styles.textView(
                    RFPercentage(2.2),
                    'Roboto-Bold',
                    colors.primary,
                    RFPercentage(2.578),
                    'right',
                  )}>
                  {Constants.SIXTY} {Constants.KG_UNIT}
                </Text>
              </View>
            </Card.Content>
            <Card.Content
              style={[
                Styles.paddingVertical(RFPercentage(1.25), RFPercentage(1.25)),
                {alignSelf: 'center', right: RFPercentage(3)},
              ]}>
              <LineChart
                adjustToWidth
                height={RFPercentage(11.4)}
                animateOnDataChange={true}
                animationDuration={Constants.THOUSAND}
                areaChart
                backgroundColor={Colors.TRANSPARENT}
                color={colors.primary}
                data={[
                  {
                    labelComponent: () =>
                      renderAreaChartXAxisLabel('Sun', Constants.ZERO),
                    value: 85,
                  },
                  {
                    labelComponent: () =>
                      renderAreaChartXAxisLabel('Mon', Constants.ONE),
                    value: 90,
                  },
                  {
                    labelComponent: () =>
                      renderAreaChartXAxisLabel('Tue', Constants.TWO),
                    value: 95,
                  },
                  {
                    labelComponent: () =>
                      renderAreaChartXAxisLabel('Wed', Constants.THREE),
                    value: 100,
                  },
                  {
                    labelComponent: () =>
                      renderAreaChartXAxisLabel('Thu', Constants.FOUR),
                    value: 85,
                  },
                  {
                    labelComponent: () =>
                      renderAreaChartXAxisLabel('Fri', Constants.FIVE),
                    value: 90,
                  },
                  {
                    labelComponent: () =>
                      renderAreaChartXAxisLabel('Sat', Constants.SIX),
                    value: 95,
                  },
                ]}
                endFillColor={colors.primary}
                endOpacity={Constants.ZERO_TWO}
                endSpacing={Constants.ZERO}
                hideDataPoints
                initialSpacing={Constants.ZERO}
                isAnimated={true}
                maxValue={Constants.HUNDRED}
                noOfSections={Constants.FIVE}
                onDataChangeAnimationDuration={Constants.THREE_HUNDRED}
                rulesColor={colors.surfaceDisabled}
                rulesType={Constants.GC_LC_RT_SOLID}
                showVerticalLines
                startFillColor={colors.primary}
                startOpacity={Constants.ZERO_TWO}
                stepValue={Constants.TWENTY}
                thickness={Constants.TWO}
                trimYAxisAtTop
                verticalLinesColor={colors.surfaceDisabled}
                width={width * 0.625}
                xAxisColor={colors.surfaceDisabled}
                yAxisColor={colors.surfaceDisabled}
                yAxisTextStyle={Styles.textView(
                  RFPercentage(1),
                  'Roboto-Regular',
                  colors.onSurface,
                  RFPercentage(1.172),
                  'right',
                )}
              />
            </Card.Content>
          </Card>
        ) : (
          <SkeletonPlaceholder>
            <View
              style={{
                alignSelf: 'center',
                borderRadius: RFPercentage(1),
                height: RFPercentage(23.125),
                width: '100%',
              }}
            />
          </SkeletonPlaceholder>
        )}
      </View>
    );
  };

  const renderAreaChartXAxisLabel = (
    label: string,
    index: number,
  ): React.JSX.Element => {
    return (
      <View
        style={[
          Styles.marginHorizontal(
            RFPercentage(index == Constants.ZERO ? 1 : 2),
            RFPercentage(index == Constants.SIX ? 1.5 : 0),
          ),
        ]}>
        <Text
          style={Styles.textView(
            RFPercentage(0.8),
            'Roboto-Regular',
            colors.onSurface,
            RFPercentage(0.938),
            'center',
          )}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <View style={Styles.screenContainer(colors.background)}>
      <ScrollView
        contentContainerStyle={[
          CommonStyles.defaultFlexGrow,
          DashboardStyles.container,
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
        showsVerticalScrollIndicator={false}>
        {renderSubscribeNow()}
        <View style={Styles.margin(0, RFPercentage(3.2))}>
          {renderNutrition()}
          {renderWellness()}
          {renderSteps()}
          {renderWeight()}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
