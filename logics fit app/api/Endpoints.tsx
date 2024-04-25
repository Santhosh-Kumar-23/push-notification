// Endpoints

// Sub Paths
const AUTH: string = '/auth';

// Biometrics
export const UPDATE_BIOMETRIC_INFO: string = AUTH + '/update_biometric_info';

// Cardio
export const GET_CARDIO_DETAILS: string = AUTH + '/get_cardio_details';

// Change Password
export const CHANGE_PASSWORD: string = AUTH + '/changepassword';

// Forgot Password
export const FORGET_PASSWORD: string = AUTH + '/forgotpassword';

// Notifications
export const GET_NOTIFICATIONS: string = AUTH + '/get_notifications';

// Nutrition
export const GET_MACRO_DETAILS: string = AUTH + '/get_macro_details';
export const GET_MEALS_BY_ID: string = AUTH + '/getMealsByID';

// Otp
export const RESEND_OTP: string = AUTH + '/resend_otp';
export const VERIFY_OTP: string = AUTH + '/verify_otp';

// Profile
export const GET_SUBSCRIOPTION_DETAILS: string =
  AUTH + '/get_subscription_details';
export const IMAGE_UPLOAD: string = AUTH + '/image_upload';
export const UPDATE_USER: string = AUTH + '/update_user';

// Reset Password
export const RESET_PASSWORD: string = AUTH + '/resetpassword';

// Sign In
export const LOGIN: string = AUTH + '/login';

// Sign Up
export const REGISTER: string = AUTH + '/register';

// Splash
export const GET_DETAILS: string = AUTH + '/getdetails';

// Workout
export const GET_WEIGHT_LIFTING_DETAILS: string =
  AUTH + '/get_weight_lifting_details';
export const UPDATE_WORKOUT_WEIGHT: string = AUTH + '/update_workout_weight';
