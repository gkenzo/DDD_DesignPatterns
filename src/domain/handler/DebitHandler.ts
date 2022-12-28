import AccountRepository from "../../infra/repository/AccountRepositoryMemory";
import DebitCommand from "../../application/command/DebitCommand";
import ObserverInterface from "../../infra/queue/Observer.interface";

export default class DebitHandler implements ObserverInterface {
  readonly operation = "debit";

  constructor(readonly accountRepository: AccountRepository) {}

  notify(command: DebitCommand): void {
    const account = this.accountRepository.get(command.accountDocument);
    if (account) account.debit(command.amount);
  }
}
