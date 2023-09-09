import { useState , useEffect} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import axios from "axios";
import swal from 'sweetalert';

//Material UI
import { DataGrid, GridRowsProp, GridColDef, GridCellParams} from '@mui/x-data-grid';
import { Button, MenuItem, Select } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";

function Admin () {

  const [dataSet, setDataSet] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
 const history = useHistory();
 const dispatch = useDispatch();

  const fetchData = () => {
    axios.get('/reflect')
    .then((response) => {
      setDataSet(response.data);
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

  const handleSelctionChange = (newSelection) => {
    setSelectionModel(newSelection)
  }

  const handleDelete = () => {
    swal({
      title: `Delete ${selectionModel.length} Rows?`,
      text: 'Are you sure?',
      icon: "warning",
      buttons: true,
      dangerMode: true
      })
      .then((value) => {
          if (value) {
          axios.delete(`/reflect/rows/`, {data: selectionModel})
          .then((response) => {
              fetchData();
          }).catch((error) => {
              console.log(error);
          })
      }
  }
      )
    console.log(selectionModel);
  }

  const home = () => {
    dispatch({type: 'SET_ACTIVE_STEP', payload: 0})
    history.push('/');
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
        <div style={{ height: 550, width: '100%' }}>


        <DataGrid 
          rows={rows} 
          columns={columns} 
          checkboxSelection={true} 
          pageSize={25}
          onRowSelectionModelChange={handleSelctionChange}
          selectionModel={selectionModel}
          
          />
          <Button variant="outlined" disabled={selectionModel.length === 0} onClick={() => handleDelete()}><GridDeleteIcon /></Button>
          <Button variant="outlined" onClick={home}>Home</Button>
      </div>
    );
}

export default Admin;