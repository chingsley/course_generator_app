import CourseListGrid from '@/components/PracticeScreen/CourseListGrid';
import BackButton from '@/components/Shared/BackButton';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { useCoursesContext } from '@/context/CoursesContext';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';


const PracticeTypeHomeScreen = () => {
  let { type } = useLocalSearchParams();
  type = type.toString().toLowerCase();
  const { courseList, getCourseList } = useCoursesContext();

  return (
    <SafeAreaView>
      <Image source={images.wave} style={styles.waveImg} />
      {type === 'q & a' && <Image source={images.qna} style={styles.bannerImg} />}
      {type === 'quiz' && <Image source={images.quiz} style={styles.bannerImg} />}
      {type === 'flashcards' && <Image source={images.flashcard} style={styles.bannerImg} />}

      <View style={styles.caption}>
        <BackButton color={colors.WHITE} style={{ paddingHorizontal: 10 }} />
        <Text style={styles.captionText}>{type}</Text>
      </View>

      <CourseListGrid courseList={courseList} type={type} />
    </SafeAreaView>
  );
};

export default PracticeTypeHomeScreen;

const styles = StyleSheet.create({
  bannerImg: {
    width: '100%',
    height: 200,
  },
  caption: {
    position: 'absolute',
    zIndex: 200,
    marginTop: 50,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  captionText: {
    fontFamily: 'roboto-bold',
    fontSize: 35,
    color: colors.WHITE,
    textTransform: 'capitalize',
    // borderWidth: 1,
    padding: 5,
  },
  waveImg: {
    width: '100%',
    height: 200,
    position: 'absolute',
    zIndex: 100,
    top: 40,
  }
});