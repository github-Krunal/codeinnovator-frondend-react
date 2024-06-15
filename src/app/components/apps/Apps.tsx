import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIConstant } from "../../constant/api.constant";
import { ImageContant } from "../../constant/image.constant";
import { AppsModel } from "../../model/apps.model";
import "./App.scss";

const Apps = () => {
const [apps,setApps]=useState<AppsModel[]>([]);

useEffect(()=>{
    fetch(APIConstant.getAllApps).then((response) => response.json())
    .then((json) => setApps(json))
},[])
  return (
    <div className="mt-3">
        {
            apps&&apps.length>0?
            apps.map((app)=>(
                <Link to={`/${app.RouteURL}`}>
                <div className="item " key={app._id}>
                <img src={app.ImageURL} className="rounded-circle"/>
                <span className="fw-bold">{app.Name}</span>
              </div>
              </Link>
            ))
           :'No Record Found'
        }
      
    </div>
  );
};

export default Apps;
