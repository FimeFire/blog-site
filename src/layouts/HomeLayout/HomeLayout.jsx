import { useEffect, useState } from 'react';
import './HomeLayout.css';
import { Link } from 'react-router-dom';

const stripHtml = (html) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const truncateText = (text, maxLength = 200) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const HomeLayout = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Ошибка при загрузке постов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Загрузка постов...</p>;

  return (
    <div className="RecomCardContainer">
      <div className="containerCard">
        {posts.length === 0 ? (
          <p>Постов пока нет</p>
        ) : (
          posts.map((post) => (
            <Link to={`/posts/${post.id}`} className="card" key={post.id}>
              <div className="imageArticles"></div>
              <p className="textArticies">{post.name_post}</p>
              <div className="otherText">
                {truncateText(stripHtml(post.text_post))}
              </div>
              <p className="author">
                {post.author_name
                  ? `By ${post.author_name}`
                  : 'Автор не существует'}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeLayout;
