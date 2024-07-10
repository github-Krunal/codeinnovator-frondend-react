import { Button, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIConstant } from "../../../constant/api.constant";
import { ImageContant } from "../../../constant/image.constant";
import { PlannerModel } from "../../../model/planner.model";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { ContainerModel } from "../../../model/container.model";
import { TasksModel } from "../../../model/tasks.model";

const PlannerDetail = () => {
  let { id } = useParams();
  const [plannerList,setPlannerList]=useState<ContainerModel[]>([])
  const [containerID,setContainerID]=useState<string>('')
  const [plan,setPlan]=useState<PlannerModel>();
  const [open, setOpen] =useState(false);
  const [openTask, setOpenTask] =useState<boolean>(false);

  useEffect(()=>{
    getPlanDetail();
    getContainerList()
  },[])
  async function getContainerList(){
    let response=await fetch(APIConstant.GET_PLAN_CONTAINER+`/${id}`)
    let containers= await response.json();
    if(containers&&containers.length>0){
      setPlannerList(containers)
      await getTaskList()
    }else{
      setPlannerList([])
    }
  }
  async function getTaskList(){
    let response=await fetch(APIConstant.GET_TASK_CONTAINER+`/${id}`)
    let data:TasksModel[]= await response.json();
    if(data&&data.length>0){
      setPlannerList(oldOption => {
        const containerList = [...oldOption];
        containerList.forEach(container=>{
          let containerTasks=data.filter(tsk=>tsk.ContainerID===container._id);
          if(containerTasks&&containerTasks.length>0){
            container.Tasks=[...containerTasks]
          }
        })
        return containerList;
      })
    }
  }

  async function getPlanDetail(){
    let response=await fetch(APIConstant.GET_SINGLE_PLAN+`/${id}`)
    let data= await response.json();
    if(data&&data.length>0){
      setPlan(data[0])
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenTask = (id?:string) => {
    if(id){
      setContainerID(id)
    }
    setOpenTask(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseTask = () => {
    setOpenTask(false);
  };

  return (
    <div>
      <h5 className="ms-4 my-2">{plan?.Title}</h5>
      <div className="text-end">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
          container
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
            const containerName = formJson.container;
            let container:ContainerModel=new ContainerModel();
            container.Name=containerName;
            container.PlanID=plan?._id
            handleClose()
            fetch(APIConstant.CREATE_CONTAINER, {
              method: "POST",
              body: JSON.stringify(container),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => response.json())
              .then((json) => getContainerList());
          },
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="container"
            name="container"
            label="Container Name"
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
    <div className="m-4 my-0 d-flex gap-2">
      {
        plannerList&&plannerList.length>0?
        plannerList.map((plan)=>(
          <div style={{width:'275px'}} key={plan._id}>
          <div className="p-2" style={{borderBottom:"1px solid",boxShadow:"0px 0px 10px grey"}}> {plan.Name}</div>
             <ul className="list-unstyled p-1" style={{minHeight:"5vh",maxHeight:"78vh",overflow:"overlay",boxShadow:"0px 0px 10px grey"}}>
              {
                 plan.Tasks&& plan.Tasks.length>0?
                plan.Tasks.map((task:any)=>(
                  <li key={task._id}>
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

             <Dialog
        open={openTask}
        onClose={handleCloseTask}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const taskName = formJson.task;
            let task:TasksModel=new TasksModel();
            task.TaskName=taskName;
            task.PlanID=id;
            task.ContainerID=containerID;
            handleCloseTask()
            fetch(APIConstant.ADD_TASK, {
              method: "POST",
              body: JSON.stringify(task),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => response.json())
              .then((json) => getTaskList());
          },
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Task"
            name="task"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
          />
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTask}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
             <Button variant="outlined" startIcon={<AddIcon />} onClick={()=>handleClickOpenTask(plan._id)}>
          Task
        </Button>
         </div>

        ))
        :"No container Found"
        }
    </div>
    </div>
  );
};
export default PlannerDetail;
