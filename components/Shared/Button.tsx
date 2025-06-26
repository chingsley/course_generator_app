// components / Shared / Button.tsx

import { colors } from '@/constants/colors';
import React from 'react';
import {
  ActivityIndicator, GestureResponderEvent,
  StyleSheet, Text,
  TextStyle,
  TouchableOpacity, View
} from 'react-native';

type BtnStyleType = 'primary' | 'delete' | undefined;

interface ButtonProps {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  loading?: boolean;
  type?: BtnStyleType;
  outline?: true;
  disabled?: boolean;
}
const Button = ({ type, outline, onPress, text, loading, disabled }: ButtonProps) => {
  const btnStyle = getBtnStyle(type, outline);
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={btnStyle.btn}
        disabled={loading || disabled}
      >
        {
          loading ?
            <ActivityIndicator size={'small'} color={btnStyle.actvIndicator.color} />
            :
            <Text style={btnStyle.text}>{text}</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

const getBtnStyle = (btnType: BtnStyleType, outline?: boolean) => {
  if (btnType === 'delete' && outline) return btnDeleteOutline;
  if (btnType === 'delete' && !outline) return btnDeleteFilled;
  if (btnType === 'primary' && outline) return btnPrimaryOutline;
  return btnPrimaryFilled;
};

export default Button;

const sharedBtnStyles = {
  padding: 17,
  borderRadius: 10,
};
const sharedTextStyles: TextStyle = {
  textAlign: 'center',
  fontSize: 18,
  fontFamily: 'roboto',
};

const btnPrimaryFilled = StyleSheet.create({
  btn: {
    ...sharedBtnStyles,
    backgroundColor: colors.PRIMARY_BLUE,
  },
  text: {
    ...sharedTextStyles,
    color: colors.WHITE,
  },
  actvIndicator: {
    color: colors.WHITE,
  }
});

const btnPrimaryOutline = StyleSheet.create({
  btn: {
    ...sharedBtnStyles,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PRIMARY_BLUE,
  },
  text: {
    ...sharedTextStyles,
    color: colors.PRIMARY_BLUE,
  },
  actvIndicator: {
    color: colors.PRIMARY_BLUE,
  }
});

const btnDeleteFilled = StyleSheet.create({
  btn: {
    ...sharedBtnStyles,
    backgroundColor: colors.PRIMARY_RED,
  },
  text: {
    ...sharedTextStyles,
    color: colors.WHITE,
  },
  actvIndicator: {
    color: colors.WHITE,
  }
});

const btnDeleteOutline = StyleSheet.create({
  btn: {
    ...sharedBtnStyles,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PRIMARY_RED,
  },
  text: {
    ...sharedTextStyles,
    color: colors.PRIMARY_RED,
  },
  actvIndicator: {
    color: colors.PRIMARY_RED,
  }
});