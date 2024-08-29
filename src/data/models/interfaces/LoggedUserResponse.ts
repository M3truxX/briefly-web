import { Account } from "./Account";

export interface LoggedUserResponse {
    account: Account;
    token: string;
}