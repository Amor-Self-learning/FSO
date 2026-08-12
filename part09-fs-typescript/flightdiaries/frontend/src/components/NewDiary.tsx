import type React from "react";

const NewDiary = ({addDiary}) => {
  const handleSubmission  = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      weather: event.target.weather.value,
      visibility: event.target.visibility.value,
      date: event.target.date.value,
      comment: event.target.comment.value
    };
    addDiary(newDiary);
  }
  return (
    <form onSubmit={handleSubmission} style={{display: "flex", flexDirection: "column", width: "calc(10vw + 200px)"}}>
      <label>Visbility:<input name="visibility" type="text" /></label>
      <label>Weather:<input name="weather" type="text" /></label>
      <label>Date:<input name="date" type="date" /></label>
      <label>Comment:<input name="comment" type="text" /></label>
      <button type="submit">Add</button>
    </form>
  )
}

export default NewDiary;