export default {
  getTopics: (topic: string) => `
            ${topic}::As a coaching teacher,
            - User wants to learn about the topic
            - Generate 5-7 course titles for the study (short)
            - Make sure it is releated to the description
            - Output should be an ARRAY of strings in JSON FORMAT only
            - Do not add any plain texts in the outpu.
            `,
  getCourses2: (course: string) => `As you are coaching teacher
  - User wants to learn about the topic: ${course}
  - Create 2 mini courses with course name, description, and 3 chapters for each course
  - Make sure to add chapters with all learning material course wise
  - Add CourseBanner Image from ('/banner1.png', '/banner2.png', 'banner3.png', '/banner4.png')
  - Explain the chapter content as detailed tutorial
  - Generate 5 Quizz, 10 Flashcard and 5 Questions answers

  - Output should be an array of JSON objects IN THE FOLLOWING FORMATS:
  - [
      {
        "courseTitle": 'value_here',
        "descrption": "",
        "banner_image": "",
        "chapters": [
          {
            chapterNumber: 1
            chapterName: '',
            content: [
              {
                topic: 'Topic Name in 2 to 4 worlds ex.(Creating),
                explain: 'Detailed explanation tutorial',
                code: 'Code example if required else null',
                example: 'example if required  else null'
              }
            ],
          },
          {
            chapterNumber: 2,
            ...
          },
          {
            chapterNumber: 3,
            ...
          }
        ]
      }
    ]
  `,
  getCourses: (courseTopic: string) => `As skill coaching teacher
  - User wants to learn about the topic: ${courseTopic}
  - Generate a 4-chapter course TEMPLATE in the FOLLOWING FORMAT
  {
    courseTitle: '',
    courseImage: 'generate a url for an image that best describes what the course is about. A free onine image is accpetable.',
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
  `
};