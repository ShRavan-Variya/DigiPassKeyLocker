import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  viewMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.responsiveSize.size10,
  },
  viewAccount: {
    borderRadius: Theme.responsiveSize.size100,
    backgroundColor: Theme.colors.bgColor2,
    height: Theme.responsiveSize.size38,
    width: Theme.responsiveSize.size38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAccount: {
    color: Theme.colors.textColor2,
    fontSize: Theme.responsiveSize.size20,
    fontFamily: Theme.fontFamily.fontLatoBlack,
  },
  viewCenter: {
    flex: 1,
    paddingHorizontal: Theme.responsiveSize.size12,
  },
  textTitle: {
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size15,
    fontFamily: Theme.fontFamily.fontLatoBold,
  },
  textSubTitle: {
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size10,
    marginTop: Theme.responsiveSize.size4,
    fontFamily: Theme.fontFamily.fontLatoRegular,
  },
  imageIcon: {
    height: Theme.responsiveSize.size25,
    width: Theme.responsiveSize.size25,
  },
});

export default styles;
