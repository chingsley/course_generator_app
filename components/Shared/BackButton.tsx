import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface IBackButtonProps {
  color?: string;
  style?: object;
}
const BackButton = ({ color, style }: IBackButtonProps) => {
  const router = useRouter();

  return (
    <Pressable style={style} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={34} color={color || 'black'} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backArrow: {
    paddingHorizontal: 10,
  }
});