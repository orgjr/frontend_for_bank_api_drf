import { useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/icons/logo.png';

export default function Header() {
  const containerRef = useRef(null);
  return (
    <>
      <nav className="absolute bg-transparency w-full py-2 z-10 select-none">
        <ul className="flex flex-row justify-around items-center">
          <li>
            <Link
              to="/"
              onClick={() =>
                containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
              }
            >
              <img className="h-10" src={logo} alt="logo" />
            </Link>
          </li>
          <li>
            <Link
              to="login/"
              className="inline-block w-auto text-center px-4 py-3 text-white transition-all bg-neutral-900 rounded-md sm:w-auto hover:bg-neutral-800 hover:text-white shadow-neutral-lg"
              href=""
            >
              Acesse sua conta
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <Outlet context={{ containerRef }} />
      </div>
    </>
  );
}
