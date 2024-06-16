import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Learning from "./app/components/learning/Learning";
import Dashboard from "./app/components/dashboard/Dashboard";
import Apps from "./app/components/apps/Apps";
import ProjectNavigation from "./app/components/project_management/project.navigation";
import DashboardProject from "./app/components/project_management/dashboard.project";
import TaskProject from "./app/components/project_management/task.project";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Apps />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/project" element={<ProjectNavigation />}>
            <Route path="" element={<DashboardProject />} />
            <Route path="dashboard" element={<DashboardProject />} />
            <Route path="task" element={<TaskProject />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
