import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, Play, CheckCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Course } from '../types';

export function Courses() {
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage<Course[]>('enrolledCourses', [
    {
      id: '1',
      title: 'Advanced Mathematics',
      description: 'Calculus, Linear Algebra, and Statistics',
      instructor: 'Dr. Sarah Johnson',
      duration: '16 weeks',
      level: 'Advanced',
      category: 'Mathematics',
      enrolledStudents: 45,
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 75
    },
    {
      id: '2',
      title: 'World History',
      description: 'From Ancient Civilizations to Modern Times',
      instructor: 'Prof. Michael Chen',
      duration: '12 weeks',
      level: 'Intermediate',
      category: 'History',
      enrolledStudents: 38,
      rating: 4.6,
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 60
    },
    {
      id: '3',
      title: 'Physics Fundamentals',
      description: 'Mechanics, Thermodynamics, and Electromagnetism',
      instructor: 'Dr. Emily Rodriguez',
      duration: '14 weeks',
      level: 'Intermediate',
      category: 'Science',
      enrolledStudents: 52,
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 40
    }
  ]);

  const [availableCourses] = useState<Course[]>([
    {
      id: '4',
      title: 'English Literature',
      description: 'Classic and Contemporary Literature Analysis',
      instructor: 'Prof. James Wilson',
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'Literature',
      enrolledStudents: 29,
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'Computer Science Basics',
      description: 'Programming Fundamentals and Algorithms',
      instructor: 'Dr. Lisa Park',
      duration: '18 weeks',
      level: 'Beginner',
      category: 'Technology',
      enrolledStudents: 67,
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'enrolled' | 'available'>('enrolled');

  const enrollInCourse = (course: Course) => {
    const newCourse = { ...course, progress: 0 };
    setEnrolledCourses([...enrolledCourses, newCourse]);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <p className="text-gray-600">Manage your enrolled courses and discover new ones</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'enrolled'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Courses ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'available'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Available Courses ({availableCourses.length})
          </button>
        </nav>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'enrolled' ? enrolledCourses : availableCourses).map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{course.enrolledStudents} students</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                  <span>{course.rating} rating</span>
                </div>
              </div>

              {activeTab === 'enrolled' && course.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {activeTab === 'enrolled' ? (
                  <>
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      <Play className="w-4 h-4" />
                      <span>Continue</span>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => enrollInCourse(course)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {(activeTab === 'enrolled' ? enrolledCourses : availableCourses).length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {activeTab === 'enrolled' ? 'No enrolled courses yet' : 'No available courses'}
          </p>
          <p className="text-sm text-gray-400">
            {activeTab === 'enrolled' 
              ? 'Browse available courses to get started' 
              : 'Check back later for new courses'
            }
          </p>
        </div>
      )}
    </div>
  );
}