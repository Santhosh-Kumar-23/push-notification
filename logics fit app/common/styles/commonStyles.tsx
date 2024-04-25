import {StyleSheet, TextStyle} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Types from '../../configs/ts/types';

// Common Styles
export const CommonStyles = StyleSheet.create({
  authLogoContainer: {
    height: RFPercentage(7.7),
    width: RFPercentage(8),
  },
  backgroundEffectContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultFlex: {flex: 1},
  defaultFlexGrow: {flexGrow: 1},
  flexColumn: {flexDirection: 'column'},
  flexRow: {flexDirection: 'row'},
  screenAbsoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 1,
  },
  screenSubContainer: {
    flex: 1,
    paddingHorizontal: RFPercentage(1.6),
    paddingVertical: RFPercentage(1.6),
  },
  skeletonButtonContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(5),
    marginVertical: RFPercentage(0.9),
    height: RFPercentage(5.625),
    width: '100%',
  },
  skeletonSubscriptionCardContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(13.25),
    marginVertical: RFPercentage(0.8),
    width: '100%',
  },
});

// Flex Styles
export const flex = (flex: number): Types.KeyStrValNumType => {
  return {flex};
};

// Image Styles
export const imageView = (
  height: number | string,
  width: number | string,
): Types.KeyStrValNumStrType => {
  return {height, width};
};

// Margin Styles
export const margin = (
  marginHorizontal: number,
  marginVertical: number,
): Types.KeyStrValNumType => {
  return {marginHorizontal, marginVertical};
};

export const marginHorizontal = (
  marginLeft: number,
  marginRight: number,
): Types.KeyStrValNumType => {
  return {marginLeft, marginRight};
};

export const marginVertical = (
  marginBottom: number,
  marginTop: number,
): Types.KeyStrValNumType => {
  return {marginBottom, marginTop};
};

// Other Styles
export const backgroundColor = (
  backgroundColor: string,
): Types.KeyStrValStrType => {
  return {backgroundColor};
};

export const borderColor = (borderColor: string): Types.KeyStrValStrType => {
  return {borderColor};
};

// Padding Styles
export const padding = (
  paddingHorizontal: number,
  paddingVertical: number,
): Types.KeyStrValNumType => {
  return {paddingHorizontal, paddingVertical};
};

export const paddingHorizontal = (
  paddingLeft: number,
  paddingRight: number,
): Types.KeyStrValNumType => {
  return {paddingLeft, paddingRight};
};

export const paddingVertical = (
  paddingBottom: number,
  paddingTop: number,
): Types.KeyStrValNumType => {
  return {paddingBottom, paddingTop};
};

// Screen Styles
export const screenContainer = (
  backgroundColor: string,
): Types.KeyStrValNumStrType => {
  return {backgroundColor, flex: 1};
};

// Text Styles
export const textView = (
  size: number,
  fontFamily: Types.FontFamilyType,
  color: string,
  lineHeight: number = RFPercentage(2),
  align: Exclude<TextStyle['textAlign'], undefined> = 'left',
  textTransform: Exclude<TextStyle['textTransform'], undefined> = 'none',
): Types.KeyStrValNumStrType => {
  return {
    color,
    fontFamily,
    fontSize: size,
    lineHeight,
    textAlign: align,
    textTransform: textTransform,
  };
};
