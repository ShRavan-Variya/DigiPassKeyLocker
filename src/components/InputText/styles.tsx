import {Platform, StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  viewMainStyle: {
    marginVertical: Theme.responsiveSize.size5,
  },
  textTitle: {
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size13,
    fontFamily: Theme.fontFamily.fontLatoRegular,
  },
  viewBgInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Theme.responsiveSize.size45,
    backgroundColor: Theme.colors.bgColor2,
    borderRadius: Theme.responsiveSize.size3,
    marginTop: Theme.responsiveSize.size4,
    paddingHorizontal: Theme.responsiveSize.size15,
  },
  textInputStyle: {
    flex: 1,
    color: Theme.colors.textColor2,
    fontSize: Theme.responsiveSize.size14,
    marginRight: Theme.responsiveSize.size8,
    marginTop: Platform.OS === 'android' ? Theme.responsiveSize.size5 : null,
    fontFamily: Theme.fontFamily.fontLatoRegular,
  },
  imageSecurity: {
    height: Theme.responsiveSize.size20,
    width: Theme.responsiveSize.size20,
  },
  textError: {
    color: Theme.colors.textColor11,
    fontSize: Theme.responsiveSize.size12,
    fontFamily: Theme.fontFamily.fontLatoBold,
    marginVertical: Theme.responsiveSize.size5,
  },
});

export default styles;
