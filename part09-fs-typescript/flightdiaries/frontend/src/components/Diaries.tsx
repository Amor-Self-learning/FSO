import type { DiaryEntry } from '../../../backend/src/types.ts';

const Diaries = ({ diaries } : { diaries: DiaryEntry[] }) => {
  return(
    <ol>
      {diaries.map((diary) =>
        <li key={diary.id}>
          <div>
            <b>Date: {diary.date}</b>
            <br />
            <p>Visibility: {diary.visibility}</p>
            <p>Weather: {diary.weather}</p>
          </div>
        </li>
      )}
    </ol>
  )
}
export default Diaries;