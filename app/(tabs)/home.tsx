import CourseList from '@/components/Home/CourseList';
import CourseProgress from '@/components/Home/CourseProgress';
import Header from '@/components/Home/Header';
import NoCourse from '@/components/Home/NoCourse';
import PracticeSection from '@/components/Home/PracticeSection';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { useCoursesContext } from '@/context/CoursesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Platform, RefreshControl, StyleSheet, View } from 'react-native';

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
      ListHeaderComponent={
        <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
          <Image source={images.wave} style={styles.imgWaveBackground} />
          <View style={{
            padding: 25,
            paddingTop: Platform.OS == 'ios' ? 85 : 0,
          }}>
            <Header />
            {
              !loadingRefresh && courseList.length === 0 ?
                <NoCourse /> :
                <View style={{ marginVertical: 40 }}>
                  <CourseProgress courseList={courseList} />
                  <PracticeSection />
                  <CourseList courseList={courseList} />
                </View>
            }
          </View>
        </View>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  imgWaveBackground: {
    position: 'absolute',
    width: '100%',
    height: 400
  }
});