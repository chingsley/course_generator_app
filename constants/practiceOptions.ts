import { images } from "./images";

export type TPracticeType = 'quiz' | 'flashcards' | 'q & a';
export const practiceTypes: { [key: string]: TPracticeType; } = {
  quiz: 'quiz',
  flashcards: 'flashcards',
  qna: 'q & a'
} as const;
export const practiceOption = [
  {
    name: practiceTypes.quiz,
    image: images.practiceSection,
  },
  {
    name: practiceTypes.flashcards,
    image: images.practiceSection,
  },
  {
    name: practiceTypes.qna,
    image: images.practiceSection,
  },
];

