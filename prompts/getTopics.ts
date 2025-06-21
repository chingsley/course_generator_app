const getTopics = (topic: string) => `
${topic}::As a coaching teacher,
- User wants to learn about the topic
- Generate 5-7 course titles for the study (short)
- Make sure it is releated to the description
- Output should be an ARRAY of strings in JSON FORMAT only
- Do not add any plain texts in the output.
`;

export default getTopics;