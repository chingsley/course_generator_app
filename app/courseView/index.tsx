import Intro from '@/components/CourseView/Intro';
import { colors } from '@/constants/colors';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';


const CourseView = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams as string);
  return (
    <View style={styles.courseViewScreen}>
      <Intro course={course} />
    </View>
  );
};

export default CourseView;

const styles = StyleSheet.create({
  courseViewScreen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  }
});