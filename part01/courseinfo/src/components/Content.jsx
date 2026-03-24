import Part from "./Part.jsx";

const Content =  ({part1,ex1, part2, ex2, part3, ex3}) => {
    return (
        <>
          <Part part={part1} ex={ex1} />
          <Part part={part2} ex={ex2} />
          <Part part={part3} ex={ex3} />
        </>
    )
}

export default Content;