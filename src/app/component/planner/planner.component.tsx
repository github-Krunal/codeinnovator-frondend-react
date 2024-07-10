import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ImageContant } from "../../constant/image.constant";
import AddIcon from "@mui/icons-material/Add";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { useEffect, useState } from "react";
import { APIConstant } from "../../constant/api.constant";
import { PlannerModel } from "../../model/planner.model";
const Planner = () => {
  const [open, setOpen] = React.useState(false);
  const [plannerList, setPlannerList] = useState<PlannerModel[]>([]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    getPlans()
  },[!open])
  
  async function getPlans(){
    fetch(APIConstant.GET_PLANNER)
      .then((response) => response.json())
      .then((json) =>setPlannerList(json));
  }

  return (
    <div className="container mt-5">
      <div className="text-end">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Planner
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const planName = formJson.Plan;
            const description = formJson.desc;
            let plan:PlannerModel=new PlannerModel();
            plan.Title=planName;
            plan.Description=description;
            handleClose()
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

      {
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
      }
    
    </div>
  );
};
export default Planner;
