import type { Patient } from '../types.ts';
import PatientElem from './Patient';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants.ts';

const PatientPage = () => {
  const { id } = useParams();
  const [ patient, setPatient ] = useState<Patient | null>(null);
  useEffect (() => {
    const fetchPatient = async () => {
      const res = await fetch(`${apiBaseUrl}/patients/${id}`);
      if (res.ok) setPatient(await res.json());
    };
    fetchPatient();
  }, [id, setPatient]);

  return (
    <>
      {patient && <PatientElem patient={patient}/>}
    </>
  );
};

export default PatientPage;