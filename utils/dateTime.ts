import { ICourse } from "@/types/course";

export const sortCoursesByDate = (courses: ICourse[]): ICourse[] => {
  return [...courses].sort((a, b) => {
    // Convert to milliseconds for comparison
    const aTime = a.createdOn.seconds * 1000 + a.createdOn.nanoseconds / 1000000;
    const bTime = b.createdOn.seconds * 1000 + b.createdOn.nanoseconds / 1000000;

    // Sort descending (most recent first)
    return bTime - aTime;
  });
};