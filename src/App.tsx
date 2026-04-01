import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FirebaseProvider, useFirebase } from './FirebaseContext';
import Home from './pages/Home';
import AdminDashboard from './pages/Admin/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, isAuthReady } = useFirebase();
  
  if (!isAuthReady) return <div className="h-screen w-screen bg-background flex items-center justify-center text-text">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/" />;
  
  return <>{children}</>;
};

function AppContent() {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <AppContent />
      </Router>
    </FirebaseProvider>
  );
}
