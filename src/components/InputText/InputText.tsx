import React, {FC} from 'react';
import {
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Theme from '@app/theme/Theme';
import styles from './styles';

export interface InputTextProps {
  title?: string;
  placeholder: string;
  value: string;

  isPassword?: boolean;
  isSecure?: boolean;
  error?: any;

  style?: StyleProp<TextStyle>;
  multiline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  viewHolderStyle?: StyleProp<ViewStyle>;
  viewBgInput?: StyleProp<ViewStyle>;

  onChangeText: (text: string) => void;
  onChangeSecurity?: () => void;
}

const InputText: FC<InputTextProps> = props => {
  return (
    <View style={[styles.viewMainStyle, props.viewHolderStyle]}>
      {props.title ? <Text style={styles.textTitle}>{props.title}</Text> : null}
      <View style={[styles.viewBgInput, props.viewBgInput]}>
        <TextInput
          value={props.value}
          textAlignVertical={'top'}
          placeholder={props.placeholder}
          placeholderTextColor={Theme.colors.textColor2}
          style={[styles.textInputStyle, props.style]}
          multiline={props.multiline}
          secureTextEntry={props.isSecure}
          autoCapitalize={props.autoCapitalize}
          onChangeText={props.onChangeText}
        />
        {props.isPassword === true ? (
          <TouchableOpacity onPress={props.onChangeSecurity}>
            <Image
              source={
                props.isSecure
                  ? Theme.icons.icEyeOffPasswd
                  : Theme.icons.icEyePasswd
              }
              style={styles.imageSecurity}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {props.error ? <Text style={styles.textError}>{props.error}</Text> : null}
    </View>
  );
};

export default InputText;
