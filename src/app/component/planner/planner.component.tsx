import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ImageContant } from "../../constant/image.constant";
import AddIcon from "@mui/icons-material/Add";
const Planner = () => {
  return (
    <div className="container mt-5">
      <div className="text-end">
        <Button variant="outlined" startIcon={<AddIcon />}>
          Planner
        </Button>
      </div>
      <div className="card ">
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
          <Link to={"44"}>Task Management</Link>
        </p>
        <p className="subtitle">Manage your task with different users</p>
      </div>
    </div>
  );
};
export default Planner;
