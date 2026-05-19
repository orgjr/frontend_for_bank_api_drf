import { useState } from 'react';
import Menu from '../components/Menu';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../hooks/useErrorHandler';

export default function Payment() {
  const { menuOpen, setMenuOpen } = useOutletContext();
  const [errorMessage, setErrorMessage] = useState('');
  const { navigateToError } = useErrorHandler();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formatedCode = code?.replaceAll(/\D/g, '');

  async function handlePaymentSlip() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/bank/payment_slip/get/?payment_slip_number=${formatedCode}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.detail || 'Não foi possível carregar o boleto');
        console.log(data);
        return;
      }

      navigate('paymentslip/detail', {
        state: {
          paymentSlipDetails: data.detail || data,
        },
      });
    } catch (err) {
      navigateToError(500, 'Erro ao carregar dados do boleto', err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full max-w-6xl w-full mx-auto p-10 gap-8">
        <div className="text-center text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-6xl w-full mx-auto p-10 gap-8">
      {/* Card - Title */}
      <div className="flex gap-8">
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col bg-white/70 rounded-2xl h-36 p-6  shadow-md border gap-4">
            <h1 className="text-2xl text-gray-800 font-semibold">Pagamento</h1>
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Pague suas contas com boleto ou pix
            </h2>
          </div>
          {/* Card - Details */}
          <div className="bg-white/70 rounded-2xl h-36 p-6 shadow-md border">
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Insira a chave pix ou o código de barras
            </h2>
            <div className="flex">
              <div className="flex flex-col w-full gap-1">
                <label
                  htmlFor="value-input"
                  className="text-gray-500 text-sm select-none"
                >
                  Chave pix ou código de barras
                </label>
                <div className="flex gap-1 items-center">
                  <input
                    type="text"
                    className="px-2 border border-gray-700 rounded-md flex-grow max-w-144 h-10 bg-white/70 focus:border-gray-700 focus:outline-none"
                    id="value-input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        {menuOpen && (
          <Menu className="shrink-0 w-64" setMenuOpen={setMenuOpen} />
        )}
      </div>

      {/* Card - Complete */}
      <div className="bg-white/70 rounded-2xl p-6 shadow-md border select-none">
        <div className="flex h-12">
          <h2 className="absolute text-gray-500 text-lg mb-4 select-none">
            Forma de pagamento
          </h2>
          {errorMessage && (
            <h2 className="w-full text-red-500 font-bold text-center text-lg">
              {errorMessage}
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
              Pagar boleto
            </button>
          </div>
          <div>
            <button
              className="bg-white/70 text-gray-700 shadow-2xl rounded-lg w-48 h-12 cursor-pointer"
              type="submit"
              onClick={() => window.alert('todo - suporte a pix')}
            >
              Pagar com pix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
