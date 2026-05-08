import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCSRFToken } from '../helpers/getCsrfToken';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { formatTitle } from '../helpers/formatTitle';
import Footer from '../components/Footer';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { navigateToError } = useErrorHandler();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/bank/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          String(data.non_field_errors[0]).toLowerCase() ===
            'invalid credentials'
            ? 'Credenciais Inválidas'
            : formatTitle(String(data.non_field_errors)),
        );
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        navigate('/user/dashboard/');
      }
    } catch (error) {
      navigateToError(500, 'Erro ao conectar com o servidor', error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex flex-col flex-1 bg-neutral-800/30">
        <div className="text-red-300 font-bold text-center text-lg w-full h-10 mt-20">
          {errorMessage}
        </div>
        <div className="flex flex-col justify-center mt-10">
          <div className="flex justify-center">
            <form
              className="flex flex-col w-sm gap-6 px-6"
              onSubmit={handleSubmit}
            >
              <h1 className="text-2xl font-bold text-center text-gray-500 select-none">
                Acessar conta
              </h1>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1 select-none">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b border-gray-300 outline-none py-2 bg-transparent text-gray-300"
                />
              </div>

              {/* Senha */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1 select-none">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-b border-gray-300 outline-none py-2 bg-transparent text-gray-300"
                />
              </div>

              {/* Botão */}
              <button
                type="submit"
                className="mt-4 bg-neutral-900 text-white py-2 rounded hover:hover:bg-neutral-800 transition cursor-pointer"
              >
                Acessar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-neutral-800/30 select-none">
        <Footer />
      </div>
    </div>
  );
}
