import { colors } from '@/constants/colors';
import { ICourse } from '@/types/course';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const QuizTypeIcon = ({ type, size, color }: { type: string; size?: number; color?: string; }) => {
  size = size || 40;
  color = color || colors.PRIMARY_BLUE;
  return (
    <>
      {type.toLocaleLowerCase() === 'quiz'
        && < MaterialIcons name="quiz" size={size} color={color} />}
      {type.toLocaleLowerCase() === 'flashcards'
        && <MaterialCommunityIcons name="cards-playing-outline" size={size} color={color} />}
      {type.toLocaleLowerCase() === 'q & a'
        && <MaterialIcons name="question-answer" size={size} color={color} />}
    </>
  );
};


interface ICLGProps {
  courseList: ICourse[];
  type: string;
}
const CourseListGrid = ({ courseList, type }: ICLGProps) => {
  const router = useRouter();

  const onPress = (course: ICourse) => {
    if (type.toLocaleLowerCase() === 'quiz') {
      router.push({
        pathname: '/quiz',
        params: { courseParams: JSON.stringify(course) }
      });
    }
  };

  return (
    <View style={styles.gridContainter}>
      <FlatList
        data={courseList}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPress(item)} style={styles.quizCard}>
            <View style={styles.iconContainer}>
              <QuizTypeIcon type={type} />
            </View>
            <Text style={styles.cardText}>{item.courseTitle}</Text>
            <Ionicons name="checkmark-circle" size={24} color="green" style={styles.checkComplete} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseListGrid;

const styles = StyleSheet.create({
  gridContainter: {
    padding: 20,
  },
  quizCard: {
    height: 150,
    width: 120,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 7,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 10,
    elevation: 1,
    // backgroundColor: colors.WHITE,

  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  cardText: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    marginTop: 20,
  },
  checkComplete: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});