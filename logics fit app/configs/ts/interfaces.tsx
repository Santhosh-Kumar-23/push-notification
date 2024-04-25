import {LabelPosition} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  ImageSourcePropType,
  ModalBaseProps,
  StatusBarProps,
  StyleProp,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {BiometryType} from 'react-native-biometrics';
import {FlashMessageProps} from 'react-native-flash-message';
import {DialogProps} from 'react-native-paper';
import * as Types from './types';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export interface ActionsInterface extends Types.KeyStrValAllType {
  payload: any;
  type: string;
}

export interface APIRequestHeaderInterface extends Types.KeyStrValAllType {
  method: Types.APIMethodType;
  headers: {
    Accept: string;
    'Content-Type': string;
    Authorization: string;
  };
  body?: any;
}

export interface APIRequestDeviceInterface extends Types.KeyStrValStrType {
  device_id: string;
  device_type: string;
}

export interface APIResponseHandlerInterface extends Types.KeyStrValAllType {
  (response: APIResponseInterface): void;
}

export interface APIResponseInterface extends Types.KeyStrValAllType {
  data?: any;
  error?: string;
  message: string;
  title: string;
  type: number;
}

export interface AppReducerStateInterface extends Types.KeyStrValAllType {
  cardios: CadioCardDataInterface[];
  dashboardNutritions: DashboardNutritionCardDataInterface[];
  dashboardNutritionsDetails: DashboardNutritionDetailsInterface;
  forgotPassword: null | Pick<ResetPasswordRequestInterface, 'email' | 'otp'>;
  notifications: NotificationsResponseInterface;
  nutritions: NutritionCardDataInterface[];
  onBoardings: OnBoardDataInterface[];
  subscription: null | SubscriptionCardDataInterface;
  subscriptions: SubscriptionCardDataInterface[];
  user: null | UserInterface;
  userInfo: null | UserInfoInterface;
  workouts: WorkOutCardDataInterface[];
}

export interface AuthHeaderInterface extends Types.KeyStrValAllType {
  onClose?: () => void;
  showClose?: boolean;
  showLogo?: boolean;
}

export interface BiometricsInterface extends Omit<DialogProps, 'children'> {
  fetchingStatus: boolean;
  mode?: BiometryType;
  onRetain: () => void;
}

export interface BiometricsConfigsInterface extends Types.KeyStrValAllType {
  allowDeviceCredentials: boolean;
}

export interface BiometricsDetailsInterface extends Types.KeyStrValAllType {
  available: boolean;
  biometryType?: BiometryType;
  error?: string;
}

export interface BiometricsSimplePromptResponseInterface
  extends Types.KeyStrValAllType {
  success: boolean;
  error?: string;
}

export interface BodyQualityDataInterface extends Types.KeyStrValAllType {
  imageSource: ImageSourcePropType | undefined;
  label: string;
  value: number;
}

export interface BottomNavigationIconPropsInterface
  extends Types.KeyStrValAllType {
  color: string;
  focused: boolean;
  size: number;
}

export interface BottomNavigationLabelPropsInterface
  extends Types.KeyStrValAllType {
  children: string;
  color: string;
  focused: boolean;
  position: LabelPosition;
}

export interface BottomNavigationPropertyPropsInterface
  extends Types.KeyStrValAllType {
  color: string;
  focused: boolean;
  route: BottomNavigationRouteInterface;
}

export interface BottomNavigationRouteInterface extends Types.KeyStrValAllType {
  disabled?: boolean;
  key: string;
  path?: string;
  title: string;
}

export interface BottomNavigationScenePropsInterface
  extends Types.KeyStrValAllType {
  jumpTo: (key: string) => void;
  route: BottomNavigationRouteInterface;
}

export interface CardioCardInterface extends Types.KeyStrValAllType {
  index: number;
  item: null | CadioCardDataInterface;
  onPress?: () => void;
}

export interface CadioCardDataInterface extends Types.KeyStrValAllType {
  duration: string;
  equipment: string;
  id: number;
  imageUrl: string;
  imageType: string;
  reps: string;
  status: string;
  title: string;
}

export interface UpdateCardDataInterface extends Types.KeyStrValAllType {
  title: string;
  unit: string;
  images: UpdateCardImage[];
}

export interface UpdateCardImage extends Types.KeyStrValAllType {
  imageSource: string;
}
export interface CardioDetailsRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  user_id: number;
}

export interface CardiosDetailsResponseInterface
  extends Types.KeyStrValAllType {
  cardios: CadioCardDataInterface[];
}

export interface ChangePasswordRequestInterface extends Types.KeyStrValAllType {
  confirmPassword: string;
  device_id?: string | undefined;
  device_type?: string | undefined;
  oldPassword: string;
  password: string;
  user_id: number;
}

export interface CounterInterface
  extends Types.KeyStrValAllType,
    CounterInputInterface {
  onChangeText: (txt: string) => void;
}

export interface CounterInputInterface
  extends TextInputProps,
    Types.KeyStrValAllType {
  customContainerStyle?: StyleProp<ViewStyle>;
}

export interface DashboardNutritionCardDataInterface
  extends Types.KeyStrValNumStrType {
  color: string;
  label: string;
  unit: string;
  value: number;
}

export interface DashboardNutritionDetailsInterface
  extends Types.KeyStrValNumStrType {
  lastUpdate: string;
  totalCalories: number;
}

export interface DonutDataInterface extends Types.KeyStrValAllType {
  color: string;
  value: number;
}

export interface DotsInterface extends Types.KeyStrValAllType {
  currentIndex: number;
  customContainerStyle?: StyleProp<ViewStyle>;
  numberOfDots: number;
  onPress?: (index: number) => void;
  size: number;
}

export interface DPInterface extends Types.KeyStrValAllType {
  dp: string;
  isUpload?: boolean;
  label: string;
  onUpload?: (files: any) => void;
  size: number;
}

export interface FileDataInterface extends Types.KeyStrValAllType {
  date: string | undefined;
  fileDetails: ImageOrVideo;
  name: string;
  size: number;
  type: string;
  uri: string;
}

export interface ForgotPasswordInterface
  extends Pick<ResetPasswordRequestInterface, 'email' | 'otp'> {}

export interface ForgotPasswordRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  email: string;
}

export interface ForgotPasswordResponseInterface
  extends Types.KeyStrValNumType {
  otp: number;
}

export interface GetDetailsRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  user_id: null | number;
}

export interface GetDetailsResponseInterface extends Types.KeyStrValAllType {
  intro_sliders?: OnBoardDataInterface[];
  token?: string;
  user_data: UserInterface;
}

export interface MarcoDetailsRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  user_id: number;
}

export interface MarcoDetailsResponeInterface extends Types.KeyStrValAllType {
  last_update: string;
  macro_details: DashboardNutritionCardDataInterface[];
  total_calories: number;
}

export interface MealsByIdRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  user_id: number;
}

export interface MealsByIdResponseInterface extends Types.KeyStrValAllType {
  meals: NutritionCardDataInterface[];
}

export interface NetworkInterface extends Types.KeyStrValAllType {
  children: React.JSX.Element;
  position?: FlashMessageProps['position'];
}

export interface NotificationCardInterface extends Types.KeyStrValAllType {
  index: number;
  item: null | NotificationCardDataInterface;
  onPress?: () => void;
}

export interface NotificationCardDataInterface extends Types.KeyStrValAllType {
  body: string;
  date: Date;
  id: number;
  isNew: boolean;
  title: string;
  type: string;
}

export interface NotificationsRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  pageIndex: number;
  pageSize: number;
  user_id: number;
}

export interface NotificationsResponseInterface extends Types.KeyStrValAllType {
  notifications: NotificationCardDataInterface[];
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
}

export interface NutritionCardInterface extends Types.KeyStrValAllType {
  index: number;
  item: null | NutritionCardDataInterface;
  onPress?: () => void;
}

export interface NutritionCardDataInterface extends Types.KeyStrValAllType {
  calories: number | string;
  description: string;
  food_details: NutritionFoodDetailsInterface[];
  title: string;
}

export interface NutritionFoodDetailsInterface
  extends Types.KeyStrValNumStrType {
  label: string;
  unit: string;
  value: number;
}

export interface OnBoardDataInterface extends Types.KeyStrValStrType {
  title: string;
  content: string;
  image: string;
}

export interface OtherReducerStateInterface extends Types.KeyStrValAllType {
  backOnline: boolean;
  fetchingStatus: boolean;
  networkStatus: boolean;
  orientationType: string;
  toastPopup: null | ToastPopupDataInterface;
}

export interface PaymentOptionsInterface extends ModalBaseProps {}

export interface ResendOtpRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  email?: string;
  user_id?: number;
}

export interface ResendOtpResponseInterface extends Types.KeyStrValAllType {
  otp: number;
  user_data?: UserInterface;
}

export interface ResetPasswordRequestInterface extends Types.KeyStrValAllType {
  confirmPassword: string;
  device_id?: string | undefined;
  device_type?: string | undefined;
  email: string;
  otp: number;
  password: string;
}

export interface RootReducersStateInterface extends Types.KeyStrValAllType {
  app: AppReducerStateInterface;
  other: OtherReducerStateInterface;
}

export interface SignInRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  email: string;
  password: string;
}

export interface SignInResponseInterface extends Types.KeyStrValAllType {
  otp?: number;
  token?: string;
  user_data: UserInterface;
}

export interface SignUpRequestInterface extends Types.KeyStrValAllType {
  confirmPassword: string;
  device_id?: string | undefined;
  device_type?: string | undefined;
  email: string;
  name: string;
  password: string;
}

export interface SignUpResponseInterface extends Types.KeyStrValAllType {
  otp: number;
  user_data: UserInterface;
}

export interface SkeletonPlaceholderInterface extends Types.KeyStrValAllType {
  children: React.JSX.Element;
}

export interface StatusBarInterface extends StatusBarProps {}

export interface SubscribeNowInterface extends Types.KeyStrValAllType {
  customCardStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  navigation: any;
  subscriptions: SubscriptionCardDataInterface[];
}

export interface SubscriptionCardInterface extends Types.KeyStrValAllType {
  checked: boolean;
  index: number;
  isRenew: boolean;
  item: null | SubscriptionCardDataInterface;
  onPress?: () => void;
}

export interface SubscriptionCardDataInterface extends Types.KeyStrValAllType {
  currency: string;
  description: string;
  discount: number;
  expiryDate: Date | null;
  id: number;
  price: number;
  status: string;
  title: string;
}

export interface SubscriptionDetailsRequestInterface
  extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  user_id: number;
}

export interface SubscriptionDetailsResponseInterface
  extends Types.KeyStrValAllType {
  subscription_details: SubscriptionCardDataInterface[];
}

export interface ToastPopupDataInterface extends APIResponseInterface {
  buttonAction?: () => void;
  buttonLabel?: string;
}

export interface ToastPopupInterface extends Omit<DialogProps, 'children'> {
  buttonAction?: null | (() => void);
  buttonLabel: string;
  messageDetails: null | ToastPopupDataInterface;
}

export interface UpdateBiometricsInfoRequestInterface
  extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  face_id?: boolean;
  touch_id?: boolean;
  user_id: number;
}

export interface UpdateBiometricsInfoResponseInterface
  extends Types.KeyStrValAllType {
  user_data: UserInterface;
}

export interface UpdateUserRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  dob?: string | undefined;
  fcm_token?: string | undefined;
  gender?: string | undefined;
  height?: number | undefined;
  height_unit?: string | undefined;
  name?: string | undefined;
  notification?: boolean | undefined;
  user_id: number;
  weight?: number | undefined;
  weight_unit?: string | undefined;
}

export interface UpdateUserResponseInterface extends Types.KeyStrValAllType {
  user_data: UserInterface;
}

export interface UpdateWorkoutWeighRequestInterface
  extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  user_id: number;
  workout_assignment_id: number;
  weight: number;
}

export interface UserInterface extends Types.KeyStrValAllType {
  age: number;
  created_at: Date;
  device_id: string;
  device_type: string;
  dob: string;
  email: string;
  face_id: boolean;
  fcm_token: string;
  gender: string;
  height: number;
  height_unit: string;
  id: number;
  name: string;
  new_notifications: number;
  notification: boolean;
  otp: number;
  subscription: SubscriptionCardDataInterface;
  subscription_status: null | string;
  token: string;
  touch_id: boolean;
  updated_at: Date;
  user_id: number;
  user_image: string;
  user_status: string;
  weight: number;
  weight_unit: string;
}

export interface UserInfoInterface extends Types.KeyStrValAllType {
  birthOfDateDD: string;
  birthOfDateMM: string;
  birthOfDateYYYY: string;
  gender: string;
  height: string;
  weight: string;
}

export interface VerifyOtpRequestInterface extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  otp: number;
  user_id: number;
}

export interface VerifyOtpResponseInterface extends Types.KeyStrValAllType {
  token: string;
  user_data: UserInterface;
}

export interface WeightLiftingDetailsRequestInterface
  extends Types.KeyStrValAllType {
  device_id?: string | undefined;
  device_type?: string | undefined;
  user_id: number;
}

export interface WeightLiftingDetailsResponseInterface
  extends Types.KeyStrValAllType {
  weight_lifting: WorkOutCardDataInterface[];
}

export interface WeightPopupInterface extends Omit<DialogProps, 'children'> {
  onRetain: (weight: string) => void;
  value: string;
}

export interface WellnessDataInterface extends Types.KeyStrValNumStrType {
  label: string;
  value: number | string;
}

export interface WorkOutCardInterface extends Types.KeyStrValAllType {
  index: number;
  item: null | WorkOutCardDataInterface;
  onPlayVideo?: (videoId: string) => void;
  onPress?: () => void;
  onUpdateWeight?: (weight: string, workOutId: number) => void;
}

export interface WorkOutCardDataInterface extends Types.KeyStrValAllType {
  title: string;
  workout_details: WorkOutDetailsInterface[];
}

export interface WorkOutDetailsInterface extends Types.KeyStrValAllType {
  description: string;
  id: number;
  label: string;
  url: string;
  weight: number;
}
