import React, { useEffect, useState } from 'react';
import type { IWebinarRegistration } from '../interfaces/Webinar';
import { WebinarService } from '../services/WebinarService';
import Dialog from '../components/Dialog';

const StudentManagement: React.FC<{

  students: IWebinarRegistration[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onMarkAsPaid: (id: number) => void;
}> = ({ students, onAdd, onMarkAsPaid }) => (
  <div className="bg-white p-6 rounded-lg max-w-5xl mx-auto mt-8 shadow-md overflow-x-auto">
    <h2 className="text-2xl mb-6 text-gray-800 font-semibold">Manage registrations</h2>
    <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-800">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Course Enrolled</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Payment Status</th>
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
            <td
              className={`border border-gray-300 px-4 py-2 font-semibold text-center
    ${student.paymentStatus ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}
            >
              {student.paymentStatus ? '✅ Done' : '❌ Pending'}
            </td>
            <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
            <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
              {
                <button
                  onClick={() => onMarkAsPaid(student.registrationId)}
                  disabled={student.paymentStatus}
                  className={`px-3 py-1 rounded font-semibold
                    ${student.paymentStatus
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-800 text-black'}`}
                >
                  Mark as paid
                </button>


              /*<button 
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
              </button> */}
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
      New registration
    </button>
  </div>
);

const NAV_ITEMS = ['Student Management'] as const;

type NavItem = typeof NAV_ITEMS[number];

const Dashboard: React.FC = ({ }) => {
  const [currentView, setCurrentView] = useState<NavItem>('Student Management');

  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number>(0);

  const [loading, setLoading] = useState(false);


  const handleLogoutDialogOpen = () => setLogoutDialogOpen(true);
  const handleLogoutCancel = () => setLogoutDialogOpen(false);

  const fetchStudents = async () => {
    try {
      const response = await WebinarService.getWebinarRegistrations();
      setStudents(response);
    } catch (error) {
      console.error('Error fetching webinar registrations:', error);
    }
  };


  const handleLogoutConfirm = () => {
    window.location.href = '/';
    setLogoutDialogOpen(false);
  };

  const handlePaymentCancel = () => setPaymentDialogOpen(false);
  const handlePaymentConfirm = async () => {
    try {
      setLoading(true);
      await WebinarService.addPayment(selectedStudentId);
      await fetchStudents();
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setPaymentDialogOpen(false);
      setSelectedStudentId(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);


  const [students, setStudents] = useState<IWebinarRegistration[]>([]);
  const handleLogout = () => {
    handleLogoutDialogOpen();
  };

  const handleAddStudent = () => {
  };

  const handleEditStudent = () => {

  }

  const handleDeleteStudent = () => {
  };

  const handleMarkAsPaid = (id: number) => {
    setSelectedStudentId(id);
    setPaymentDialogOpen(true);
  }

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
            onMarkAsPaid={handleMarkAsPaid}
          />
        )}
      </main>

      <footer className="bg-gray-200 text-gray-600 text-center py-4 select-none">
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </footer>

      <Dialog
        isOpen={isLogoutDialogOpen}
        title="Log out"
        message="Are you sure you want to Logout?"
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />

      <Dialog
        isOpen={isPaymentDialogOpen}
        title="Confirm Payment"
        message="Are you sure you want to Mark as paid?"
        onCancel={handlePaymentCancel}
        onConfirm={handlePaymentConfirm}
      />

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
