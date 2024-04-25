import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import * as Interfaces from '../../configs/ts/interfaces';
import NetworkStyles from '../../styles/otherStyles/network';
import * as Styles from '../styles';
import * as Colors from '../utils/colors';
import * as Constants from '../utils/constants';

const Network: FC<Interfaces.NetworkInterface> = (
  props: Interfaces.NetworkInterface,
) => {
  // Props Variables
  const {children, position = Constants.BOTTOM} = props;

  // Other Variables
  const {backOnline, networkStatus} = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );

  const renderNetwork = (): React.JSX.Element => {
    const renderBackOnline = (): React.JSX.Element => {
      return (
        <View style={NetworkStyles.backOnlineContainer}>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              Colors.WHITE,
              RFPercentage(2),
              'center',
            )}>
            {Constants.BACK_ONLINE}
          </Text>
        </View>
      );
    };

    const renderNoConnection = (): React.JSX.Element => {
      return (
        <View style={NetworkStyles.noConnectionContainer}>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              Colors.WHITE,
              RFPercentage(2),
              'center',
            )}>
            {Constants.NO_CONNECTION}
          </Text>
        </View>
      );
    };

    return (
      <>
        {backOnline && renderBackOnline()}
        {!networkStatus && renderNoConnection()}
      </>
    );
  };

  return (
    <>
      {position == Constants.TOP && renderNetwork()}
      {children}
      {position == Constants.BOTTOM && renderNetwork()}
    </>
  );
};

export default Network;
