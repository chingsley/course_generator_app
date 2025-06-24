import Button from '@/components/Shared/Button';
import { generateAIContent } from '@/config/aiModel';
import { colors } from '@/constants/colors';
import prompts from '@/prompts';
import { ICourse } from '@/types/course';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import * as Progress from 'react-native-progress';

import { useCoursesContext } from '@/context/CoursesContext';
import { GenerateContentResponse } from '@google/genai';
// import sampleChapter from '@/sample/chapter.sample.json';

const ChapterVeiw = () => {
  const router = useRouter();
  const { chapterNumber: chpStr, course: courseStr } = useLocalSearchParams();
  const [chapterCompleteLoading, setChapterCompleteLoading] = useState(false);
  const chapterNumber = Number(chpStr);
  const [chapterContent, setChapterContent] = useState<any>(null);
  // const [chapterContent, setChapterContent] = useState<any>(sampleChapter); // testing
  const [error, setError] = useState<string | null>(null);
  const { completeChapter, selectedCourse: course } = useCoursesContext();
  const chapter = course!.courseChapters.find((c => c.chapterNumber === chapterNumber))!;


  const generateChapter = async () => {
    let aiResponse: GenerateContentResponse | null = null;
    try {
      setError(null);
      setChapterContent(null);
      const prompt = prompts.getChapter(chapterNumber, course as ICourse);
      aiResponse = await generateAIContent(prompt, 0);
      const parsedResponse = JSON.parse(aiResponse.text!);
      setChapterContent(parsedResponse);
    } catch (error) {
      console.error('\n generateChapter: ', error, aiResponse);
      setError('Failed to generate chapter content. Please try again.');
    }
  };

  const markChapterAsComplete = async (chpNum: number) => {
    setChapterCompleteLoading(true);
    await completeChapter(course!.id, chpNum);
    setChapterCompleteLoading(false);
  };



  useEffect(() => {
    generateChapter();
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button text="Retry" onPress={generateChapter} type="primary" />
      </View>
    );
  }

  if (chapterContent === null) {
    return (
      <View style={styles.actIndicatorContainer}>
        <Text>
          <ActivityIndicator size={'small'} color={colors.PRIMARY_BLUE} />;
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.fixedHeader}>
        <Pressable style={styles.backArrow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={34} color={colors.PRIMARY_BLUE} />
        </Pressable>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={chapterNumber / course!.courseChapters.length}
            width={null}
            color={colors.PRIMARY_BLUE}
            style={styles.progressBar}
          />
        </View>
        <Text style={styles.courseTitle}>{course!.courseTitle}</Text>
      </View>

      <FlatList
        style={styles.scrollContainer}
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <View style={styles.contentContainer}>
            <Text style={styles.heading1}>
              Chapter {chapterNumber}: {chapter.chapterTopic}
            </Text>
            <Text style={styles.text1}>{chapter.chapterSummary}</Text>
            <Text style={styles.heading2}>Introduction</Text>
            <Text style={styles.text1}>{chapterContent.introduction}</Text>

            <FlatList
              data={chapterContent.bodyParagraphs}
              scrollEnabled={false} // Important: disable nested scrolling
              renderItem={({ item }) => (
                <View>
                  {item.subtitle && <Text style={styles.heading2}>{item.subtitle}</Text>}
                  <Text style={styles.text2}>{item.content}</Text>
                </View>
              )}
            />

            <Text style={styles.heading2}>Conclusion</Text>
            <Text style={styles.text2}>{chapterContent.conclusion}</Text>
            <View style={styles.btnFinishContainer}>
              <Button
                text={chapter.completedAt ? 'Completed' : 'Finish'}
                disabled={!!chapter.completedAt}
                onPress={() => markChapterAsComplete(chapterNumber)}
                loading={chapterCompleteLoading}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ChapterVeiw;

const styles = StyleSheet.create({
  fixedHeader: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 10,
    zIndex: 10,
    borderBottomWidth: 1,
    borderColor: colors.LIGHT_GRAY,
  },
  screenContainer: {
    padding: 25,
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    marginTop: 40,
  },
  backArrow: {
    position: 'absolute',
    top: -20,
    left: 1,
    padding: 20,
  },
  courseTitle: {
    fontFamily: 'roboto',
    fontSize: 18,
    marginTop: 5,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 10,
  },
  contentContainer: {
    paddingHorizontal: 25,
  },
  heading1: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
    marginTop: 20,
    color: colors.PRIMARY_BLUE,
  },
  heading2: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    marginTop: 10,
    color: colors.PRIMARY_BLACK2,
  },
  text1: {
    fontFamily: 'roboto',
    fontSize: 18,
  },
  text2: {
    fontFamily: 'roboto',
    fontSize: 16,
  },
  actIndicatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    height: '100%'
  },
  errorContainer: {
    justifyContent: 'center',
    padding: 40,
    height: '100%'
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  btnFinishContainer: {
    // borderWidth: 1,
    marginVertical: 20,
    paddingBottom: 20,
  }
});