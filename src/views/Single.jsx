import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const item = state;
  const navigate = useNavigate();

  return (
    <>
      <h2>Single Media Page</h2>
      <h3>{item.title}</h3>
      {}
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.description} />
      ) : (
        <video controls>
          <source src={item.filename} />
        </video>
      )}
      <p>{item.description}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
};

export default Single;
