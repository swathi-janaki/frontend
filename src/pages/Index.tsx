
import { useAuth } from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Calendar, Clock, Users, UserCheck, Mail, LogIn } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.type === 'student') {
        navigate('/student');
      } else if (user.type === 'hod') {
        navigate('/hod');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Leave & OD Tracker</h1>
            </div>
            <button
              onClick={handleLoginRedirect}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Leave</span> & <span className="text-purple-600">OD Tracking</span> System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your leave management and On-Duty tracking process. 
            Students can apply for leave and OD, while faculty and HODs can efficiently review and approve requests.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* User Types */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg border-2 border-blue-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Students</h3>
            <p className="text-gray-600 mb-4">Apply for leave and OD requests, track application status, and manage your academic calendar.</p>
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Student Login
            </button>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg border-2 border-purple-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <UserCheck className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Faculty & HOD</h3>
            <p className="text-gray-600 mb-4">Review and approve leave requests, manage department OD applications, and oversee student attendance.</p>
            <button
              onClick={handleLoginRedirect}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Faculty Login
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Leave Management</h3>
            <p className="text-gray-600">Easy application and approval process for student leave requests.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">OD Tracking</h3>
            <p className="text-gray-600">Track On-Duty requests and approvals with real-time status updates.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Notifications</h3>
            <p className="text-gray-600">Automatic email updates for application status and approvals.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
