import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');

      // Step 1: Upload the actual Image
      const fileResult = await postFile(file, token);

      // Step 2: Save image information to Media API
      const mediaResult = await postMedia(fileResult.data, inputs, token);

      console.log('Media saved:', mediaResult);
      navigate('/');
    } catch (error) {
      console.log('Upload error:', error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload, {
    title: '',
    description: '',
  });

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  return (
    <>
      <h1>Upload</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            value={inputs.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        {file && file.type.startsWith('image/') && (
          <img src={URL.createObjectURL(file)} alt="preview" width="200" />
        )}

        <button type="submit" disabled={!file || inputs.title.length <= 3}>
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
