import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/APIService';

const UpdateProfilePage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Separate form data for profile and password
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Add this method to your APIService
      const response = await api.updateProfile(profileData);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join('. ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setError('New passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Add this method to your APIService
      await api.updatePassword(passwordData);
      setSuccess('Password updated successfully!');
      setPasswordData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join('. ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to update password');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
        >
          Back to Dashboard
        </button>
      </div>

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleProfileSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md 
                  transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="current_password" className="block text-gray-700 text-sm font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="new_password" className="block text-gray-700 text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={8}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="new_password_confirmation" className="block text-gray-700 text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="new_password_confirmation"
                name="new_password_confirmation"
                value={passwordData.new_password_confirmation}
                onChange={handlePasswordChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md 
                  transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;