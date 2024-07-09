import { maxHeight } from "@mui/system";
import { ImageContant } from "../../../constant/image.constant";

const PlannerDetail = () => {
  return (
    <div className="ps-4 pe-4 py-3  h-100">
      <div>
        <h5>Plan Name</h5>
      </div>
      <div className="d-flex flex-row flex-nowrap gap-4 p-2" style={{overflowX:"auto"}}>
        <div 
          style={{
            minHeight:"10vh",
            maxHeight: "78vh",
            boxShadow: "0px 0px 9px #808080d1",
            overflowX:"hidden",
            overflowY:'auto',
            minWidth:"275px",
            maxWidth:"275px"
          }}
        >
          <div
            style={{ borderBottom: "1px solid #808080d1", fontSize: "15px",padding:"10px" }}
          >
            Unplanned Task
          </div>
          <div
            style={{
              boxShadow: "rgba(128, 128, 128, 0.82) 0px 0px 9px",
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
          <div
            style={{
              boxShadow: "rgba(128, 128, 128, 0.82) 0px 0px 9px",
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
          <div
            style={{
              boxShadow: "rgba(128, 128, 128, 0.82) 0px 0px 9px",
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
          <div
            style={{
              boxShadow: "rgba(128, 128, 128, 0.82) 0px 0px 9px",
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
       
        </div>
        <div 
          style={{
            minHeight:"10vh",
            maxHeight: "78vh",
            boxShadow: "0px 0px 9px #808080d1",
            overflowX:"hidden",
            overflowY:'auto',
            minWidth:"275px",
            maxWidth:"275px"
          }}
        > <div
        style={{ borderBottom: "1px solid #808080d1", fontSize: "15px",padding:"10px" }}
      >
        Unplanned Task
      </div>
     
       
        </div>
     
      </div>
    </div>
  );
};
export default PlannerDetail;
