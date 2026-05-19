import { useState, useRef, useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import Menu from '../components/Menu';
import { formatAccounts } from '../helpers/formatAccounts';
import { formatCurrency } from '../helpers/formatCurrency';
import { copyToClipboard } from '../helpers/copyToClipboard';
import { CopyButton } from '../components/CopyButton';
import { CopiedButton } from '../components/CopiedButton';
import { formatIsoDateString } from '../helpers/formatIsoDateString';
import { useErrorHandler } from '../hooks/useErrorHandler';

export default function PaymentSlip() {
  const [copybutton, setCopybutton] = useState(false);
  const location = useLocation();
  const paymentSlipDetails = location.state?.paymentSlipDetails;
  const { navigateToError } = useErrorHandler();
  const { menuOpen, setMenuOpen } = useOutletContext();
  const navigateRef = useRef(navigateToError);

  useEffect(() => {
    if (!paymentSlipDetails) {
      navigateRef.current = navigateToError(
        400,
        'Código inválido ou acesso direto não permitido',
      );
    }
  }, [navigateToError, paymentSlipDetails]);

  async function handleCopy() {
    await copyToClipboard(paymentSlipDetails.digitable_line);
    setCopybutton(true);
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
                <div className="flex gap-4 text-sm">
                  <h2 className="text-gray-500 select-none">Linha digitável</h2>
                  <button
                    className="cursor-pointer"
                    onClick={() => handleCopy()}
                  >
                    {copybutton ? <CopiedButton /> : <CopyButton />}
                  </button>
                </div>
                <div className="flex">
                  <div>
                    <span className="text-gray-900 font-semibold">
                      {paymentSlipDetails.digitable_line}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* payment slip - Details */}
          <div className="flex flex-col justify-between bg-white/70 rounded-2xl p-6 shadow-md border gap-4">
            <div>
              <span className="text-gray-500 text-sm select-none">
                Número do documento
              </span>
              <p className="text-gray-900 font-semibold">
                {paymentSlipDetails.document_number}
              </p>
            </div>

            <div className="flex justify-between">
              <div>
                <span className="text-gray-500 text-sm select-none">
                  Data de vencimento
                </span>
                <p className="text-gray-900 font-semibold">
                  {paymentSlipDetails.due_date &&
                    formatIsoDateString(paymentSlipDetails.due_date)}
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
            <h2 className="text-gray-500 text-sm select-none">Agência</h2>
            <span className="text-gray-900 font-semibold">
              {paymentSlipDetails.beneficiary_agency}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-56 gap-8">
          <div>
            <h2 className="text-gray-500 text-sm select-none">Documento</h2>
            <span className="text-gray-900 font-semibold">
              {paymentSlipDetails.beneficiary_document}76756756
            </span>
          </div>

          <div>
            <h2 className="text-gray-500 text-sm select-none">Conta</h2>
            <span className="text-gray-900 font-semibold">
              {formatAccounts(paymentSlipDetails.beneficiary_account)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
