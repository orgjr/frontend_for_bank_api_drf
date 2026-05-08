import { useOutletContext } from 'react-router-dom';
import Menu from '../components/Menu';
import { formatCurrency } from '../helpers/formatCurrency';
import { useErrorHandler } from '../hooks/useErrorHandler';

export default function UserDashboard() {
  const { menuOpen, setMenuOpen, user, userOption, accountOption } =
    useOutletContext();
  const { navigateToError } = useErrorHandler();

  if (!user || !userOption || !accountOption) {
    navigateToError(400, 'Ocorreu um erro na verificação do usuário.');
    return;
  }

  if (!accountOption) {
    return null;
  }

  return (
    <>
      {user && (
        <div className="flex flex-col h-full max-w-6xl w-full mx-auto p-10 gap-8">
          <div className="flex gap-8">
            <div className="flex flex-col w-full gap-8">
              {/* Card - Saudação */}
              <div className="bg-white/70 h-20 rounded-2xl p-6 shadow-md border">
                <h1 className="text-2xl text-gray-800">
                  Olá,{' '}
                  <span className="font-bold">
                    {user.first_name} {user.last_name}!
                  </span>
                </h1>
              </div>

              {/* Card - Dados do usuário */}
              <div className="bg-white/70 h-52 rounded-2xl p-6 shadow-md border">
                <h2 className="text-gray-500 text-lg mb-4 select-none">
                  Informações pessoais
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {userOption.map((choice) => (
                    <div key={choice.title}>
                      <span className="text-gray-500 text-sm select-none">
                        {choice.title}
                      </span>
                      <p className="text-gray-900 font-semibold">
                        {choice.info}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
          </div>
          {/* Card - Conta bancária */}
          <div className="bg-white/70 rounded-2xl p-6 shadow-md border">
            <h2 className="text-gray-500 text-lg mb-4 select-none">Conta</h2>

            <div className="flex justify-between items-center">
              {accountOption.map((choice) => (
                <div key={choice.title}>
                  <span className="text-gray-500 text-sm select-none">
                    {choice.title}
                  </span>
                  <p className="text-gray-900 font-semibold">{choice.info}</p>
                </div>
              ))}

              <div className="text-start mr-8">
                <span className="text-gray-500 text-sm select-none">Saldo</span>
                <p className="text-2xl">
                  <span className="text-gray-500 text-sm select-none">R$ </span>
                  <span className="text-green-600 font-bold">
                    {formatCurrency(user.balance)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
