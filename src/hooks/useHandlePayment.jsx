import { getCSRFToken } from '../helpers/getCsrfToken';

export function useHandlePayment() {
  const handlePayment = async (link, payload) => {
    const response = await fetch(link, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return { status: response.status, data: data };
  };
  return { handlePayment };
}
