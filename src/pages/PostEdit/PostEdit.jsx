import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import './PostEdit.css'

function PostEdit() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef();
  const [post, setPost] = useState(null);

  const [formData, setFormData] = useState({
    namePost: '',
    textPost: '',
    isPublic: false,
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (!res.ok) throw new Error('Пост не найден');
        const data = await res.json();
        setPost(data);
        setFormData({
          namePost: data.name_post || '',
          textPost: data.text_post || '',
          isPublic: data.is_public || false,
        });

        if (editorRef.current) {
          editorRef.current.setContent(data.text_post || '');
        }
      } catch (err) {
        console.error('Ошибка загрузки поста:', err);
        alert('Ошибка при загрузке поста');
      }
    }

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedText = editorRef.current?.getContent() || '';

    const res = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({
        namePost: formData.namePost,
        textPost: updatedText,
        isPublic: formData.isPublic,
      }),
    });

    if (res.ok) {
      navigate(`/posts/${postId}`);
    } else {
      const error = await res.json();
      alert(`Ошибка: ${error.message || error.error}`);
    }
  };

  return (
    <div className="container">
      <h3 className="createH">Create Post</h3>
      <div className="createContainer">
        <form onSubmit={handleSubmit} className="createForm">
          <input className='inputEdit'
            type="text"
            value={formData.namePost}
            onChange={(e) =>
              setFormData({ ...formData, namePost: e.target.value })
            }
          />
          <RichTextEditor ref={editorRef} />
          <label className="checkboxLabel">
            Публичный:
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) =>
                setFormData({ ...formData, isPublic: e.target.checked })
              }
            />
          </label>
          <button className='buttonSave' type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PostEdit;
