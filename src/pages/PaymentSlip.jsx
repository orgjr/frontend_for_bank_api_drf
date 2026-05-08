import { useOutletContext, useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import { getCSRFToken } from '../helpers/getCsrfToken';
import { formatCurrency } from '../helpers/formatCurrency';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { formatIsoDatetimeString } from '../helpers/formatIsoDatetimeString';
import { formatIsoDateString } from '../helpers/formatIsoDateString';
import { formatTitle } from '../helpers/formatTitle';

export default function PaymentSlip() {
  const { menuOpen, setMenuOpen } = useOutletContext();
  const { navigateToError } = useErrorHandler();
  const location = useLocation();
  const paymentSlipDetails = location.state?.paymentSlipDetails;
  const today = new Date().toISOString().split('T')[0];

  if (!paymentSlipDetails) {
    navigateToError(400, 'Código inválido ou acesso direto não permitido');
    return;
  }

  function alertIfExpired() {
    const isExpired = paymentSlipDetails.due_date < today;
    return (
      <span className={isExpired ? 'text-red-500' : 'text-gray-900'}>
        {formatIsoDateString(paymentSlipDetails.due_date)}
      </span>
    );
  }

  // todo
  async function handleSubmit() {
    const response = await fetch(
      'http://localhost:8000/bank/transaction/payment/',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({
          amount: paymentSlipDetails.amount,
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      return;
    }
    console.log(data);
  }

  return (
    <div className="flex flex-col h-full max-w-6xl w-full mx-auto p-10 gap-8">
      <div className="flex gap-8">
        {/* Card - Title */}
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col bg-white/70 rounded-2xl h-36 p-6  shadow-md border gap-4">
            <h1 className="text-2xl text-gray-800 font-semibold">Boleto</h1>
            <div className="flex justify-between">
              <div>
                <h2 className="text-gray-500 text-sm select-none">
                  Linha digitável
                </h2>
                <span className="text-gray-900 font-semibold">
                  {paymentSlipDetails.digitable_line}
                </span>
              </div>
            </div>
          </div>
          {/* payment slip - Details */}
          <div className="flex justify-between bg-white/70 rounded-2xl p-6 shadow-md border gap-8">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <span className="text-gray-500 text-sm select-none">
                  Criado em
                </span>
                <p className="text-gray-900 font-semibold">
                  {formatIsoDatetimeString(paymentSlipDetails.created_at)}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm select-none">
                  Status
                </span>
                <p className="text-gray-900 font-semibold">
                  {formatTitle(paymentSlipDetails.status)}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8">
              <div>
                <span className="text-gray-500 text-sm select-none">
                  Data de vencimento
                </span>
                <p id="due-date" className="text-gray-900 font-semibold">
                  {alertIfExpired()}
                </p>
              </div>
              <div className="text-start w-56">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm select-none">
                    Valor
                  </span>
                  <div className="flex gap-1 items-center">
                    <span className="text-gray-500 text-sm select-none">
                      R$
                    </span>
                    <p className="text-green-700 font-semibold">
                      {formatCurrency(paymentSlipDetails.amount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {menuOpen && (
          <Menu className="shrink-0 w-64" setMenuOpen={setMenuOpen} />
        )}
      </div>

      {/* beneficiary - Details */}
      <div className="flex justify-between bg-white/70 rounded-2xl p-6 shadow-md border gap-8">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-gray-500 text-sm select-none">Beneficiário</h2>
            <span className="text-gray-900 font-semibold">
              {paymentSlipDetails.beneficiary_name}
            </span>
          </div>
          <div>
            <h2 className="text-gray-500 text-sm select-none">
              Data do pagamento
            </h2>
            <span className="text-gray-900 font-semibold">
              {paymentSlipDetails.payment_date
                ? formatIsoDateString(paymentSlipDetails.payment_date)
                : null}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-56 gap-8">
          <div>
            <h2 className="text-gray-500 text-sm select-none">Código</h2>
            <span className="text-gray-900 font-semibold">
              {paymentSlipDetails.bank_code}
            </span>
          </div>

          <div>
            <h2 className="text-gray-500 text-sm select-none">Instituição</h2>
            <span className="text-gray-900 font-semibold">
              {paymentSlipDetails.bank_name}
            </span>
          </div>
        </div>
      </div>

      {/* Card - Complete */}
      <div className="bg-white/70 rounded-2xl p-6 shadow-md border select-none">
        <h2 className="text-gray-500 text-lg mb-4 select-none">
          Pagar com saldo da conta
        </h2>

        <div className="flex justify-center">
          <div>
            <button
              className="bg-neutral-900 text-white shadow-2xl rounded-lg w-48 h-12 cursor-pointer"
              type="submit"
              onClick={handleSubmit}
            >
              Pagar com saldo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
