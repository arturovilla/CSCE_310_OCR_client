import React ,{useState,useEffect}from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";
import { Button} from "@material-ui/core";
import {
  GridToolbarContainer,
} from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';

//
const columns = [
    {field: 'catid', headerName: 'catid'},
    {field: 'category_name', headerName: 'category_name'}
]

//
function Etcategory() {
    const [tabledata,setTableData] = useState([])
    const navigate = useNavigate();
    const handleEdit = () => {
      navigate('/category');
    };
    function EditToolbar(props) {
      return (
        <GridToolbarContainer>
          <Button color="primary" startIcon={<EditIcon />} onClick={handleEdit}>
            Edit
          </Button>
        </GridToolbarContainer>
      );
    }
    //re-fetches on every page reload
    useEffect(() => {
        fetch("http://localhost:3001/CategoryDML")
        .then((data) => data.json())
        .then((data) => setTableData(data))
        console.log(tabledata);
    },[])
    //
    return (
        <div>
            <h2>Category</h2>
            <div style={{height: 700, width:"100%"}}>
                <DataGrid 
                    rows={tabledata}
                    columns={columns}
                    pageSize={10}
                    getRowId ={(tabledata) => tabledata.catid}
                    components={{
                        Toolbar: EditToolbar,
                      }}
                />
            </div>
        </div>
    )
}

export default Etcategory