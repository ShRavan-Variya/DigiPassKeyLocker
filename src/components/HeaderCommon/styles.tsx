import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  viewMain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.responsiveSize.size8,
    paddingHorizontal: Theme.responsiveSize.size15,
  },
  viewDivider: {
    height: Theme.responsiveSize.size1,
    backgroundColor: Theme.colors.bgColor2,
  },
  imageIcon: {
    height: Theme.responsiveSize.size25,
    width: Theme.responsiveSize.size25,
  },
  imageIconNew: {
    height: Theme.responsiveSize.size30,
    width: Theme.responsiveSize.size30,
  },
  textTitle: {
    flex: 1,
    textAlign: 'center',
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size18,
    fontFamily: Theme.fontFamily.fontLatoBold,
  },
});

export default styles;
