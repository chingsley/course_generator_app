import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { ICourse, ICourseChapter } from '@/types/course';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

const ProgressCard = ({ course, style }: { course: ICourse; style?: Object; }) => {
  const completed = course.courseChapters.filter((ch: ICourseChapter) => !!ch.completedAt).length;
  const progress = completed / course.courseChapters.length;
  return (
    <View style={[styles.progressCard, style]}>
      <View style={styles.progressCardFlex}>
        <Image source={images.appIcon} style={styles.bannerImg} />
        <View style={styles.courseInfoContainer}>
          <Text numberOfLines={2} style={styles.cardCourseTitle}>{course?.courseTitle}</Text>
          <Text style={styles.cardCourseChapterCount}>{course?.courseChapters.length} Chapters</Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progress} width={250} color={colors.PRIMARY_BLUE} />
        <Text style={styles.progessBarText}>Completed {completed} / {course.courseChapters.length} Chapters</Text>
      </View>
    </View>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  progressCard: {
    width: 280,
    margin: 7,
    padding: 15,
    backgroundColor: colors.BG_GRAY,
    borderRadius: 8,
    borderWidth: 0.3,
    // borderColor: 'black',
  },
  progressCardFlex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  bannerImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.DARK_BLUE,
  },
  courseInfoContainer: {
    flex: 1,
  },
  cardCourseTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 19,
  },
  cardCourseChapterCount: {
    fontFamily: 'roboto',
    fontSize: 16
  },
  progressBarContainer: {
    marginTop: 10,
  },
  progessBarText: {
    fontFamily: 'roboto',
    marginTop: 2,
  }
});