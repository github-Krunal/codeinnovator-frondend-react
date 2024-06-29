import React, { useState, useRef, useEffect } from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import AlarmOffOutlinedIcon from "@mui/icons-material/AlarmOffOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import { APIConstant } from "../constant/api.constant";
import { Attendence } from "../model/attendence.model";
const Timer = () => {
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 });
  const [attendence, setAttendence] = useState<Attendence[]>();
  const [isActive, setIsActive] = useState<string>("");
  const intervalRef = useRef<any>();

  function AddAttendence(date: any) {
    let addAttendences: Attendence = new Attendence();
    addAttendences.User = "1";
    addAttendences.StartTime = date;
    fetch(APIConstant.ADD_ATTENDENCE, {
      method: "POST",
      body: JSON.stringify(addAttendences),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const fetchData = async () => {
    const response = await fetch(APIConstant.GET_ATTENDENCE);
    const result = await response.json();
    setAttendence(result);
  };
  useEffect(() => {
    if (attendence) {
      processTime();
    }
  }, [attendence]);
  useEffect(() => {
    fetchData();
  }, []);

  function processTime() {
    if (attendence && attendence.length > 0) {
      let attendences = attendence[0];
      if(attendences&&attendences.EndTime){
        setIsActive("disabled");
        let startTime = attendences.StartTime?new Date(attendences.StartTime):new Date();
        let endTime = new Date(attendences.EndTime);
        const timeDifference = endTime.getTime() - startTime.getTime();
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutesDifference = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsDifference = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );
        setTime({
          hours: hoursDifference,
          minutes: minutesDifference,
          seconds: secondsDifference,
        });
      }
      else if (attendences && attendences.StartTime) {
        let startTime = new Date(attendences.StartTime);
        setIsActive("stop");
        const timeDifference = new Date().getTime() - startTime.getTime();
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutesDifference = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsDifference = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );
        setTime({
          hours: hoursDifference,
          minutes: minutesDifference,
          seconds: secondsDifference,
        });
        timeInterval();
      }
    }
  }
  const onAttendenceHandler = () => {
    setIsActive("stop");
    debugger
    AddAttendence(new Date());
    timeInterval();
  };
  function timeInterval() {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + Math.floor(seconds / 60);
        const hours = prevTime.hours + Math.floor(minutes / 60);
        return {
          seconds: seconds % 60,
          minutes: minutes % 60,
          hours: hours % 24,
        };
      });
    }, 1000);
  }
  const onResetAttendenceHandler = () => {
    clearInterval(intervalRef.current);
    setIsActive("disabled");
    updateAttendence(new Date())
  };

  function updateAttendence(date: any) {
    let updateattendence: Attendence = new Attendence();
    updateattendence.User = "1";
    if(attendence&&attendence.length>0){
      updateattendence.StartTime = attendence[0].StartTime;
    updateattendence.EndTime = date;
    fetch(APIConstant.UPDATE_ATTENDENCE+"/"+attendence[0]._id, {
      method: "POST",
      body: JSON.stringify(updateattendence),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    }

  }
  function conditionalRender() {
    if (isActive === "stop") {
      return (
        <AlarmOffOutlinedIcon onClick={() => onResetAttendenceHandler()} />
      );
    } else if (isActive === "disabled") {
      return <AlarmOnOutlinedIcon className="disabled" />;
    } else {
      return (
        <TimerOutlinedIcon
          className="pe-auto"
          onClick={() => onAttendenceHandler()}
        />
      );
    }
  }
  return (
    <div>
      <div className="d-flex text-center align-items-center">
        <div style={{ width: "60px" }}>
          <p className="m-0 fw-bold">
            {time.hours.toString().padStart(2, "0")}
          </p>
          <p className="m-0 fw-bold">HH</p>
        </div>
        <div style={{ width: "60px" }}>
          <p className="m-0 fw-bold">
            {time.minutes.toString().padStart(2, "0")}
          </p>
          <p className="m-0 fw-bold">MM</p>
        </div>
        <div style={{ width: "60px" }}>
          <p className="m-0 fw-bold">
            {time.seconds.toString().padStart(2, "0")}
          </p>
          <p className="m-0 fw-bold">Sec</p>
        </div>
        {conditionalRender()}
        <div></div>
      </div>
    </div>
  );
};

export default Timer;
