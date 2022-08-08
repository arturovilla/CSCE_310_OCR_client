import React ,{useState,useEffect}from 'react'
import { DataGrid } from '@mui/x-data-grid';
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
    useEffect(() => {
        fetch("http://localhost:3001/SupplierDML")
        .then((data) => data.json())
        .then((data) => setTableData(data))
    })
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
                />
            </div>
        </div>
    )
}

export default Etsuppliers