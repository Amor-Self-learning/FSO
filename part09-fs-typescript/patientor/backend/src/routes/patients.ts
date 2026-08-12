import express, { type Response } from 'express';
import { createPatient, getNonSensitivePatients }  from '../services/patientsService.ts';
import type { NonSensitivePatientEntry } from '../types.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res : Response<NonSensitivePatientEntry []>) => {
  res.json(getNonSensitivePatients());
});

patientsRouter.post('/', (req, res : Response<NonSensitivePatientEntry>) => {
  const { id, name, occupation, dateOfBirth, gender } = createPatient(req.body);
  return res.json({
    id,
    name,
    dateOfBirth,
    occupation,
    gender,
  });
});

export default patientsRouter;