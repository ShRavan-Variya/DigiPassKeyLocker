import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Theme.colors.transparent80
  },
  viewBorderCard: {
    borderWidth: Theme.responsiveSize.size2,
    borderColor: Theme.colors.borderColor2,
    backgroundColor: Theme.colors.bgColor1,
    borderRadius: Theme.responsiveSize.size12,
    paddingHorizontal: Theme.responsiveSize.size15,
    paddingVertical: Theme.responsiveSize.size22,
    marginHorizontal: Theme.responsiveSize.size20,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitleCard: {
    flex: 1,
    fontWeight: '500',
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size16,
    fontFamily: Theme.fontFamily.fontLatoRegular,
  },
  imageClose: {
    height: Theme.responsiveSize.size22,
    width: Theme.responsiveSize.size22,
  },
  marginV5: {
    marginVertical: Theme.responsiveSize.size5,
  },
  paddingH8: {
    paddingHorizontal: Theme.responsiveSize.size8,
  },
  viewLeft: {
    flex: 1,
    marginRight: Theme.responsiveSize.size5,
  },
  viewRight: {
    flex: 1,
    marginLeft: Theme.responsiveSize.size5,
  },
  errorStyleNew: {
    color: Theme.colors.textColor11,
    fontSize: Theme.responsiveSize.size12,
    fontFamily: Theme.fontFamily.fontLatoBold,
    marginTop: -Theme.responsiveSize.size2,
    marginBottom: Theme.responsiveSize.size5,
  },
});

export default styles;
