
import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, User, FileText, Plus } from 'lucide-react';
import ODRequestForm from '../components/ODRequestForm';
import ODRequestList from '../components/ODRequestList';
import LeaveRequestForm from '../components/LeaveRequestForm';
import LeaveRequestList from '../components/LeaveRequestList';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'request1':
        return <ODRequestForm />;
      case 'history1':
        return <ODRequestList />;
      case  'request2':
        return <LeaveRequestForm/>;
      case 'history2':
        return <LeaveRequestList/>;  
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              onClick={() => setActiveTab('request1')}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <Plus className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Request OD</h3>
                  <p className="text-gray-600">Submit a new on-duty request</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('history1')}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">My Requests</h3>
                  <p className="text-gray-600">View your OD request history</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                  <p className="text-gray-600">View your profile details</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Roll No: {user?.rollNumber}</p>
                    <p>Department: {user?.department}</p>
                  </div>
                </div>
              </div>
            </div>

            <div
  onClick={() => setActiveTab('request2')}
  className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
>
  <div className="flex items-center">
    <Plus className="h-8 w-8 text-blue-600" />
    <div className="ml-4">
      <h3 className="text-lg font-medium text-gray-900">Request Leave</h3>
      <p className="text-gray-600">Submit a new Leave request</p>
    </div>
  </div>
</div>

            <div 
              onClick={() => setActiveTab('history2')}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">My Requests</h3>
                  <p className="text-gray-600">View your Leave request history</p>
                </div>
              </div>
            </div>



          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Student Portal</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('request')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'request'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Request OD
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Requests
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'overview' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h2>
              <p className="text-gray-600">Manage your on-duty requests and track their status</p>
            </div>
          )}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
