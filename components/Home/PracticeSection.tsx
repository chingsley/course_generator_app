import { colors } from '@/constants/colors';
import { practiceOption, practiceTypes, TPracticeType } from '@/constants/practiceOptions';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const PracticeIcon = ({ name }: { name: TPracticeType; }) =>
  name === practiceTypes.quiz ?
    <MaterialIcons name="quiz" size={70} color={colors.PRIMARY_BLUE} />
    :
    name == practiceTypes.flashcards ?
      <MaterialCommunityIcons name="cards-playing-outline" size={70} color={colors.PRIMARY_BLUE} />
      :
      name.toLocaleLowerCase() === practiceTypes.qna ?
        <MaterialIcons name="question-answer" size={70} color={colors.PRIMARY_BLUE} />
        :
        null;

const PracticeSection = () => {
  const router = useRouter();

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
            <TouchableOpacity onPress={() => router.push(`/practice/${item.name}`)} key={index} style={{
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
                  textTransform: 'capitalize',
                }}>{item.name}</Text>
                <PracticeIcon name={item.name} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default PracticeSection;

const styles = StyleSheet.create({});
