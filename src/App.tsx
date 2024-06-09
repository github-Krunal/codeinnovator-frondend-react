import React from 'react';
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectListComponent from './components/project/ProjectList.component';
import Learning from './components/learning/Learning';

function App() {
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/learn" element={<Learning />}/>
        <Route path="/project" element={<ProjectListComponent />}/>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
