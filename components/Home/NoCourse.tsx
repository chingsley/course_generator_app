import Button from '@/components/Shared/Button';
import { images } from '@/constants/images';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const NoCourse = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.msg}>It looks like don't have a course yet</Text>
      <Image source={images.noCourse} style={styles.image1} />
      <View style={{
        width: '100%',
      }}>
        <Button text={"+ Create New Course"} onPress={() => router.push('/addCourse')} loading={false} />
        <Button text={"Explore Existing Courses"} outline onPress={() => router.push('/auth/login')} loading={false} />
      </View>
    </View>
  );
};

export default NoCourse;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    display: 'flex',
    alignItems: 'center',
    // borderWidth: 1,
  },
  image1: {
    height: 200,
    width: 200,
  },
  msg: {
    // fontFamily: 'roboto-bold',
    fontSize: 18,
    textAlign: 'center',
  }
});