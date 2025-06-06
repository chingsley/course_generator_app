import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

interface Props {
  courseList: DocumentData[];
}

const CourseProgress = ({ courseList }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.compTitle}>Progress</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.progressCard} key={index}>
            <View style={styles.progressCardFlex}>
              <Image source={images.appIcon} style={styles.bannerImg} />
              <View style={styles.courseInfoContainer}>
                <Text numberOfLines={2} style={styles.cardCourseTitle}>{item?.courseTitle}</Text>
                <Text style={styles.cardCourseChapterCount}>{item?.courseChapters.length} Chapters</Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={0.3} width={250} color={colors.PRIMARY_BLUE} />
              <Text style={styles.progessBarText}>Completed 3/5 Chapters</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    marginTop: 10,
  },
  compTitle: {
    fontFamily: 'roboto',
    fontSize: 25,
  },
  progressCard: {
    width: 280,
    margin: 7,
    padding: 15,
    backgroundColor: colors.BG_GRAY,
    borderRadius: 8,
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