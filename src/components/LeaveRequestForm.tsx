
import React, { useState } from 'react';
import { Calendar, FileText, Send, Upload } from 'lucide-react';
import { useAuth } from '../services/AuthContext';

interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  startDate: string;
  endDate: string;
  fromTime: string;             
  toTime: string;  
   phoneNumber: string;    
  reason: string;
  documents?: File[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  hodComments?: string;
}

const LeaveRequestForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    phoneNumber: '',     
  fromTime: '',        
  toTime: '', 
    reason: '',
    documents: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create new OD request
    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      studentId: user?.id || '',
      studentName: user?.name || '',
      rollNumber: user?.rollNumber || '',
      department: user?.department || '',
      startDate: formData.startDate,
      endDate: formData.endDate,
       fromTime: formData.fromTime,           
      toTime: formData.toTime,    
  phoneNumber: formData.phoneNumber,
      
      reason: formData.reason,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage (in real app, this would be API call)
    const existingRequests = JSON.parse(localStorage.getItem('leave-requests') || '[]');
    existingRequests.push(newRequest);
    localStorage.setItem('leave-requests', JSON.stringify(existingRequests));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form
    setFormData({
      startDate: '',
      endDate: '',
      reason: '',
      phoneNumber: '',     
  fromTime: '',        
  toTime: '', 
      documents: []
    });

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Leave</h2>
        <p className="text-gray-600">Fill out the form below to submit your Leave request</p>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">Leave request submitted successfully!</p>
          <p className="text-green-600 text-sm">Your request is now pending HOD approval.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Start Date
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              End Date
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      🕒 From Time
    </label>
    <input
      type="time"
      required
      value={formData.fromTime}
      onChange={(e) => setFormData(prev => ({ ...prev, fromTime: e.target.value }))}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      🕓 To Time
    </label>
    <input
      type="time"
      required
      value={formData.toTime}
      onChange={(e) => setFormData(prev => ({ ...prev, toTime: e.target.value }))}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    📞 Phone Number
  </label>
  <input
    type="tel"
    required
    pattern="[0-9]{10}"
    placeholder="Enter 10-digit phone number"
    value={formData.phoneNumber}
    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
</div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Reason for OD Request
          </label>
          <textarea
            required
            rows={4}
            placeholder="Please provide a detailed reason for your OD request (e.g., attending symposium, sports event, personal matter)"
            value={formData.reason}
            onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="w-4 h-4 inline mr-2" />
            Supporting Documents (Optional)
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formData.documents.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                {formData.documents.length} file(s) selected
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Submitting...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Send className="w-5 h-5 mr-2" />
              Submit OD Request
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
