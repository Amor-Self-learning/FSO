import { Card, CardContent, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entries from './Entries';

import type { Patient } from '../types.ts';
const Patient = ({patient}: {patient: Patient}) => {
  return (
    <Card sx={{borderRadius: '1rem', padding: '1rem', width: 'fit-content'}}>
      <Typography variant='h4'>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</Typography>
      <CardContent>
        <Typography variant='body1'><b>SSN:</b> {patient.ssn}</Typography>
        <Typography variant='body1'><b>Occupation:</b> {patient.occupation}</Typography>
        <Typography variant='body1'><b>DOB:</b> {patient.dateOfBirth}</Typography>
        <Entries entries={patient.entries}/>
      </CardContent>
    </Card>
  );
};

export default Patient;