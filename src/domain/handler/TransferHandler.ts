import AccountRepository from "../../infra/repository/AccountRepositoryMemory";
import ObserverInterface from "../../infra/queue/Observer.interface";
import TransferCommand from "../../application/command/TransferCommand";
import TransferService from "../service/TransferService";

export default class TransferHandler implements ObserverInterface {
  readonly operation = "transfer";

  constructor(readonly accountRepository: AccountRepository) {}

  notify(command: TransferCommand): void {
    const accountFrom = this.accountRepository.get(command.accountDocumentFrom);
    const accountTo = this.accountRepository.get(command.accountDocumentTo);

    if (accountFrom && accountTo) {
      const transferService = new TransferService();
      transferService.transfer(accountFrom, accountTo, command.amount);
    }
  }
}
