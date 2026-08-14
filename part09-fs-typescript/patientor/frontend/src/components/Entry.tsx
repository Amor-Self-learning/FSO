import { Box } from '@mui/material';
import type { Entry } from '../types';

const Entry = ({entry, diagnosisString} : {entry: Entry, diagnosisString ( a : string) : string | undefined }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Box sx={{border: '2px solid black', padding: '1rem' , borderRadius: '1rem', marginTop: '1rem'}}>
          <p><b>{entry.date}</b></p>
          <p>{entry.description}</p>
          <p>HealthCheck: {entry.healthCheckRating}</p>
          {entry.diagnosisCodes && 
            <div>
              <b>Diagnosis:</b>
              <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                  <li key={code}><b>{code}</b> {diagnosisString(code)}</li>
                ))}
              </ul>
            </div>
          }
          <p><b>Diagnosis By:</b> {entry.specialist}</p>
        </Box>
      );
    case 'Hospital':
      return (
        <Box sx={{border: '2px solid black', padding: '1rem' , borderRadius: '1rem', marginTop: '1rem'}}>
          <p><b>{entry.date}</b></p>
          <p>{entry.description}</p>
          {entry.diagnosisCodes && 
            <div>
              <b>Diagnosis:</b>
              <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                  <li key={code}><b>{code}</b> {diagnosisString(code)}</li>
                ))}
              </ul>
            </div>
          }
          <div>
            <b>Discharged:</b>
            <p>{entry.discharge.date}</p>
            <p>{entry.discharge.criteria}</p>
          </div>
          <p><b>Diagnosis By:</b> {entry.specialist}</p>
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box sx={{border: '2px solid black', padding: '1rem' , borderRadius: '1rem', marginTop: '1rem'}}>
          <p><b>{entry.date}</b></p>
          <p>{entry.description}</p>
          <p><b>Emplyer Name:</b> {entry.employerName}</p>
          {entry?.sickLeave &&
            <div>
              <b>Sick Leave</b>
              <p><b>Start Date:</b> {entry?.sickLeave.startDate}</p>
              <p><b>End Date:</b> {entry?.sickLeave.endDate}</p>
            </div>
          }
          {entry.diagnosisCodes && 
            <div>
              <b>Diagnosis:</b>
              <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                  <li key={code}><b>{code}</b> {diagnosisString(code)}</li>
                ))}
              </ul>
            </div>
          }
          <p><b>Diagnosis By:</b> {entry.specialist}</p>
        </Box>
      );
    }
};

export default Entry;