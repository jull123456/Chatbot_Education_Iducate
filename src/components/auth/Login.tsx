import React from 'react';
import { getCognitoLoginUrl } from '../../utils/auth';
import { Sparkles } from 'lucide-react';
import logo from '../layout/logo-full-light-mode.png'
import logo1 from '../layout/logo-1x1-dark-mode.png'

export function Login() {
  const handleLogin = () => {
    window.location.href = getCognitoLoginUrl();
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <div className="text-center mb-0 items-center">
           
            {/* <span className="text-3xl font-bold mb-4">WELCOME TO</span> */}
            <div className="flex-1 flex items-center justify-center mb-8">
            <img src={logo1} alt="" className="h-32 w-32 items-center"/>
            <img src={logo} alt="" className="h-20  items-center"/>
            </div>
            <p className="text-white/70 mb-4">
              Your intelligent assistant for academic and career guidance
            </p>
          </div>

          
          <div className="bg-white/5 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg">🔍</span>
              </div>
              <div>
                <h3 className="font-semibold">Search Menu</h3>
                <p className="text-sm text-white/70">Please login to use this feature</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                disabled
                placeholder="Search is disabled until you login..."
                className="w-full bg-white/10 text-white/50 rounded-lg px-4 py-3 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Login to Get Started
          </button>
        </div>
      </div>
    </div>
  );
}