import { Button, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIConstant } from "../../../constant/api.constant";
import { ImageContant } from "../../../constant/image.constant";
import { PlannerModel } from "../../../model/planner.model";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { ContainerModel } from "../../../model/container.model";
import { TasksModel } from "../../../model/tasks.model";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const PlannerDetail = () => {
  let { id } = useParams();
  const [plannerList, setPlannerList] = useState<ContainerModel[]>([]);
  const [containerID, setContainerID] = useState<string>("");
  const [plan, setPlan] = useState<PlannerModel>();
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteContainerID, setDeleteContainerID] = useState<string>("");

  useEffect(() => {
    getPlanDetail();
    getContainerList();
  }, []);

  async function getContainerList() {
    let response = await fetch(APIConstant.GET_PLAN_CONTAINER + `/${id}`);
    let containers = await response.json();
    if (containers && containers.length > 0) {
      setPlannerList(containers);
      await getTaskList();
    } else {
      setPlannerList([]);
    }
  }

  async function getTaskList() {
    let response = await fetch(APIConstant.GET_TASK_CONTAINER + `/${id}`);
    let data: TasksModel[] = await response.json();
    if (data && data.length > 0) {
      setPlannerList((oldOption) => {
        const containerList = [...oldOption];
        containerList.forEach((container) => {
          let containerTasks = data.filter(
            (tsk) => tsk.ContainerID === container._id
          );
          if (containerTasks && containerTasks.length > 0) {
            container.Tasks = [...containerTasks];
          }
        });
        return containerList;
      });
    }
  }

  async function getPlanDetail() {
    let response = await fetch(APIConstant.GET_SINGLE_PLAN + `/${id}`);
    let data = await response.json();
    if (data && data.length > 0) {
      setPlan(data[0]);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenTask = (id?: string) => {
    if (id) {
      setContainerID(id);
    }
    setOpenTask(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
  };

  function deleteContainerHandler(container: ContainerModel) {
    if (container && container._id) {
      setDeleteContainerID(container._id);
      setOpenDelete(true);
    }
  }

  function handleCloseDelete() {
    setOpenDelete(false);
  }

  function handleDeleteOK() {
    handleCloseDelete();
    fetch(APIConstant.DELETE_CONTAINER + "/" + deleteContainerID, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) =>
        setPlannerList((oldOption) => {
          const containerList = [...oldOption];
          return containerList.filter((cnt) => cnt._id !== deleteContainerID);
        })
      );

    setDeleteContainerID("");
  }

  const onDragEnd = (result: any) => {
    debugger;
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // Move task between columns
      const sourceColumn = plannerList.find(
        (column) => column._id === source.droppableId
      );
      const destColumn = plannerList.find(
        (column) => column._id === destination.droppableId
      );

      const removed: any =
        sourceColumn && sourceColumn.Tasks.splice(source.index, 1);
      destColumn && destColumn.Tasks.splice(destination.index, 0, ...removed);
      console.log(destColumn);
    } else {
      // Reorder tasks within the same column
      const column = plannerList.find(
        (column) => column._id === source.droppableId
      );
      const removed: any = column?.Tasks.splice(source.index, 1);
      if (column) {
        if (removed) {
          column.Tasks.splice(destination.index, 0, ...removed);
        }
      }
    }

    setPlannerList([...plannerList]);
  };

  return (
    <div>
      <h5 className="ms-4 my-2">{plan?.Title}</h5>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const containerName = formJson.container;
            let container: ContainerModel = new ContainerModel();
            container.Name = containerName;
            container.PlanID = plan?._id;
            handleClose();
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="m-4 my-0 d-flex gap-2">
          {plannerList && plannerList.length > 0
            ? plannerList.map((plan) => (
                <Droppable
                  droppableId={plan._id ? plan._id : ""}
                  key={plan._id}
                >
                  {(provided: any) => (
                    <div
                      style={{ width: "275px" }}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div
                        className="p-2 my-3 d-flex justify-content-between"
                        style={{
                          background: "rgb(166 156 156 / 31%)",
                          boxShadow: "0px 6px 5px #a9a6a6",
                        }}
                      >
                        <div> {plan.Name}</div>
                        <div>
                          <Dialog
                            fullScreen={fullScreen}
                            open={openDelete}
                            onClose={handleCloseDelete}
                            aria-labelledby="responsive-dialog-title"
                          >
                            <DialogTitle id="responsive-dialog-title">
                              {"Are you sure want to perform delete action?"}
                            </DialogTitle>
                            <DialogActions>
                              <Button autoFocus onClick={handleCloseDelete}>
                                Cancel
                              </Button>
                              <Button onClick={handleDeleteOK} autoFocus>
                                Ok
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <DeleteOutlineIcon
                            onClick={() => deleteContainerHandler(plan)}
                          />
                        </div>
                      </div>
                      <ul
                        className="list-unstyled p-1 m-0"
                        style={{
                          minHeight: "5vh",
                          maxHeight: "78vh",
                          overflow: "overlay",
                          boxShadow: "0px 0px 10px grey",
                        }}
                      >
                        {plan.Tasks && plan.Tasks.length > 0
                          ? plan.Tasks.map((task: TasksModel, index) => (
                              <Draggable
                                key={task._id}
                                draggableId={task._id ? task._id : "33"}
                                index={index}
                              >
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div
                                      style={{
                                        boxShadow:
                                          "rgba(128, 128, 128, 0.82) 0px 0px 10px",
                                        margin: "10px",
                                        padding: "10px",
                                        fontSize: "14px",
                                        lineHeight: "18px",
                                      }}
                                    >
                                      <span className="badge rounded-pill text-bg-primary me-2">
                                        Tsk-1474
                                      </span>
                                      {task.TaskName}
                                      <div className="d-flex justify-content-between align-items-center">
                                        <img
                                          src={ImageContant.GirlImage}
                                          className="rounded-circle"
                                          alt=""
                                          style={{
                                            width: "40px",
                                            height: "40px",
                                            objectFit: "cover",
                                          }}
                                        />
                                        <div>21/2/1994</div>
                                      </div>
                                    </div>
                                  </li>
                                )}
                              </Draggable>
                            ))
                          : ""}
                        {provided.placeholder}
                      </ul>
                      <Dialog
                        open={openTask}
                        onClose={handleCloseTask}
                        PaperProps={{
                          component: "form",
                          onSubmit: (
                            event: React.FormEvent<HTMLFormElement>
                          ) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                              (formData as any).entries()
                            );
                            const taskName = formJson.task;
                            let task: TasksModel = new TasksModel();
                            task.TaskName = taskName;
                            task.PlanID = id;
                            task.ContainerID = containerID;
                            handleCloseTask();
                            fetch(APIConstant.ADD_TASK, {
                              method: "POST",
                              body: JSON.stringify(task),
                              headers: {
                                "Content-type":
                                  "application/json; charset=UTF-8",
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
                      <div className="text-center">
                        <Button
                          variant="text"
                          startIcon={<AddIcon />}
                          onClick={() => handleClickOpenTask(plan._id)}
                        >
                          Task
                        </Button>
                      </div>
                    </div>
                  )}
                </Droppable>
              ))
            : "No container Found"}
          <div className="my-4">
            <a className="btn btn-primary" onClick={handleClickOpen}>
              + Container
            </a>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default PlannerDetail;
