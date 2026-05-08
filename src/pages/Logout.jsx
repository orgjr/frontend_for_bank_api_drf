import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCSRFToken } from '../helpers/getCsrfToken';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    async function handleSubmit() {
      const response = await fetch('http://localhost:8000/bank/auth/logout/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
      }
      console.log(data);
      navigate('/');
      return data;
    }
    handleSubmit();
  }, [navigate]);
  return null;
}
