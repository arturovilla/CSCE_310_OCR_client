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
    {field: 'sid', headerName: 'sid'},
    {field: 'name', headerName: 'name'},
    {field: 'phone', headerName: 'phone'},
    {field: 'address', headerName: 'address'},
    {field: 'zip_code', headerName: 'zip_code'},
    {field: 'country', headerName: 'country'},
    {field: 'website', headerName: 'website'}
]

//
function Etsuppliers() {
    const [tabledata,setTableData] = useState([])
    //re-fetches on every page reload
    const navigate = useNavigate();
    const handleEdit = () => {
      navigate('/supplier');
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
    useEffect(() => {
        fetch("http://localhost:3001/SupplierDML")
        .then((data) => data.json())
        .then((data) => setTableData(data))
    },[])
    //
    return (
        <div>
            <h2>Suppliers</h2>
            <div style={{height: 700, width:"100%"}}>
                <DataGrid 
                    rows={tabledata}
                    columns={columns}
                    pageSize={10}
                    getRowId ={(tabledata) => tabledata.sid}
                    components={{
                        Toolbar: EditToolbar,
                      }}
                />
            </div>
        </div>
    )
}

export default Etsuppliers