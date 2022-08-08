import React ,{useState,useEffect}from 'react'
import { DataGrid } from '@mui/x-data-grid';
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
    useEffect(() => {
        fetch("http://localhost:3001/ProductDML")
        .then((data) => data.json())
        .then((data) => setTableData(data))
    })
    return (
        <div>
            <h2>Products</h2>
            <div style={{height: 700, width:"100%"}}>
                <DataGrid 
                    rows={tabledata}
                    columns={columns}
                    pageSize={10}
                    getRowId ={(tabledata) => tabledata.pid}
                />
            </div>
        </div>
    )
}

export default Etproducts