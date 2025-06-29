import Button from '@/components/Shared/Button';
import { colors } from '@/constants/colors';
import { useCoursesContext } from '@/context/CoursesContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';



const ConfirmDelete = () => {
  const router = useRouter();
  const { courseId } = useLocalSearchParams();
  const { deleteCourse } = useCoursesContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteCourse(courseId as string);
    setLoading(false);
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.confirmQn}>Are you sure you want to delete this course?</Text>
      <Button
        text={'Cancel'}
        style={{ marginTop: 15, }}
        onPress={() => router.back()}
        type={'primary'}
        outline
        disabled={loading}
      />
      <Button
        text={'Delete'}
        style={{ marginTop: 20, }}
        onPress={handleDelete}
        type={'delete'}
        outline
        loading={loading}
      />
    </View>
  );
};

export default ConfirmDelete;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  confirmQn: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    textAlign: 'center',
  }
});