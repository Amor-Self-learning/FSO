import { useEffect, useState } from "react";
import type { NewDiaryEntry, DiaryEntry } from '../../backend/src/types.ts';
import Diaries from './components/Diaries.tsx';
import NewDiary from './components/NewDiary.tsx';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry []>([]);
  const [notification, setMessage ] = useState({ message: '', ok: false});

  useEffect(() => {
    const fetchDaires = async () => {
      const res = await fetch('/api/diaries');
      if (!res.ok) throw new Error('Failed to fetch data');
      setDiaries(await res.json());
    };
    fetchDaires();
  }, []);

  const addDiary = async (diary : NewDiaryEntry) => {
    const res = await fetch('/api/diaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diary),
    });
    if (!res.ok) {
      throw new Error('Failed to add a new Diary')
    }
    setDiaries(diaries.concat(await res.json()));
  };

  const setNotification = (message: string, ok: boolean) : void => {
    setMessage({message, ok});
    setTimeout(() => {
      setMessage({message: '', ok: false});
    }, 5000)
  };
  return (
    <>
      {notification && notification.message ? <p className={`notification ${notification.ok ? 'success' : 'error'}`}>{notification.message}</p> : ''}
      <NewDiary addDiary={addDiary} setNotification={setNotification}/>
      <br />
      <Diaries diaries={diaries} />
    </>
  );
};

export default App;