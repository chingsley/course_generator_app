import { generateAIContent } from '@/config/aiModel';
import { colors } from '@/constants/colors';
import prompts from '@/prompts';
import { ICourse } from '@/types/course';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

const ChapterVeiw = () => {
  const { chapterNumber: chpStr, course: courseStr } = useLocalSearchParams();
  const course = JSON.parse(courseStr as string) as ICourse;
  const chapterNumber = Number(chpStr);
  const chapter = course.courseChapters.find((c => c.chapterNumber === chapterNumber))!;
  const [chapterContent, setChapterContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);


  const generateChapter = async () => {
    try {
      setLoading(true);
      const prompt = prompts.getChapter(chapterNumber, course);
      const aiResponse = await generateAIContent(prompt, 0);
      console.log('\naiResponse: ', aiResponse, '\n');
      const parsedResponse = JSON.parse(aiResponse.text!);
      setLoading(false);
      setChapterContent(parsedResponse);
    } catch (error) {
      console.log('ChapterView/index: ', error);
    }
  };

  useEffect(() => {
    generateChapter();
  }, []);

  console.log(chapterContent);
  if (loading) return (
    <View style={styles.actIndicatorContainer}>
      <Text>
        <ActivityIndicator size={'small'} color={colors.PRIMARY_BLUE} />;
      </Text>
    </View>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={
          <View style={styles.screenContainer}>
            <View style={styles.progressContainer}>
              <Progress.Bar progress={0.3} width={Dimensions.get('screen').width * 0.85} color={colors.PRIMARY_BLUE} />
            </View>
            <View>
              <Text>{course.courseTitle}</Text>
              <Text style={styles.heading1}>Chapter {chapterNumber}: {chapter.chapterTopic}</Text>
              <Text style={styles.text1}>{chapter.chapterSummary}</Text>
              <Text style={styles.heading2}>Introduction</Text>
              <Text style={styles.text1}>{chapterContent.introduction}</Text>
              <FlatList
                data={chapterContent.bodyParagraphs}
                renderItem={({ item }) => (
                  <View>
                    {item.subtitle && <Text style={styles.heading2}>{item.subtitle}</Text>}
                    <Text style={styles.text2}>{item.content}</Text>
                  </View>
                )}
              />
              <Text style={styles.heading2}>Conclusion</Text>
              <Text style={styles.text2}>{chapterContent.conclusion}</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ChapterVeiw;

const styles = StyleSheet.create({
  actIndicatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    height: '100%'
  },
  screenContainer: {
    padding: 25,
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading1: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
    marginTop: 20,
  },
  heading2: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    marginTop: 10,
  },
  text1: {
    fontFamily: 'roboto',
    fontSize: 18,
  },
  text2: {
    fontFamily: 'roboto',
    fontSize: 16,
  }
});