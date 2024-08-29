// AuthenticationRepository.ts

// Importa o serviço de API para comunicação com o backend
import { ApiService } from "../../api/ApiService";

// Importa a classe base para repositórios de autenticação
import { AuthRepositoryBase } from "../models/class/DatabaseRepository";

// Importa as interfaces para as requisições e respostas de autenticação
import { LoggedDataRequest } from "../models/interfaces/LoggedDataRequest";
import { LoggedUserResponse } from "../models/interfaces/LoggedUserResponse";

// Classe responsável por lidar com a autenticação do usuário
export class AuthenticationRepository extends AuthRepositoryBase {
    private service: ApiService;

    constructor(apiService: ApiService) {
        super();
        this.service = apiService;
    }

    // Método para autenticação do usuário usando o serviço da API
    async loginUser(loginRequest: LoggedDataRequest): Promise<LoggedUserResponse> {
        // Chama o método de login da API e retorna a resposta
        const loggedUserResponse: LoggedUserResponse = await this.service.loginUser(loginRequest);
        // Define o token de autenticação no cabeçalho para futuras requisições
        this.service.setAuthToken(loggedUserResponse.token);
        return loggedUserResponse;
    }
}
