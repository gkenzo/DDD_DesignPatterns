import Account from "../entity/Account";

export default interface AccountRepositoryInterface {
  save(account: Account): void;
  get(accountDocument: string): Account;
}
