import * as Colors from '../common/utils/colors';
import * as Constants from '../common/utils/constants';
import * as Interfaces from './ts/interfaces';

export const biomerticsConfigs: Interfaces.BiometricsConfigsInterface = {
  allowDeviceCredentials: true,
};

export const imagePickerConfigs: any = {
  cropperActiveWidgetColor: Colors.PRIMARY,
  cropperCancelColor: Colors.WHITE,
  cropperChooseColor: Colors.PRIMARY,
  cropperStatusBarColor: Colors.BLACK,
  cropperTintColor: Colors.RED,
  cropperToolbarColor: Colors.PRIMARY,
  cropperToolbarTitle: Constants.EDIT_PHOTO,
  cropping: true,
  enableRotationGesture: true,
  freeStyleCropEnabled: true,
  maxFiles: Constants.NINE,
  mediaType: Constants.ICP_MT_PHOTO,
};
