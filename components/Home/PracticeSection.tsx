import { colors } from '@/constants/colors';
import { practiceOption } from '@/constants/practiceOptions';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


const PracticeIcon = ({ name }: { name: string; }) =>
  name.toLocaleLowerCase() === 'quiz' ?
    <MaterialIcons name="quiz" size={70} color={colors.PRIMARY_BLUE} />
    :
    name.toLocaleLowerCase() == 'flashcards' ?
      <MaterialCommunityIcons name="cards-playing-outline" size={70} color={colors.PRIMARY_BLUE} />
      :
      name.toLocaleLowerCase() === 'q & a' ?
        <MaterialIcons name="question-answer" size={70} color={colors.PRIMARY_BLUE} />
        :
        null;

const PracticeSection = () => {
  console.log(practiceOption);
  return (
    <View style={{
      marginTop: 10,
    }}>
      <Text style={{
        fontFamily: 'roboto-bold',
        fontSize: 25,
      }}>Practice</Text>
      <View>
        <FlatList
          data={practiceOption}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View key={index} style={{
              flex: 1,
              margin: 5,
              aspectRatio: 1,
              backgroundColor: colors.BG_GRAY,
              height: 500,
              borderRadius: 8,
            }}>
              <View style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
                <Text style={{
                  padding: 15,
                  fontFamily: 'roboto',
                  fontSize: 20,
                  position: 'absolute',
                  bottom: -10,
                }}>{item.name}</Text>
                <PracticeIcon name={item.name} />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PracticeSection;

const styles = StyleSheet.create({});
