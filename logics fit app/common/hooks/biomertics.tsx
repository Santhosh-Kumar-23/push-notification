import {useEffect, useState} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as AppConfigs from '../../configs/appConfigs';
import * as Interfaces from '../../configs/ts/interfaces';

const useBiometrics = (): Interfaces.BiometricsDetailsInterface => {
  // UseState Variables
  const [biometrics, setBiometrics] =
    useState<Interfaces.BiometricsDetailsInterface>({
      available: false,
    });

  // Other Variables
  const RnBiometrics = new ReactNativeBiometrics(AppConfigs.biomerticsConfigs);

  useEffect(() => {
    RnBiometrics.isSensorAvailable().then(
      (biometricsData: Interfaces.BiometricsDetailsInterface): void => {
        setBiometrics(biometricsData);
      },
    );
  });

  return biometrics;
};

export default useBiometrics;
