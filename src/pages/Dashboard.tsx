import React, { useState } from 'react';

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  payment: number;
  phone: string;
};

type AdminProfileType = {
  name: string;
  email: string;
  phone: string;
  picture: string; // Added picture field
};

type DashboardProps = {
  adminEmail: string;
};

const AdminProfile: React.FC<{
  profile: AdminProfileType;
  onChange: (field: keyof AdminProfileType, value: string) => void;
  onPasswordChange: () => void;
}> = ({ profile, onChange, onPasswordChange }) => (
  <div className="bg-white p-6 rounded-lg max-w-md mx-auto mt-8 shadow-md">
    <h2 className="text-2xl mb-6 text-gray-800 font-semibold">Admin Profile</h2>
    <div className="mb-4 text-center">
      <img
        src={profile.picture}
        alt="Admin Profile"
        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-2 border-blue-500"
      />
      <button
        onClick={() => {
          const newPicture = prompt('Enter new profile picture URL:', profile.picture);
          if (newPicture) {
            onChange('picture', newPicture);
          }
        }}
        className="text-blue-600 underline"
      >
        Change Picture
      </button>
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 mb-1">Name:</label>
      <input
        type="text"
        value={profile.name}
        onChange={e => onChange('name', e.target.value)}
        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Your Name"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 mb-1">Email:</label>
      <input
        type="email"
        value={profile.email}
        className="w-full p-3 rounded border border-gray-300 bg-gray-100 cursor-not-allowed"
        readOnly
      />
      <p className="text-xs text-gray-500 mt-1">Email is fixed and cannot be changed.</p>
    </div>
    <div className="mb-6">
      <label className="block text-gray-600 mb-1">Phone Number:</label>
      <input
        type="tel"
        value={profile.phone}
        onChange={e => onChange('phone', e.target.value)}
        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Your Phone Number"
      />
    </div>
    <button
      onClick={onPasswordChange}
      className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 px-6 rounded w-full font-semibold"
      aria-label="Send password change link"
    >
      Change Password (via Email Link)
    </button>
  </div>
);

const StudentManagement: React.FC<{
  students: Student[];
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
          <tr key={student.id} className="odd:bg-gray-100 even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{student.name}</td>
            <td className="border border-gray-300 px-4 py-2">{student.email}</td>
            <td className="border border-gray-300 px-4 py-2">{student.course}</td>
            <td className="border border-gray-300 px-4 py-2">${student.payment}</td>
            <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
            <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
              <button
                onClick={() => onEdit(student.id)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black font-semibold"
                aria-label={`Edit student ${student.name}`}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete student "${student.name}"? This action cannot be undone.`)) {
                    onDelete(student.id);
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

const DashboardStats: React.FC<{ totalStudents: number; totalRevenue: number }> = ({
  totalStudents,
  totalRevenue,
}) => (
  <div className="bg-white p-6 rounded-lg max-w-md mx-auto mt-8 shadow-md text-gray-800">
    <h2 className="text-2xl mb-6 font-semibold">Dashboard Statistics</h2>
    <p className="mb-3 text-lg">
      <strong>Total Number of Students:</strong> {totalStudents}
    </p>
    <p className="text-lg">
      <strong>Total Revenue Collected:</strong> ${totalRevenue}
    </p>
  </div>
);

const NAV_ITEMS = ['Admin Profile', 'Student Management', 'Dashboard Statistics'] as const;

type NavItem = typeof NAV_ITEMS[number];

const Dashboard: React.FC<DashboardProps> = ({ adminEmail }) => {
  const [currentView, setCurrentView] = useState<NavItem>('Admin Profile');

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Math', payment: 100, phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Science', payment: 150, phone: '098-765-4321' },
  ]);

  const [adminProfile, setAdminProfile] = useState<AdminProfileType>({
    name: 'Admin Name', // Pre-filled name
    email: adminEmail,
    phone: '123-456-7890', // Pre-filled phone number
    picture: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80', // Default picture
  });

  const totalStudents = students.length;
  const totalRevenue = students.reduce((acc, student) => acc + student.payment, 0);

  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/';
  };

  const handleProfileChange = (field: keyof AdminProfileType, value: string) => {
    setAdminProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = () => {
    alert(`Password change link has been sent to ${adminProfile.email}. Please check your email to reset your password.`);
  };

  const handleAddStudent = () => {
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudentName = prompt('Enter new student name:');
    if (!newStudentName) return;
    const newStudentEmail = prompt('Enter new student email:');
    if (!newStudentEmail) return;
    const newStudentCourse = prompt('Enter course enrolled:');
    if (!newStudentCourse) return;
    const newStudentPayment = prompt('Enter payment amount (number):');
    const paymentNumber = newStudentPayment ? parseFloat(newStudentPayment) : 0;
    const newStudentPhone = prompt('Enter phone number:');
    if (!newStudentPhone) return;

    const newStudent: Student = {
      id: newId,
      name: newStudentName,
      email: newStudentEmail,
      course: newStudentCourse,
      payment: paymentNumber,
      phone: newStudentPhone,
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const handleEditStudent = (id: number) => {
    const studentToEdit = students.find(s => s.id === id);
    if (!studentToEdit) return alert('Student not found.');
    const name = prompt('Edit student name:', studentToEdit.name);
    if (name === null) return;
    const email = prompt('Edit student email:', studentToEdit.email);
    if (email === null) return;
    const course = prompt('Edit course enrolled:', studentToEdit.course);
    if (course === null) return;
    const paymentStr = prompt('Edit payment amount:', studentToEdit.payment.toString());
    if (paymentStr === null) return;
    const payment = parseFloat(paymentStr);
    if (isNaN(payment)) return alert('Invalid payment amount.');
    const phone = prompt('Edit phone number:', studentToEdit.phone);
    if (phone === null) return;

    const updatedStudent: Student = {
      id,
      name,
      email,
      course,
      payment,
      phone,
    };
    setStudents(prev => prev.map(s => (s.id === id ? updatedStudent : s)));
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id));
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
                className={`hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors ${
                  currentView === item ? 'text-green-600 underline' : 'text-gray-600'
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
        {currentView === 'Admin Profile' && (
          <AdminProfile
            profile={adminProfile}
            onChange={handleProfileChange}
            onPasswordChange={handlePasswordChange}
          />
        )}

        {currentView === 'Student Management' && (
          <StudentManagement
            students={students}
            onAdd={handleAddStudent}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
          />
        )}

        {currentView === 'Dashboard Statistics' && (
          <DashboardStats totalStudents={totalStudents} totalRevenue={totalRevenue} />
        )}
      </main>

      <footer className="bg-gray-200 text-gray-600 text-center py-4 select-none">
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
