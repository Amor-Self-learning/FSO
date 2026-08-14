import { apiBaseUrl } from '../constants.ts';
import type { Diagnosis, Entry } from '../types.ts';
import { useState, useEffect } from 'react';

const Entries = ({entries} : {entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const res = await fetch(`${apiBaseUrl}/diagnoses`);
      setDiagnoses( await res.json());
    };
    fetchDiagnoses();
  }, []);
  const diagnosisString = (code : string) : string | undefined => {
    return diagnoses.find(d => d.code === code)?.name;
  };

  return (
    <>
      {entries.map(entry => (
        <div key={entry.id}>
          <p><b>{entry.date}</b> {entry.description}</p>
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
              <li key={code}><b>{code}</b> {diagnosisString(code)}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Entries;