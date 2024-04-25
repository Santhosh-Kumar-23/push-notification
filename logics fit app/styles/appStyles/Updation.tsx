import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Colors from '../../common/utils/colors';

const UpdationStyles = StyleSheet.create({
  bodyQualityItemLabelContainer: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1),
  },
  bodyQualityItemQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    paddingVertical: RFPercentage(1.8),
  },
  container: {
    flex: 1,
    paddingHorizontal: RFPercentage(3.6),
    paddingVertical: RFPercentage(1.8),
  },
  otherDetailsContainer: {
    backgroundColor: Colors.DARK_GRAY,
    borderRadius: RFPercentage(1),
    marginTop: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1),
  },
  picturesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: RFPercentage(2),
    paddingTop: RFPercentage(1),
  },
  pictureItemCloseConatiner: {bottom: 0, position: 'absolute', right: 0},
  picturesItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFPercentage(0.75),
    width: '33.33%',
  },
  picturesItemImageContainer: {
    height: '100%',
    width: '100%',
    borderRadius: RFPercentage(1),
  },
  skeletonOtherDetailsContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(68.75),
    marginTop: RFPercentage(2),
    width: '100%',
  },
  skeletonUploadPicturesAddContainer: {
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    height: RFPercentage(7.625),
    width: '100%',
  },
  skeletonUploadPicturesWarningContainer: {
    alignSelf: 'flex-start',
    borderRadius: RFPercentage(1),
    height: RFPercentage(1.4),
    width: '75%',
  },
  uploadPicturesAddContainer: {
    borderRadius: RFPercentage(1),
    borderStyle: 'dashed',
    borderWidth: RFPercentage(0.1),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1),
  },
});

export default UpdationStyles;
