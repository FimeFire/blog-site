import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const initialFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Changed:', name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError(new Error('Passwords do not match!'));
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(new Error('Password must be at least 6 characters long.'));
      setLoading(false);
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;

    console.log('Attempting to sign up with:', dataToSend);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Sending data:', JSON.stringify(dataToSend));

      const responseData = await response.json();

      if (response.ok) {
        console.log('Sign up successful', responseData);
        alert('Registration successful! You can now log in.');
        navigate('/login');
      } else {
        console.error(
          'Sign up failed:',
          responseData.message || 'Unknown error'
        );
        setError(
          new Error(
            responseData.message || 'Registration failed. Please try again.'
          )
        );
      }
    } catch (err) {
      console.error('Network or server error during sign up', err);
      setError(new Error('Network error. Could not connect to the server.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3 className="createH">Sign Up</h3>
      <div className="createContainer">
        <form className="createForm formContainer" onSubmit={handleSubmit}>
          <input
            maxLength={25}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            maxLength={50}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            maxLength={25}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <input
            maxLength={25}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <button className="submitButton" type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
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

export default SignUpPage;
