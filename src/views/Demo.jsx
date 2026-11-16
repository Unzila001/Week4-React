import {useState, useEffect, useRef} from 'react';

const Demo = () => {
  const [count, setCount] = useState(0);
  const refCount = useRef(0);

  const addWithState = () => {
    setCount(count + 1);
    console.log(count);
  };

  const addWithRef = () => {
    refCount.current++;
    console.log(refCount.current);
  };

  useEffect(() => {
    console.log('Count has changed:', count);
  }, [count]);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={addWithState}>Add one</button>
      <button onClick={addWithRef}>Add with Ref</button>
    </div>
  );
};

export default Demo;
