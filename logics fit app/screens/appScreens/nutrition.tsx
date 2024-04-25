import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, RefreshControl, ScrollView, Text, View} from 'react-native';
import {MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import NutritionCard from '../../common/components/nutritionCard';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import NutritionStyles from '../../styles/appStyles/nutrition';

const Nutrition: FC = (props: any) => {
  // Props Variables
  const {} = props;

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
  const {StatusCodes} = Enums;
  const {CommonStyles} = Styles;

  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const nutritions: Interfaces.NutritionCardDataInterface[] =
    appReduxStates.nutritions;
  const checkForNutritions: boolean =
    Array.isArray(nutritions) && nutritions.length > Constants.ZERO;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const loader: boolean = (fetchingStatus && !checkForNutritions) || refreshing;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleMealsByIdAPI();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
  const handleMealsByIdAPI = (): void => {
    const userId: number = user?.id ?? Constants.ZERO;

    const requestData: Interfaces.MealsByIdRequestInterface = {
      user_id: userId,
    };

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('GET MEALS BY ID REQUEST DATA::: ', requestData);

    dispatch(
      Actions.getMealsById(
        requestData,
        (response: Interfaces.APIResponseInterface): void => {
          const responseData: Interfaces.MealsByIdResponseInterface =
            response.data;

          const responseType: number = response.type;

          switch (responseType) {
            case StatusCodes.SUCCESS:
              const meals: Interfaces.NutritionCardDataInterface[] =
                responseData.meals;

              dispatch(Actions.storeNutritions(meals));
              break;

            default:
              dispatch(Actions.storeNutritions([]));
              break;
          }

          setRefreshing(false);
        },
      ),
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    handleMealsByIdAPI();
  };

  const renderNutrition = (): React.JSX.Element => {
    return !loader ? (
      <Text
        style={Styles.textView(
          RFPercentage(2.2),
          'Roboto-Regular',
          colors.surface,
          RFPercentage(2.8),
        )}>
        {Constants.NUTRITION}
      </Text>
    ) : (
      <SkeletonPlaceholder>
        <View style={NutritionStyles.skeletonNutritionContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderNutritions = (): React.JSX.Element => {
    const renderNutritionCardSkeleton = (): React.JSX.Element => {
      return (
        <SkeletonPlaceholder>
          <View style={NutritionStyles.skeletonNutritionCardConatiner} />
        </SkeletonPlaceholder>
      );
    };

    const renderNoNutritions = () => {
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
            {Constants.NO_NUTRITIONS_FOUND}
          </Text>
        </View>
      );
    };

    return (
      <View style={[Styles.flex(1), Styles.margin(0, RFPercentage(1.6))]}>
        {!fetchingStatus ? (
          checkForNutritions ? (
            <FlatList
              data={nutritions}
              keyExtractor={(
                _: Interfaces.NutritionCardDataInterface,
                index: number,
              ): string => index.toString()}
              renderItem={({item, index}): any => {
                return !loader ? (
                  <NutritionCard index={index} item={item} />
                ) : (
                  renderNutritionCardSkeleton()
                );
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderNoNutritions()
          )
        ) : (
          <>
            {renderNutritionCardSkeleton()}
            {renderNutritionCardSkeleton()}
            {renderNutritionCardSkeleton()}
            {renderNutritionCardSkeleton()}
            {renderNutritionCardSkeleton()}
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
          NutritionStyles.container,
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
        scrollEnabled={checkForNutritions}
        showsVerticalScrollIndicator={false}>
        {renderNutrition()}
        {renderNutritions()}
      </ScrollView>
    </View>
  );
};

export default Nutrition;
