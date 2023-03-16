import { ILesson } from "./lesson.type";
import { IMeta } from "./meta.type";

export interface ICourseBase {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: IMeta;
}

export interface ICourseCard extends ICourseBase {
  lessonsCount: number;
}

export interface ICourseInfo extends ICourseBase {
  lessons: ILesson[];
}
