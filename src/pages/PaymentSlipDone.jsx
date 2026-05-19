import Menu from '../components/Menu';
import { useLocation, useOutletContext } from 'react-router-dom';

export default function PaymentSlipDone() {
  const { menuOpen, setMenuOpen } = useOutletContext();
  const location = useLocation();
  const paymentSlipDetailsDone = location.state?.paymentSlipDetailsDone;
  const status = paymentSlipDetailsDone.status;
  const data = [paymentSlipDetailsDone.data];
  return (
    <div className="flex h-full max-w-6xl w-full mx-auto p-10 gap-8">
      <div className="w-full">
        <h2 className="text-lg text-white">Successfully payment.</h2>
        <p className="text-lg text-white">{status}</p>
        <div className="text-lg text-white">
          {data.map((value) => (
            <div key={value.ID}>
              <p>{value.ID}</p>
              <p>{value.amount}</p>
              <p>{value.type}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        {menuOpen && (
          <Menu className="shrink-0 w-64" setMenuOpen={setMenuOpen} />
        )}
      </div>
    </div>
  );
}
