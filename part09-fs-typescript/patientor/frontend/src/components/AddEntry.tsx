import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Alert,
  Chip
} from '@mui/material';
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../types";
import { apiBaseUrl } from "../constants";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error: string
}

const AddEntry = ({modalOpen, onClose, onSubmit, error}: Props) => {
const [type, setType] = useState('');
const [description, setDescription] = useState('');
const [date, setDate] = useState('');
const [specialist, setSpecialist] = useState('');
const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
const [healthCheckRating, setHealthCheckRating] = useState(0);
const [dischargeDate, setDischargeDate] = useState('');
const [criteria, setCriteria] = useState('');
const [employerName, setEmployerName] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [allDiagnosis, setAllDiagnosis] = useState<Diagnosis[]>([]);

useEffect(() => {
  fetch(`${apiBaseUrl}/diagnosis`).then(res => {
    res.json().then(data => setAllDiagnosis(data));
  });
}, []);

const handleChange = (event: SelectChangeEvent) => {
  setType(event.target.value as string);
};

const handleSubmit = () => {
  const entry = {description, date, specialist, diagnosisCodes};
  switch (type) {
    case 'HealthCheck':
      const health = healthCheckRating as HealthCheckRating;
      onSubmit({
        type: 'HealthCheck',
        ...entry,
        healthCheckRating: health
      });
      break;
    case 'Hospital':
      onSubmit({
        type: 'Hospital',
        ...entry,
        discharge: {
          date: dischargeDate,
          criteria
        },
      });
      break;
    case 'OccupationalHealthCare':
      onSubmit({
        type: 'OccupationalHealthcare',
        ...entry,
        employerName,
        sickLeave: {
          startDate,
          endDate
        }
      });
      break;
  };
};
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}
      slotProps={{
        paper: {
          sx: { borderRadius: '1rem' }
        }
      }}
    >
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth
        sx={{ display: "flex", flexDirection: "column", gap: "0.5rem"}}>
        <InputLabel id="entry-type">Type</InputLabel>
        <Select
          labelId="entry-type-label"
          id="type"
          value={type}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
          <MenuItem value={'Hospital'}>Hospital</MenuItem>
          <MenuItem value={'OccupationalHealthCare'}>OccupationalHealthCare</MenuItem>
        </Select>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}          
        />
        <Select
          multiple
          labelId="diagnosis-codes-label"
          id="diagnosis-codes"
          value={diagnosisCodes}
          renderValue={(diagnosisCodes) => (diagnosisCodes as string[]).map(code => (
            <Chip variant="filled" key={code} label={code} size="small" />
          ))}
          label="DiagnosisCodes"
          onChange={({ target }) => setDiagnosisCodes(target.value as string[])}
        >
        {allDiagnosis.map(d => (
          <MenuItem key={d.code} value={d.code}>{d.code} -- {d.name}</MenuItem>
        ))
        }
        </Select>

        {type === 'HealthCheck' &&
          <Select
            labelId="healthcheck-label"
            id="healthcheck"
            value={healthCheckRating}
            label="HealthCheck Rating"
            onChange={({ target }) => setHealthCheckRating(target.value)}
          >
            <MenuItem value={0}>0 -- Healthy</MenuItem>
            <MenuItem value={1}>1 -- Low Risk</MenuItem>
            <MenuItem value={2}>2 -- High Risk</MenuItem>
            <MenuItem value={3}>3 -- Critical Risk</MenuItem>
          </Select>
        }
        {
          type === 'Hospital' &&
          <>
            <b>Discharge</b>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Critera"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </>
        }
        {
          type === 'OccupationalHealthCare' &&
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <b>Sick Leave Start and End Date</b>
            <TextField
              type="date"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <TextField
              type="date"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </>
        }
      </FormControl>
      <Box sx={{display: "flex", gap: "1rem", marginTop: "1rem"}}>
        <Button variant="contained" color="success" onClick={handleSubmit}>Add</Button>
        <Button variant="outlined" color="error" onClick={onClose}>Cancel</Button>
      </Box>
    </Box>
    </DialogContent>
  </Dialog>
  );
};

export default AddEntry;