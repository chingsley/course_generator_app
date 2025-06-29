import CourseListByCategory from '@/components/Explore/CourseListByCategory';
import { colors } from '@/constants/colors';
import categories from '@/sample/categories.sample.json';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const Explore = () => {
  return (
    <SafeAreaView>
      <View style={styles.pageContainer}>
        <Text style={styles.pageCaption}>Explore More Courses</Text>
        <FlatList
          style={{ marginBottom: 100 }} // so the last item is NOT hidden under the bottom tabs
          data={categories}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.itemBox}>
              <CourseListByCategory category={item} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 25,
    backgroundColor: colors.WHITE,
  },
  pageCaption: {
    fontFamily: 'roboto-bold',
    fontSize: 30,
    marginBottom: 10,
  },
  itemBox: {
    // marginBottom: 50,
  },
  itemText: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
  }
});