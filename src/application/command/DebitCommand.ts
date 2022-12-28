import CommandInterface from "./Command.interface";

export default class DebitCommand implements CommandInterface {
  readonly operation = "debit";
  constructor(readonly accountDocument: string, readonly amount: number) {}
}
