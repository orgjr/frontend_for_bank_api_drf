import { useState } from 'react';
import Menu from '../components/Menu';
import { useOutletContext } from 'react-router-dom';
import { getCSRFToken } from '../helpers/getCsrfToken';
import { formatMoneyInput } from '../helpers/formatMoneyInput';

export default function Payment() {
  const { menuOpen, setMenuOpen } = useOutletContext();
  const [rawValue, setRawValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [account, setAccount] = useState('');
  const [digit, setDigit] = useState('');

  function handleChange(e) {
    const onlyNumbers = e.target.value.replace(/\D/g, '');

    if (!onlyNumbers) {
      setDisplayValue('');
      setRawValue(0);
      return;
    }

    const numeric = onlyNumbers || 0;

    const parsed = Number(numeric) / 100;
    setRawValue(parsed);

    setDisplayValue(formatMoneyInput(numeric));
  }

  // todo
  async function handleSubmit() {
    const response = await fetch(
      'http://localhost:8000/bank/transaction/transfer/',
      {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({
          account: account.toString() + digit.toString(),
          value: rawValue,
        }),
      },
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="flex flex-col h-full max-w-6xl w-full mx-auto p-10 gap-8">
      {/* Card - title */}
      <div className="flex gap-8">
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col bg-white/70 rounded-2xl h-36 p-6  shadow-md border gap-4">
            <h1 className="text-2xl text-gray-800 font-semibold">
              Transferência
            </h1>
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Faça transferência entre contas
            </h2>
          </div>
          {/* Card - Details */}
          <div className="bg-white/70 rounded-2xl h-36 p-6 shadow-md border">
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Detalhes da transferência
            </h2>
            <div className="grid grid-cols-2 gap-24">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="account-input"
                  className="text-gray-500 text-sm select-none"
                >
                  Conta destinatária
                </label>
                <div className="flex gap-1 items-center">
                  <input
                    type="text"
                    className="text-end p-2 border border-gray-700 rounded-md flex-grow max-w-48 h-10 bg-white/70 focus:border-gray-700 focus:outline-none"
                    id="account-input"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  ></input>
                  <span>-</span>
                  <input
                    type="text"
                    className="text-center p-2 border border-gray-700 rounded-md flex-grow max-w-12 h-10 bg-white/70 focus:border-gray-700 focus:outline-none"
                    id="digit-input"
                    value={digit}
                    onChange={(e) => setDigit(e.target.value)}
                  ></input>
                </div>
              </div>

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
                    className="text-end p-2 border border-gray-700 rounded-md w-40 h-10 bg-white/70 focus:border-gray-700 focus:outline-none"
                    id="value-input"
                    placeholder="0,00"
                    value={displayValue}
                    onChange={handleChange}
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
        <h2 className="text-gray-500 text-lg mb-4 select-none">
          Finalize a transferência
        </h2>

        <div className="flex justify-center w-full">
          <div>
            <button
              className="bg-neutral-900 text-white shadow-2xl rounded-lg w-48 h-12 cursor-pointer"
              type="submit"
              onClick={handleSubmit}
            >
              Transferir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
