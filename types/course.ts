interface ICourseChapter {
  chapterNumber: number;
  chapterSummary: string;
  chapterTopic: string;
}

export default interface ICourse {
  courseChapters: ICourseChapter[],
  courseImage: string;
  courseTitle: string;
  courseDescription: string;
  createdBy: string;
  createdOn: {
    nanoseconds: number;
    seconds: number;
  };
}