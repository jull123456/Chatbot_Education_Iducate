import React from 'react';
import { Mail } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export function ProfileView() {
  const { surveyData } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">
                {surveyData?.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold dark:text-white">{surveyData?.username}</h1>
              <p className="text-gray-600 dark:text-gray-300">{surveyData?.email}</p>
            </div>
          </div>
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Edit
          </button> */}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={surveyData?.username || ''}
                readOnly
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <input
                type="text"
                value={surveyData?.gender || ''}
                readOnly
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Education Level
              </label>
              <input
                type="text"
                value={surveyData?.degree || ''}
                readOnly
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Major
              </label>
              <input
                type="text"
                value={surveyData?.major || ''}
                readOnly
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country
              </label>
              <input
                type="text"
                value={surveyData?.country || ''}
                readOnly
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">My Email Address</h2>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-gray-900 dark:text-white">{surveyData?.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Primary Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}