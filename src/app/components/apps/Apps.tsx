import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIConstant } from "../../constant/api.constant";
import { ImageContant } from "../../constant/image.constant";
import { AppsModel } from "../../model/apps.model";
import "./App.scss";

const Apps = () => {
  const [apps, setApps] = useState<AppsModel[]>([]);

  useEffect(() => {
    fetch(APIConstant.getAllApps)
      .then((response) => response.json())
      .then((json) => setApps(json));
  }, []);
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <div className="w-50  ">
        <div className=" my-4 text-center">
          <div className="h5">Recently Added</div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
            eius!
          </p>
        </div>
        <div className="grid-container">
          {
            apps&&apps.length>0?apps.map((app)=>(
              <div className="d-flex my-3 w-50">
              <div className="rounded-circle">
                <img
                  src={app.ImageURL}
                  alt=""
                  className="rounded-circle"
                />
              </div>
              <div className="ps-3">
                <div className="h6 m-0"><Link to={`/${app.RouteURL}`}>{app.Name}</Link></div>
                <div>
                 {app.Description}
                </div>
            </div>
          </div>
            )):"No Record Found"
          }
        </div>
      </div>
    </div>
  );
};

export default Apps;
