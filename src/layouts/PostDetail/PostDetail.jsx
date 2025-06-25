import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        if (!postId) {
          setError(new Error('Post ID is missing in the URL.'));
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/posts/${postId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setPost(null);
          } else {
            throw new Error(
              `Failed to fetch post: ${response.status} ${response.statusText}`
            );
          }
        } else {
          const data = await response.json();
          setPost(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  const handlePreviousClick = () => {
    if (post && post.prev_post_id) {
      navigate(`/posts/${post.prev_post_id}`);
    }
  };

  const handleNextClick = () => {
    if (post && post.next_post_id) {
      navigate(`/posts/${post.next_post_id}`);
    }
  };

  if (loading) {
    return <div className="container">Загрузка поста...</div>;
  }

  if (error) {
    return (
      <div className="container">
        Ошибка: {error.message}. Попробуйте еще раз.
      </div>
    );
  }

  if (!post) {
    return <div className="container">Пост не найден.</div>;
  }

  const formattedDate = new Date(post.data_create).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <div className="container">
        <div className="containerUserPost">
          <div className="containerPost">
            <div className="contianerUser">
              <div className="userAvatar"></div>
              <h3 className="userName">
                {post.username || 'Неизвестный автор'}
              </h3>
            </div>
            <div className="datePost">{formattedDate}</div>
          </div>
          <h1>{post.name_post}</h1>
          <div className="line"></div>
          <div className="containerText">
            <div dangerouslySetInnerHTML={{ __html: post.text_post }}></div>
            <div className="line"></div>
            <div className="containerAboutUser">
              <div className="aboutUser">
                About {post.username || 'Неизвестный автор'}
              </div>
              <div className="userAvatar AvatarBig"></div>
              <div className="line"></div>
              <div className="slider">
                <div className="buttonContainer">
                  <button
                    onClick={handlePreviousClick}
                    disabled={!post.prev_post_id}
                  >
                    <span className="rightIconPrevious">←</span> Previous
                  </button>
                  <button
                    onClick={handleNextClick}
                    disabled={!post.next_post_id}
                  >
                    Next <span className="leftIconPrevious">→</span>
                  </button>
                </div>
                <div className="textContainer">
                  <p>5 Tips for Better Cardio Sessions</p>
                  <p>Meal Prep Basics for Gym Enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="related">
        <div className="containerArticles">
          <h3>Related articles</h3>
          <div className="containerCard">
            <div className="card">
              <div className="imageArticles"></div>
              <p className="textArticies">
                The Ultimate Guide to Full-Body Workouts
              </p>
              <p className="otherText">
                Discover exercises that target every muscle group, helping you
                build strength and endurance. Perfect for beginners and seasoned
                gym-goers alike.
              </p>
              <p className="author">By Alex Carter</p>
            </div>
            <div className="card">
              <div className="imageArticles"></div>
              <p className="textArticies">
                The Ultimate Guide to Full-Body Workouts
              </p>
              <p className="otherText">
                Discover exercises that target every muscle group, helping you
                build strength and endurance. Perfect for beginners and seasoned
                gym-goers alike.
              </p>
              <p className="author">By Alex Carter</p>
            </div>
            <div className="card">
              <div className="imageArticles"></div>
              <p className="textArticies">
                The Ultimate Guide to Full-Body Workouts
              </p>
              <p className="otherText">
                Discover exercises that target every muscle group, helping you
                build strength and endurance. Perfect for beginners and seasoned
                gym-goers alike.
              </p>
              <p className="author">By Alex Carter</p>
            </div>
            <div className="card">
              <div className="imageArticles"></div>
              <p className="textArticies">
                The Ultimate Guide to Full-Body Workouts
              </p>
              <p className="otherText">
                Discover exercises that target every muscle group, helping you
                build strength and endurance. Perfect for beginners and seasoned
                gym-goers alike.
              </p>
              <p className="author">By Alex Carter</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
