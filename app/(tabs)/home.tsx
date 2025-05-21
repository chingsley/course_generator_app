import Header from '@/components/Home/Header';
import NoCourse from '@/components/Home/NoCourse';
import { colors } from '@/constants/colors';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const Home = () => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.WHITE,
      padding: 25,
      paddingTop: Platform.OS == 'ios' ? 45 : 0,
    }}>
      <Header />
      <NoCourse />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});