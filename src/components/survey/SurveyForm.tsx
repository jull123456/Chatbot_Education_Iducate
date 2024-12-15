import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { saveSurvey } from '../../services/api';

export function SurveyForm() {
  const { setSurveyData} = useAuthStore();
  const navigate = useNavigate();
  const { setHasSurvey } = useAuthStore();
  const [formData, setFormData] = useState({
    id: '',
    email:'',
    username:'',
    gender: '',
    country: '',
    degree: '',
    major: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSurvey(formData);
      setHasSurvey(true);
      setSurveyData(formData);
      navigate('/search');
    } catch (error) {
      console.error('Failed to save survey:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Complete Your Survey
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please tell us a bit about yourself
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
               <select
                id="country"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="">Select Education Level</option>
                <option value="Germany">Germany</option>
                <option value="US">United States</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                Education Level
              </label>
              <select
                id="degree"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              >
                <option value="">Select Education Level</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Doctoral">Doctoral</option>
              </select>
            </div>
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                Major
              </label>
              <select
                id="major"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              >
                <option value="">Select Major</option>
                <option value="Art">Art</option>
                <option value="Science">Science</option>
                <option value="Social">Social</option>
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Man">Man</option>
                <option value="Women">Women</option>
                <option value="Prefer Not To Say">Prefer Not To Say</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Complete Survey
          </button>
        </form>
      </div>
    </div>
  );
}