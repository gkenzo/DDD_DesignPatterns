export default class Transaction {
  readonly amount: number;
  readonly type: string;

  constructor(amount: number, type: string) {
    this.amount = amount;
    this.type = type;
  }
}
