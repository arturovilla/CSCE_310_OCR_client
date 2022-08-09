import React ,{useState,useEffect}from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";
import { Button} from "@material-ui/core";
import {
  GridToolbarContainer,
} from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
//

const columns = [
  {field: 'deliveryStatus', headerName: 'deliveryStatus'},
  {field: 'order date', headerName: 'order date'},
  {field: 'quantity', headerName: 'quantity'},
  {field: 'coid', headerName: 'coid'},
  {field: 'pid', headerName: 'pid'},
  {field: 'cid', headerName: 'cid'},
  {field: 'orderid', headerName: 'orderid'}
]

//
function Etorders() {

  const [tabledata,setTableData] = useState([])
  //re-fetches on every page reload
  const navigate = useNavigate();
    const handleEdit = () => {
      navigate('/order');
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
    fetch("http://localhost:3001/OrderDML")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  },[])
  return (
    <div>
        <h2>Orders</h2>
        <div style={{height: 700, width:"100%"}}>
          <DataGrid 
            rows={tabledata}
            columns={columns}
            pageSize={10}
            getRowId ={(tabledata) => tabledata.orderid}
            components={{
              Toolbar: EditToolbar,
            }}
          />
        </div>
    </div>
  )
}

export default Etorders