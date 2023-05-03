import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { DialogTitle } from "@mui/material";

export default function EditCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    
    setCustomer({
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        streetaddress: props.data.streetaddress,
        postcode: props.data.postcode,
        city: props.data.city,
        email: props.data.email,
        phone: props.data.phone
    })
  };
  const handleSave = () => {
      console.log("Attempting to save");
      props.editCustomer(props.data.links[0].href, customer);
      setOpen(false);
  };
  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Edit 
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            name="firstname"
            onChange={inputChanged}
            margin="dense"
            label="Firstname"
            fullWidth={true}
            variant="standard"
            value={customer.firstname}
          />
           <TextField
             autoFocus={true}
              name="lastname"
              value= {customer.lastname}
              margin="dense"
              label="Lastname"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              autoFocus={true}
              name="streetaddress"
              value= {customer.streetaddress}
              margin="dense"
              label="Streetaddress"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              autoFocus={true}
              name="postcode"
              value= {customer.postcode}
              margin="dense"
              label="Postcode"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              autoFocus={true}
              name="city"
              value= {customer.city}
              margin="dense"
              label="City"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              autoFocus={true}
              name="email"
              value= {customer.email}
              margin="dense"
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              autoFocus={true}
              name="phone"
              value= {customer.phone}
              margin="dense"
              label="Phone"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}