type LessonStatus = "unlocked" | "locked";

export interface ILesson {
  duration: number;
  id: string;
  link: string;
  meta: null;
  order: number;
  previewImageLink: string;
  status: LessonStatus;
  title: string;
  type: string;
}
