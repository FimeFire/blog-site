import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);

      fetch(`/api/posts/user/${savedUsername}`)
        .then((res) => {
          if (!res.ok) throw new Error('Ошибка загрузки постов');
          return res.json();
        })
        .then((data) => setPosts(data))
        .catch((err) => {
          console.error(err);
          alert('Не удалось загрузить посты пользователя');
        });
    }
  }, []);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Удалить этот пост?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('authToken');
      console.log('Using token:', token);
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка при удалении');
      }

      setPosts((prev) => prev.filter((p) => p.id !== postId));
      alert('Пост удалён');
    } catch (err) {
      console.error(err);
      alert('Не удалось удалить пост');
    }
  };

  return (
    <div>
      <h1>Привет, {username}!</h1>
      <h2>Твои посты:</h2>
      {posts.length === 0 && <p>Постов пока нет.</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.name_post}</Link>{' '}
            <Link to={`/posts/${post.id}/edit`} style={{ marginLeft: 10 }}>
              Редактировать
            </Link>{' '}
            <button
              onClick={() => handleDelete(post.id)}
              style={{
                marginLeft: 10,
                color: 'red',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
