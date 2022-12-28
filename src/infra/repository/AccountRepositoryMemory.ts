import Account from "../../domain/entity/Account";
import AccountRepositoryInterface from "../../domain/repository/AccountRepository.interface";

export default class AccountRepositoryMemory
  implements AccountRepositoryInterface
{
  accounts: Account[];
  constructor() {
    this.accounts = [];
  }

  save(account: Account) {
    this.accounts.push(account);
  }

  get(document: string) {
    const account = this.accounts.find((acc) => acc.document === document);

    if (!account) throw new Error("Account not found!");

    return account;
  }
}
