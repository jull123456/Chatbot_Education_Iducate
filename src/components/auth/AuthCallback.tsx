import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setTokens, parseHashParams } from '../../utils/auth';
import { useAuthStore } from '../../store/useAuthStore';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { initializeFromToken } = useAuthStore();

  useEffect(() => {
    const handleCallback = () => {
      try {
        const tokens = parseHashParams(location.hash);
        
        if (tokens.access_token && tokens.id_token) {
          setTokens(tokens);
          initializeFromToken();
          navigate('/', { replace: true });
        } else {
          console.error('Missing required tokens');
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error processing authentication callback:', error);
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [location, navigate, initializeFromToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoadingSpinner />
      <p className="mt-4 text-gray-600">Completing authentication...</p>
    </div>
  );
}