import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";

import AddExercise from "./AddExercise";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { Customer_API } from "../constants";
import { Exercises_API } from "../constants";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      width: 180,
      cellRenderer: (params) => (
        <EditCustomer data={params.data} editCustomer={editCustomer} />
      ),
    },
    {
      width: 180,
      cellRenderer: (params) => (
        <AddExercise data={params.data} addExercise={addExercise} />
      ),
    },

    {
      cellRenderer: (params) => (
        <Button
          color="error"
          variant="outlined"
          onClick={() => deleteCustomer(params.data.links[0].href)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => getCustomers(), []);
  const getCustomers = () => {
    fetch(Customer_API)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("error");
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getCustomers();
  }, []);
  const deleteCustomer = (url) => {
    if (window.confirm("Delete this customer?"))
      fetch(url, { method: "DELETE" }).then((response) => {
        if (response.ok) getCustomers();
        else alert("error");
      });
  };
  const addCustomer = (customer) => {
    fetch(Customer_API, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) getCustomers();
        else alert("error");
      })
      .catch((err) => console.error(err));
  };
  const addExercise = (exercise) =>
    fetch(Exercises_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise),
    })
    
  const editCustomer = (link, editedCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(editedCustomer),
    })
      .then((response) => {
        if (response.ok) getCustomers();
        else alert("error");
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ height: 650, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </>
  );
}

export default CustomerList;
