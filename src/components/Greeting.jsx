const Greeting = (props) => {
  console.log(props);
  return (
    <>
      <div>
        Hello, {props.name} and {props.age}
      </div>
      <div>helllooooooo</div>
    </>
  );
};

export default Greeting;
