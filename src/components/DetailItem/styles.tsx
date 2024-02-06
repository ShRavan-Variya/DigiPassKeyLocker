import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  viewRowCommon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitle: {
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size16,
    fontFamily: Theme.fontFamily.fontLatoBold,
    marginBottom: Theme.responsiveSize.size8,
  },
  textCommon: {
    fontWeight: '500',
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size13,
    fontFamily: Theme.fontFamily.fontLatoRegular,
    marginVertical: Theme.responsiveSize.size4,
  },
  viewDetail: {
    borderRadius: Theme.responsiveSize.size100,
    backgroundColor: Theme.colors.bgColor2,
    height: Theme.responsiveSize.size38,
    width: Theme.responsiveSize.size38,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
