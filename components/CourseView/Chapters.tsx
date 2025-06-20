import { colors } from '@/constants/colors';
import { ICourseChapter } from '@/types/course';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


interface IChapters {
  chapters: ICourseChapter[];
}
const Chapters = ({ chapters }: IChapters) => {
  return (
    <View style={styles.chptBox}>
      <Text style={styles.chptTitle}>Chapters</Text>
      <FlatList
        data={chapters}
        renderItem={({ item, index }) => (
          <View style={styles.chptContentBox}>
            <View style={styles.chptTextBox}>
              <Text style={styles.chptText}>{item.chapterNumber}.</Text>
              <Text style={styles.chptText} numberOfLines={2}>{item.chapterTopic}</Text>
            </View>
            <Ionicons name="play" size={24} color={colors.PRIMARY_BLUE} />
          </View>
        )}
      />
    </View>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  chptBox: {
    paddingTop: 20,
  },
  chptContentBox: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY_BLUE,
    borderRadius: 15,
    padding: 18,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chptTextBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  chptTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
  },
  chptText: {
    fontFamily: 'roboto',
    fontSize: 20,
    // borderWidth: 1,
    maxWidth: 300,
  },
});