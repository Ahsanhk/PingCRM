import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import Contacts from './pages/Contacts';
import Reports from './pages/Reports';
import Edit from './components/Edit';
import Add from './components/Add';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Header />
        <Sidebar />
        
        <div className="flex-1 ml-64 mt-16 p-6 overflow-y-auto bg-gray-200">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/:type/edit" element={<Edit />} />
            <Route path="/:type/add" element={<Add />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
