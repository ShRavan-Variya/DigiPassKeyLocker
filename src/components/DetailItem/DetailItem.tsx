import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface DetailItemProps {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  mobile: string;
  details: string;
  onClick: () => void;
  viewStyle?: ViewStyle;
}

const DetailItem: FC<DetailItemProps> = props => {
  return (
    <TouchableOpacity onPress={props.onClick}>
      <View style={styles.viewRowCommon}>
        <Text style={styles.textTitle}>{` ${props.id}.  ${props.firstName} ${props.lastName}`}</Text>
      </View>
      <View style={styles.viewRowCommon}>
        <Text style={styles.textCommon}>{'Email: '}</Text>
        <Text style={styles.textCommon}>{props.email}</Text>
      </View>
      <View style={styles.viewRowCommon}>
        <Text style={styles.textCommon}>{'Password: '}</Text>
        <Text style={styles.textCommon}>{props.password}</Text>
      </View>
      <View style={styles.viewRowCommon}>
        <Text style={styles.textCommon}>{'Mobile: '}</Text>
        <Text style={styles.textCommon}>{props.mobile}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DetailItem;
