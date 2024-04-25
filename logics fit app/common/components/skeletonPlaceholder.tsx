import React, {FC} from 'react';
import {MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import SkeletonLoader from 'react-native-skeleton-placeholder';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Constants from '../utils/constants';

const SkeletonPlaceholder: FC<Interfaces.SkeletonPlaceholderInterface> = (
  props: Interfaces.SkeletonPlaceholderInterface,
) => {
  // Props Variables
  const {children} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();

  return (
    <SkeletonLoader
      backgroundColor={colors.tertiary}
      borderRadius={RFPercentage(0.5)}
      highlightColor={colors.onTertiary}
      speed={Constants.SKELETON_PLACEHOLDER_SPEED}>
      {children}
    </SkeletonLoader>
  );
};

export default SkeletonPlaceholder;
