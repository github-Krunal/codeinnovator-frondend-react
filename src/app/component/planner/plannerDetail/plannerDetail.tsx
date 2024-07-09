import { maxHeight } from "@mui/system";
import { useState } from "react";
import { ImageContant } from "../../../constant/image.constant";

const PlannerDetail = () => {
  const [plannerList,setPlannerList]=useState([{
    Plan:'Unplanned Task',
    Tasks:[1,2,3,4,5,6,7,8,9]
  },{
    Plan:'Unplanned Task',
    Tasks:[]
  }])
  return (
    <div>
      <h5 className="ms-4 my-2">KKK</h5>
    <div className="m-4 my-0 d-flex gap-2">
      {
        plannerList&&plannerList.length>0?
        plannerList.map((plan)=>(
          <div style={{width:'275px'}}>
          <div className="p-2" style={{borderBottom:"1px solid",boxShadow:"0px 0px 10px grey"}}> {plan.Plan}</div>
             <ul className="list-unstyled p-1" style={{minHeight:"5vh",maxHeight:"78vh",overflow:"overlay",boxShadow:"0px 0px 10px grey"}}>
              {
                 plan.Tasks&& plan.Tasks.length>0?
                plan.Tasks.map((task)=>(
                  <li>
                  <div
                   style={{
                      boxShadow: "rgba(128, 128, 128, 0.82) 0px 0px 10px",
                      margin: "10px",
                      padding: "10px",
                      fontSize: "14px",
                      lineHeight: "18px",
                    }}
                  >
                    <span className="badge rounded-pill text-bg-primary me-2">
                      Tsk-1474
                    </span>
                    Estimate your retirement needs, set savings goals, and develop a
                    retirement savings strategy to achieve financial security in
                    retirement.
                    <div className="my-2">
                      <span className="badge rounded-pill text-bg-secondary me-2">
                        Verfication
                      </span>
                      <span className="badge rounded-pill text-bg-secondary">Low</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <img src={ImageContant.GirlImage} className="rounded-circle" alt="" style={{width:"40px",height:"40px",objectFit:"cover"}}/>
                        <div>
                            21/2/1994
                        </div>
                    </div>
                  </div>
                  </li>
                )):''
              }
              
             </ul>
         </div>
        ))
      
        :""
        }
    </div>
    </div>
  );
};
export default PlannerDetail;
