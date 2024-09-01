import RoutApp from './routes'; // Importa o componente de rotas, que define as rotas da aplicação
import { AppProvider } from './contexts/AppContext';
import { ApiService } from './api/ApiService';
import { Config } from './Config';
import { DatabaseRepository } from './data/models/class/DatabaseRepository';
import { DefaultRepository } from './data/repository/DefaultRepository';

function App() {
  const apiService: ApiService = new ApiService(Config.BASE_URL);
  const database: DatabaseRepository = new DefaultRepository(apiService);

  return (
    <div className="App">
      <AppProvider repository={database}>
        <RoutApp /> {/* Componente que exibe o componente de rotas */}
      </AppProvider>
    </div>
  );
}

export default App;