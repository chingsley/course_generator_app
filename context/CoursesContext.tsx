// contexts/CourseContext.tsx
import { db } from '@/config/firebaseConfig';
import { ICourse } from '@/types/course';
import { collection, deleteDoc, doc, DocumentData, getDocs, query, where } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';

interface CourseContextType {
  courseList: any[];
  selectedCourse: ICourse | null;
  getCourseList: (email: string) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  setSelectedCourse: React.Dispatch<React.SetStateAction<ICourse | null>>;
}

const CourseContext = createContext<CourseContextType>({
  courseList: [],
  getCourseList: async () => { },
  deleteCourse: async () => { },
  selectedCourse: null,
  setSelectedCourse: () => { }
});

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }: { children: React.ReactNode; }) => {
  const [courseList, setCourseList] = useState<DocumentData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

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
    setCourseList(courses);
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

  return (
    <CourseContext.Provider value={{
      courseList,
      selectedCourse, // not in use for now
      getCourseList,
      deleteCourse,
      setSelectedCourse, // not in use for now
    }}>
      {children}
    </CourseContext.Provider>
  );
};