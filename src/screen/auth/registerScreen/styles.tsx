import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  mainContainerStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.bgColor1,
  },
  viewFlexContainer: {
    flexGrow: 1,
    paddingHorizontal: Theme.responsiveSize.size15,
    backgroundColor: Theme.colors.bgColor1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLeft: {
    flex: 1,
    marginRight: Theme.responsiveSize.size5,
  },
  viewRight: {
    flex: 1,
    marginLeft: Theme.responsiveSize.size5,
  },
  marginV5: {
    marginVertical: Theme.responsiveSize.size5,
  },
  textError: {
    color: Theme.colors.textColor11,
    fontSize: Theme.responsiveSize.size12,
    fontFamily: Theme.fontFamily.fontLatoBold,
    marginBottom: Theme.responsiveSize.size5,
  },
  buttonMargin: {
    marginHorizontal: Theme.responsiveSize.size15,
    marginVertical: Theme.responsiveSize.size15,
  },
  textAccount: {
    textAlign: 'center',
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size13,
    fontFamily: Theme.fontFamily.fontLatoRegular,
    marginVertical: Theme.responsiveSize.size10,
  },
  textSignUp: {
    textAlign: 'center',
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size13,
    fontFamily: Theme.fontFamily.fontLatoBlack,
  },
});

export default styles;
