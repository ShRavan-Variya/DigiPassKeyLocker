import React, {FC} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {InputText} from 'components/InputText';
import {ButtonFill} from 'components/Button';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface AddAccountProps {
  visible: boolean;
  value: string;
  placeholder: string;
  error?: string;
  onChangeText: (value: string) => void;
  onAddItem: () => void;
  onClose: () => void;
}

const AddAccount: FC<AddAccountProps> = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}>
      <View style={styles.centeredView}>
        <View style={styles.viewBorderCard}>
          <View style={[styles.viewRow, {marginBottom: Theme.responsiveSize.size10}]}>
            <Text style={styles.textTitleCard}>{'Add Platform Title'}</Text>
            <TouchableOpacity onPress={props.onClose}>
              <Image source={Theme.icons.icClose} style={styles.imageClose} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
          <InputText
            value={props.value}
            placeholder={props.placeholder}
            viewHolderStyle={styles.marginV5}
            onChangeText={props.onChangeText}
            autoCapitalize={'none'}
            error={props.error}
          />
          <ButtonFill
            title={'Add'.toUpperCase()}
            viewTouchable={{marginTop: Theme.responsiveSize.size70}}
            bgStyle={{borderRadius: Theme.responsiveSize.size4}}
            onClick={props.onAddItem}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddAccount;
