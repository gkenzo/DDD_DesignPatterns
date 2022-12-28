import AccountRepository from "../../infra/repository/AccountRepositoryMemory";
import CreditCommand from "../../application/command/CreditCommand";
import ObserverInterface from "../../infra/queue/Observer.interface";

export default class CreditHandler implements ObserverInterface {
  readonly operation = "credit";

  constructor(readonly accountRepository: AccountRepository) {}

  notify(command: CreditCommand): void {
    const account = this.accountRepository.get(command.accountDocument);
    if (account) account.credit(command.amount);
  }
}
