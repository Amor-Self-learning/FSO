import Header from "./Header";
import Content from "./Content";

const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <p><b>total of {course.parts.reduce((s, p) => s + p.exercises, 0 )} exercises</b></p>
      </div>
    )
}

export default Course;