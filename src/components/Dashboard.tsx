import React from 'react';
import { BookOpen, FileText, Clock, Trophy, TrendingUp, Calendar } from 'lucide-react';

export function Dashboard() {
  const upcomingAssignments = [
    { title: 'Math Quiz Chapter 5', course: 'Mathematics', dueDate: '2025-01-20', priority: 'high' },
    { title: 'History Essay', course: 'World History', dueDate: '2025-01-22', priority: 'medium' },
    { title: 'Science Lab Report', course: 'Physics', dueDate: '2025-01-25', priority: 'low' },
  ];

  const recentGrades = [
    { assignment: 'English Essay', grade: 92, maxGrade: 100, course: 'English Literature' },
    { assignment: 'Math Test', grade: 88, maxGrade: 100, course: 'Mathematics' },
    { assignment: 'Science Project', grade: 95, maxGrade: 100, course: 'Physics' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h2>
        <p className="text-gray-600">Here's what's happening with your studies</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <p className="text-sm text-indigo-600 mt-2">2 new this semester</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Assignments</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-orange-600 mt-2">1 due tomorrow</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900">91.7%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+2.3% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Study Hours</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-purple-600 mt-2">This week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      assignment.priority === 'high' ? 'bg-red-500' :
                      assignment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{assignment.title}</p>
                      <p className="text-sm text-gray-600">{assignment.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{assignment.dueDate}</p>
                    <p className="text-xs text-gray-500">Due date</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Grades</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{grade.assignment}</p>
                    <p className="text-sm text-gray-600">{grade.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{grade.grade}/{grade.maxGrade}</p>
                    <p className="text-sm text-green-600">{Math.round((grade.grade / grade.maxGrade) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Academic Progress</h3>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Progress chart visualization</p>
            <p className="text-sm text-gray-400">Your academic performance over time</p>
          </div>
        </div>
      </div>
    </div>
  );
}