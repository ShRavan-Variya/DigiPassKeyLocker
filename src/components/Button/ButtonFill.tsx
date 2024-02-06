import React, {FC} from 'react';
import {
  Image,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface ButtonFillProps {
  title: string;
  onClick: () => void;
  viewTouchable?: ViewStyle;
  bgStyle?: ViewStyle;
  textStyle?: TextStyle;
  isLessonScreen?: boolean;
  isDisabled?: boolean;
}

const ButtonFill: FC<ButtonFillProps> = props => {
  const renderButton = (disabled: boolean) => {
    return (
      <View style={[styles.bgStyle, props.bgStyle]}>
        <Text style={[styles.textStyle, props.textStyle]}>
          {props.title}
        </Text>
      </View>
    );
  };

  if (props.isDisabled === true) {
    return <View style={props.viewTouchable}>{renderButton(true)}</View>;
  } else {
    return (
      <TouchableOpacity style={props.viewTouchable} onPress={props.onClick}>
        {renderButton(false)}
      </TouchableOpacity>
    );
  }
};

export default ButtonFill;
