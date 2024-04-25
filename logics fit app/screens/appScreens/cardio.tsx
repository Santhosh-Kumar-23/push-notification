import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, RefreshControl, ScrollView, Text, View} from 'react-native';
import {MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import CardioCard from '../../common/components/cardioCard';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import CardioStyles from '../../styles/appStyles/cardio';

const Cardio: FC = (props: any) => {
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
  const cardios: Interfaces.CadioCardDataInterface[] = appReduxStates.cardios;
  const checkForCardios: boolean =
    Array.isArray(cardios) && cardios.length > Constants.ZERO;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const loader: boolean = (fetchingStatus && !checkForCardios) || refreshing;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleCardioDetailsAPI();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
  const handleCardioDetailsAPI = (): void => {
    const userId: number = user?.id ?? Constants.ZERO;

    const requestData: Interfaces.CardioDetailsRequestInterface = {
      user_id: userId,
    };

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('CARDIO DETAILS REQUEST DATA::: ', requestData);

    dispatch(
      Actions.getCardioDetails(
        requestData,
        (response: Interfaces.APIResponseInterface): void => {
          const responseData: Interfaces.CardiosDetailsResponseInterface =
            response.data;

          const responseType: number = response.type;

          switch (responseType) {
            case StatusCodes.SUCCESS:
              const cardios: Interfaces.CadioCardDataInterface[] =
                responseData.cardios;

              dispatch(Actions.storeCardios(cardios));
              break;

            default:
              dispatch(Actions.storeCardios([]));
              break;
          }

          setRefreshing(false);
        },
      ),
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    handleCardioDetailsAPI();
  };

  const renderCardio = (): React.JSX.Element => {
    return !loader ? (
      <Text
        style={Styles.textView(
          RFPercentage(2.2),
          'Roboto-Regular',
          colors.surface,
          RFPercentage(2.8),
        )}>
        {Constants.CARDIO}
      </Text>
    ) : (
      <SkeletonPlaceholder>
        <View style={CardioStyles.skeletonCardioContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderCardios = (): React.JSX.Element => {
    const renderCardioCardSkeleton = (): React.JSX.Element => {
      return (
        <SkeletonPlaceholder>
          <View style={CardioStyles.skeletonCardioCardConatiner} />
        </SkeletonPlaceholder>
      );
    };

    const renderNoCardios = () => {
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
            {Constants.NO_CARDIOS_FOUND}
          </Text>
        </View>
      );
    };

    return (
      <View style={[Styles.flex(1), Styles.margin(0, RFPercentage(1.6))]}>
        {!fetchingStatus ? (
          checkForCardios ? (
            <FlatList
              data={cardios}
              keyExtractor={(
                _: Interfaces.CadioCardDataInterface,
                index: number,
              ): string => index.toString()}
              renderItem={({item, index}): any => {
                return !loader ? (
                  <CardioCard index={index} item={item} />
                ) : (
                  renderCardioCardSkeleton()
                );
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderNoCardios()
          )
        ) : (
          <>
            {renderCardioCardSkeleton()}
            {renderCardioCardSkeleton()}
            {renderCardioCardSkeleton()}
            {renderCardioCardSkeleton()}
            {renderCardioCardSkeleton()}
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
          CardioStyles.container,
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
        scrollEnabled={checkForCardios}
        showsVerticalScrollIndicator={false}>
        {renderCardio()}
        {renderCardios()}
      </ScrollView>
    </View>
  );
};

export default Cardio;
