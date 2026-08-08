import express from 'express';
import calculateBmi from './bmiCalculator.ts';

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (height && weight && !isNaN(Number(height)) && !isNaN(Number(weight))) {
    return res.json({
      height,
      weight,
      bmi: calculateBmi(Number(height), Number(weight))
    })
  } else {
    res.status(400).json({ error: 'Invalid arguments'})
  }
  
})
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
