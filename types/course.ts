export interface ICourseChapter {
  chapterNumber: number;
  chapterSummary: string;
  chapterTopic: string;
}

export interface ICourse {
  id: string;
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