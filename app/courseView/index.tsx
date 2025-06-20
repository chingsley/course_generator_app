import { images } from '@/constants/images';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';


const CourseView = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams as string);
  return (
    <View>
      <Image source={images.appIcon} style={styles.bannerImg} />
    </View>
  );
};

export default CourseView;

const styles = StyleSheet.create({
  bannerImg: {

  }
});