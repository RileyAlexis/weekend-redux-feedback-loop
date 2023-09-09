import { useState , useEffect} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

//Material UI
import { DataGrid, GridRowsProp, GridColDef, GridCellParams} from '@mui/x-data-grid';
import { Button, MenuItem, Select } from "@mui/material";
import { DeleteIcon } from '@mui/icons-material'

function Admin () {

  const [dataSet, setDataSet] = useState([]);
  const [rowID, setRowID] = useState(0);

  const fetchData = () => {
    axios.get('/reflect')
    .then((response) => {
      setDataSet(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const setFlag = (id) => {
    axios.put(`/reflect/flag/${id}`)
    .then((response) => {
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    })
  }


  useEffect(() => {
    fetchData();
  }, []);


    const rows: GridRowsProp = dataSet;
      
      const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', wduth: 40},
        { field: 'feeling', headerName: 'Feeling', width: 100, editable: false },
        { field: 'understanding', headerName: 'Understanding', width: 100, editable: false },
        { field: 'support', headerName: 'Supported', width:100, editable: false },
        { field: 'comments', headerName: 'Comments', width: 150, editable: false},
        { field: 'date', headerName: 'Date', width: 150, editable: false},
        { field: 'flagged', headerName: 'Flagged', width: 100, editable: true,
                renderCell: (params) => (
                  <Select 
                    value={params.row.flagged}
                    onChange={(e) => {
                      params.row.flagged = !params.row.flagged;
                      console.log(e.target.value, params.id);
                      setFlag(params.id);
                      
                      
                    }}>
                      <MenuItem value={true}>True</MenuItem>
                      <MenuItem value={false}>False</MenuItem>
                      </Select>
                ),
             },
      ];

    return (
        <div style={{ height: 300, width: '100%' }}>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          checkboxSelection={true} 
          getRowId={rowID}
          pageSize={15}
          autoHeight={true}
          

          
          />
      </div>
    );
}

export default Admin;