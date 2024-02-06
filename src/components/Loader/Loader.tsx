import React, {FC} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Overlay} from '@rneui/themed';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: FC<LoaderProps> = props => {
  return (
    <Overlay isVisible={props.isLoading} onBackdropPress={console.log}>
      <View style={styles.viewLoader}>
        <ActivityIndicator size="large" color={Theme.colors.appColor} />
      </View>
    </Overlay>
  );
};

export default Loader;
