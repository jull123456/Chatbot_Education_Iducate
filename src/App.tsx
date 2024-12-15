import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
// import { ChatInterface } from './components/chat/ChatInterface';
import { ChatInterfacecopy } from './components/chat/ChatInterfacecopy';
import { InsightDashboard } from './components/insight/InsightDashboard';
import { ProfileView } from './components/profile/ProfileView';
import { ForumView } from './components/forum/ForumView';
import { AuthCallback } from './components/auth/AuthCallback';
import { Login } from './components/auth/Login';
import { SurveyForm } from './components/survey/SurveyForm';
import { useAuthStore } from './store/useAuthStore';
import { checkSurveyStatus } from './services/api';

function App() {
  const { isAuthenticated, hasSurvey, setHasSurvey, setSurveyData} = useAuthStore();
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      checkSurveyStatus().then(({ data, success }) => {
        // Lakukan sesuatu dengan data dan success
        console.info('Survey data:', data); // Menampilkan data survei
        console.info('Survey success:', success); // Menampilkan status keberhasilan (boolean)
        
        // Menggunakan status untuk setHasSurvey
        setHasSurvey(success);
        setSurveyData(data);
        // setUser(data);
      }).catch(error => {
        // Tangani error jika terjadi
        console.error('Error fetching survey status:', error);
      });
    }
  }, [isAuthenticated, setHasSurvey]);
  
  

  const handleLogout = () => {
    useAuthStore.getState().logout();
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
        {isAuthenticated && hasSurvey && (
          <Sidebar
            isMinimized={isMinimized}
            isDarkMode={isDarkMode}
            onToggleMinimize={() => setIsMinimized(!isMinimized)}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onLogout={handleLogout}
          />
        )}
        <main className={`flex-1 overflow-auto transition-all ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  hasSurvey ? (
                    <Navigate to="/search" replace />
                  ) : (
                    <Navigate to="/survey" replace />
                  )
                ) : (
                  <Navigate to="/Login" replace />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/survey"
              element={
                isAuthenticated ? (
                  hasSurvey ? (
                    <Navigate to="/search" replace />
                  ) : (
                    <SurveyForm />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/search"
              element={
                isAuthenticated ? (
                  hasSurvey ? (
                    <ChatInterfacecopy />
                  ) : (
                    <Navigate to="/survey" replace />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/insight"
              element={
                
                    <InsightDashboard />
                 
              }
            />
            <Route
              path="/forum"
              element={
                isAuthenticated ? (
                  hasSurvey ? (
                    <ForumView />
                  ) : (
                    <Navigate to="/survey" replace />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  hasSurvey ? (
                    <ProfileView />
                  ) : (
                    <Navigate to="/survey" replace />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/callback" element={<AuthCallback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;