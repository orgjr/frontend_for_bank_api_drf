import { Outlet, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import Footer from './components/Footer';
import background from './assets/images/dash_bg.png';
import { formatAccounts } from './helpers/formatAccounts';
import Menu from './components/Menu';

export default function Layout() {
  const { user } = useOutletContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideValue, setHideValue] = useState(true);

  const userOption = user
    ? [
        { title: 'Usuário', info: user.username },
        { title: 'E-mail', info: user.email },
        { title: 'Nome', info: user.first_name },
        { title: 'Sobrenome', info: user.last_name },
      ]
    : [];
  const accountOption = user
    ? [
        { title: 'Agência', info: user.agency },
        { title: 'Conta', info: formatAccounts(user.account) },
      ]
    : [];

  return (
    <div
      className="relative min-h-screen flex flex-col"
      onClick={() => setMenuOpen(false)}
    >
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="fixed inset-0 -z-10 bg-cover bg-left-bottom bg-no-repeat overflow-y-auto"
      ></div>
      <DashboardHeader setMenuOpen={setMenuOpen} />

      <main className="flex-1 z-20">
        {
          <Outlet
            context={{
              menuOpen,
              setMenuOpen,
              user,
              userOption,
              accountOption,
              hideValue,
              setHideValue,
            }}
          />
        }
      </main>
      <div className="select-none">
        <Footer className="z-20" />
      </div>
    </div>
  );
}
