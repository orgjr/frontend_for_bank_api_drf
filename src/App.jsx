import './styles/style.css';
import './styles/font.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
