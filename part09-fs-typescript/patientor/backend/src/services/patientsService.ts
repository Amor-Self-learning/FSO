import patients from '../../data/patients.ts';
import type { PatientEntry, NonSensitivePatientEntries } from '../types.ts';

const getAll = () : PatientEntry [] => {
  return patients;
};

const getNonSensitivePatients = () : NonSensitivePatientEntries [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export {
  getAll,
  getNonSensitivePatients
};