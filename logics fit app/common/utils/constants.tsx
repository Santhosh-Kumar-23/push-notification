import {InputProps} from '@twotalltotems/react-native-otp-input';
import {
  ColorSchemeName,
  ImageResizeMode,
  KeyboardAvoidingViewProps,
  KeyboardTypeOptions,
  ModalBaseProps,
  PlatformOSType,
  ScrollViewProps,
  StatusBarStyle,
} from 'react-native';
import {BiometryType} from 'react-native-biometrics';
import {
  MessageOptions,
  MessageType,
  Position,
} from 'react-native-flash-message';
import {LineChartPropsType} from 'react-native-gifted-charts';
import {
  AppbarProps,
  ButtonProps,
  CardProps,
  ChipProps,
  TextInputProps,
} from 'react-native-paper';
import * as Types from '../../configs/ts/types';

// AsyncStorage
export const BEARER_TOKEN: string = 'bearerToken';
export const IS_ON_BOARD_COMPLETE: string = 'isOnBoardComplete';
export const USER_ID: string = 'userId';

// Errors
export const BIRTH_OF_DATE_ERROR: string = 'Birth of date is required';
export const BIRTH_OF_DATE_INVAILD_ERROR: string = 'Birth of date is invalid';
export const COMMON_ERROR: string =
  'Sorry! Something went wrong! Please, try again later!';
export const COMMON_VIDEO_ERROR: string =
  'Sorry! Unable to play the video!\n\nError Code:';
export const CONFIRM_PASSWORD_ERROR: string = 'Confirm paassword is required';
export const CONFIRM_PASSWORD_INVALID_ERROR: string = `Confirm password din't match with passowrd`;
export const CURRENT_PASSWORD_ERROR: string = 'Current password is required';
export const CURRENT_WEIGHT: string = 'Current Weight';
export const EMAIL_ERROR: string = 'Email is required';
export const EMAIL_INVALID_ERROR: string = 'Email is invalid';
export const FILE_LENGTH_ERROR: string =
  'Sorry! You can able to upload a maximum of 9 photo(s) only.';
export const FILE_SIZE_ERROR: string = 'File size should be less than 5 MB';
export const GENDER_ERROR: string = 'Please! Choose any one of the gender!';
export const HEIGHT_ERROR: string = 'Height is required';
export const HEIGHT_INVALID_ERROR: string = 'Height is invalid';
export const NAME_ERROR: string = 'Name is required';
export const OTP_ERROR: string = 'Otp is required';
export const OTP_INVALID_ERROR: string = 'Otp is invalid';
export const PASSWORD_ERROR: string = 'Password is required';
export const PASSWORD_INVALID_ERROR: string =
  'Passowrd must have minimum 8 characters';
export const PICTURE_SIZE_ERROR: string =
  'Maximum picture size should be less than 5 MB';
export const SUBSCRIPTIONS_SELECTION_ERROR: string =
  'Please! Choose any one of the subscription(s)!';
export const WEIGHT_ERROR: string = 'Weight is required';
export const WEIGHT_INVALID_ERROR: string = 'Weight is invalid';

// Keys
export const KEY_CARDIO: string = 'cardio';
export const KEY_DASHBOARD: string = 'dashboard';
export const KEY_FACE_ID: string = 'face_id';
export const KEY_HEIGHT_UNIT: string = 'height_unit';
export const KEY_NOTIFICATION: string = 'notification';
export const KEY_NUTRITION: string = 'nutrition';
export const KEY_TOUCH_ID: string = 'touch_id';
export const KEY_WEIGHT_UNIT: string = 'weight_unit';
export const KEY_WORK_OUT: string = 'work_out';
export const KEY_UPDATE: string = 'update';
export const KEY_USER_IMAGE: string = 'user_image';

// Methods
export const DELETE_METHOD: Types.APIMethodType = 'DELETE';
export const GET_METHOD: Types.APIMethodType = 'GET';
export const PATCH_METHOD: Types.APIMethodType = 'PATCH';
export const POST_METHOD: Types.APIMethodType = 'POST';
export const PUT_METHOD: Types.APIMethodType = 'PUT';

// Moment
export const DD: string = 'DD';
export const DDMMYYYY: string = 'DD/MM/YYYY';
export const l_LT: string = 'l LT';
export const MM: string = 'MM';
export const YYYY: string = 'YYYY';

// Numerics
export const EIGHT: number = 8;
export const FLASH_MESSAGE_DURATION: number = 2500;
export const FOUR: number = 4;
export const FOUR_FIVE: number = 4.5;
export const FIVE: number = 5;
export const FEET_VALUE: number = 0.0328084;
export const HUNDRED: number = 100;
export const LBS_VALUE: number = 2.20462;
export const NINE: number = 9;
export const ONE: number = 1;
export const OTP_TIMER: number = 120;
export const SET_TIMEOUT_2500: number = 2500;
export const SKELETON_PLACEHOLDER_SPEED: number = 1500;
export const SIX: number = 6;
export const SIXTEEN: number = 16;
export const SIXTY: number = 60;
export const TEN: number = 10;
export const THIRTEEN: number = 13;
export const THIRTY_TWO: number = 32;
export const THOUSAND: number = 1000;
export const THOUSAND_TWENTY_FOUR: number = 1024;
export const THREE: number = 3;
export const THREE_HUNDRED: number = 300;
export const TIMER_INTERVAL: number = 1000;
export const TWENTY: number = 20;
export const TWO: number = 2;
export const ZERO: number = 0;
export const ZERO_EIGHT: number = 0.8;
export const ZERO_ONE: number = 0.1;
export const ZERO_TWO: number = 0.2;

// Others
export const EXCEPTION_KEYS_FOR_ASYNC_STORAGE: string[] = [
  IS_ON_BOARD_COMPLETE,
];

// Screens
export const CARDIO: string = 'Cardio';
export const CHANGE_PASSWORD: string = 'Change Password';
export const DASHBOARD: string = 'Dashboard';
export const FORGET_PASSWORD: string = 'Forget Password';
export const HOME: string = 'HOME';
export const NOTIFICATIONS: string = 'Notifications';
export const MY_PROFILE: string = 'My Profile';
export const NUTRITION: string = 'Nutrition';
export const ONBOARDINGS: string = 'OnBoardings';
export const OTP: string = 'Otp';
export const PROFILE: string = 'Profile';
export const PROFILE_UPDATE: string = 'Profile Update';
export const RESET_PASSWORD: string = 'Reset Password';
export const SIGN_IN: string = 'Sign In';
export const SIGN_IN_WELCOME_BACK: string = 'Sign In Welcome Back';
export const SIGN_UP: string = 'Sign Up';
export const SPLASH: string = 'Splash';
export const SUBSCRIBE: string = 'Subscribe';
export const SUBSCRIBE_DESCRIPTION: string =
  'Subscription stay ongoing with a recurring fee charged automatically every due date.';
export const SUBSCRIBE_NOW: string = 'Subscribe Now';
export const SUBSCRIPTION: string = 'Subscription';
export const SUBSCRIPTIONS: string = 'Subscriptions';
export const WORK_OUT: string = 'WorkOut';
export const UPDATE: string = 'Update';
export const UPDATION: string = 'Updation';

// Strings
export const ABOUT: string = 'About';
export const ACCESS_PERMISSION: string = 'Access Permission';
export const ACTIVE: string = 'Active';
export const ACTIVATE: string = 'Activate';
export const ACTIVATE_DEFAULT_CONTENT: string =
  'Sorry! Biometrics were available in your device!';
export const ACTIVATE_FACE_ID_CONTENT: string =
  'Would you like to activate auto sign in with Face ID features to sign in again in future';
export const ACTIVATE_TOUCH_ID_CONTENT: string =
  'Would you like to activate auto sign in with Touch ID features to sign in again in future';
export const ADD: string = 'add';
export const ADD_PICTURES = 'Add Pictures';
export const AGE: string = 'Age';
export const ARROW_BACK_IOS: string = 'arrow-back-ios';
export const ARROW_FORWARD_IOS: string = 'arrow-forward-ios';
export const BACK: string = 'Back';
export const BACK_ONLINE: string = 'Back online';
export const BASE_64_PNG: string = 'data:text/png;base64';
export const BEARER: string = 'Bearer';
export const BIRTH_OF_DATE: string = 'Birth of Date';
export const BODY_QUALITY: string = 'Body Quality';
export const CALORIES: string = 'Calories';
export const CANCEL: string = 'Cancel';
export const CHANGE: string = 'Change';
export const CHECK_NETWORK_CONNECTION: string =
  'Please! Check the newtwork connection!';
export const CLEAR_ALL: string = 'Clear All';
export const CLOSE: string = 'Close';
export const CODE_VERIFICATION: string = 'Code Verification';
export const CONFIRM_FINGERPRINT: string = 'Confirm fingerprint';
export const CONFIRM_PASSWORD: string = 'Confirm Password';
export const CURRENT_PASSWORD: string = 'Current Password';
export const DECREMENT: string = 'decrement';
export const DEFAULT: string = 'default';
export const DEFAULT_CHANNEL: string = 'Default Channel';
export const DIDNT_RECEIVED_THE_CODE: string = 'Didn’t received the code?';
export const DEVELOPMENT: string = 'development';
export const DIDNT_HAVE_ANY_ACCOUNT: string = 'Didn’t have any account?';
export const DP: string = 'Dp';
export const EDIT_MY_PROFILE: string = 'Edit My Profile';
export const EDIT_PHOTO: string = 'Edit Photo';
export const EMAIL: string = 'Email';
export const ENTER_WEIGHT: string = 'Enter Weight';
export const ERROR: string = 'Error';
export const ERROR_CODE: string = 'Error Code';
export const EXPIRED_IN: string = 'Expired in';
export const EXIT_APP: string = 'Exit App';
export const EXIT_APP_TEXT: string = 'Are you sure to exit from ABFFIT app?';
export const EXIT_APP_TOAST: string =
  'Press back again to exit from ABFFIT app!';
export const FACE_ID: string = 'Face ID';
export const FACE_ID_PROMPT_MESSAGE: string = 'Use your face to continue';
export const FEMALE: string = 'Female';
export const FOUR_ZERO: string = '0000';
export const GENDER: string = 'Gender';
export const GET_STARTED: string = 'Get Started';
export const HEIGHT: string = 'Height';
export const HEIGHT_BY: string = 'Height by';
export const HEIGHT_UNITS: string = 'Height Units';
export const HEIGHT_UPDATE: string = 'Height Update';
export const I_WILL_DO_IT_LATER: string = 'I will do it later';
export const ICON_INFO: string = 'info';
export const IF_YOU_HAVE_AN_ACCOUNT: string = 'If you have an account?';
export const IN_ACTIVE: string = 'Inactive';
export const INCREMENT: string = 'increment';
export const INFO: string = 'Info';
export const LANDSCAPE: string = 'LANDSCAPE';
export const LANDSCAPE_LEFT: string = 'LANDSCAPE-LEFT';
export const LANDSCAPE_RIGHT: string = 'LANDSCAPE-RIGHT';
export const LAST_UPDATE: string = 'Last Update';
export const LOADING: string = 'Loading';
export const LOGIN_WITH_DIFFERENT_ACCOUNT: string =
  'Login with different account';
export const MALE: string = 'Male';
export const MARK_ALL_AS_READ: string = 'Mark All as Read';
export const MY_ACCOUNT: string = 'My Account';
export const MY_SUBSCRIPTION: string = 'My Subscription';
export const NAME: string = 'Name';
export const NEW: string = 'New';
export const NEW_PASSWORD: string = 'New Password';
export const NEXT: string = 'Next';
export const NO_BIOMETRICS: string = 'No Biometrics';
export const NO_CARDIOS_FOUND: string = 'No cardio(s) found';
export const NO_CONNECTION: string = 'No connection';
export const NO_NOTIFICATIONS_FOUND: string = 'No notification(s) found';
export const NO_NUTRITIONS_FOUND: string = 'No nutrition(s) found';
export const NO_SUBSCRIPTIONS_FOUND: string = 'No subscription(s) found';
export const NO_UPDATES_FOUND: string = 'No updates(s) found';
export const NO_WORK_OUTS_FOUND: string = 'No work out(s) found';
export const NOTES: string = 'Notes';
export const NOTIFICATION: string = 'Notification';
export const NOTIFICATION_WARNING_POP_UP: string =
  'Sorry! Unable to update the notification. Seems like you have disabled the app notification permission.';
export const OK: string = 'Ok';
export const OPEN_APP_SETTINGS: string = 'Open App Settings';
export const OTP_CONTENT: string =
  'We have sent you a code to your registered email, please check your inbox and enter the 4 digits code here.';
export const PASSWORD: string = 'Password';
export const PAY_BY_CARD: string = 'Pay by Card';
export const PLAY_VIDEO: string = 'Play Video';
export const PORTRAIT: string = 'PORTRAIT';
export const PRIVACY_AND_POLICY: string = 'Privacy and Policy';
export const PROCEED: string = 'Proceed';
export const PROFILE_PIC: string = 'Profile Pic';
export const READ: string = 'Read';
export const REMOVE: string = 'remove';
export const RENEW: string = 'Renew';
export const RESEND: string = 'Resend';
export const RESET: string = 'Reset';
export const SAVE: string = 'Save';
export const SEND: string = 'Send';
export const SELECT_SUBSCRIPTION: string = 'Select Subscription';
export const SIGN_IN_HERE: string = 'Sign In here';
export const SIGN_IN_WITH_FACE_ID: string = 'Sign In with Face ID';
export const SIGN_IN_WITH_TOUCH_ID: string = 'Sign In with Touch ID';
export const SIGN_OUT: string = 'Sign Out';
export const SIGN_OUT_TEXT: string =
  'Are you sure to sign out from ABFFIT app?';
export const SIGN_UP_HERE: string = 'Sign Up here';
export const SKIP: string = 'Skip';
export const STEPS: string = 'Steps';
export const SUBSCRIBE_AND_PAY: string = 'Subscribe and Pay';
export const SUBSCRIBED: string = 'Subscribed';
export const SUCCESS: string = 'Success';
export const THIS_WEEK: string = 'This Week';
export const THREE_ZERO: string = '000';
export const TOUCH_ID: string = 'Touch ID';
export const TOUCH_ID_PROMPT_MESSAGE: string =
  'Use your fingerprint to continue';
export const TWO_ZERO: string = '00';
export const UPLOAD_AND_SEND: string = 'Upload and Send';
export const WEIGHT: string = 'Weight';
export const WEIGHT_BY: string = 'Weight by';
export const WEIGHT_UNITS: string = 'Weight Units';
export const WEIGHT_UPDATE: string = 'Weight Update';
export const WELCOME: string = 'Welcome';
export const WELCOME_BACK: string = 'Welcome Back';
export const VERIFY: string = 'Verify';
export const WELLNESS: string = 'Wellness';
export const YOUR_WELLNESS_SCORE: string = 'Your wellness score';

// !Strings
export const ANDROID: PlatformOSType = 'android';
export const AB_M_SMALL: AppbarProps['mode'] = 'small';
export const B_MODE_ELEVATED: ButtonProps['mode'] = 'elevated';
export const BIO_BIOMETRICS: BiometryType = 'Biometrics';
export const BIO_FACEID: BiometryType = 'FaceID';
export const BIO_TOUCHID: BiometryType = 'TouchID';
export const BOTTOM: Position = 'bottom';
export const CD_MODE_CONTAINED: CardProps['mode'] = 'contained';
export const CD_MODE_OUTLINED: CardProps['mode'] = 'outlined';
export const CH_MODE_FLAT: ChipProps['mode'] = 'flat';
export const CH_MODE_OUTLINED: ChipProps['mode'] = 'outlined';
export const CONTAIN: ImageResizeMode = 'contain';
export const COVER: ImageResizeMode = 'cover';
export const DARK: ColorSchemeName = 'dark';
export const DARK_CONTENT: StatusBarStyle = 'dark-content';
export const FM_MI_AUTO: MessageOptions['icon'] = 'auto';
export const FM_MT_DANGER: MessageType = 'danger';
export const FM_MT_DEFAULT: MessageType = 'default';
export const FM_MT_SUCCESS: MessageType = 'success';
export const FM_MT_WARNING: MessageType = 'warning';
export const GC_LC_RT_SOLID: LineChartPropsType['rulesType'] = 'solid';
export const ICP_MT_PHOTO: string = 'photo';
export const IOS: PlatformOSType = 'ios';
export const KAV_BEHAVIOUR_HEIGHT: KeyboardAvoidingViewProps['behavior'] =
  'height';
export const KAV_BEHAVIOUR_PADDING: KeyboardAvoidingViewProps['behavior'] =
  'padding';
export const LIGHT: ColorSchemeName = 'light';
export const LIGHT_CONTENT: StatusBarStyle = 'light-content';
export const RN_ML_AT_SLIDE: ModalBaseProps['animationType'] = 'slide';
export const SCROLL_PERSIST_TAPS_HANDLED: ScrollViewProps['keyboardShouldPersistTaps'] =
  'handled';
export const SHIFTING: Types.SceneAnimationType = 'shifting';
export const TI_CAP_NONE: TextInputProps['autoCapitalize'] = 'none';
export const TI_CAP_SENTENCES: TextInputProps['autoCapitalize'] = 'sentences';
export const TI_CAP_WORDS: TextInputProps['autoCapitalize'] = 'words';
export const TI_COM_BIRTH_DATE_FULL: TextInputProps['autoComplete'] =
  'birthdate-full';
export const TI_COM_CURRENT_PASDWORD: TextInputProps['autoComplete'] =
  'current-password';
export const TI_COM_EMAIL: TextInputProps['autoComplete'] = 'email';
export const TI_COM_NAME: TextInputProps['autoComplete'] = 'name';
export const TI_COM_NEW_PASDWORD: TextInputProps['autoComplete'] =
  'new-password';
export const TI_COM_OFF: TextInputProps['autoComplete'] = 'off';
export const TI_KT_DEFAULT: KeyboardTypeOptions = 'default';
export const TI_KT_EMAIL_ADDRESS: KeyboardTypeOptions = 'email-address';
export const TI_KT_NUMBER_PAD: InputProps['keyboardType'] = 'number-pad';
export const TI_MODE_OUTLINED: TextInputProps['mode'] = 'outlined';
export const TOP: Position = 'top';
export const VI_MI_CLOSE: string = 'close';
export const VI_MI_WARNING: string = 'warning';

// Success
export const COMMON_SUCCESS: string =
  'Data creation / retrieval / updation successful!';

// Symbols
export const FORWARD_SLASH_SYM: string = '/';
export const PERCENTAGE_SYM: string = '%';
export const START_SYM: string = '*';

// Units
export const CAL_UNIT: string = 'cal';
export const CM_UNIT: string = 'cm';
export const FT_UNIT: string = 'ft';
export const KG_UNIT: string = 'kg';
export const LBS_UNIT: string = 'lbs';

export const BASE1: string =
  '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';

export const BASE: string =
  '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';
