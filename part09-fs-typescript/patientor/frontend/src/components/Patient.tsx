import { Card, CardContent, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import type { Patient } from '../types.ts';
const Patient = ({patient}: {patient: Patient}) => {
  return (
    <Card sx={{borderRadius: '1rem', padding: '1rem', width: 'fit-content'}}>
      <Typography variant='h4'>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</Typography>
      <CardContent>
        <Typography variant='body1'>SSN: {patient.ssn}</Typography>
        <Typography variant='body1'>Occupation: {patient.occupation}</Typography>
        <Typography variant='body1'>DOB: {patient.dateOfBirth}</Typography>
      </CardContent>
    </Card>
  );
};

export default Patient;