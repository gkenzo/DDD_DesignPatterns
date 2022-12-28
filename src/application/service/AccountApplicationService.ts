import AccountBuilder from "../../domain/builder/AccountBuilder";
import AccountRepositoryInterface from "../../domain/repository/AccountRepository.interface";
import CreditCommand from "../command/CreditCommand";
import DebitCommand from "../command/DebitCommand";
import Publisher from "../../infra/queue/Publisher";
import TransferCommand from "../command/TransferCommand";

export default class AccountApplicationService {
  constructor(
    readonly publisher: Publisher,
    readonly accountRepository: AccountRepositoryInterface
  ) {}

  create(document: string) {
    const account = new AccountBuilder(document).build();
    this.accountRepository.save(account);
  }

  get(accountDocument: string) {
    return this.accountRepository.get(accountDocument);
  }

  credit(accountDocument: string, amount: number) {
    const creditCommand = new CreditCommand(accountDocument, amount);
    this.publisher.publish(creditCommand);
  }

  debit(accountDocument: string, amount: number) {
    const debitCommand = new DebitCommand(accountDocument, amount);
    this.publisher.publish(debitCommand);
  }

  transfer(documentFrom: string, documentTo: string, amount: number) {
    const transferCommand = new TransferCommand(
      documentFrom,
      documentTo,
      amount
    );
    this.publisher.publish(transferCommand);
  }
}
