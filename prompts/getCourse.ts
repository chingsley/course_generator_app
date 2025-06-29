const getCourse = (courseTopic: string) => `As skill coaching teacher
  - User wants to learn about the topic: ${courseTopic}
  - Generate a 3 to 5-chapter course TEMPLATE in the FOLLOWING FORMAT
  {
    courseTitle: '',
    courseDescription: <no more than 15 words>,
    courseImage: 'generate a url for an image that best describes what the course is about. A free onine image is accpetable.',
    courseCategory: 'a suitable category for the course, e.g Tech & Coding or Business & Finance or Health & Fitness or Science & Engineering or Arts & Creativity'
    courseChapters: [
      {
        chapterNumber: 1,
        chapterTopic: '',
        chapterSummary: '',
      },
      {
        chapterNumber: 2,
        ...
      },
      ...
    ]
  }
  `;

export default getCourse;