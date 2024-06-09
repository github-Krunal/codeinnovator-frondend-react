import "./ProjectList.component.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { APIConstant } from "../../constant/api.constant";
import { Project } from "../../model/project.model";
import { Field, Form, Formik } from "formik";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProjectListComponent = () => {
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(0); // State to trigger refetch

  const [projectList, setProjectList] = useState<Project[]>([]);

  useEffect(() => {
    fetch(APIConstant.getAllProject)
      .then((response) => response.json())
      .then((json) => setProjectList(json))
      .catch((error) => console.error(error));
  }, [refetch]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const deleteProject=(project:Project)=>{
    fetch(APIConstant.deleteProject+`/${project._id}`, {
      method: "delete",
    });
    setRefetch(prv=>prv+1)
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <h1>Project List</h1>
      <button className="btn btn-primary" onClick={handleClickOpen}>
        + Project
      </button>
      <div className="wrapper">
        {projectList.map((project, index) => (
          <div className="card" key={index}>
            <h3 className="card-title">{project.Name}</h3>
            <p className="card-content">{project.Description}</p>
            <button className="card-btn">Details</button>
            <button className="card-btn my-2" onClick={()=>deleteProject(project)}>Delete</button>
          </div>
        ))}
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Formik
          initialValues={{ Name: "", Description: "" }}
          onSubmit={(values, { setSubmitting }) => {
            fetch(APIConstant.saveProject, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            setRefetch(prev => prev + 1); // Change the state to trigger useEffect
            setOpen(false);
          }}
        >
          {({ isSubmitting }) => (
            <div>
              <Form method="post">
                {" "}
                {/* Use the post method */}
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Project
                    </Typography>
                    <Button autoFocus color="inherit" type="submit">
                      save
                    </Button>
                  </Toolbar>
                </AppBar>
                <Field type="text" name="Name" />
                <Field type="text" name="Description" />
              </Form>
            </div>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default ProjectListComponent;
