import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';
import { Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { Exercises_API } from '../constants';
import { Full_API } from '../constants';
import dayjs from "dayjs";



export default function ExerciseList() {
  const [trainings, setTrainings] = useState([]);

  const [columnDefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (trainings) => {
        return dayjs(trainings.value).format("DD/MM/YYYY");
      },
    },
    { 
      headerName: "Activity",
      field: "activity",
      sortable: true, 
      filter: true },
    {
      headerName: "Duration",
      field: "duration", 
      sortable: true, 
      filter: true },
    {
      headerName: 'Firstname',
      field: 'customer.firstname',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Lastname',
      field: 'customer.lastname',
      sortable: true,
      filter: true
    },
    {
      headerName: '',
      field: 'id',
      sortable: true,
      filter: true,
      cellRenderer: params => 
      <Button  color='error' variant="outlined" onClick={() => deleteTraining(params.value)}>Delete</Button>
    }
  ])

  useEffect(() => {
    getTrainings();
  }, []);
  const getTrainings = () => {
    fetch(Full_API)
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setTrainings(data);
      })
      .catch(err => console.error(err))
  }

  const deleteTraining = (id) => {
    if (window.confirm('Delete this exercise?')) {
      fetch(Exercises_API+'/' + id, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            getTrainings();
          }
          else
            alert('Error');
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <div className="App">
      <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>

        
        <AgGridReact
           rowData={Array.isArray(trainings) ? trainings : []}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  )
}