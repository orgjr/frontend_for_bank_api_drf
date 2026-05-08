export function useHandlePayment() {
  const handlePayment = async (link, code, navigate) => {
    const response = await fetch(link, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: code,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      navigate('');
      return data;
    }
  };
  handlePayment();
}
