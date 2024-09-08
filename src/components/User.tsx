import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const User = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div>
      <h2>User Info</h2>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
      <p>Created at: {dayjs(user?.createdAt).format('YYYY-MM-DD')}</p>
    </div>
  );
};

export default User;
