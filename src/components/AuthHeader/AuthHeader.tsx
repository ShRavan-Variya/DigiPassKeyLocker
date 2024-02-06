import React, {FC} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {Overlay} from '@rneui/themed';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface AuthHeaderProps {
  title: string;
}

const AuthHeader: FC<AuthHeaderProps> = props => {
  return (
    <View style={styles.viewMain}>
      <Image style={styles.imageIcon} resizeMode={'contain'} source={Theme.icons.icIcon} />
      <Text style={styles.textTitle}>{props.title}</Text>
    </View>
  );
};

export default AuthHeader;
