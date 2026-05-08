import { useEffect, useMemo, useState, useRef } from 'react';
import Menu from '../components/Menu';
import { useOutletContext } from 'react-router-dom';
import { formatAccounts } from '../helpers/formatAccounts';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { getPastDate } from '../helpers/getPastDate';
import { formatIsoDatetimeString } from '../helpers/formatIsoDatetimeString';
import { formatCurrency } from '../helpers/formatCurrency';

export default function Extract() {
  const { menuOpen, setMenuOpen, user } = useOutletContext();
  const [transactions, setTransactions] = useState([]);
  const { navigateToError } = useErrorHandler();
  const navigateRef = useRef(navigateToError);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(() => getPastDate(15));

  const today = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);
  const past15 = useMemo(() => getPastDate(15), []);
  const past30 = useMemo(() => getPastDate(30), []);

  useEffect(() => {
    navigateRef.current = navigateToError;
  }, [navigateToError]);

  useEffect(() => {
    async function handleRequests() {
      const url = `http://localhost:8000/bank/transactions/extract/?start_date=${startDate}&end_date=${today}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        setTransactions(data.transactions ?? []);
      } catch (err) {
        navigateRef.current(500, 'Erro no servidor', err);
      } finally {
        setIsLoading(false);
      }
    }

    handleRequests();
  }, [startDate, today]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full max-w-6xl w-full mx-auto p-10 gap-8">
        <div className="text-center text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-6xl w-full mx-auto p-10 gap-8 mb-auto">
      {/* Card - Title */}
      <div className="flex gap-8 shrink-0">
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col bg-white/70 rounded-2xl h-36 p-6  shadow-md border gap-4">
            <h1 className="text-2xl text-gray-800 font-semibold">Detalhes</h1>
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Visualize detalhes da transação
            </h2>
          </div>
          {/* Card - Details */}
          <div className="bg-white/70 rounded-2xl h-36 p-6 shadow-md border">
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Movimentações
            </h2>
            {user && (
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <span className="text-gray-500 text-sm select-none">
                    Usuário
                  </span>
                  <p className="text-gray-900 font-semibold">{user.username}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm select-none">
                    Agência
                  </span>
                  <p className="text-gray-900 font-semibold">{user.agency}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm select-none">
                    Conta
                  </span>
                  <p className="text-gray-900 font-semibold">
                    {formatAccounts(user.account)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
      </div>

      {/* Card - Complete */}

      <div className="flex flex-col bg-white/70 bg-transparent w-full gap-8 p-6 border rounded-2xl">
        <div className="flex justify-between">
          <div>
            <h2 className="text-gray-500 text-lg mb-4 select-none">
              Últimas transações
            </h2>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center">
              <label className="flex text-gray-500 text-sm select-none cursor-pointer items-center">
                <input
                  type="radio"
                  name="filter-by-date"
                  checked={startDate === past15}
                  onChange={() => setStartDate(past15)}
                  className="text-gray-500 select-none mr-1 cursor-pointer"
                />
                últimos 15 dias
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex text-gray-500 text-sm select-none cursor-pointer items-center">
                <input
                  type="radio"
                  name="filter-by-date"
                  checked={startDate === past30}
                  onChange={() => setStartDate(past30)}
                  className="text-gray-500 select-none mr-1 cursor-pointer"
                />
                últimos 30 dias
              </label>
            </div>
          </div>
        </div>
        {transactions?.length === 0 ? (
          <p className="text-gray-500">Nenhuma transação encontrada</p>
        ) : (
          transactions.map((obj) => (
            <div
              className="grid grid-cols-5 h-24 p-6 shadow-md"
              key={obj.transaction_number}
            >
              <div>
                <span className="text-gray-500 text-sm select-none">ID</span>
                <p className="text-gray-900 font-semibold">
                  {obj.transaction_number}
                </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm select-none">Tipo</span>
                <p className="text-gray-900 font-semibold">{obj.type}</p>
              </div>

              <div className="text-start">
                <span className="text-gray-500 text-sm select-none">Valor</span>
                <p>
                  <span className="text-gray-500 text-sm select-none">R$ </span>
                  <span className="text-green-600 font-bold text-lg">
                    {formatCurrency(obj.amount)}
                  </span>
                </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm select-none">Data</span>
                <p className="text-gray-900 font-semibold">
                  {formatIsoDatetimeString(obj.date)}
                </p>
              </div>

              {obj.recipient ? (
                <div>
                  <span className="text-gray-500 text-sm select-none">
                    Beneficiário
                  </span>
                  <p className="text-gray-900 font-semibold">
                    {formatAccounts(obj.recipient)}
                  </p>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
