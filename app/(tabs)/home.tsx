import CourseList from '@/components/Home/CourseList';
import CourseProgress from '@/components/Home/CourseProgress';
import Header from '@/components/Home/Header';
import NoCourse from '@/components/Home/NoCourse';
import PracticeSection from '@/components/Home/PracticeSection';
import { db } from '@/config/firebaseConfig';
import { colors } from '@/constants/colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const Home = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState<DocumentData[]>([]);

  useEffect(() => {
    userDetail && getCourseList();
  }, [userDetail]);

  const getCourseList = async () => {
    setCourseList([]); // prevents duplicate redering on every save
    const q = query(collection(db, 'courses'), where(
      "createdBy", "==", userDetail?.email
    ));
    const querySnapshot = await getDocs(q);
    console.log('userDetails: ', userDetail);
    querySnapshot.forEach((doc) => setCourseList(prev => [...prev, doc.data()]));
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.WHITE,
      padding: 25,
      paddingTop: Platform.OS == 'ios' ? 45 : 0,
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