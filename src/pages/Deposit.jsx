import { useState } from 'react';
import Menu from '../components/Menu';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { formatMoneyInput } from '../helpers/formatMoneyInput';
import { getCSRFToken } from '../helpers/getCsrfToken';
import { useErrorHandler } from '../hooks/useErrorHandler';

export default function Deposit() {
  const { menuOpen, setMenuOpen, user, setPaymentSlipDetails } =
    useOutletContext();
  const [displayValue, setDisplayValue] = useState('');
  const [rawValue, setRawValue] = useState(0);
  const [error, setError] = useState('');
  const today = new Date().toLocaleDateString('pt-BR');
  const navigate = useNavigate();
  const { navigateToError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(true);

  function getUsername() {
    let username = `${user.first_name} ${user.last_name}`;
    if (!username) {
      username = user.username;
    }
    return username;
  }

  async function handlePaymentSlip() {
    try {
      const response = await fetch('http://localhost:8000/bank/payment_slip/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({
          payer_name: getUsername(),
          amount: rawValue,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.detail || 'Ocorreu um problema na geração do boleto.';
        setError(errorMessage);
        return;
      }

      setPaymentSlipDetails(data);
      navigate('paymentslip/detail');
      setIsLoading(false);
    } catch (err) {
      navigateToError(500, 'Erro ao processar depósito', err);
    }
  }

  function handleChange(e) {
    const onlyNumbers = e.target.value.replace(/\D/g, '');

    if (!onlyNumbers) {
      setDisplayValue('');
      setRawValue(0);
      return;
    }

    const numeric = onlyNumbers || '0';

    const parsed = Number(numeric) / 100;
    setRawValue(parsed);

    setDisplayValue(formatMoneyInput(numeric));

    if (isLoading) {
      return (
        <div className="flex flex-col h-full max-w-6xl w-full mx-auto p-10 gap-8">
          <div className="text-center text-gray-300">Carregando...</div>
        </div>
      );
    }
  }
  return (
    <div className="flex flex-col h-full max-w-6xl w-full mx-auto p-10 gap-8">
      {/* Card - Title */}
      <div className="flex gap-8">
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col bg-white/70 rounded-2xl h-36 p-6  shadow-md border gap-4">
            <h1 className="text-2xl text-gray-800 font-semibold">Depósito</h1>
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Faça depósito com boleto ou pix
            </h2>
          </div>
          {/* Card - Details */}
          <div className="bg-white/70 rounded-2xl h-36 p-6 shadow-md border">
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Digite o valor do depósito
            </h2>
            <div className="flex justify-between mr-20">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="value-input"
                  className="text-gray-500 text-sm select-none"
                >
                  Valor
                </label>
                <div className="flex gap-1 items-center">
                  <span className="text-gray-900 font-semibold select-none">
                    R$
                  </span>
                  <input
                    type="text"
                    className="text-end px-2 form-control border border-gray-700 rounded-md max-w-64 h-10 bg-white/70 focus:border-gray-700 focus:outline-none"
                    id="value-input"
                    placeholder="0,00"
                    value={displayValue}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-sm select-none">Data</span>
                <p className="text-gray-900 font-semibold">{today}</p>
              </div>
            </div>
          </div>
        </div>
        {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
      </div>

      {/* Card - Complete */}
      <div className="bg-white/70 rounded-2xl p-6 shadow-md border select-none">
        <div className="flex h-12">
          <h2 className="absolute text-gray-500 text-lg mb-4 select-none">
            Gerar Depósito
          </h2>
          {error && (
            <h2 className="w-full text-red-500 font-bold text-center text-lg">
              {error}
            </h2>
          )}
        </div>

        <div className="flex justify-around">
          <div>
            <button
              className="bg-neutral-900 text-white shadow-2xl rounded-lg w-48 h-12 cursor-pointer"
              type="submit"
              onClick={handlePaymentSlip}
            >
              Gerar boleto
            </button>
          </div>
          <div>
            <button
              className="bg-white/70 text-gray-700 shadow-2xl rounded-lg w-48 h-12 cursor-pointer"
              type="button"
              onClick={() => window.alert('todo - suporte a pix')}
            >
              Enviar pix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
