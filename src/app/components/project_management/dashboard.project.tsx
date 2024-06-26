import Card from "@mui/material/Card"

const DashboardProject=()=>{
    return (
        <div>
          <div className="h6">Task Overview</div>
          <Card variant="outlined" className="p-4">
            <div className="d-flex justify-content-between text-center">
              <div>
                <div>10</div>
                <div>Tasks</div>
              </div>
              <div>
                <div>10</div>
                <div>Completed</div>
              </div>
              <div>
                <div>10</div>
                <div>In Progress</div>
              </div>
            </div>
          </Card>
        </div>
    )
}

export default DashboardProject