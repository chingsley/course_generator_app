// contexts/CoursesContext.tsx
import { db } from '@/config/firebaseConfig';
import { ICourse } from '@/types/course';
import { sortCoursesByDate } from '@/utils/dateTime';
import { collection, deleteDoc, doc, DocumentData, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';

interface CoursesContextType {
  courseList: any[];
  getCourseList: (email: string) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  completeChapter: (courseID: string, chapterNumber: number) => Promise<void>;
}

const defaultCoursesContext = {
  courseList: [],
  getCourseList: async () => { },
  deleteCourse: async () => { },
  completeChapter: async () => { },
};

const CoursesContext = createContext<CoursesContextType>(defaultCoursesContext);

export const useCoursesContext = () => useContext(CoursesContext);

export const CoursesProvider = ({ children }: { children: React.ReactNode; }) => {
  const [courseList, setCourseList] = useState<DocumentData[]>([]);

  const getCourseList = async (email: string) => {
    setCourseList([]);
    const q = query(
      collection(db, 'courses'),
      where('createdBy', '==', email)
    );
    const snapshot = await getDocs(q);
    const courses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCourseList(sortCoursesByDate(courses as ICourse[]));
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await deleteDoc(doc(db, 'courses', courseId));
      setCourseList(prev => prev.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  };

  const completeChapter = async (courseID: string, chapterNumber: number) => {
    const selectedCourse = courseList.find(ch => ch.id === courseID);

    if (!selectedCourse) return;
    try {
      const courseRef = doc(db, 'courses', courseID);
      const chapterIndex = chapterNumber - 1;
      const courseChapters = [...selectedCourse.courseChapters];

      courseChapters[chapterIndex] = {
        ...courseChapters[chapterIndex],
        completedAt: Timestamp.now(),
      };

      await updateDoc(courseRef, {
        courseChapters: courseChapters
      });

      const updatedCourse = {
        ...selectedCourse,
        courseChapters: courseChapters
      };
      setCourseList(prev => prev.map(course =>
        course.id === courseID ? updatedCourse : course
      ));
    } catch (error) {
      console.error("Error completing chapter:", error);
      throw error;
    }
  };

  return (
    <CoursesContext.Provider value={{
      courseList,
      getCourseList,
      deleteCourse,
      completeChapter,
    }}>
      {children}
    </CoursesContext.Provider>
  );
};