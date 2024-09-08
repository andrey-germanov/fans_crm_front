import React, { FormEvent, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export type LoginUser = {
  password: string;
  email: string;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ password, email });
  };

  const login = async (userData: LoginUser) => {
    const response = await fetch('http://localhost:5005/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.access_token) {
      Cookies.set('ac', data.access_token);
      await getUser(data.user.id);
    } else {
      setError('Invalid credentials');
    }
  };

  const getUser = async (id: number) => {
    const response = await fetch(
      `http://localhost:5005/api/v1/get-user/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('ac')}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return;
    }
    setUser(data);
    navigate('/user');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: 'red', padding: '8px' }}>{error}</p>
    </>
  );
};

export default Login;
