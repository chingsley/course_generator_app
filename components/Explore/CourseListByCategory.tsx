import { db } from '@/config/firebaseConfig';
import { colors } from '@/constants/colors';
import { collection, DocumentData, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CourseList from '../Home/CourseList';

const CourseListByCategory = ({ category }: { category: string; }) => {
  const [courseList, setCourseList] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);

  const getCourseListByCategory = async () => {
    setCourseList([]);
    setLoading(true);
    try {
      const q = query(collection(db, 'courses'),
        where('courseCategory', '==', category),
        orderBy('createdOn', 'desc'));

      const querySnapshot = await getDocs(q);
      querySnapshot?.forEach((doc) => {
        setCourseList(prev => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.error('getCourseListByCategory: ', error);
    }
  };

  useEffect(() => {
    getCourseListByCategory();
  }, []);


  if (loading) {
    return (
      <View style={styles.actIndicatorContainer}>
        <Text>
          <ActivityIndicator size={'small'} color={colors.PRIMARY_BLUE} />;
        </Text>
      </View>
    );
  }

  return (
    <CourseList courseList={courseList} heading={category} />
  );
};

export default CourseListByCategory;

const styles = StyleSheet.create({
  actIndicatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    height: '100%'
  },
});