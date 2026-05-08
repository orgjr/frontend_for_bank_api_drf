import { useNavigate } from 'react-router-dom';
import brand from '../assets/icons/logo.png';

export default function DashboardHeader({ setMenuOpen }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto w-full shadow-2xs shadow-white p-2">
      <ul className="mx-20 flex h-full items-center justify-between select-none">
        <li
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/user/dashboard/');
            setMenuOpen(false);
          }}
        >
          <img className="h-10" src={brand} alt="logo" />
        </li>
        <li
          className="mt-2 flex"
          onMouseEnter={() => setMenuOpen(true)}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          <span
            alt="menu"
            className="mt-auto text-lg text-gray-200 text-shadow-md cursor-pointer"
          >
            Menu
          </span>
        </li>
      </ul>
    </div>
  );
}
