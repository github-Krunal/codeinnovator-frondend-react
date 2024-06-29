import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./app/component/dashboard.component";
import Header from "./app/component/header.component";


function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/project" element={<ProjectNavigation />}>
            <Route path="" element={<DashboardProject />} />
            <Route path="dashboard" element={<DashboardProject />} />
            <Route path="task" element={<TaskProject />} />
          </Route>
          <Route path="/course" element={<CourseHome/>}>
          <Route path="" element={<CourseDashboard />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
