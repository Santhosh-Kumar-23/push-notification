import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScaledSize,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {OrientationType} from 'react-native-orientation-locker';
import {ActivityIndicator, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import YoutubePlayer, {PLAYER_STATES} from 'react-native-youtube-iframe';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import WorkOutCard from '../../common/components/workOutCard';
import useOrientation from '../../common/hooks/orientation';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import WorkOutStyles from '../../styles/appStyles/workOut';

const WorkOut: FC = (props: any) => {
  // Props Variables
  const {} = props;

  // UseState Variables
  const [closeVideo, setCloseVideo] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [playVideoId, setPlayVideoId] = useState<string>('');
  const [videoLoader, setVideoLoader] = useState<boolean>(true);

  // Other Variables
  const dispatch: any = useDispatch();
  const orientation: OrientationType = useOrientation();
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const {colors}: MD3Theme = useTheme();
  const {StatusCodes} = Enums;
  const {height, width}: ScaledSize = useWindowDimensions();
  const {CommonStyles} = Styles;
  const checkForPlayVideoId: boolean = Boolean(playVideoId);
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const isTablet: boolean = DeviceInfo.isTablet();
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const userId: number = user?.id ?? Constants.ZERO;
  const workouts: Interfaces.WorkOutCardDataInterface[] =
    appReduxStates.workouts;
  const checkForWorkOuts: boolean =
    Array.isArray(workouts) && workouts.length > Constants.ZERO;
  const loader: boolean = (fetchingStatus && !checkForWorkOuts) || refreshing;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleWeightLiftingDetailsAPI();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
  const handleWeightLiftingDetailsAPI = (): void => {
    const requestData: Interfaces.WeightLiftingDetailsRequestInterface = {
      user_id: userId,
    };

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('WEIGHT LIFTING DETAILS REQUEST DATA::: ', requestData);

    dispatch(
      Actions.getWeightLiftingDetails(
        requestData,
        (response: Interfaces.APIResponseInterface): void => {
          const responseData: Interfaces.WeightLiftingDetailsResponseInterface =
            response.data;

          const responseType: number = response.type;

          switch (responseType) {
            case StatusCodes.SUCCESS:
              const weightLifting: Interfaces.WorkOutCardDataInterface[] =
                responseData.weight_lifting;

              dispatch(Actions.storeWorkouts(weightLifting));
              break;

            default:
              dispatch(Actions.storeWorkouts([]));
              break;
          }

          setRefreshing(false);
        },
      ),
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    handleWeightLiftingDetailsAPI();
  };

  const renderWorkOut = (): React.JSX.Element => {
    return !loader ? (
      <Text
        style={Styles.textView(
          RFPercentage(2.2),
          'Roboto-Regular',
          colors.surface,
          RFPercentage(2.8),
        )}>
        {Constants.WORK_OUT}
      </Text>
    ) : (
      <SkeletonPlaceholder>
        <View style={WorkOutStyles.skeletonWorkOutContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderWorkOuts = (): React.JSX.Element => {
    const handleUpdateWorkoutWeight = (
      weight: string,
      workOutId: number,
    ): void => {
      const formattedWeight: number = weight ? Number(weight) : Constants.ZERO;

      const requestData: Interfaces.UpdateWorkoutWeighRequestInterface = {
        user_id: userId,
        workout_assignment_id: workOutId,
        weight: formattedWeight,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('UPDATE WORKOUT WEIGHT REQUEST DATA::: ', requestData);

      dispatch(
        Actions.updateWorkoutWeight(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                handleWeightLiftingDetailsAPI();
                break;

              default:
                break;
            }

            setRefreshing(false);
          },
        ),
      );
    };

    const renderWorkoutCardSkeleton = (): React.JSX.Element => {
      return (
        <SkeletonPlaceholder>
          <View style={WorkOutStyles.skeletonWorkOutCardConatiner} />
        </SkeletonPlaceholder>
      );
    };

    const renderNoWorkOuts = () => {
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
            {Constants.NO_WORK_OUTS_FOUND}
          </Text>
        </View>
      );
    };

    return (
      <View style={[Styles.flex(1), Styles.margin(0, RFPercentage(1.6))]}>
        {!fetchingStatus ? (
          checkForWorkOuts ? (
            <FlatList
              data={workouts}
              keyExtractor={(
                _: Interfaces.WorkOutCardDataInterface,
                index: number,
              ): string => index.toString()}
              renderItem={({item, index}): any => {
                return !loader ? (
                  <WorkOutCard
                    index={index}
                    item={item}
                    onPlayVideo={(videoId: string): void => {
                      setPlayVideoId(videoId);

                      setVideoLoader(true);

                      setTimeout((): void => {
                        setVideoLoader(false);
                      }, Constants.SET_TIMEOUT_2500);
                    }}
                    onUpdateWeight={(
                      weight: string,
                      workOutId: number,
                    ): void => {
                      handleUpdateWorkoutWeight(weight, workOutId);
                    }}
                  />
                ) : (
                  renderWorkoutCardSkeleton()
                );
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderNoWorkOuts()
          )
        ) : (
          <>
            {renderWorkoutCardSkeleton()}
            {renderWorkoutCardSkeleton()}
            {renderWorkoutCardSkeleton()}
            {renderWorkoutCardSkeleton()}
            {renderWorkoutCardSkeleton()}
          </>
        )}
      </View>
    );
  };

  const renderVideoPlayer = (): React.JSX.Element => {
    const customWidth: number = width * 0.625;

    const customHeight: number =
      isTablet || orientation.includes(Constants.LANDSCAPE)
        ? width * 0.35
        : height * 0.1625;

    const onDismiss = (): void => {
      setPlayVideoId('');
    };

    return (
      <View
        style={[
          Styles.backgroundColor(colors.inverseSurface),
          Styles.imageView(customHeight, customWidth),
          WorkOutStyles.videoContainer,
        ]}>
        <View style={[Styles.flex(1), CommonStyles.centered]}>
          {!videoLoader ? (
            <>
              {closeVideo && (
                <Pressable
                  onPress={(): void => {
                    onDismiss();
                  }}
                  style={WorkOutStyles.videoCloseContainer}>
                  <MaterialIcons
                    color={colors.surface}
                    name={Constants.VI_MI_CLOSE}
                    size={RFPercentage(2.4)}
                  />
                </Pressable>
              )}
              <YoutubePlayer
                height={customHeight}
                onChangeState={(event: PLAYER_STATES): void => {
                  switch (event) {
                    case PLAYER_STATES.BUFFERING:
                    case PLAYER_STATES.PAUSED:
                    case PLAYER_STATES.PLAYING:
                    case PLAYER_STATES.UNSTARTED:
                      setCloseVideo(true);
                      break;

                    case PLAYER_STATES.ENDED:
                      setCloseVideo(false);

                      onDismiss();
                      break;

                    default:
                      break;
                  }
                }}
                onError={(error: string): void => {
                  onDismiss();

                  const toastPopupData: Interfaces.ToastPopupDataInterface = {
                    message:
                      `${
                        Constants.COMMON_VIDEO_ERROR
                      } ${error.toUpperCase()}` || Constants.COMMON_ERROR,
                    title: Constants.ERROR,
                    type: StatusCodes.ERROR,
                  };

                  dispatch(Actions.storeToastPopup(toastPopupData));
                }}
                onReady={(): void => {
                  setCloseVideo(false);
                }}
                play={true}
                videoId={playVideoId}
                width={customWidth}
              />
            </>
          ) : (
            <ActivityIndicator size={RFPercentage(3.6)} />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.screenContainer(colors.background)}>
      <ScrollView
        contentContainerStyle={[
          CommonStyles.defaultFlexGrow,
          WorkOutStyles.container,
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
        scrollEnabled={checkForWorkOuts}
        showsVerticalScrollIndicator={false}>
        {renderWorkOut()}
        {renderWorkOuts()}
        {checkForPlayVideoId && renderVideoPlayer()}
      </ScrollView>
    </View>
  );
};

export default WorkOut;
