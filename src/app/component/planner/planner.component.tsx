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
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from "react-bootstrap/esm/Form";
import Autocomplete from '@mui/material/Autocomplete';
import { Formik } from 'formik';
import { DeleteModel } from "../../model/delete.model";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const top100Films = [
  { label: 'Krunal Kumbhare', year: 1994 },
 
];
const CustomIcon = styled(CalendarTodayIcon)({
  fontSize: 40, // Change this to your desired size
});
const Planner = () => {
  const [open, setOpen] = React.useState(false);
  const [plannerList, setPlannerList] = useState<PlannerModel[]>([]);
  const [show, setShow] = useState(false);
  const [autoinputValue, setAutoInputValue] = React.useState('');
  const [reload,setReload]=useState(true);
  const [dateValue, setDateValue] = React.useState<any>();


  const handleCloses = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getPlans();
  }, [!reload]);

  useEffect(() => {
    getPlans();
  }, [!show]);

  async function getPlans() {
    fetch(APIConstant.GET_PLANNER)
      .then((response) => response.json())
      .then((json) => setPlannerList(json));
  }
  function onplanDelete(plan:PlannerModel){
    setReload(false)
    let deleteModel:DeleteModel=new DeleteModel();
    deleteModel.RepositoryName='planners';
    deleteModel._id=plan._id
    fetch(APIConstant.DELETE_RECORD, {
      method: "POST",
      body: JSON.stringify(deleteModel),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setReload(true));
  }
  const getCurrentDateUTC = (date:any) => {
    if(date){
      let newDate=new Date(date)
    // Get the local time zone offset in minutes and convert it to milliseconds
    const offsetInMs = newDate.getTimezoneOffset() * 60 * 1000;
  
    // Adjust the UTC date to the local date by adding the offset
    const localDate = new Date(newDate.getTime() - offsetInMs);
  
    return `${localDate.getDate()}/${localDate.getMonth()}/${localDate.getFullYear()}`
    }
return ""
  };

  return (
    <div>
      <div className="text-end">
        <a className="btn btn-primary" onClick={handleShow}>+ Planner</a>
      </div>
      <Offcanvas show={show} onHide={handleCloses} placement={'end'} style={{width:'40%'}}>
      <Formik
       initialValues={{ Title: '', Description: '',PlanOwner:'' }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
          values.PlanOwner=autoinputValue
          let plan: PlannerModel = new PlannerModel();
          plan.Title = values.Title;
          plan.Description = values.Description;
          plan.PlanOwner=values.PlanOwner;
          plan.EndDate=dateValue
          fetch(APIConstant.CREATE_PLANNER, {
            method: "POST",
            body: JSON.stringify(plan),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
           handleCloses()
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
      <form onSubmit={handleSubmit}>
        <Offcanvas.Header  className="border-bottom border-secondary">
          <Offcanvas.Title>
            <div className="d-flex gap-2 ">
          <button className="btn btn-primary" type="submit">Save</button>
          <a className="btn btn-primary" onClick={handleCloses}>Close</a>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="mb-0" >Plan Name</Form.Label>
        <Form.Control type="text"  name="Title"onChange={handleChange}
             onBlur={handleBlur} placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="mb-0" >Description</Form.Label>
        <Form.Control as="textarea" name="Description" rows={3} onChange={handleChange}
             onBlur={handleBlur}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
         <Form.Label className="mb-0">Owner</Form.Label>
         <Autocomplete
      disablePortal
      id="combo-box-demo"
      size="small"
      options={top100Films}
      onInputChange={(event, newInputValue) => {
        setAutoInputValue(newInputValue);
      }}
      sx={{
        // border: "1px solid blue",
        "& .MuiOutlinedInput-root": {
            // border: "1px solid yellow",
            borderRadius: "30",
            padding: "0"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "1px solid"
        },
    }}
      renderInput={(params) => <TextField {...params}  />}
    />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
         <Form.Label className="mb-0">Date</Form.Label>
         <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}   >
      <DemoContainer components={['DatePicker']} >
        <DatePicker onChange={(newValue) => setDateValue(newValue)}   slotProps={{ textField: { size: 'small' } }} sx={{
        // border: "1px solid blue",
        "& .MuiOutlinedInput-root": {
            // border: "1px solid yellow",
            borderRadius: "30",
            padding: "0"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "1px solid"
        },
        "& .MuiIconButton-root svg": {
            width:30,
            marginRight:1
        },
        width:'100%',
        overflow:'hidden',

    }} className='p-0'/>
      </DemoContainer>
    </LocalizationProvider>
    </div>
    </Form.Group>
        </Offcanvas.Body>
        </form>
           )}
           </Formik>
      </Offcanvas>


      <div className="row mt-2">
        {
          plannerList&&plannerList.length>0?  
          plannerList.map((plan)=>(
          <div className="col-md-3 mb-3" key={plan._id}>
          <div className="card p-3 shadow-sm">
            <div className="d-flex justify-content-between">
            <Link to={plan._id?plan._id:""} className="text-decoration-none text-black"><h6 >{plan.Title}</h6></Link>
                <div className="gap-2 d-flex">
                <i className="fa fa-pencil" aria-hidden="true"></i>
                <i className="fa fa-trash-o" aria-hidden="true" onClick={()=>onplanDelete(plan)}></i>
                </div>
            </div>
            <p style={{height:'30px'}}>
            {plan.Description}
            </p>
            <div>
              <span className="badge rounded-pill text-bg-primary">
                Plan End Date: <span>{getCurrentDateUTC(plan.EndDate)}</span>
              </span>
              <span className="badge rounded-pill text-bg-primary ms-2">
                Todays Pending: 50
              </span>
              <div className="mt-2 d-flex justify-content-between align-items-center">
                Owner: {plan.PlanOwner}
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
          )):'No Record Found'
        }
        
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
