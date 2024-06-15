import img1 from "../../../assets/images/projectimg1.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const Language=()=>{
    return (
      <div style={{ maxWidth: "1200px",left:"50%",transform:"translateX(-50%)" }} className="position-relative">
        <p className="h4 py-2 mt-3 text-secondary">Language</p>
        <div className="language mb-2">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                    <div className="p-2 d-flex">
                        <img src={img1} alt=""  style={{width:"60px",height:"60px",borderRadius:"6px",objectFit:"cover"}}/>
                        <div className="ps-3 d-flex justify-content-between w-100 align-items-center">
                            <div>
                        <p className="h6 m-0">Javascript</p>
                        <p className="m-0"> 4 years ago</p></div>
                        <FavoriteBorderIcon/>
                        </div>
                    </div>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                    <div className="p-2 d-flex">
                        <img src={img1} alt=""  style={{width:"60px",height:"60px",borderRadius:"6px",objectFit:"cover"}}/>
                        <div className="ps-3 d-flex justify-content-between w-100 align-items-center">
                            <div>
                        <p className="h6 m-0">Javascript</p>
                        <p className="m-0"> 4 years ago</p></div>
                        <FavoriteBorderIcon/>
                        </div>
                    </div>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                    <div className="p-2 d-flex">
                        <img src={img1} alt=""  style={{width:"60px",height:"60px",borderRadius:"6px",objectFit:"cover"}}/>
                        <div className="ps-3 d-flex justify-content-between w-100 align-items-center">
                            <div>
                        <p className="h6 m-0">Javascript</p>
                        <p className="m-0"> 4 years ago</p></div>
                        <FavoriteBorderIcon/>
                        </div>
                    </div>
            </CardActionArea>
          </Card>
        </div>
    </div>
    )
}

export default Language