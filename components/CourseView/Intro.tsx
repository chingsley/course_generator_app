import Button from '@/components/Shared/Button';
import { colors } from '@/constants/colors';
import { ICourse } from '@/types/course';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IntroProps {
  course: ICourse;
}

const Intro = ({ course }: IntroProps) => {
  const completedChaptersCount = course.courseChapters.filter(ch => !!ch.completedAt).length;
  const router = useRouter();
  return (
    <View>
      <Text style={styles.courseTitle}>{course?.courseTitle}</Text>
      <View style={styles.chaptContainer}>
        <Ionicons name="book-outline" size={20} color={colors.PRIMARY_BLUE} />
        <Text style={styles.courseCardChapt}>{course.courseChapters?.length} chapters</Text>
      </View>
      <Text style={styles.descrTitle}>Description: </Text>
      <Text style={styles.descr}>{course?.courseDescription}</Text>
      <Button
        text={completedChaptersCount === 0 ? 'Start Now' : 'Contine'}
        style={{ marginTop: 10, }}
        onPress={() => router.push({
          pathname: '/chapterView',
          params: {
            chapterNumber: completedChaptersCount + 1,
          },
        })}
        loading={false}
      />
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
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
    marginBottom: 5,
  },
  courseCardChapt: {
    fontFamily: 'roboto',
    fontSize: 18,
    color: colors.PRIMARY_BLUE,
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
  },
});