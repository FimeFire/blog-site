import { useState } from 'react';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import './CreatePost.css';

const initialFormState = {
  namePost: '',
  textPost: '',
};

const CreatePost = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [userFormData, setUserFormData] = useState(initialFormState);

  const reset = () => {
    setUserFormData(initialFormState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const postData = {
    namePost: userFormData.namePost,
    textPost: userFormData.textPost,
    isPublic: isPublic,
  };

  const token = localStorage.getItem('authToken');

  try {
    const response = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('error sending post');
    }

    const data = await response.json();
    console.log('Post created:', data);

    reset();
    setIsPublic(false);
  } catch (error) {
    console.error(error);
  }
};
	

  const handleEditorChange = (content) => {
    console.log('RichTextEditor content:', content);
    setUserFormData((prev) => ({
      ...prev,
      textPost: content,
    }));
  };

  return (
    <div className="container">
      <h3 className="createH">Create Post</h3>
      <div className="createContainer">
        <form onSubmit={handleSubmit} className="createForm">
          <input
            maxLength={25}
            type="text"
            name="namePost"
            placeholder="Name post"
            value={userFormData.namePost}
            onChange={handleChange}
          />
          <div className="containerTextEditor">
            <RichTextEditor
              value={userFormData.textPost}
              onEditorChange={handleEditorChange}
            />
          </div>
          <div className="cheakboxContainer">
            <label className="checkboxLabel">
              <input
                className="checkboxPublic"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              make public
            </label>
          </div>
          <button className="submitButton" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
