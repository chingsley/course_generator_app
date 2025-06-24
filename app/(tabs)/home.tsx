import CourseList from '@/components/Home/CourseList';
import CourseProgress from '@/components/Home/CourseProgress';
import Header from '@/components/Home/Header';
import NoCourse from '@/components/Home/NoCourse';
import PracticeSection from '@/components/Home/PracticeSection';
import { colors } from '@/constants/colors';
import { useCoursesContext } from '@/context/CoursesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { sortCoursesByDate } from '@/utils/dateTime';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, RefreshControl, StyleSheet, View } from 'react-native';

const Home = () => {
  const { userDetail } = useContext(UserDetailContext);
  const { courseList, getCourseList } = useCoursesContext();
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  useEffect(() => {
    userDetail && getCourseList(userDetail?.email);
  }, [userDetail]);

  const hanldeRefresh = async () => {
    setLoadingRefresh(true);
    userDetail && await getCourseList(userDetail?.email);
    setLoadingRefresh(false);
  };


  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      refreshControl={
        <RefreshControl
          refreshing={loadingRefresh}
          onRefresh={hanldeRefresh}
          tintColor={colors.PRIMARY_BLUE}
          progressViewOffset={Platform.OS === 'ios' ? 100 : 50}
          style={{ zIndex: 100 }}
        />
      }
      style={{ flex: 1, backgroundColor: colors.WHITE }}
      ListHeaderComponent={
        <View style={{
          flex: 1,
          backgroundColor: colors.WHITE,
          padding: 25,
          paddingTop: Platform.OS == 'ios' ? 100 : 20,
        }}>
          <Header />
          {
            !loadingRefresh && courseList.length === 0 ?
              <NoCourse /> :
              <View>
                <CourseProgress courseList={courseList} />
                <PracticeSection />
                <CourseList courseList={sortCoursesByDate(courseList)} />
              </View>
          }
        </View>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({});