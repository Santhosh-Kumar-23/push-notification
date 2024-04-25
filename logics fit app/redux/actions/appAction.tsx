import * as Endpoints from '../../api/Endpoints';
import RequestService from '../../api/Service';
import * as Interfaces from '../../configs/ts/interfaces';
import * as ReduxTypes from '../rootTypes';

// App Actions

export const changePassword = (
  requestData: Interfaces.ChangePasswordRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.CHANGE_PASSWORD, requestData, onResponse);
  };
};

export const clearReduxStates = (): Pick<
  Interfaces.ActionsInterface,
  'type'
> => {
  return {
    type: ReduxTypes.LOGOUT,
  };
};

export const forgetPassword = (
  requestData: Interfaces.ForgotPasswordRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(
      Endpoints.FORGET_PASSWORD,
      requestData,
      onResponse,
      true,
    );
  };
};

export const getCardioDetails = (
  requestData: Interfaces.CardioDetailsRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.GET_CARDIO_DETAILS, requestData, onResponse);
  };
};

export const getDetails = (
  requestData: Interfaces.GetDetailsRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.GET_DETAILS, requestData, onResponse);
  };
};

export const getMacroDetails = (
  requestData: Interfaces.MarcoDetailsRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.GET_MACRO_DETAILS, requestData, onResponse);
  };
};

export const getMealsById = (
  requestData: Interfaces.MealsByIdRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.GET_MEALS_BY_ID, requestData, onResponse);
  };
};

export const getNotifications = (
  requestData: Interfaces.NotificationsRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.GET_NOTIFICATIONS, requestData, onResponse);
  };
};

export const getSubscriptionDetails = (
  requestData: Interfaces.SubscriptionDetailsRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(
      Endpoints.GET_SUBSCRIOPTION_DETAILS,
      requestData,
      onResponse,
    );
  };
};

export const getWeightLiftingDetails = (
  requestData: Interfaces.WeightLiftingDetailsRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(
      Endpoints.GET_WEIGHT_LIFTING_DETAILS,
      requestData,
      onResponse,
    );
  };
};

export const imageUpload = (
  requestData: FormData,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.IMAGE_UPLOAD, requestData, onResponse);
  };
};

export const login = (
  requestData: Interfaces.SignInRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.LOGIN, requestData, onResponse);
  };
};

export const register = (
  requestData: Interfaces.SignUpRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.REGISTER, requestData, onResponse, true);
  };
};

export const resendOtp = (
  endpoint: string,
  requestData: Interfaces.ResendOtpRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(endpoint, requestData, onResponse, true);
  };
};

export const resetPassword = (
  requestData: Interfaces.ResetPasswordRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.RESET_PASSWORD, requestData, onResponse);
  };
};

export const storeCardios = (
  cardios: Interfaces.CadioCardDataInterface[],
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.CARDIOS,
    payload: cardios,
  };
};

export const storeDashboardNutritions = (
  dashboardNutritions: Interfaces.DashboardNutritionCardDataInterface[],
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.DASHBOARD_NUTRITIONS,
    payload: dashboardNutritions,
  };
};

export const storeDashboardNutritionsDetails = (
  dashboardNutritionsDetails: Interfaces.DashboardNutritionDetailsInterface,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.DASHBOARD_NUTRITIONS_DETAILS,
    payload: dashboardNutritionsDetails,
  };
};

export const storeForgotPassword = (
  forgotpassword: Interfaces.ForgotPasswordInterface,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.FORGET_PASSWORD,
    payload: forgotpassword,
  };
};

export const storeNotifications = (
  notifications: Interfaces.NotificationsResponseInterface,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.NOTIFICATIONS,
    payload: notifications,
  };
};

export const storeNutritions = (
  nutritions: Interfaces.NutritionCardDataInterface[],
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.NUTRITIONS,
    payload: nutritions,
  };
};

export const storeOnBoardings = (
  onBoardings: Interfaces.OnBoardDataInterface[],
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.ON_BOARDINGS,
    payload: onBoardings,
  };
};

export const storeSubscription = (
  subscription: null | Interfaces.SubscriptionCardDataInterface,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.SUBSCRIPTION,
    payload: subscription,
  };
};

export const storeSubscriptions = (
  subscriptions: Interfaces.SubscriptionCardDataInterface[],
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.SUBSCRIPTIONS,
    payload: subscriptions,
  };
};

export const storeUser = (
  user: null | Interfaces.UserInterface,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.USER,
    payload: user,
  };
};

export const storeUserInfo = (
  userInfo: null | Interfaces.UserInfoInterface,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.USER_INFO,
    payload: userInfo,
  };
};

export const storeWorkouts = (
  workouts: Interfaces.WorkOutCardDataInterface[],
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.WORKOUTS,
    payload: workouts,
  };
};

export const updateBiometricInfo = (
  requestData: Interfaces.UpdateBiometricsInfoRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(
      Endpoints.UPDATE_BIOMETRIC_INFO,
      requestData,
      onResponse,
    );
  };
};

export const updateUser = (
  requestData: Interfaces.UpdateUserRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.UPDATE_USER, requestData, onResponse);
  };
};

export const updateWorkoutWeight = (
  requestData: Interfaces.UpdateWorkoutWeighRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(
      Endpoints.UPDATE_WORKOUT_WEIGHT,
      requestData,
      onResponse,
    );
  };
};

export const verifyOtp = (
  requestData: Interfaces.VerifyOtpRequestInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
) => {
  return () => {
    RequestService.post(Endpoints.VERIFY_OTP, requestData, onResponse, true);
  };
};
