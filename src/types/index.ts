export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  enrollmentDate: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  enrolledStudents: number;
  rating: number;
  thumbnail: string;
  progress?: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  maxGrade: number;
  submissionDate?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  assignmentTitle: string;
  grade: number;
  maxGrade: number;
  date: string;
  feedback?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'academic' | 'event' | 'deadline';
}