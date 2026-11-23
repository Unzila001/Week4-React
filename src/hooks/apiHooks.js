import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData.js';

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

  const postMedia = async (file, inputs, token) => {
    const media = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(media),
    };

    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions,
    );
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );

    return loginResult;
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const user = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
    return user;
  };
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
  };

  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();

    formData.append('file', file);

    const response = await fetch(
      `${import.meta.env.VITE_UPLOAD_SERVER}/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return await response.json();
  };

  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile};
