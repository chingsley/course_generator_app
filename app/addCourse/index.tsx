// app / addCourse / index.tsx

import Button from '@/components/Shared/Button';
import { colors } from '@/constants/colors';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


const AddCourse = () => {
  const [loading, setLoading] = useState(false);

  const generateCourse = () => { };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Create New Course</Text>
      <Text style={styles.pageSubTitle}>What do you want to learn today?</Text>
      <Text style={styles.message}>
        What course do you want to create? Learn Python, Digital Marketing, 10th Science Chapters, etc...
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder='(Eg. Learn Python, Learn 12th Chemistry)'
        placeholderTextColor={colors.GRAY}
      />
      <Button text={'Generate Course'} onPress={generateCourse} loading={loading} />
    </View>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 25,
  },
  pageTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 30,
  },
  pageSubTitle: {
    fontFamily: 'roboto',
    fontSize: 25,
  },
  message: {
    fontFamily: 'roboto',
    fontSize: 20,
    marginTop: 8,
    color: colors.GRAY,
  },
  textInput: {
    borderWidth: 1,
    color: 'black',
    padding: 15,
    borderRadius: 10,
    height: 100,
    marginTop: 10,
    alignItems: 'flex-start',
    fontSize: 18,
  }
});