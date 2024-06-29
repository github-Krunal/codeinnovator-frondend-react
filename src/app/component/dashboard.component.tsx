import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import AlarmOffOutlinedIcon from '@mui/icons-material/AlarmOffOutlined';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Timer from './timer';
const Dashboard = () => {
    const [hours,setHours]=useState<number>(0)
    const [minutes,setMinutes]=useState<number>(0)
    const [seconds,setSeconds]=useState<number>(0)
    const [attendenceTime,setAttendenceTime]=useState<any>('')
    const [endattendenceTime,setEattendenceTime]=useState('')
    const [isTimeRunning,setTimerRunning]=useState<boolean>(false)
    function onAttendenceHandler(){
        getTime()
    }
    useEffect(()=>{
        getTime()
    },[isTimeRunning])


    const getTime = () => {
      setInterval(() => {

      }, 1000);
    };
   
  return (
    <div className="m-4">
      <div className="container-fluid bg-body-tertiary shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="fw-bold fs-3 m-0">Welcome,</p>
            <p className="fw-bold fs-5 text-muted">Krunal Kumbhare</p>
          </div>
          <Timer/>

        
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
