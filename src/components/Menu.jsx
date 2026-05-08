import { useNavigate, Link } from 'react-router-dom';

export default function Menu({ setMenuOpen }) {
  const navigate = useNavigate();
  const account = [
    { option: 'Extrato', link: '/user/extract/' },
    { option: 'Depósito', link: '/user/deposit' },
    { option: 'Pagamentos', link: '/user/payment' },
    { option: 'Transferência', link: '/user/transfer' },
    { option: 'Open Finance', link: '#' },
  ];
  const services = [
    { option: 'Cartão de Crédito', link: '#' },
    { option: 'Empréstimos', link: '#' },
    { option: 'Financiamentos', link: '#' },
    { option: 'Seguros', link: '#' },
  ];
  return (
    <div className="mx-auto flex flex-col w-lg items-end gap-8">
      <nav
        className="shadow-2xs shadow-white h-80 px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-8 flex gap-10">
          <ul className="w-42 select-none">
            <span className="text-lg text-gray-300 text-shadow-md">
              Conta Corrente
            </span>
            {account.map((choice) => (
              <li
                className="mt-4 py-1 px-2 text-md text-gray-400 hover:bg-white/70 hover:text-gray-700 text-shadow-md cursor-pointer"
                key={choice.option}
                onClick={() => {
                  navigate(choice.link);
                  setMenuOpen(false);
                }}
              >
                {choice.option}
              </li>
            ))}
          </ul>
          <ul className="w-42 select-none">
            <span className="text-lg text-gray-300">Outros Serviços</span>
            {services.map((choice) => (
              <li
                className="mt-4 py-1 px-2 text-md text-gray-400 hover:bg-white/70 hover:text-gray-700 text-shadow-md cursor-pointer"
                key={choice.option}
                onClick={() => {
                  navigate(choice.link);
                  setMenuOpen(false);
                }}
              >
                {choice.option}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-end text-md text-gray-300 text-shadow-md select-none">
          <Link to="/logout">Sair</Link>
        </div>
      </nav>
    </div>
  );
}
