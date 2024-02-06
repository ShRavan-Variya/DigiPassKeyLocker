import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  mainContainerStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.appColor,
  },
  viewFlexContainer: {
    flex: 1,
    backgroundColor: Theme.colors.bgColor1,
  },
  viewList: {
    marginTop: Theme.responsiveSize.size15,
  },
  viewDivider: {
    height: Theme.responsiveSize.size1,
    backgroundColor: Theme.colors.bgColor2,
    marginVertical: Theme.responsiveSize.size15,
  },
  viewEmptyMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEmpty: {
    height: Theme.responsiveSize.size80,
    width: Theme.responsiveSize.size80,
  },
  textEmpty: {
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size15,
    fontFamily: Theme.fontFamily.fontLatoRegular,
  },
  viewContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: Theme.responsiveSize.size15,
    paddingBottom: Theme.responsiveSize.size15,
  },
});

export default styles;
