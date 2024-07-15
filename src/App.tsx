import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./app/component/dashboard.component";
import Header from "./app/component/header.component";
import Planner from "./app/component/planner/planner.component";
import PlannerDetail from "./app/component/planner/plannerDetail/plannerDetail";
import Repository from "./app/component/repository/repository.component";
import CreateRepository from "./app/component/repository/create-repo.component";


function App() {
  return (
    <div>
      <Header/>
      <div className="p-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/planner/:id" element={<PlannerDetail />} />
          <Route path="/repository" element={<Repository />} />
          <Route path="/repository/add" element={<CreateRepository />} />
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
    </div></div>
  );
}

export default App;
