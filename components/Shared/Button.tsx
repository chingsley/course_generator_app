// components / Shared / Button.tsx

import { colors } from '@/constants/colors';
import React from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  outline?: true;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  text: string;
  loading: boolean;
  disabled?: boolean;
}
const Button = ({ outline, onPress, text, loading, disabled }: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.sharedStyle, outline ? styles.btnOutline : styles.btnFilled]}
        disabled={loading || disabled}
      >
        {loading ? <ActivityIndicator size={'small'} color={outline ? colors.PRIMARY_BLUE : colors.WHITE} /> :
          <Text
            style={[styles.sharedStyleTxt, {
              color: outline ? colors.PRIMARY_BLUE : colors.WHITE
            }]}
          >{text}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  sharedStyle: {
    padding: 17,
    marginTop: 20,
    borderRadius: 10,
  },
  sharedStyleTxt: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'roboto',
  },
  btnFilled: {
    backgroundColor: colors.PRIMARY_BLUE,
  },
  btnOutline: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PRIMARY_BLUE,
  }
});