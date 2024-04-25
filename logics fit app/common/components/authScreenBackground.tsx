import React, {FC} from 'react';
import {Image, ScaledSize, View, useWindowDimensions} from 'react-native';
import * as Assets from '../../assets';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';

const AuthScreenBackground: FC = (props: any) => {
  // Props Variables
  const {} = props;

  // Other Variables
  const {width, height}: ScaledSize = useWindowDimensions();
  const {CommonStyles} = Styles;

  return (
    <View>
      <Image
        resizeMode={Constants.COVER}
        source={Assets.BACKGROUND_EFFECT}
        style={[
          CommonStyles.backgroundEffectContainer,
          {
            width,
            height,
          },
        ]}
      />
      <View
        style={{
          width,
          height,
        }}>
        <Image
          resizeMode={Constants.CONTAIN}
          source={Assets.BACKGROUND_IMAGE}
          style={{
            width,
            height: height * 0.75,
          }}
        />
      </View>
    </View>
  );
};

export default AuthScreenBackground;
