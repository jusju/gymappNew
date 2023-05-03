import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import dayjs from 'dayjs';
import React from "react";

export default function AddExercise({ addExercise, data }) {
  const [open, setOpen] = React.useState(false);
  const [exercise, setExercise] = React.useState({
    duration: 0,
    activity: '',
    date: ''
   });

  const [date, setDate] = React.useState(dayjs());
  
  const handleClickOpen = () => {
    setOpen(true);
    console.log(data);
  };

  const handleSave = () => {  
    const newExercise = {
      ...exercise,
      date: date.format('YYYY-MM-DD'),
      customer: data.links[0].href
    };
    addExercise(newExercise);
    console.log(newExercise);
    setOpen(false);
    console.log("saved");
  };

  const handleCancel = () => {
    setOpen(false);
    console.log("cancelled");
  };

  const inputChanged = (event) => {
    setExercise({ ...exercise, [event.target.name]: event.target.value });
  }

  const handleDateChange = (event) => {
    setDate(dayjs(event.target.value));
  }

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Add Exercise
      </Button>

      <Dialog onClose={handleSave} open={open}>
        <DialogTitle>Add Exercise</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            name="duration"
            onChange={inputChanged}
            margin="dense"
            label="Duration"
            fullWidth={true}
            variant="standard"
            value={exercise.duration}
          />
          <TextField
            autoFocus={true}
            name="activity"
            onChange={inputChanged}
            margin="dense"
            label="Activity"
            fullWidth={true}
            variant="standard"
            value={exercise.activity}
          />
          <TextField
            autoFocus={true}
            name="date"
            onChange={handleDateChange}
            margin="dense"
            label="Date"
            type="date"
            fullWidth={true}
            variant="standard"
            value={date.format('YYYY-MM-DD')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
