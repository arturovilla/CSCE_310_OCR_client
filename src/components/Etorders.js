import React ,{useState,useEffect}from 'react'
import { DataGrid } from '@mui/x-data-grid';
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
  useEffect(() => {
    fetch("http://localhost:3001/OrderDML")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  })
  return (
    <div>
        <h2>Orders</h2>
        <div style={{height: 700, width:"100%"}}>
          <DataGrid 
            rows={tabledata}
            columns={columns}
            pageSize={10}
            getRowId ={(tabledata) => tabledata.orderid}
          />
        </div>
    </div>
  )
}

export default Etorders