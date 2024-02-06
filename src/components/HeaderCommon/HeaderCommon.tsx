import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface HeaderCommonProps {
  title: string;
  isDetail?: boolean;
  onClickMenu: () => void;
  onClickAdd: () => void;
  onClickLogout: () => void;
}

const HeaderCommon: FC<HeaderCommonProps> = props => {
  return (
    <>
      <View style={styles.viewMain}>
        <TouchableOpacity onPress={props.onClickMenu}>
          {/* <Image style={props.isDetail ? styles.imageIconNew : styles.imageIcon} resizeMode={'contain'} source={props.isDetail ? Theme.icons.icKeyLeft : Theme.icons.icMenu} /> */}
          <Image style={props.isDetail ? styles.imageIconNew : styles.imageIcon} resizeMode={'contain'} source={props.isDetail ? Theme.icons.icKeyLeft : null} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{props.title}</Text>
        <TouchableOpacity onPress={props.onClickAdd}>
        <Image style={styles.imageIcon} resizeMode={'contain'} source={Theme.icons.icAdd} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: Theme.responsiveSize.size10}} onPress={props.onClickLogout}>
        <Image style={styles.imageIcon} resizeMode={'contain'} source={Theme.icons.icLogout} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewDivider} />
    </>
  );
};

export default HeaderCommon;
