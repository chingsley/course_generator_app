import { colors } from '@/constants/colors';
import { ICourse } from '@/types/course';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface IChaptersProps {
  course: ICourse;
}
const Chapters = ({ course, }: IChaptersProps) => {
  const router = useRouter();

  return (
    <View style={styles.chptBox}>
      <Text style={styles.chptTitle}>Chapters</Text>
      <FlatList
        data={course.courseChapters}
        renderItem={({ item: chapterItem, index }) => (
          <TouchableOpacity style={styles.chptContentBox} onPress={() => router.push({
            pathname: '/chapterView',
            params: {
              chapterNumber: chapterItem.chapterNumber,
            },
          })}>
            <View style={styles.chptTextBox}>
              <Text style={styles.chptText}>{chapterItem.chapterNumber}.</Text>
              <Text style={styles.chptText} numberOfLines={2}>{chapterItem.chapterTopic}</Text>
            </View>
            {chapterItem.completedAt ?
              <Ionicons name="checkmark-circle-outline" size={24} color="green" /> :
              <Ionicons name="play" size={24} color={colors.PRIMARY_BLUE} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  chptBox: {
    paddingTop: 20,
  },
  chptContentBox: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY_BLUE,
    borderRadius: 15,
    padding: 18,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chptTextBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  chptTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
  },
  chptText: {
    fontFamily: 'roboto',
    fontSize: 20,
    maxWidth: 300,
  },
});