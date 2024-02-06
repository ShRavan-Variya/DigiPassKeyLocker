import React from 'react';
import {SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Theme from '@app/theme/Theme';
import styles from './styles';

const EmptyScreen = (props: any) => {
  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.viewFlexContainer}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmptyScreen;
