import {useState, useEffect} from 'react';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const Response = await fetch(
        'https://media2.edu.metropolia.fi/media-api/api/v1/media',
      );

      if (!Response.ok) {
        throw new Error('Failed to fetch media');
      }

      const data = await Response.json();
      setMediaArray(data);
    } catch (error) {
      console.log('Error fetching media:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray};
};

export {useMedia};
