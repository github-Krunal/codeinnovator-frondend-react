import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { APIConstant } from '../../constant/api.constant';
import { RepositoryModel } from '../../model/repository.model';
import { useNavigate } from 'react-router-dom';
const CreateRepository=()=>{
    const navigate = useNavigate();
    const repositoryForm=useRef(null);
    function submitRepository() {
      const form: any = repositoryForm.current;
      if (form) {
        if (
          (form["Name"] && form["Name"].value) ||
          (form["Description"] && form["Description"].value)
        ) {
            let repository:RepositoryModel=new RepositoryModel()
            repository.Name=form["Name"].value
            repository.Description=form["Description"].value
            saveRepository(repository);
        }
        form["Name"].value = "";
        form["Description"].value = "";
      }
    }
    function saveRepository(repository:RepositoryModel){
        fetch(APIConstant.ADD_REPOSITORY, {
            method: "POST",
            body: JSON.stringify(repository),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => navigate('/repository'));
    }
    return(
        <div>
             <form ref={repositoryForm}>
            <TextField id="outlined-basic" label="Name" name="Name" variant="outlined" className='w-100 '/>
            <TextField id="outlined-basic" label="Description" name="Description" variant="outlined"  className='w-100 mt-4' />
            </form>
            <div className='text-end mt-4'>
            <Button variant="outlined" onClick={submitRepository}>+ Submit</Button>
            </div>
        </div>
    )
}

export default CreateRepository;