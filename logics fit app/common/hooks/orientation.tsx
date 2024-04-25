import {useEffect, useState} from 'react';
import Orientation, {OrientationType} from 'react-native-orientation-locker';

const useOrientation = (): OrientationType => {
  // UseState Variables
  const [orientation, setOrientation] = useState<null | OrientationType>(null);

  // Other Variables
  const initialDeviceOrientation: OrientationType =
    Orientation.getInitialOrientation();

  useEffect(() => {
    const onOrientationDidChange = (deviceOrientation: OrientationType) => {
      setOrientation(deviceOrientation);
    };

    Orientation.addOrientationListener(onOrientationDidChange);

    return (): void => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  });

  return orientation || initialDeviceOrientation;
};

export default useOrientation;
