import React ,{useState,useEffect}from 'react'
import { DataGrid } from '@mui/x-data-grid';
//
const columns = [
    {field: 'name', headerName: 'name'},
    {field: 'phone', headerName: 'phone'},
    {field: 'password', headerName: 'password'},
    {field: 'zip_code', headerName: 'zip_code'},
    {field: 'address', headerName: 'address'},
    {field: 'payment_type', headerName: 'payment_type'},
    {field: 'payment_info', headerName: 'payment_info'},
    {field: 'email', headerName: 'email'},
    {field: 'admin', headerName: 'admin'},
    {field: 'cid', headerName: 'cid'}
]
//

function Etcustomers() {
    const [tabledata,setTableData] = useState([])
    //re-fetches on every page reload
    useEffect(() => {
        fetch("http://localhost:3001/customer")
        .then((data) => data.json())
        .then((data) => setTableData(data))
    },[])
  return (
    <div>
        <h2>Customers</h2>
        <div style={{height: 700, width:"100%"}}>
            <DataGrid 
                rows={tabledata}
                columns={columns}
                pageSize={10}
                getRowId ={(tabledata) => tabledata.cid}
            />
        </div>
    </div>
  )
}

export default Etcustomers