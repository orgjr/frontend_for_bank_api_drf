import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
  useLocation,
} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  let title = 'Erro inesperado';
  let message = 'Algo deu errado.';

  const stateError = location.state?.error;

  if (stateError) {
    title = stateError.status?.toString() || 'Erro';
    message = stateError.statusText || stateError.data || message;
  } else if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = '404';
      message = 'Página não encontrada';
    } else if (error.status === 500) {
      title = '500';
      message = 'Erro interno do servidor';
    } else {
      title = error.status;
      message = error.statusText;
    }
  } else if (error instanceof Response) {
    title = error.status.toString();
    message = error.statusText || message;
  }

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-neutral-800/30"></div>

      {/* conteúdo */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-4">{title}</h1>
        <p className="text-gray-300 mb-6">{message}</p>

        <button
          onClick={() => navigate('/user/dashboard')}
          className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
