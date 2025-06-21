import Chapters from '@/components/CourseView/Chapters';
import Intro from '@/components/CourseView/Intro';
import Button from '@/components/Shared/Button';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';


const CourseView = () => {
  const router = useRouter();
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams as string);

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatListWrapper}
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={ // this will make the chapters list scrollable. We  cannot use srollview to achieve this because the Chapters component contains a FlatList compoent, and we shouldn't wrap a FlatList component in a ScrollView
          <View style={styles.courseViewScreen}>
            <View style={styles.imgBox}>
              <Image source={images.practiceSection} style={styles.bannerImg} />
            </View>
            <View style={styles.courseContentBox}>
              <Intro course={course} />
              <Chapters course={course} />
              <Button
                type='delete'
                text='Delete this course'
                onPress={() => router.push({
                  pathname: '/confirmDelete',
                  params: {
                    courseId: course.id,
                  }
                })}
                loading={false}
                outline
              />
            </View>
            <Pressable style={styles.backArrow} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={34} color="black" />
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CourseView;

const styles = StyleSheet.create({
  flatListWrapper: {
    backgroundColor: colors.WHITE,
  },
  courseViewScreen: {
    flex: 1,
  },
  imgBox: {
    backgroundColor: colors.LIGHT_GRAY_2,
    height: 400,
  },
  bannerImg: {
    width: '100%',
    height: '100%'
  },
  courseContentBox: {
    marginTop: -90,
    padding: 10,
    paddingTop: 20,
    backgroundColor: colors.WHITE,
  },
  backArrow: {
    position: 'absolute',
    top: 1,
    left: 1,
    padding: 20,
  },
});