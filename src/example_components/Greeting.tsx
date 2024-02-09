// rafce

// declare types like this:
type GreetingProps = {
    name: string;
    age: number;
}

const Greeting = ({name, age}: GreetingProps) => {
    return (
        <div>
            <h2>Hi there, {name}!  You're {age} years old.</h2>
        </div>
    )
}

export default Greeting;