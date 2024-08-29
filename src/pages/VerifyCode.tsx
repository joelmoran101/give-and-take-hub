import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verify the code with the stored code in the session or database
    axios.post('/verify-code', { code })
      .then((response) => {
        if (response.data.success) {
          // Login successful, redirect to dashboard
          navigate('/home');
        } else {
          setError('Invalid code');
        }
      })
      .catch((error) => {
        console.error('Error verifying code:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter code" />
      <button type="submit">Verify</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

const sendEmail = async () => {
  try {
    const response = await axios.post('/send-email', {
      to: 'recipient-email@example.com',
      subject: 'Login Code',
      text: 'Your login code is: ' + loginCode,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default VerifyCode;
export { sendEmail };