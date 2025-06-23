import React, { useEffect, useState } from 'react';
import type { IWebinarRegistration } from '../interfaces/Webinar';
import { WebinarService } from '../services/WebinarService';

const StudentManagement: React.FC<{

  students: IWebinarRegistration[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;

}> = ({ students, onAdd, onEdit, onDelete }) => (
  <div className="bg-white p-6 rounded-lg max-w-5xl mx-auto mt-8 shadow-md overflow-x-auto">
    <h2 className="text-2xl mb-6 text-gray-800 font-semibold">Student Management</h2>
    <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-800">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Course Enrolled</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Payment Amount</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.registrationId} className="odd:bg-gray-100 even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{student.name}</td>
            <td className="border border-gray-300 px-4 py-2">{student.email}</td>
            <td className="border border-gray-300 px-4 py-2">{student.webinarName}</td>
            <td className="border border-gray-300 px-4 py-2">${student.paymentStatus}</td>
            <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
            <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
              <button
                onClick={() => onEdit(student.registrationId)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black font-semibold"
                aria-label={`Edit student ${student.name}`}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete student "${student.name}"? This action cannot be undone.`)) {
                    onDelete(student.registrationId);
                  }
                }}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-semibold"
                aria-label={`Delete student ${student.name}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      onClick={onAdd}
      className="mt-6 bg-green-600 hover:bg-green-700 transition-colors text-white px-6 py-3 rounded font-semibold"
      aria-label="Add new student"
    >
      Add Student
    </button>
  </div>
);

const NAV_ITEMS = ['Student Management'] as const;

type NavItem = typeof NAV_ITEMS[number];

const Dashboard: React.FC = ({ }) => {
  const [currentView, setCurrentView] = useState<NavItem>('Student Management');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await WebinarService.getWebinarRegistrations();
        setStudents(response);
      } catch (error) {
        console.error('Error fetching webinar registrations:', error);
      }
    };

    fetchStudents();
  }, []);


  const [students, setStudents] = useState<IWebinarRegistration[]>([]);
  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/';
  };

  const handleAddStudent = () => {
  };

  const handleEditStudent =() =>{

  }

  const handleDeleteStudent = () => {
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-200 flex items-center justify-between px-6 py-4 shadow-md sticky top-0 z-50">
        {/* Branding */}
        <div className="text-2xl font-bold text-green-600 select-none">Admin Dashboard</div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg font-semibold">
          {NAV_ITEMS.map(item => (
            <li key={item}>
              <button
                className={`hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors ${currentView === item ? 'text-green-600 underline' : 'text-gray-600'
                  }`}
                onClick={() => setCurrentView(item)}
                aria-current={currentView === item ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded font-semibold text-white"
          aria-label="Logout"
        >
          Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow p-6 overflow-auto">
        {currentView === 'Student Management' && (
          <StudentManagement
            students={students}
            onAdd={handleAddStudent}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
          />
        )}
      </main>

      <footer className="bg-gray-200 text-gray-600 text-center py-4 select-none">
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
