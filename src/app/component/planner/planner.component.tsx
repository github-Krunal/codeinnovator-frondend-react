import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ImageContant } from "../../constant/image.constant";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import React, { useEffect, useState } from "react";
import { APIConstant } from "../../constant/api.constant";
import { PlannerModel } from "../../model/planner.model";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";

const Planner = () => {
  const [open, setOpen] = React.useState(false);
  const [plannerList, setPlannerList] = useState<PlannerModel[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getPlans();
  }, [!open]);

  async function getPlans() {
    fetch(APIConstant.GET_PLANNER)
      .then((response) => response.json())
      .then((json) => setPlannerList(json));
  }

  return (
    <div>
      <div className="text-end">
      
        <a className="btn btn-primary">+ Planner</a>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const planName = formJson.Plan;
            const description = formJson.desc;
            let plan: PlannerModel = new PlannerModel();
            plan.Title = planName;
            plan.Description = description;
            handleClose();
            fetch(APIConstant.CREATE_PLANNER, {
              method: "POST",
              body: JSON.stringify(plan),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => response.json())
              .then((json) => console.log(json));
          },
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="Plan"
            label="Plan Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="desc"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>

      <div className="row mt-2">
        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow-sm">
            <div className="d-flex justify-content-between">
                <h6>Planner</h6>
                <div className="gap-2 d-flex">
                <i className="fa fa-pencil" aria-hidden="true"></i>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
                </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              reiciendis.
            </p>
            <div>
              <span className="badge rounded-pill text-bg-primary">
                Plan End Date: 12/4/2027
              </span>
              <span className="badge rounded-pill text-bg-primary ms-2">
                Todays Pending: 50
              </span>
              <div className="mt-2 d-flex justify-content-between align-items-center">
                Owner: Krunal Kumbhare
              <AvatarGroup>
                <Avatar
                  alt="Remy Sharp"
                  src={ImageContant.GirlImage}
                  sx={{ width: 24, height: 24, fontSize: "10px" }}
                />
                <Avatar
                  alt="Travis Howard"
                  src={ImageContant.GirlImage}
                  sx={{ width: 24, height: 24, fontSize: "10px" }}
                />
                <Avatar
                  alt="Cindy Baker"
                  src={ImageContant.GirlImage}
                  sx={{ width: 24, height: 24, fontSize: "10px" }}
                />
                <Avatar
                  alt="Agnes Walker"
                  src={ImageContant.GirlImage}
                  sx={{ width: 24, height: 24, fontSize: "10px" }}
                />
                <Avatar
                  alt="Trevor Henderson"
                  src={ImageContant.GirlImage}
                  sx={{ width: 24, height: 24, fontSize: "10px" }}
                />
              </AvatarGroup>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {
        plannerList&&plannerList.length>0?  
        <div className="d-flex gap-3">{
        plannerList.map((plan)=>(
          <div className="card" key={plan._id}>
          <div className="d-flex justify-content-center">
            <div className="logo rounded-circle">
              <img
                src={ImageContant.GirlImage}
                alt=""
                className="w-100 h-100 rounded-circle"
              />
            </div>
          </div>
          <p className="h5">
            <Link to={plan._id?plan._id:""}>{plan.Title}</Link>
          </p>
          <p className="subtitle">{plan.Description}</p>
        </div>
        ))
      }
        </div>
       :'No Record Found'
      } */}
    </div>
  );
};
export default Planner;
