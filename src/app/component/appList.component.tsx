import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageContant } from "../constant/image.constant";
import "./appList.component.scss";
const AppList = () => {
  const [applist,setApplist]=useState([{
    Name:"Planner",
    Url:'planner',
    Description:'Manage your task with different users',
    Image:ImageContant.GirlImage
  },
  {
    Name:"Repository",
    Url:'repository',
    Description:'Manage your task with different users',
    Image:ImageContant.GirlImage
  }
])
  return (
    <div className="container mt-5">
      <div className="row">
        {
          applist&&applist.map((app,index)=>(
            <div className="col-md-3 mb-4" key={index}>
             <Link to={app.Url} className="text-decoration-none">
            <div className="card1 text-black ">
            <div className="img">
              <img
                src={app.Image}
                alt=""
                className="w-100 h-100"
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="textBox">
              <div className="textContent">
                <div className="fw-bold ">{app.Name}</div>
              </div>
              <p className=" text-truncate m-0 text-black">
              {app.Description}
              </p>
              <div></div>
            </div>
          </div>
            </Link>
            </div>
          ))
        }
       
      </div>
    

      {/* <div className="card ">
        <div className="d-flex justify-content-center">
          <div className="logo rounded-circle">
            <img src={ImageContant.GirlImage} alt="" className="w-100 h-100 rounded-circle"/>
          </div>
        </div>
        <p className="h5"><Link to={'planner'}>Task Management</Link></p>
        <p className="subtitle">Manage your task with different users</p>
      </div> */}
    </div>
  );
};
export default AppList;
