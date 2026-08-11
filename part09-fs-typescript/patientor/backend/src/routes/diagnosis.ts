import express, { type Response } from 'express';
import { getNonSensitiveDiagnosis }  from '../services/diagnosisService.ts';
import type { NonSensitiveDiagnosisEntries } from '../types.ts';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req, res : Response<NonSensitiveDiagnosisEntries []>) => {
  res.json(getNonSensitiveDiagnosis());
});

export default diagnosisRouter;