import patients from '../../data/patients.ts';
import { type PatientEntry, type NonSensitivePatientEntry } from '../types.ts';

const getAll = () : PatientEntry [] => {
  return patients;
};

const getNonSensitivePatients = () : NonSensitivePatientEntry [] => {
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