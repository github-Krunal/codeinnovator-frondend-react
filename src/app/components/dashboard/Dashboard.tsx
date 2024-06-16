
import "./Dashboard.scss";
import Banner from './Banner';
import Project from './Project';
import Language from './Language';
import Blog from './Blog';
import Footer from './Footer';
const Dashboard = () => {
  return (
    <div className="dashboard_component">
    <Banner/>
    <Project/>
    <Language/>
    <Blog/>
    <Footer/>
    </div>
  );
};

export default Dashboard;
