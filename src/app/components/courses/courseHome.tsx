import { Outlet } from "react-router-dom"
import CourseHeader from "./courseHeader"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
const CourseHome=()=>{
    return (
        <div>
            <CourseHeader/>
            <div className="d-flex">
            <List
      sx={{
        width: '100%',
        maxWidth: 200,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        minHeight: 'calc(100vh - 64px)',
        maxHeight: 'calc(100vh - 64px)',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0, 1, 2].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
    <div className="p-3">
    <Outlet/>
    </div>
    </div>
  
        </div>
    )
}
export default CourseHome