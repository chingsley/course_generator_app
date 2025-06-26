import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { ICourse } from '@/types/course';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CourseListProps {
  courseList: DocumentData[];
}


const CourseList = ({ courseList }: CourseListProps) => {
  const router = useRouter();

  const goToCourseView = (course: ICourse) => {
    router.push(`/courseView/${course.id}`);
  };

  return (
    <View style={styles.compContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.compTitle}>Course List ({courseList.length})</Text>
        <Pressable onPress={() => router.push('/addCourse')} style={styles.btnAddNewCourse}>
          <Ionicons name="add-circle" size={30} color={colors.PRIMARY_BLUE} />
        </Pressable>
      </View>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} style={styles.courseCard} onPress={() => goToCourseView(item as ICourse)}>
            <Image source={images.appIcon} style={styles.courseCardImg} />
            <Text style={styles.courseCardTitle}>{item.courseTitle}</Text>
            <View style={styles.chaptContainer}>
              <Ionicons name="book-outline" size={20} color={'black'} />
              <Text style={styles.courseCardChapt}>{item.courseChapters?.length} chapters</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  compContainer: {
    marginTop: 25,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  compTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
  },
  btnAddNewCourse: {
    padding: 10,
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