import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './actions/userActions'; // Ensure you have this action
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const LoginFanpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error: loginError, userInfo } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/fanpage-dashboard'); // Redirect after successful login
    }
    if (loginError) {
      setError(loginError);
    }
  }, [userInfo, loginError, navigate]);

  return (
    <div className="center">
      <div className="login-fanpage">
        <h2>Login to Fanpage</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/registerFanpage">Register here</a></p>
      </div>
    </div>
  );
};

export default LoginFanpage;
