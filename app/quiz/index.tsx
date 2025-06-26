import BackButton from '@/components/Shared/BackButton';
import Button from '@/components/Shared/Button';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import quiz from '@/sample/quiz.sample.json';
import { ICourse } from '@/types/course';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

const Quiz = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams as string) as ICourse;
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnsers, setUserAnswers] = useState<string[]>(new Array(quiz.length).fill(''));
  const [selectedIdx, setSelectedOptionIdx] = useState<number | null>(null);


  const onAnswerSelection = (item: string, idx: number) => {
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentPage] = item;
      return updated;
    });
    setSelectedOptionIdx(idx);
  };

  const onNextClick = () => {
    setCurrentPage(prev => (prev + 1) % quiz.length);
    setSelectedOptionIdx(null);
  };

  const onFinishClick = () => {
    console.log('finished');
  };

  return (
    <SafeAreaView>
      <Image source={images.wave} />
      <View style={styles.topContainerAbsolute}>
        <View style={styles.topContainerBackArrowAndProgressStats}>
          <BackButton color={colors.WHITE} style={{ padding: 5, paddingLeft: 0 }} />
          <Text style={styles.progessStatText}>{currentPage + 1} of {quiz.length}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={(currentPage + 1) / quiz.length}
            width={null}
            color={colors.WHITE}
            style={styles.progressBar}
          // height={8}
          />
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.quizQnText}>{quiz[currentPage].question}</Text>
          <View style={styles.ansOptionsContainer}>
            {quiz[currentPage].options.map((item, index) => {
              return (
                <Pressable key={index} style={[styles.ansOption, selectedIdx === index && {
                  borderWidth: 1,
                  borderColor: colors.PRIMARY_BLUE,
                  backgroundColor: colors.LIGHT_GRAY_2,
                }]} onPress={() => onAnswerSelection(item, index)}>
                  <Text style={styles.ansOptionText}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        {(selectedIdx !== null && currentPage !== quiz.length - 1) && <Button text="Next" onPress={onNextClick} />}
        {(selectedIdx !== null && currentPage === quiz.length - 1) && <Button text="Finish" onPress={onFinishClick} />}
      </View>
    </SafeAreaView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  topContainerAbsolute: {
    position: 'absolute',
    top: 60,
    width: '100%',
    padding: 20,
  },
  topContainerBackArrowAndProgressStats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progessStatText: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
    color: colors.WHITE,
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    marginTop: 20,
  },
  questionCard: {
    marginTop: 30,
    height: Dimensions.get('screen').height * 0.65,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    elevation: 1,
    padding: 40,
    display: 'flex',
    justifyContent: 'center',
    gap: 60,
  },
  quizQnText: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
    textAlign: 'center',
  },
  ansOptionsContainer: {},
  ansOption: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 15,
    padding: 20,
    marginTop: 7,
  },
  ansOptionText: {
    fontFamily: 'roboto',
    fontSize: 20,
  }
});