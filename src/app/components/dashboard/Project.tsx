import img1 from "../../../assets/images/projectimg1.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
const Project = () => {
  return (
     <div style={{ maxWidth: "1200px",left:"50%",transform:"translateX(-50%)" }} className="position-relative">
        <p className="h4 py-2 mt-3 text-secondary">Projects</p>
        <main>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={img1}
                alt="green iguana"
              />
              <CardContent>
                <p className="h5">Management</p>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </main>
    </div>
  );
};

export default Project;
