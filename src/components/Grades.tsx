import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Calendar } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Grade } from '../types';

export function Grades() {
  const [grades] = useLocalStorage<Grade[]>('grades', [
    {
      id: '1',
      studentId: 'student1',
      courseId: '1',
      courseName: 'Advanced Mathematics',
      assignmentTitle: 'Quiz Chapter 4',
      grade: 88,
      maxGrade: 100,
      date: '2025-01-10',
      feedback: 'Good understanding of polynomial functions. Work on factoring techniques.'
    },
    {
      id: '2',
      studentId: 'student1',
      courseId: '1',
      courseName: 'Advanced Mathematics',
      assignmentTitle: 'Homework Set 3',
      grade: 95,
      maxGrade: 100,
      date: '2025-01-08',
      feedback: 'Excellent work! All problems solved correctly.'
    },
    {
      id: '3',
      studentId: 'student1',
      courseId: '2',
      courseName: 'World History',
      assignmentTitle: 'Renaissance Essay',
      grade: 92,
      maxGrade: 100,
      date: '2025-01-05',
      feedback: 'Well-researched essay with strong arguments. Minor citation issues.'
    },
    {
      id: '4',
      studentId: 'student1',
      courseId: '3',
      courseName: 'Physics Fundamentals',
      assignmentTitle: 'Lab Report 2',
      grade: 45,
      maxGrade: 50,
      date: '2025-01-03',
      feedback: 'Good experimental procedure and data analysis.'
    },
    {
      id: '5',
      studentId: 'student1',
      courseId: '2',
      courseName: 'World History',
      assignmentTitle: 'Medieval Quiz',
      grade: 85,
      maxGrade: 100,
      date: '2024-12-20',
      feedback: 'Good knowledge of the period. Review feudal system concepts.'
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  // Calculate statistics
  const filteredGrades = selectedCourse === 'all' 
    ? grades 
    : grades.filter(grade => grade.courseId === selectedCourse);

  const averageGrade = filteredGrades.length > 0
    ? filteredGrades.reduce((sum, grade) => sum + (grade.grade / grade.maxGrade) * 100, 0) / filteredGrades.length
    : 0;

  const totalPoints = filteredGrades.reduce((sum, grade) => sum + grade.grade, 0);
  const maxTotalPoints = filteredGrades.reduce((sum, grade) => sum + grade.maxGrade, 0);

  const courses = Array.from(new Set(grades.map(grade => grade.courseName)));

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-blue-600 bg-blue-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 65) return 'D';
    return 'F';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Grades</h2>
          <p className="text-gray-600">Track your academic performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={grades.find(g => g.courseName === course)?.courseId}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Average</p>
              <p className="text-2xl font-bold text-gray-900">{averageGrade.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <p className={`text-sm mt-2 font-medium ${getGradeColor(averageGrade).split(' ')[0]}`}>
            {getLetterGrade(averageGrade)} Grade
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{totalPoints}/{maxTotalPoints}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">
            {maxTotalPoints > 0 ? ((totalPoints / maxTotalPoints) * 100).toFixed(1) : 0}% of total
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{filteredGrades.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-purple-600 mt-2">Graded assignments</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trend</p>
              <p className="text-2xl font-bold text-gray-900">+2.3%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-orange-600 mt-2">From last month</p>
        </div>
      </div>

      {/* Grades List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Grades</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredGrades.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No grades available</p>
              <p className="text-sm text-gray-400">Grades will appear here once assignments are graded</p>
            </div>
          ) : (
            filteredGrades
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(grade => {
                const percentage = (grade.grade / grade.maxGrade) * 100;
                return (
                  <div key={grade.id} className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{grade.assignmentTitle}</h4>
                        <p className="text-sm text-gray-600">{grade.courseName}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-gray-900">
                            {grade.grade}/{grade.maxGrade}
                          </span>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getGradeColor(percentage)}`}>
                            {percentage.toFixed(1)}% ({getLetterGrade(percentage)})
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(grade.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {grade.feedback && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Feedback: </span>
                          {grade.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}