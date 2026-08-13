import type React from 'react';
import { NewEntrySchema, type DiaryFormElement, type NewDiaryProps } from '../../../backend/src/types.ts';
import { ZodError } from 'zod';

const NewDiary = ({ addDiary, setNotification }: NewDiaryProps) => {
  const handleSubmission  = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as DiaryFormElement;
    try {
      const newDiary = {
        weather: target.weather.value,
        visibility: target.visibility.value,
        date: target.date.value,
        comment: target.comment.value
      };
      NewEntrySchema.parse(newDiary);
      addDiary(newDiary);
    }
    catch (e) {
      if (e instanceof ZodError) {
        setNotification ( e.issues.map(issue => issue.message).join(', '), false);
      } else {
        setNotification('Unkown Error', false);
      }
    }
  }
  return (
    <form onSubmit={handleSubmission} className="form">
      <div className="radio">Visbility:
        <label><input name="visibility" type="radio"  value="great"/>Great</label>
        <label><input name="visibility" type="radio"  value="good"/>Good</label>
        <label><input name="visibility" type="radio"  value="ok"/>OK</label>
        <label><input name="visibility" type="radio"  value="poor"/>Poor</label>
        </div>
      <div className="radio">Weather:
        <label><input name="weather" type="radio" value="sunny" />Sunny</label>
        <label><input name="weather" type="radio" value="rainy" />Rainy</label>
        <label><input name="weather" type="radio" value="cloudy" />Cloudy</label>
        <label><input name="weather" type="radio" value="stormy" />Stormy</label>
        <label><input name="weather" type="radio" value="windy" />Windy</label>
      </div>
      <label>Date:<input name="date" type="date" /></label>
      <label>Comment:<input name="comment" type="text" /></label>
      <button type="submit">Add</button>
    </form>
  )
}

export default NewDiary;