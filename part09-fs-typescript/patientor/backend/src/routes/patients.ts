import express, { type Response } from 'express';
import { getNonSensitivePatients }  from '../services/patientsService.ts';
import type { NonSensitivePatientEntries } from '../types.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res : Response<NonSensitivePatientEntries []>) => {
  res.json(getNonSensitivePatients());
});

export default patientsRouter;