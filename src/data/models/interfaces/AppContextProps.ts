import { DatabaseRepository } from "../class/DatabaseRepository";
import { LoggedDataRequest } from "./LoggedDataRequest";
import { LoggedUserResponse } from "./LoggedUserResponse";

export interface AppContextProps {
    user: LoggedUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<LoggedUserResponse | null>>;
    login: (loginData: LoggedDataRequest) => Promise<LoggedUserResponse | undefined>;
    session: () => Promise<void>;
    logout: () => Promise<void>;
    repository: DatabaseRepository;
    isAuthenticated: boolean;
}