
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Calendar, User, FileText } from 'lucide-react';
import { useAuth } from '../services/AuthContext';

interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  startDate: string;
  endDate: string;
  fromTime:string;
  toTime:string;
  phoneNumber:string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  hodComments?: string;
}

const LeaveRequestList = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const loadRequests = () => {
      const allRequests = JSON.parse(localStorage.getItem('od-requests') || '[]');
      
      // Filter requests based on user type
      const filteredRequests = user?.type === 'student' 
        ? allRequests.filter((req: LeaveRequest) => req.studentId === user.id)
        : allRequests.filter((req: LeaveRequest) => req.department === user?.department);
      
      setRequests(filteredRequests);
    };

    loadRequests();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Leave Requests</h3>
        <p className="text-gray-500">
          {user?.type === 'student' 
            ? "You haven't submitted any Leave requests yet."
            : "No Leave requests found for your department."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {user?.type === 'student' ? 'My OD Requests' : 'Department OD Requests'}
        </h2>
        <span className="text-sm text-gray-500">{requests.length} requests</span>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(request.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user?.type === 'hod' && (
                      <span>{request.studentName} ({request.rollNumber}) - </span>
                    )}
                    Leave Request
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(request.startDate)} - {formatDate(request.endDate)}
                    </span>
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {request.department}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Reason:</h4>
              <p className="text-gray-600 text-sm">{request.reason}</p>
            </div>

            {request.hodComments && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">HOD Comments:</h4>
                <p className="text-gray-600 text-sm">{request.hodComments}</p>
              </div>
            )}

            <div className="text-xs text-gray-400">
              Submitted on {formatDate(request.submittedAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequestList;
