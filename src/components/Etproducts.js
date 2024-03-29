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
    {field: 'pid', headerName: 'pid'},
    {field: 'description', headerName: 'description'},
    {field: 'cost', headerName: 'cost'},
    {field: 'color', headerName: 'color'},
    {field: 'catid', headerName: 'catid'},
    {field: 'sid', headerName: 'sid'},
    {field: 'name', headerName: 'name'},
    {field: 'url', headerName: 'url'},
    {field: 'size', headerName: 'size'},
    {field: 'quantity', headerName: 'quantity'}
]
//
function Etproducts() {
    const [tabledata,setTableData] = useState([])
    //re-fetches on every page reload
    const navigate = useNavigate();
    const handleEdit = () => {
      navigate('/product');
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
        fetch("http://localhost:3001/ProductDML")
        .then((data) => data.json())
        .then((data) => setTableData(data))
    },[])
    return (
        <div>
            <h2>Products</h2>
            <div style={{height: 700, width:"100%"}}>
                <DataGrid 
                    rows={tabledata}
                    columns={columns}
                    pageSize={10}
                    getRowId ={(tabledata) => tabledata.pid}
                    components={{
                        Toolbar: EditToolbar,
                      }}
                />
            </div>
        </div>
    )
}

export default Etproducts