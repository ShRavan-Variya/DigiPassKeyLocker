import React, {FC, useEffect, useState} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputText} from 'components/InputText';
import {ButtonFill} from 'components/Button';
import {Validations} from '@app/constants';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface AddDetailsProps {
  visible: boolean;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  mobile: string;
  details: string;

  errName: string;
  errUserName: string;
  errEmail: string;
  errPassword: string;
  errMobile: string;

  onChangeText: (id: number, text: string) => void;
  onAddItem: () => void;
  onClose: () => void;
}

const AddDetails: FC<AddDetailsProps> = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}>
      <View style={styles.centeredView}>
        <View style={[styles.viewBorderCard, {paddingTop: Theme.responsiveSize.size15}]}>
          <View style={[styles.viewRow, {marginBottom: Theme.responsiveSize.size3}]}>
            <View style={{flex: 1}} />
            <TouchableOpacity onPress={props.onClose}>
              <Image source={Theme.icons.icClose} style={styles.imageClose} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>

          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
            <View style={[styles.viewRow, {marginVertical: Theme.responsiveSize.size2}]}>
              <View style={styles.viewLeft}>
                <InputText
                  value={props.firstName}
                  title={'First Name'}
                  placeholder={'First Name'}
                  viewBgInput={styles.paddingH8}
                  onChangeText={t => props.onChangeText(1, t)}
                  autoCapitalize={'none'}
                />
              </View>
              <View style={styles.viewRight}>
                <InputText
                  value={props.lastName}
                  title={'Last Name'}
                  placeholder={'Last Name'}
                  viewBgInput={styles.paddingH8}
                  onChangeText={t => props.onChangeText(2, t)}
                  autoCapitalize={'none'}
                />
              </View>
            </View>
            {props.errName && <Text style={styles.errorStyleNew}>{props.errName}</Text>}
            <InputText
              value={props.userName}
              title={'User Name'}
              placeholder={'User Name'}
              viewBgInput={styles.paddingH8}
              viewHolderStyle={styles.marginV5}
              onChangeText={t => props.onChangeText(3, t)}
              autoCapitalize={'none'}
              error={props.errUserName}
            />
            <InputText
              value={props.email}
              title={'Email'}
              placeholder={'Email'}
              viewBgInput={styles.paddingH8}
              viewHolderStyle={styles.marginV5}
              onChangeText={t => props.onChangeText(4, t)}
              autoCapitalize={'none'}
              error={props.errEmail}
            />
            <InputText
              value={props.password}
              title={'Password'}
              placeholder={'Password'}
              viewBgInput={styles.paddingH8}
              viewHolderStyle={styles.marginV5}
              onChangeText={t => props.onChangeText(5, t)}
              autoCapitalize={'none'}
              error={props.errPassword}
            />
            <InputText
              value={props.mobile}
              title={'Mobile'}
              placeholder={'Mobile'}
              viewBgInput={styles.paddingH8}
              viewHolderStyle={styles.marginV5}
              onChangeText={t => props.onChangeText(6, t)}
              autoCapitalize={'none'}
              error={props.errMobile}
            />
            <InputText
              value={props.details}
              title={'Other Details'}
              placeholder={'Other Details'}
              multiline={true}
              viewBgInput={[styles.paddingH8, {height: Theme.responsiveSize.size100, alignItems: 'flex-start'}]}
              viewHolderStyle={styles.marginV5}
              onChangeText={t => props.onChangeText(7, t)}
              autoCapitalize={'none'}
            />
          </KeyboardAwareScrollView>
          
          <ButtonFill
            title={'Add'.toUpperCase()}
            viewTouchable={{marginTop: Theme.responsiveSize.size25}}
            bgStyle={{borderRadius: Theme.responsiveSize.size4}}
            onClick={props.onAddItem}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddDetails;
