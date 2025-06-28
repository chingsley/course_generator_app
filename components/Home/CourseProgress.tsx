import { ICourse } from '@/types/course';
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProgressCard from '../Shared/ProgressCard';

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
          <View key={index}>
            <ProgressCard course={item as ICourse} />
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  compTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
  },
});