import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  NativeScrollEvent,
  NativeScrollPoint,
  NativeSyntheticEvent,
  Pressable,
  ScaledSize,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Button, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import AuthHeader from '../../common/components/authHeader';
import AuthScreenBackground from '../../common/components/authScreenBackground';
import Dots from '../../common/components/dots';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Interfaces from '../../configs/ts/interfaces';
import OnBoardingsStyles from '../../styles/authStyles/onBoardings';

const OnBoardings: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [exitCount, setExitCount] = useState<number>(Constants.ZERO);
  const [sliderIndex, setSliderIndex] = useState<number>(Constants.ZERO);

  // Ref Variables
  const scrollViewRef: MutableRefObject<any> = useRef<any>(null);

  // Other Variables
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const {colors}: MD3Theme = useTheme();
  const {width}: ScaledSize = useWindowDimensions();
  const {ButtonStyles, CommonStyles} = Styles;
  const onBoardings: Interfaces.OnBoardDataInterface[] =
    appReduxStates.onBoardings;
  const onBoardingsLength: number = onBoardings.length;
  const lastIndex: number = onBoardingsLength - Constants.ONE;
  const checkIsLast: boolean = lastIndex == sliderIndex;
  const lastPreviousIndex: number = onBoardingsLength - Constants.TWO;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return (): void => {
        isFocus = false;

        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [exitCount]),
  );

  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleSlider();

      return (): void => {
        isFocus = false;
      };
    }, [width]),
  );

  // Functions
  const backAction = (): boolean => {
    switch (exitCount) {
      case Constants.ZERO:
        setExitCount(exitCount + Constants.ONE);

        showMessage({
          icon: Constants.FM_MI_AUTO,
          message: Constants.EXIT_APP_TOAST,
          position: Constants.BOTTOM,
          type: Constants.FM_MT_DEFAULT,
        });
        break;

      case Constants.ONE:
        setExitCount(Constants.ZERO);

        Functions.handleExitApp();
        break;

      default:
        break;
    }

    return true;
  };

  const handleSlider = (
    action: null | string = null,
    scrollIndex: null | number = null,
  ): void => {
    switch (action) {
      case Constants.DECREMENT:
        const checkIsFirst: boolean = sliderIndex == Constants.ZERO;

        scrollViewRef.current?.scrollTo({
          x: (checkIsFirst ? sliderIndex : sliderIndex - Constants.ONE) * width,
          animated: true,
        });
        break;

      case Constants.INCREMENT:
        if (lastPreviousIndex == scrollIndex) {
          handleOnBoardComplete(action);
        } else {
          scrollViewRef.current?.scrollTo({
            x: (sliderIndex + Constants.ONE) * width,
            animated: true,
          });
        }
        break;

      case Constants.SKIP:
        handleOnBoardComplete(action);
        break;

      default:
        scrollViewRef.current?.scrollTo({
          x:
            (scrollIndex || scrollIndex == Constants.ZERO
              ? scrollIndex
              : sliderIndex) * width,
          animated: false,
        });
        break;
    }
  };

  const handleOnBoardComplete = (action: null | string = null): void => {
    scrollViewRef.current?.scrollTo({
      x: (lastIndex + Constants.ONE) * width,
      animated: action != Constants.SKIP,
    });
  };

  const renderHeader = (): React.JSX.Element => {
    const renderBackSkipButtons = (): React.JSX.Element => {
      return (
        <View style={OnBoardingsStyles.buttonsContainer}>
          <View style={OnBoardingsStyles.backContainer}>
            {sliderIndex != Constants.ZERO && (
              <Pressable
                onPress={(): void => {
                  handleSlider(Constants.DECREMENT);
                }}
                style={OnBoardingsStyles.backIndividualContainer}>
                <MaterialIcons
                  color={colors.surface}
                  name={Constants.ARROW_BACK_IOS}
                  size={RFPercentage(1.575)}
                />
                <Text
                  style={[
                    Styles.padding(RFPercentage(0.4), 0),
                    Styles.textView(
                      RFPercentage(1.4),
                      'Roboto-Regular',
                      colors.surface,
                    ),
                  ]}>
                  {Constants.BACK}
                </Text>
              </Pressable>
            )}
          </View>
          <View style={OnBoardingsStyles.skipContainer}>
            {sliderIndex < lastPreviousIndex && (
              <Pressable
                style={OnBoardingsStyles.backIndividualContainer}
                onPress={(): void => {
                  handleSlider(Constants.SKIP);
                }}>
                <Text
                  style={[
                    Styles.padding(RFPercentage(0.4), 0),
                    Styles.textView(
                      RFPercentage(1.4),
                      'Roboto-Regular',
                      colors.surface,
                    ),
                  ]}>
                  {Constants.SKIP}
                </Text>
                <MaterialIcons
                  color={colors.surface}
                  name={Constants.ARROW_FORWARD_IOS}
                  size={RFPercentage(1.575)}
                />
              </Pressable>
            )}
          </View>
        </View>
      );
    };

    return checkIsLast ? (
      <AuthHeader showClose={false} />
    ) : (
      renderBackSkipButtons()
    );
  };

  const renderOnBoards = (): React.JSX.Element => {
    const handleOnScroll = (
      event: NativeSyntheticEvent<NativeScrollEvent>,
    ): void => {
      const {x}: NativeScrollPoint = event.nativeEvent.contentOffset;

      const indexOfNextScreen: number = Math.round(x / width);

      if (indexOfNextScreen != sliderIndex) {
        setSliderIndex(indexOfNextScreen);
      }
    };

    const renderOnBoardItem = (
      onBoardItem: Interfaces.OnBoardDataInterface,
      onBoardIndex: number,
    ): React.JSX.Element => {
      const content: string = onBoardItem.content;

      const title: string = onBoardItem.title;

      return (
        <View
          style={[OnBoardingsStyles.onBoardItemContainer, {width}]}
          key={onBoardIndex}>
          <View style={Styles.padding(RFPercentage(3.6), 0)}>
            <Text
              style={Styles.textView(
                RFPercentage(3.79),
                'Saira-Bold',
                colors.surface,
                RFPercentage(4.548),
              )}>
              {title}
            </Text>
            <Text
              style={[
                Styles.padding(0, RFPercentage(1)),
                Styles.textView(
                  RFPercentage(1.6),
                  'Roboto-Regular',
                  colors.surface,
                  RFPercentage(1.875),
                ),
              ]}>
              {content}
            </Text>
          </View>
        </View>
      );
    };

    return (
      <ScrollView
        horizontal
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          handleOnScroll(event);
        }}
        pagingEnabled
        ref={scrollViewRef}
        scrollEventThrottle={Constants.SIXTEEN}
        showsHorizontalScrollIndicator={false}>
        {onBoardings.flatMap(
          (item: Interfaces.OnBoardDataInterface, index: number) =>
            renderOnBoardItem(item, index),
        )}
      </ScrollView>
    );
  };

  const renderFooter = () => {
    const renderGetStartedButton = (): React.JSX.Element => {
      const renderIcon = (): React.JSX.Element => {
        return (
          <MaterialIcons
            color={colors.secondary}
            name={Constants.ARROW_FORWARD_IOS}
            size={RFPercentage(1.8)}
          />
        );
      };

      return (
        <View style={Styles.padding(RFPercentage(3.6), RFPercentage(1))}>
          <Button
            contentStyle={ButtonStyles.contentStyleForRightIcon}
            icon={(): React.JSX.Element => renderIcon()}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              handleNavigation(Constants.SIGN_UP);
            }}
            style={[
              Styles.backgroundColor(colors.primary),
              ButtonStyles.defaultStyle,
            ]}
            textColor={colors.secondary}>
            {Constants.GET_STARTED}
          </Button>
        </View>
      );
    };

    const renderNextButton = (): React.JSX.Element => {
      const renderIcon = (): React.JSX.Element => {
        return (
          <MaterialIcons
            color={colors.secondary}
            name={Constants.ARROW_FORWARD_IOS}
            size={RFPercentage(1.8)}
          />
        );
      };

      return (
        <View style={Styles.padding(RFPercentage(3.6), RFPercentage(1))}>
          <Button
            contentStyle={ButtonStyles.contentStyleForRightIcon}
            icon={(): React.JSX.Element => renderIcon()}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              handleSlider(Constants.INCREMENT);
            }}
            style={[
              Styles.backgroundColor(colors.primary),
              ButtonStyles.defaultStyle,
            ]}
            textColor={colors.secondary}>
            {Constants.NEXT}
          </Button>
        </View>
      );
    };

    const renderOnBoardsDots = (): React.JSX.Element => {
      return (
        <Dots
          currentIndex={sliderIndex}
          customContainerStyle={Styles.paddingVertical(
            RFPercentage(8),
            RFPercentage(1.6),
          )}
          numberOfDots={lastIndex}
          size={Constants.ZERO_EIGHT}
          onPress={(index: number): void => {
            handleSlider(null, index);
          }}
        />
      );
    };

    const renderSignIn = (): React.JSX.Element => {
      return (
        <View style={OnBoardingsStyles.signInContainer}>
          <Text
            style={Styles.textView(
              RFPercentage(1.5),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(2),
              'center',
            )}>
            {Constants.IF_YOU_HAVE_AN_ACCOUNT}
          </Text>
          <Pressable
            onPress={(): void => {
              handleNavigation(Constants.SIGN_IN);
            }}
            style={Styles.padding(RFPercentage(0.4), 0)}>
            <Text
              style={Styles.textView(
                RFPercentage(1.5),
                'Roboto-Bold',
                colors.primary,
                RFPercentage(2),
              )}>
              {Constants.SIGN_IN_HERE}
            </Text>
          </Pressable>
        </View>
      );
    };

    return checkIsLast ? (
      <>
        {renderGetStartedButton()}
        {renderSignIn()}
      </>
    ) : (
      <>
        {renderNextButton()}
        {renderOnBoardsDots()}
      </>
    );
  };

  const handleNavigation = (navigateScreen: string): void => {
    AsyncStorage.setItem(Constants.IS_ON_BOARD_COMPLETE, JSON.stringify(true));

    navigation.navigate(navigateScreen, {isBackAlert: true});
  };

  return (
    <View style={Styles.screenContainer(colors.inverseSurface)}>
      <AuthScreenBackground />
      <View style={CommonStyles.screenAbsoluteContainer}>
        {renderHeader()}
        {renderOnBoards()}
        {renderFooter()}
      </View>
    </View>
  );
};

export default OnBoardings;
