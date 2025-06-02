
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MessageSquare, Calendar, User } from 'lucide-react';
import { useAuth } from '../services/AuthContext';

interface ODRequest {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  hodComments?: string;
}

const HODApproval = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ODRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadRequests();
  }, [user]);

  const loadRequests = () => {
    const allRequests = JSON.parse(localStorage.getItem('od-requests') || '[]');
    const departmentRequests = allRequests.filter(
      (req: ODRequest) => req.department === user?.department && req.status === 'pending'
    );
    setRequests(departmentRequests);
  };

  const handleApproval = async (requestId: string, status: 'approved' | 'rejected') => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const allRequests = JSON.parse(localStorage.getItem('od-requests') || '[]');
    const updatedRequests = allRequests.map((req: ODRequest) => {
      if (req.id === requestId) {
        return {
          ...req,
          status,
          hodComments: comments || undefined
        };
      }
      return req;
    });

    localStorage.setItem('od-requests', JSON.stringify(updatedRequests));
    
    // Reload requests
    loadRequests();
    setSelectedRequest(null);
    setComments('');
    setIsSubmitting(false);
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
        <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Requests</h3>
        <p className="text-gray-500">
          All OD requests for your department have been processed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pending OD Requests</h2>
        <span className="text-sm text-gray-500">{requests.length} pending requests</span>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {request.studentName} ({request.rollNumber})
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
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Reason:</h4>
              <p className="text-gray-600 text-sm">{request.reason}</p>
            </div>

            <div className="text-xs text-gray-400 mb-4">
              Submitted on {formatDate(request.submittedAt)}
            </div>

            {selectedRequest === request.id ? (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Comments (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add any comments or feedback..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApproval(request.id, 'approved')}
                    disabled={isSubmitting}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Processing...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleApproval(request.id, 'rejected')}
                    disabled={isSubmitting}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Processing...' : 'Reject'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRequest(null);
                      setComments('');
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setSelectedRequest(request.id)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Review Request
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HODApproval;
