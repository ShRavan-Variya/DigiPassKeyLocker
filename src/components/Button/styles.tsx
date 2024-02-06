import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  // Common
  bgStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Theme.responsiveSize.size45,
    borderRadius: Theme.responsiveSize.size8,
    backgroundColor: Theme.colors.bgColor3,
  },
  textStyle: {
    textAlign: 'center',
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size16,
    fontFamily: Theme.fontFamily.fontLatoBlack,
  },
});

export default styles;
