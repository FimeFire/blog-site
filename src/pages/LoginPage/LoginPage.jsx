import './LoginPage.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user.username);
        navigate('/posts');
      } else {
        setError(new Error(data.message || 'Login failed'));
      }
    } catch (err) {
      setError(new Error('Network error.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3 className="createH">Login</h3>
      <div className="createContainer">
        <form className="createForm formContainer" onSubmit={handleSubmit}>
          <input
            maxLength={25}
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
          <input
            maxLength={25}
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <button className="submitButton" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}{' '}
          </button>
          {error && (
            <p
              className="error-message"
              style={{ color: 'red', marginTop: '10px' }}
            >
              {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
