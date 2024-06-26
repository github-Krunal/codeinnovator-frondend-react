import TextField from "@mui/material/TextField"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
const TaskProject=()=>{
    return (
        <div>
        <div className="d-flex ">
            <TextField label="Add Task" color="secondary" className="w-75 me-5" />
            <button className="btn btn-primary">+ Add Task</button>
        </div>
        <div >
             <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
        
      <ListItem  >
        <ListItemButton>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla commodi quibusdam quae molestiae doloribus omnis hic fugiat odio aspernatur excepturi." />
        </ListItemButton>
      </ListItem>
      
    </List></div>
        </div>
    )
}

export default TaskProject