import {Slider} from '@miblanchard/react-native-slider';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Appbar, Button, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import * as Assets from '../../assets';
import Counter from '../../common/components/counter';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import UpdationStyles from '../../styles/appStyles/Updation';

const Updation: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [bodyQualities, setBodyQualities] = useState<
    Interfaces.BodyQualityDataInterface[]
  >([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [pictures, setPictures] = useState<Interfaces.FileDataInterface[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [scrollStatus, setScrollStatus] = useState<boolean>(true);
  const [weight, setWeight] = useState<string>('');

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
  const {CommonStyles, AppBarStyles, ButtonStyles} = Styles;
  const checkForPictures: boolean =
    Array.isArray(pictures) && pictures.length > Constants.ZERO;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const initBodyQualities: Interfaces.BodyQualityDataInterface[] = [
    {
      imageSource: Assets.SLEEP,
      label: 'How was your sleep?',
      value: 0,
    },
    {
      imageSource: Assets.STRESS,
      label: 'How are your stress levels?',
      value: 0,
    },
    {
      imageSource: Assets.HUNGER,
      label: 'Any Hunger Issues?',
      value: 0,
    },
    {
      imageSource: Assets.FATIGUE,
      label: 'Experienced any fatigue?',
      value: 0,
    },
  ];
  const loader: boolean = refreshing;
  const POSSIBLE_ZERO_INPUTS: string[] = [
    Constants.ZERO.toString(),
    Constants.TWO_ZERO,
    Constants.THREE_ZERO,
    Constants.FOUR_ZERO,
  ];
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const userWeight: string = user?.weight ? user.weight.toString() : '';
  const userWeightUnit: string = user?.weight_unit ?? Constants.KG_UNIT;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      loadUseStates();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
  const loadUseStates = (): void => {
    setBodyQualities(initBodyQualities);

    setIsError(false);

    setNotes('');

    setPictures([]);

    setScrollStatus(true);

    setWeight(userWeight);
  };

  const renderHeader = (): React.JSX.Element => {
    return (
      <Appbar.Header
        mode={Constants.AB_M_SMALL}
        statusBarHeight={Constants.ZERO}
        style={AppBarStyles.defaultHeaderStyle}>
        <Appbar.BackAction
          iconColor={colors.surface}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Appbar.Content
          titleStyle={Styles.textView(
            RFPercentage(2.2),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2.8),
            'left',
          )}
          title={Constants.UPDATE}
        />
      </Appbar.Header>
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    setTimeout(() => {
      loadUseStates();

      setRefreshing(false);
    }, Constants.SET_TIMEOUT_2500);
  };

  const renderUploadPictures = (): React.JSX.Element => {
    const renderAdd = (): React.JSX.Element => {
      const imagePickerConfigs: any = {
        multiple: true,
      };

      const handleSelectedImage = (
        files: Interfaces.FileDataInterface[],
      ): void => {
        ENV.currentEnvironment == Constants.DEVELOPMENT &&
          console.log('SELECTED FILES::: ', JSON.stringify(files));

        const customFiles = [...pictures, ...files];

        const customFilesLength: number = customFiles.length;

        const checkForCustomFilesLength: boolean =
          customFilesLength <= Constants.NINE;

        if (checkForCustomFilesLength) {
          setPictures(customFiles);
        } else {
          setPictures(customFiles.splice(Constants.ZERO, Constants.NINE));

          const toastPopupData: Interfaces.ToastPopupDataInterface = {
            message: Constants.FILE_LENGTH_ERROR,
            title: Constants.ERROR,
            type: StatusCodes.ERROR,
          };

          dispatch(Actions.storeToastPopup(toastPopupData));
        }
      };

      return !loader ? (
        <Pressable
          onPress={(): void => {
            Functions.openGallery(imagePickerConfigs, handleSelectedImage);
          }}
          style={[
            CommonStyles.centered,
            Styles.backgroundColor(Colors.PRIMARY_02),
            Styles.borderColor(colors.primary),
            UpdationStyles.uploadPicturesAddContainer,
          ]}>
          <MaterialIcons
            color={colors.primary}
            name={Constants.ADD}
            size={RFPercentage(5.2)}
          />
        </Pressable>
      ) : (
        <SkeletonPlaceholder>
          <View style={UpdationStyles.skeletonUploadPicturesAddContainer} />
        </SkeletonPlaceholder>
      );
    };

    const renderPictures = (): React.JSX.Element => {
      const renderPicture = (
        item: Interfaces.FileDataInterface,
        index: number,
      ): React.JSX.Element => {
        const uri: string = item.uri;

        const handleDeletePictures = (): void => {
          const updatedPictures: Interfaces.FileDataInterface[] = [...pictures];

          updatedPictures.splice(index, Constants.ONE);

          setPictures(updatedPictures);
        };

        return (
          <View key={index} style={UpdationStyles.picturesItemContainer}>
            <View
              style={[
                Styles.imageView(RFPercentage(10), RFPercentage(10)),
                Styles.padding(RFPercentage(0.75), RFPercentage(0.75)),
              ]}>
              <Image
                resizeMode={Constants.COVER}
                source={{uri}}
                style={UpdationStyles.picturesItemImageContainer}
              />
              <Pressable
                onPress={(): void => {
                  handleDeletePictures();
                }}
                style={UpdationStyles.pictureItemCloseConatiner}>
                <Image
                  resizeMode={Constants.COVER}
                  source={Assets.CLOSE_BG_ROUNDED}
                  style={Styles.imageView(RFPercentage(1.8), RFPercentage(1.8))}
                />
              </Pressable>
            </View>
          </View>
        );
      };

      return (
        <View style={Styles.paddingVertical(0, RFPercentage(2))}>
          {!loader ? (
            <Text
              style={Styles.textView(
                RFPercentage(1.2),
                'Roboto-Regular',
                colors.surface,
                RFPercentage(1.406),
              )}>
              {Constants.PICTURE_SIZE_ERROR}
            </Text>
          ) : (
            <SkeletonPlaceholder>
              <View
                style={UpdationStyles.skeletonUploadPicturesWarningContainer}
              />
            </SkeletonPlaceholder>
          )}
          {checkForPictures && (
            <View style={UpdationStyles.picturesContainer}>
              {pictures.flatMap(
                (item: Interfaces.FileDataInterface, index: number) => {
                  return renderPicture(item, index);
                },
              )}
            </View>
          )}
        </View>
      );
    };

    return (
      <>
        {renderAdd()}
        {renderPictures()}
      </>
    );
  };

  const renderOtherDetails = (): React.JSX.Element => {
    const renderWeight = (): React.JSX.Element => {
      const checkForWeightEmpty: boolean = !weight && isError;

      const checkForValidWeight: boolean =
        !POSSIBLE_ZERO_INPUTS.includes(weight);

      const checkForWeightError: boolean =
        checkForWeightEmpty || !checkForValidWeight;

      const userWeight: number = user?.weight ?? Constants.ZERO;

      const checkForUserWeight: boolean = Boolean(userWeight);

      return (
        <>
          <Counter
            customContainerStyle={Styles.borderColor(
              checkForWeightError ? colors.error : colors.surface,
            )}
            iconColor={colors.primary}
            keyboardType={Constants.TI_KT_NUMBER_PAD}
            label={Constants.WEIGHT_UPDATE}
            maxLength={Constants.THREE}
            onChangeText={(txt: string) => {
              setWeight(txt);
            }}
            placeholder={Constants.THREE_ZERO}
            placeholderColor={colors.onSurface}
            unit={`${Constants.CURRENT_WEIGHT} ${
              checkForUserWeight
                ? Functions.convertUnit(userWeight, userWeightUnit)
                : '-'
            } ${userWeightUnit}`}
            value={weight}
          />
          {checkForWeightEmpty && (
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.error,
                RFPercentage(2),
                'center',
              )}>
              {Constants.WEIGHT_ERROR}
            </Text>
          )}
          {!checkForValidWeight && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                  RFPercentage(2),
                  'center',
                )}>
                {Constants.WEIGHT_INVALID_ERROR}
              </Text>
            </View>
          )}
        </>
      );
    };

    const renderBodyQuality = (): React.JSX.Element => {
      const renderBodyQualityItem = (
        item: Interfaces.BodyQualityDataInterface,
        index: number,
      ): React.JSX.Element => {
        const imageSource: ImageSourcePropType | undefined = item.imageSource;

        const label: string = item.label;

        const value: number = item.value;

        const renderQuestion = (): React.JSX.Element => {
          return (
            <View style={UpdationStyles.bodyQualityItemQuestionContainer}>
              <View style={CommonStyles.centered}>
                <Image
                  resizeMode={Constants.COVER}
                  source={imageSource}
                  style={Styles.imageView(RFPercentage(2.4), RFPercentage(2.4))}
                  tintColor={colors.surface}
                />
              </View>
              <View style={UpdationStyles.bodyQualityItemLabelContainer}>
                <Text
                  style={Styles.textView(
                    RFPercentage(1.6),
                    'Roboto-Regular',
                    colors.surface,
                    RFPercentage(1.875),
                  )}>
                  {label}
                </Text>
              </View>
              <View style={CommonStyles.centered}>
                <Text
                  style={Styles.textView(
                    RFPercentage(1.6),
                    'Roboto-Regular',
                    colors.surface,
                    RFPercentage(1.875),
                  )}>
                  {value}
                </Text>
              </View>
            </View>
          );
        };

        const renderSlider = (): React.JSX.Element => {
          const handleSliderValueChange = (sliderValue: number): void => {
            let helperArray: Interfaces.BodyQualityDataInterface[] = [
              ...bodyQualities,
            ];

            helperArray = helperArray.flatMap(
              (lol: Interfaces.BodyQualityDataInterface, indx: number) => ({
                ...lol,
                value:
                  index == indx
                    ? Math.round(sliderValue * Constants.TEN) / Constants.TEN
                    : lol.value,
              }),
            );

            setBodyQualities(helperArray);
          };

          return (
            <Slider
              maximumValue={Constants.FIVE}
              minimumValue={Constants.ZERO}
              minimumTrackTintColor={colors.primary}
              onSlidingComplete={(): void => {
                setScrollStatus(true);
              }}
              onSlidingStart={(): void => {
                setScrollStatus(false);
              }}
              onValueChange={(sliderValue: number[]): void => {
                const popValue: number = sliderValue.pop() || Constants.ZERO;

                handleSliderValueChange(popValue);
              }}
              startFromZero={true}
              step={Constants.ZERO_ONE}
              thumbTintColor={colors.primary}
              thumbTouchSize={{height: RFPercentage(2), width: RFPercentage(2)}}
              thumbStyle={{
                borderColor: colors.surface,
                borderWidth: RFPercentage(0.1),
              }}
              trackStyle={{
                backgroundColor: colors.surface,
                borderRadius: RFPercentage(1),
                height: RFPercentage(1),
              }}
              value={value}
            />
          );
        };

        return (
          <View key={index} style={Styles.marginVertical(0, RFPercentage(1))}>
            {renderQuestion()}
            {renderSlider()}
          </View>
        );
      };

      return (
        <>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Bold',
              colors.surface,
              RFPercentage(1.875),
            )}>
            {Constants.BODY_QUALITY}
          </Text>
          <View style={Styles.padding(0, RFPercentage(1))}>
            <FlatList
              data={bodyQualities}
              keyExtractor={(
                _: Interfaces.BodyQualityDataInterface,
                index: number,
              ): string => index.toString()}
              renderItem={({item, index}): any => {
                return renderBodyQualityItem(item, index);
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      );
    };

    const renderNotes = (): React.JSX.Element => {
      return (
        <View style={Styles.padding(0, RFPercentage(1))}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Bold',
              colors.surface,
              RFPercentage(1.875),
            )}>
            {Constants.NOTES}:
          </Text>
          <View
            style={{
              height: RFPercentage(10.5),
              backgroundColor: colors.surface,
              borderRadius: RFPercentage(1),
              paddingHorizontal: RFPercentage(1),
              paddingVertical: RFPercentage(1),
              marginTop: RFPercentage(1.5),
            }}>
            <TextInput
              autoCapitalize={Constants.TI_CAP_SENTENCES}
              autoComplete={Constants.TI_COM_OFF}
              keyboardType={Constants.TI_KT_DEFAULT}
              multiline={true}
              onChangeText={(txt: string): void => {
                setNotes(txt);
              }}
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.inverseSurface,
                RFPercentage(1.68),
              )}
              textAlignVertical={'top'}
              value={notes}
            />
          </View>
        </View>
      );
    };

    return !loader ? (
      <View style={UpdationStyles.otherDetailsContainer}>
        {renderWeight()}
        {renderBodyQuality()}
        {renderNotes()}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={UpdationStyles.skeletonOtherDetailsContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderButtons = (): React.JSX.Element => {
    const renderUploadAndSend = (): React.JSX.Element => {
      return !loader ? (
        <View style={Styles.padding(0, RFPercentage(0.9))}>
          <Button
            contentStyle={ButtonStyles.defaultContentStyle}
            labelStyle={ButtonStyles.defaultLabelStyle}
            loading={fetchingStatus}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {}}
            style={[
              Styles.backgroundColor(colors.primary),
              ButtonStyles.defaultStyle,
            ]}
            textColor={colors.secondary}>
            {fetchingStatus ? Constants.LOADING : Constants.UPLOAD_AND_SEND}
          </Button>
        </View>
      ) : (
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonButtonContainer} />
        </SkeletonPlaceholder>
      );
    };

    const renderCancel = (): React.JSX.Element => {
      return !loader ? (
        <View style={Styles.padding(0, RFPercentage(0.9))}>
          <Button
            contentStyle={ButtonStyles.defaultContentStyle}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              loadUseStates();
            }}
            style={[
              Styles.backgroundColor(Colors.TRANSPARENT),
              Styles.borderColor(colors.surface),
              ButtonStyles.defaultStyle,
              ButtonStyles.outlinedStyle,
            ]}
            textColor={colors.surface}>
            {Constants.CANCEL}
          </Button>
        </View>
      ) : (
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonButtonContainer} />
        </SkeletonPlaceholder>
      );
    };

    return (
      <View style={UpdationStyles.buttonsContainer}>
        {renderUploadAndSend()}
        {renderCancel()}
      </View>
    );
  };

  return (
    <View style={Styles.screenContainer(colors.background)}>
      {renderHeader()}
      <KeyboardAvoidingView
        behavior={
          Platform.OS == Constants.IOS
            ? Constants.KAV_BEHAVIOUR_PADDING
            : Constants.KAV_BEHAVIOUR_HEIGHT
        }
        style={CommonStyles.defaultFlex}>
        <ScrollView
          contentContainerStyle={CommonStyles.defaultFlexGrow}
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
          scrollEnabled={scrollStatus}
          showsVerticalScrollIndicator={false}>
          <View style={UpdationStyles.container}>
            {renderUploadPictures()}
            {renderOtherDetails()}
            {renderButtons()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Updation;
