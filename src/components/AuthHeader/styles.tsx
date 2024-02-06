import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  viewMain: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: Theme.responsiveSize.size45,
  },
  imageIcon: {
    height: Theme.responsiveSize.size130,
    width: Theme.responsiveSize.size130,
  },
  textTitle: {
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size25,
    marginLeft: -Theme.responsiveSize.size50,
    fontFamily: Theme.fontFamily.fontLatoBlack,
  },
});

export default styles;
