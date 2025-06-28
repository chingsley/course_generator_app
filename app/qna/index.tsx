/** This is screen view for Question and Answers, Q&A (qna) */

import BackButton from '@/components/Shared/BackButton';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import qnaData from '@/sample/qna.sample.json';
import { ICourse } from '@/types/course';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';


const Qna = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams as string) as ICourse;

  const [selectedQn, setSelectedQn] = useState<number | null>(null);

  const toggleQnSelection = (idx: number) => {
    if (selectedQn === idx) {
      setSelectedQn(null);
    } else {
      setSelectedQn(idx);
    }
  };
  return (
    <SafeAreaView>
      <Image source={images.wave} />
      <View style={styles.topContainerAbsolute}>
        <View style={styles.capAndArrow}>
          <BackButton color={colors.WHITE} style={styles.backBtn} />
          <Text style={styles.pageCaption}>Question & Answers</Text>
        </View>
        <Text style={styles.courseTitle}>{course.courseTitle}</Text>
        <FlatList // This allows vertical scroll. NOTE: You must give it's parent (topContainerAbsolute) a hight for the scroll to work. See style below for topContainerAbsolute: { height: Dimensions.get('screen').height * 0.9}
          data={[]}
          renderItem={() => null}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <FlatList
              data={qnaData}
              renderItem={({ item, index }) => (
                <Pressable onPress={() => toggleQnSelection(index)} style={styles.qnaCard}>
                  <Text style={styles.qnaCardQnText}>{item?.question}</Text>
                  {selectedQn === index && (
                    <View style={styles.qnaCardAnsBox}>
                      <Text style={styles.qnaCardAnsText}>{item?.answer}</Text>
                    </View>
                  )}
                </Pressable>
              )}
            />
          }
        />
      </View>
    </SafeAreaView>

  );
};

export default Qna;

const styles = StyleSheet.create({
  topContainerAbsolute: {
    position: 'absolute',
    width: '100%',
    padding: 20,
    top: 60,
    height: Dimensions.get('screen').height * 0.9,
  },
  capAndArrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  backBtn: {
    padding: 10,
    paddingLeft: 0,
  },
  pageCaption: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
    color: colors.WHITE,
  },
  courseTitle: {
    fontFamily: 'roboto',
    fontSize: 20,
    color: colors.WHITE,
    marginBottom: 12
  },
  qnaCard: {
    backgroundColor: colors.WHITE,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
    borderWidth: 0.4,
  },
  qnaCardQnText: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    color: colors.PRIMARY_BLACK,
  },
  qnaCardAnsBox: {
    borderTopWidth: 0.4,
    marginVertical: 10,
  },
  qnaCardAnsText: {
    fontFamily: 'roboto',
    fontSize: 18,
    marginTop: 10,
  },
});