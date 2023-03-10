import AccountBuilder from "../builder/AccountBuilder";
import Transaction from "./Transaction";

export default class Account {
  private bank: string | undefined;
  private branch: string | undefined;
  private account: string | undefined;
  public document: string;
  private transactions: Transaction[];

  constructor(accountBuilder: AccountBuilder) {
    this.bank = accountBuilder.bank;
    this.branch = accountBuilder.branch;
    this.account = accountBuilder.account;
    this.document = accountBuilder.document;
    this.transactions = [];
  }

  credit(amount: number) {
    this.transactions.push(new Transaction(amount, "credit"));
  }

  debit(amount: number) {
    this.transactions.push(new Transaction(amount, "debit"));
  }

  balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      if (transaction.type == "credit") balance += transaction.amount;
      if (transaction.type == "debit") balance -= transaction.amount;
    }
    return balance;
  }

  getTransactions() {
    return this.transactions;
  }
}
