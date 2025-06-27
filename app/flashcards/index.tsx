import BackButton from '@/components/Shared/BackButton';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import flashcardsData from '@/sample/flashcards.sample.json';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FlipCard from 'react-native-flip-card';
import * as Progress from 'react-native-progress';

const Flashcards = () => {
  const router = useRouter();

  // const { courseParams } = useLocalSearchParams();
  // const course = JSON.parse(courseParams as string) as ICourse;
  const [currentPage, setCurrentPage] = useState(0);

  const width = Dimensions.get('screen').width;
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event?.nativeEvent?.contentOffset.x / width);
    setCurrentPage(index);
  };

  return (
    <SafeAreaView>
      <Image source={images.wave} />
      <View style={styles.topContainerAbsolute}>
        <View style={styles.topContainerBackArrowAndProgressStats}>
          <BackButton color={colors.WHITE} style={{ padding: 5, paddingLeft: 0 }} />
          <Text style={styles.progessStatText}>{currentPage + 1} of {flashcardsData.length}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={(currentPage + 1) / flashcardsData.length}
            width={null}
            color={colors.WHITE}
            style={styles.progressBar}
          // height={8}
          />
        </View>
        <FlatList
          data={flashcardsData}
          pagingEnabled
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.cardContainer}>
              <FlipCard
                style={styles.flipCard}
                flipHorizontal={true}
                flipVertical={false}
              >
                <View style={styles.flipCardFront}>
                  <Text style={styles.flipCardFrontText}>{item.question}</Text>
                </View>
                <View style={styles.flipCardBack}>
                  <Text style={styles.flipCardBackText}>{item.answer}</Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Flashcards;

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
  cardContainer: {
    height: 500,
    marginTop: 60,
  },
  flipCard: {
    width: Dimensions.get('screen').width * 0.78,
    height: 400,
    borderRadius: 20,
    marginHorizontal: Dimensions.get('screen').width * 0.06,
  },
  flipCardFront: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    borderWidth: 2,
    borderColor: colors.PRIMARY_BLUE,
  },
  flipCardFrontText: {
    fontFamily: 'roboto-bold',
    fontSize: 28,
    textAlign: 'center',
    padding: 20,
  },
  flipCardBack: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 20,
    backgroundColor: colors.PRIMARY_BLUE,
    borderWidth: 2,
    borderColor: colors.WHITE,
  },
  flipCardBackText: {
    width: Dimensions.get('screen').width * 0.78,
    fontFamily: 'roboto',
    fontSize: 28,
    padding: 20,
    textAlign: 'center',
    color: colors.WHITE,
  }
});