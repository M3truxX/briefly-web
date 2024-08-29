import RoutApp from './routes'; // Importa o componente de rotas, que define as rotas da aplicação
import { AuthProvider } from '../src/contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RoutApp /> {/* Componente que exibe o componente de rotas */}
      </AuthProvider>
    </div>
  );
}

export default App;