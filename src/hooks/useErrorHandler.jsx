import { useNavigate } from 'react-router-dom';

export function useErrorHandler() {
  const navigate = useNavigate();

  const navigateToError = (status, message) => {
    navigate('/user/error', {
      state: {
        error: {
          status,
          statusText: message,
          data: message,
        },
      },
    });
  };
  return { navigateToError };
}
