import Button from '@/components/Shared/Button';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { IQuiz } from '@/types/quiz';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface IStats {
  total: number;
  correct: number;
  wrong: number;
}

const QuizSummary = () => {
  const router = useRouter();
  const { quizParam, answersParam } = useLocalSearchParams();
  const quiz = JSON.parse(quizParam as string) as IQuiz[];
  const userAnswers = JSON.parse(answersParam as string) as string[];
  const [stats, setStats] = useState<IStats>({ total: 0, correct: 0, wrong: 0 });

  const calcutateStats = () => {
    const countCorrectAnswers = quiz.filter((qz, idx) => qz.answer === userAnswers[idx]).length;
    setStats({
      total: quiz.length,
      correct: countCorrectAnswers,
      wrong: quiz.length - countCorrectAnswers,
    });
  };

  const isCorrect = (quiz: IQuiz, idx: number) => {
    return userAnswers[idx] === quiz.answer;
  };

  const passed = () => stats.correct / stats.total > 0.5;

  useEffect(() => {
    calcutateStats();
  }, []);

  return (
    <SafeAreaView style={{ height: Dimensions.get('screen').height * 1 }}>
      <Image source={images.wave} />
      <View style={styles.pageBoxAbsolue}>
        <Text style={styles.pageCaption}>Quiz Summary</Text>
        <View style={styles.pageContent}>
          <View style={styles.topBox}>
            <Image source={images.grad1} style={styles.topBoxImg} />
            <Text style={styles.text1}>{passed() ? 'Congratulations!' : 'Try Again.'}</Text>
            <Text style={styles.text2}>You answered {stats.correct} out of {stats.total} correct</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.iconBox}>
                <Ionicons name="help-circle-outline" size={24} color={colors.PRIMARY_BLUE} />
                <Text style={styles.text3}>{stats.total}</Text>
              </View>
              <View style={styles.iconBox}>
                <Ionicons name="checkbox" size={24} color={stats.correct > 0 ? "green" : colors.GRAY} />
                <Text style={styles.text3}>{stats.correct}</Text>
              </View>
              <View style={styles.iconBox}>
                <Ionicons name="close-circle-outline" size={24} color={stats.wrong > 0 ? "red" : colors.GRAY} />
                <Text style={styles.text3}>{stats.wrong}</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Button text="Back To Home" onPress={() => router.push('/home')} />
            </View>
          </View>
          <View style={styles.downBox}>
            <Text style={[styles.text1, { marginBottom: 10 }]}> Summary</Text>
            <FlatList style={styles.qnsContainer}
              data={[]}
              renderItem={() => null}
              ListHeaderComponent={
                <FlatList
                  data={quiz}
                  renderItem={({ item, index }) => (
                    <View key={index} style={[styles.qnBox, { borderColor: isCorrect(item, index) ? 'green' : 'red' }]}>
                      <Text style={styles.text3}>{item.question}</Text>
                      {!isCorrect(item, index) &&
                        <View style={styles.ansDisplayBox}>
                          <Ionicons name="close-circle-outline" size={24} color="red" />
                          <Text style={[styles.text4, { marginTop: 5 }]}>{userAnswers[index]}</Text>
                        </View>}
                      <View style={styles.ansDisplayBox}>
                        <Ionicons name="checkbox" size={24} color={'green'} />
                        <Text style={[styles.text4, { marginTop: 5 }]}>{item.answer}</Text>
                      </View>
                    </View>
                  )}
                />
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizSummary;

const styles = StyleSheet.create({
  pageBoxAbsolue: {
    height: Dimensions.get('screen').height * 1,
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  pageCaption: {
    fontFamily: 'roboto-bold',
    fontSize: 30,
    color: colors.WHITE,
    marginTop: 80,
  },
  pageContent: {
    borderRadius: 15,
    width: '100%',
    marginTop: 60,
  },
  topBox: {
    borderWidth: 0.3,
    borderRadius: 15,
    width: '100%',
    height: 280,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: colors.WHITE,
  },
  topBoxImg: {
    width: 150,
    height: 150,
    marginBottom: -20,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  iconBox: {
    borderWidth: 0.3,
    borderRadius: 10,
    width: '30%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  btnContainer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
  },
  downBox: {
    marginTop: 40,
    width: '100%',
    padding: 10,
  },
  text1: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
  },
  text2: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
  },
  qnsContainer: {
    height: 350,

  },
  qnBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    backgroundColor: colors.WHITE,
  },
  text3: {
    fontFamily: 'roboto',
    fontSize: 20,
  },
  text4: {
    fontFamily: 'roboto',
    fontSize: 16,
  },
  ansDisplayBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  }
});