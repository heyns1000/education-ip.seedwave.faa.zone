import React, { useState } from 'react';
import { FileText, Calendar, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Assignment } from '../types';

export function Assignments() {
  const [assignments, setAssignments] = useLocalStorage<Assignment[]>('assignments', [
    {
      id: '1',
      title: 'Math Quiz Chapter 5',
      description: 'Complete the quiz covering quadratic equations and functions',
      courseId: '1',
      courseName: 'Advanced Mathematics',
      dueDate: '2025-01-20T23:59:00',
      status: 'pending',
      maxGrade: 100
    },
    {
      id: '2',
      title: 'History Essay: Industrial Revolution',
      description: 'Write a 1500-word essay on the impact of the Industrial Revolution',
      courseId: '2',
      courseName: 'World History',
      dueDate: '2025-01-22T23:59:00',
      status: 'pending',
      maxGrade: 100
    },
    {
      id: '3',
      title: 'Physics Lab Report',
      description: 'Submit lab report on pendulum motion experiment',
      courseId: '3',
      courseName: 'Physics Fundamentals',
      dueDate: '2025-01-25T23:59:00',
      status: 'pending',
      maxGrade: 50
    },
    {
      id: '4',
      title: 'English Literature Analysis',
      description: 'Character analysis of Hamlet',
      courseId: '4',
      courseName: 'English Literature',
      dueDate: '2025-01-15T23:59:00',
      status: 'submitted',
      maxGrade: 100,
      submissionDate: '2025-01-14T18:30:00'
    },
    {
      id: '5',
      title: 'Math Test Chapter 4',
      description: 'Test on polynomial functions',
      courseId: '1',
      courseName: 'Advanced Mathematics',
      dueDate: '2025-01-10T23:59:00',
      status: 'graded',
      grade: 88,
      maxGrade: 100,
      submissionDate: '2025-01-09T20:15:00'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'graded': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <CheckCircle className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAssignments = assignments.filter(assignment => 
    filter === 'all' || assignment.status === filter
  );

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
          <p className="text-gray-600">Track your assignments and submissions</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
              filter === 'all'
                ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">All ({assignments.length})</span>
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
              filter === 'pending'
                ? 'border-orange-500 text-orange-600 bg-orange-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="font-medium">Pending ({pendingCount})</span>
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
              filter === 'submitted'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Submitted ({submittedCount})</span>
          </button>
          <button
            onClick={() => setFilter('graded')}
            className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
              filter === 'graded'
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Graded ({gradedCount})</span>
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No assignments found</p>
            <p className="text-sm text-gray-400">
              {filter === 'all' ? 'No assignments available' : `No ${filter} assignments`}
            </p>
          </div>
        ) : (
          filteredAssignments.map(assignment => {
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            const isOverdue = daysUntilDue < 0 && assignment.status === 'pending';
            const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0 && assignment.status === 'pending';

            return (
              <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        <span className="capitalize">{assignment.status}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{assignment.description}</p>
                    <p className="text-sm text-gray-500">{assignment.courseName}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    {assignment.status === 'graded' && assignment.grade !== undefined && (
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">
                          Grade: {assignment.grade}/{assignment.maxGrade} ({Math.round((assignment.grade / assignment.maxGrade) * 100)}%)
                        </span>
                      </div>
                    )}
                    {assignment.submissionDate && (
                      <div className="flex items-center space-x-1">
                        <span>Submitted: {new Date(assignment.submissionDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {isOverdue && (
                      <span className="flex items-center space-x-1 text-red-600 text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />
                        <span>Overdue</span>
                      </span>
                    )}
                    {isDueSoon && (
                      <span className="flex items-center space-x-1 text-orange-600 text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />
                        <span>Due soon</span>
                      </span>
                    )}
                    {assignment.status === 'pending' && (
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Start Assignment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}