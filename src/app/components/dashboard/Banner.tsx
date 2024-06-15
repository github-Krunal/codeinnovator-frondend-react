import Button from '@mui/material/Button';
import bannerImage from '../../../assets/images/banner_Image.jpg'
import DeleteIcon from '@mui/icons-material/Delete';
const Banner=()=>{
    return (
        <div className='container-fluid position-relative text-white'>
            <div className='w-100 h-100 overflow-x-hidden position-relative'>

            <img src={bannerImage} alt="" style={{width:"100%",height:"60vh",objectFit:"cover"}}/>
            <div className=' position-absolute top-0  h-100' style={{width:"100%",background:"#1f2b43b8"}}></div>
            </div>
            <div className='container'>
            <div className='position-absolute ' style={{top:"15vh",left:"20%"}}>
                <p className='display-3 fw-medium'>Learn to Code</p>
                <p className='h6 w-75 lh-lg mb-3'>Business, Technology and Creative Skills taught by industry experts. Explore a wide range of skills with our professional tutorials.</p>
                <Button variant="contained" startIcon={<DeleteIcon />}>Download Resume</Button>
            </div>
            </div>
        </div>
    )
}
export default Banner;