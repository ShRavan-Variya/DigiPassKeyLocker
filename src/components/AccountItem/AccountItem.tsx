import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface AccountItemProps {
  id: number;
  title: string;
  accounts: number;
  onClick: () => void;
  viewStyle?: ViewStyle;
}

const AccountItem: FC<AccountItemProps> = props => {
  return (
    <TouchableOpacity style={[styles.viewMain, props.viewStyle]} onPress={props.onClick}>
      <View style={styles.viewAccount}>
        <Text style={styles.textAccount}>{props.title.substring(0, 1)}</Text>
      </View>
      <View style={styles.viewCenter}>
        <Text style={styles.textTitle}>{props.title}</Text>
        <Text style={styles.textSubTitle}>{`${props.accounts} Accounts`}</Text>
      </View>
      <Image style={styles.imageIcon} resizeMode={'contain'} source={Theme.icons.icKey} />
    </TouchableOpacity>
  );
};

export default AccountItem;
