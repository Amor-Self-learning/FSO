import express, { type Response } from 'express';
import { getNonSensitiveDiagnosis }  from '../services/diagnosisService.ts';
import type { NonSensitiveDiagnosisEntry } from '../types.ts';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req, res : Response<NonSensitiveDiagnosisEntry []>) => {
  res.json(getNonSensitiveDiagnosis());
});

export default diagnosisRouter;