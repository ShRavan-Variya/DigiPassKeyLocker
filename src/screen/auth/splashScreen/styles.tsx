import {Dimensions, StyleSheet} from 'react-native';
import Theme from '@app/theme/Theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainerStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.bgColor1,
  },
  imageMain: {
    height: width - Theme.responsiveSize.size170,
    width: width - Theme.responsiveSize.size170,
  },
});

export default styles;
