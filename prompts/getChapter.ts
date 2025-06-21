import { ICourse, ICourseChapter } from "@/types/course";

const getChapter = (currentChaptNum: number, course: ICourse) => `
  I am studying a course titled: ${course.courseTitle}
  This course has ${course.courseChapters.length} chapters.
  The chapters are:
  ${listCourseChapters(course.courseChapters)}.
  I have studied ${getDoneChapters(currentChaptNum)}
  Generate the the content for chapter ${currentChaptNum}
  Return your output in the following format:
  {
    introduction: '',
    bodyParagraphs: [
      {subtitle: <can be null if parapaph does not have a subtitle>, content: '' },
      {subtitle: <can be null if parapaph does not have a subtitle>, content: '' },
      ...
      {subtitle: <can be null if parapaph does not have a subtitle>, content: '' },
    ],
    conclusion: '',
  }
  `;


function getDoneChapters(chpNum: number) {
  if (chpNum === 1) return '0 chapters';
  if (chpNum === 2) return 'the first chapter';
  return ` the first ${chpNum - 1} chapters`;
};

const listCourseChapters = (chapters: ICourseChapter[]) => {
  const chaptersList = chapters.map(ch => {
    const chp = ch.chapterNumber + '. ' + ch.chapterTopic + ' (' + ch.chapterSummary + ')';
    return chp;
  });
  return chaptersList.join('\n');
};

export default getChapter;;