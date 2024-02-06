import {StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const styles = StyleSheet.create({
  mainContainerStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.appColor,
  },
  viewFlexContainer: {
    flexGrow: 1,
    paddingHorizontal: Theme.responsiveSize.size15,
    backgroundColor: Theme.colors.bgColor1,
  },
});

export default styles;
