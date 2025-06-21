import CourseList from '@/components/Home/CourseList';
import CourseProgress from '@/components/Home/CourseProgress';
import Header from '@/components/Home/Header';
import NoCourse from '@/components/Home/NoCourse';
import PracticeSection from '@/components/Home/PracticeSection';
import { colors } from '@/constants/colors';
import { useCourseContext } from '@/context/CoursesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import React, { useContext, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const Home = () => {
  const { userDetail } = useContext(UserDetailContext);
  const { courseList, getCourseList, deleteCourse } = useCourseContext();

  useEffect(() => {
    userDetail && getCourseList(userDetail?.email);
  }, [userDetail]);


  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.WHITE,
      padding: 25,
      paddingTop: Platform.OS == 'ios' ? 85 : 0,
    }}>
      <Header />
      {
        courseList.length === 0 ?
          <NoCourse /> :
          <View>
            <CourseProgress courseList={courseList} />
            <PracticeSection />
            <CourseList courseList={courseList} />
          </View>
      }
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});