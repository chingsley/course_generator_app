import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

interface CourseListProps {
  courseList: DocumentData[];
}

const CourseList = ({ courseList }: CourseListProps) => {
  return (
    <View style={styles.compContainer}>
      <Text style={styles.compTitle}>CourseList</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.courseCard}>
            <Image source={images.appIcon} style={styles.courseCardImg} />
            <Text style={styles.courseCardTitle}>{item.courseTitle}</Text>
            <View style={styles.chaptContainer}>
              <Ionicons name="book-outline" size={20} color={'black'} />,
              <Text style={styles.courseCardChapt}>{item.courseChapters?.length} chapters</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  compContainer: {
    marginTop: 15,
  },
  compTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
  },
  courseCard: {
    padding: 10,
    backgroundColor: colors.BG_GRAY,
    marginTop: 6,
    marginRight: 12,
    marginBottom: 6,
    borderRadius: 7,
    width: 240,
  },
  courseCardImg: {
    width: '100%',
    height: 150,
    // borderRadius: 15,
  },
  courseCardTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 18,
    marginTop: 10,
  },
  chaptContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  courseCardChapt: {
    fontFamily: 'roboto'
  }
});