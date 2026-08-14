import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entries from './Entries';
import AddEntry from './AddEntry.tsx';
import type { EntryWithoutId, Patient } from '../types.ts';
import { useState } from 'react';
import { apiBaseUrl } from '../constants.ts';

const Patient = ({patient}: {patient: Patient}) => {
  const [formVisible, setFormVisible] = useState(false);
  const [entries, setEntries] = useState(patient.entries);
  const [error, setError] = useState('');

  const addEntry = (values: EntryWithoutId) => {
    fetch(`${apiBaseUrl}/patients/${patient.id}/entries`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then ( res => {
      res.json().then(entry => setEntries(entries.concat(entry)));
      setFormVisible(false);
    }
    ).catch ( e => {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    );
  };
  return (
    <Card sx={{borderRadius: '1rem', padding: '1rem', width: 'fit-content'}}>
      {formVisible && 
        <AddEntry 
          modalOpen={formVisible} 
          onClose={() => setFormVisible(false)}
          onSubmit={addEntry}
          error={error}
        />}
      <Typography variant='h4'>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</Typography>
      <CardContent>
        <Typography variant='body1'><b>SSN:</b> {patient.ssn}</Typography>
        <Typography variant='body1'><b>Occupation:</b> {patient.occupation}</Typography>
        <Typography variant='body1'><b>DOB:</b> {patient.dateOfBirth}</Typography>
        <Entries entries={entries}/>
      </CardContent>
      <CardActions>
        <Button variant='contained' onClick={() => setFormVisible(true)}>Add New Entry</Button>
      </CardActions>
    </Card>
  );
};

export default Patient;