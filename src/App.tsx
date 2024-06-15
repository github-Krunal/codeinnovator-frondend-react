import React from 'react';
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Learning from './app/components/learning/Learning';
import ProjectListComponent from './app/components/project/ProjectList.component';
import Dashboard from './app/components/dashboard/Dashboard';

function App() {
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/learn" element={<Learning />}/>
        <Route path="/project" element={<ProjectListComponent />}/>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
