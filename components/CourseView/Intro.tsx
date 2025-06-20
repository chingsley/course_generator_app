import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import ICourse from '@/types/course';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../Shared/Button';

interface IntroProps {
  course: ICourse;
}

const Intro = ({ course }: IntroProps) => {
  console.log('', course);
  return (
    <View>
      <View style={styles.imgBox}>
        <Image source={images.practiceSection} style={styles.bannerImg} />
      </View>
      <View style={styles.courseTitleBox}>
        <Text style={styles.courseTitle}>{course?.courseTitle}</Text>
        <View style={styles.chaptContainer}>
          <Ionicons name="book-outline" size={20} color={'black'} />
          <Text style={styles.courseCardChapt}>{course.courseChapters?.length} chapters</Text>
        </View>
        <Text style={styles.descrTitle}>Description: </Text>
        <Text style={styles.descr}>{course?.courseDescription}</Text>
        <Button
          text='Start Now'
          onPress={() => console.log('testing')}
          loading={false}
        />
      </View>
      <Pressable style={styles.backArrow}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  backArrow: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  imgBox: {//  <View style={styles.imgBox}>
    paddingTop: 50,
    backgroundColor: colors.LIGHT_GRAY_2,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 280,
  },
  bannerImg: { //<Image source={images.practiceSection} style={styles.bannerImg} />
    width: '100%',
    height: '100%'
  },
  courseTitleBox: {
    padding: 10,
  },
  courseTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
  },
  chaptContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  courseCardChapt: {
    fontFamily: 'roboto',
    fontSize: 18,
  },
  descrTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    marginTop: 10,
  },
  descr: {
    fontFamily: 'roboto',
    fontSize: 18,
    color: colors.GRAY,
  }
});