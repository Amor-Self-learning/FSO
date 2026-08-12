const Total = (props) => {
    return <p>Number of exercises {props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}</p>
}

export default Total;