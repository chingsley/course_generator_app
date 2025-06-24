// app / addCourse / index.tsx

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

import Button from '@/components/Shared/Button';
import { colors } from '@/constants/colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import prompts from '@/prompts';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { generateAIContent } from '../../config/aiModel';


const AddCourse = () => {
  const router = useRouter();
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingCourseGeneration, setLoadingCourseGeneration] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const { userDetail } = useContext(UserDetailContext);

  const onCourseGenerate = async () => {
    setLoadingCourseGeneration(true);

    try {
      const calls = selectedTopics.map((topic) => {
        const singlePrompt = prompts.getCourse(topic);
        return generateAIContent(singlePrompt);
      });

      const aiResponses = await Promise.all(calls);
      const perTopicArrays = aiResponses.map((resp) => {
        try {
          return JSON.parse(resp.text!);
        } catch (e) {
          console.error("Failed to parse JSON for one topic:", e);
          return [];
        }
      });

      const mergedCourses = perTopicArrays.flat();
      const writePromises = mergedCourses.map((course) =>
        setDoc(doc(db, 'courses', Date.now().toString()), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email,
        }
        )
      );
      await Promise.all(writePromises);
      router.push('/(tabs)/home');
      setLoadingCourseGeneration(false);
    } catch (error) {
      console.error("\nonCourseGenerate:", error);
      setLoadingCourseGeneration(false);
    }
  };

  const onTopicGenerate = async () => {
    setLoadingTopics(true);
    setSelectedTopics([]);
    try {
      const prompt = prompts.getTopics(userInput);
      const aiResponse = await generateAIContent(prompt);
      const topicIdea = JSON.parse(aiResponse.text!);
      setTopics(topicIdea);
    } catch (error) {
      console.error('\onTopicGenerate: ', error);
    }
    setLoadingTopics(false);
  };

  const onTopicSelect = (clickedTopic: string) => {
    const alreadySelected = selectedTopics.find(topic => topic === clickedTopic);
    if (alreadySelected) {
      // deselect topic is already selected
      setSelectedTopics(prev => prev.filter(tpc => tpc !== clickedTopic));
    } else {
      // select otherwise
      setSelectedTopics(prev => [...prev, clickedTopic]);
    }
  };

  const isSelectedTopic = (topic: string) => selectedTopics.find(tpc => tpc === topic);
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
        onChangeText={value => setUserInput(value)}
      />
      <Button
        text={'Generate Topic'}
        onPress={onTopicGenerate}
        loading={loadingTopics}
        disabled={!userInput || loadingCourseGeneration}
      />

      <View style={styles.outputContainer}>
        {topics.length > 0 && <Text style={styles.courseSelectionPrompt}>Choose your preferred topics</Text>}
        <View style={styles.itemsContainer}>
          {topics.map((item, idx) => (
            <Pressable key={idx} onPress={() => onTopicSelect(item)}>
              <Text style={[styles.itemText, {
                backgroundColor: isSelectedTopic(item) && colors.PRIMARY_BLUE,
                color: isSelectedTopic(item) ? colors.WHITE : colors.PRIMARY_BLUE,
              }]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {selectedTopics.length > 0 && <Button
        text={'Generate Selected Courses'}
        onPress={onCourseGenerate}
        loading={loadingCourseGeneration}
        disabled={loadingTopics}
      />}
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
  },
  outputContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  courseSelectionPrompt: {
    fontFamily: 'roboto',
    fontSize: 20,
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  itemText: {
    padding: 7,
    borderWidth: 0.4,
    borderRadius: 99,
    paddingHorizontal: 15,
  }
});