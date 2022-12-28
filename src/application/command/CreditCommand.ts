import CommandInterface from "./Command.interface";

export default class CreditCommand implements CommandInterface {
  readonly operation = "credit";
  constructor(readonly accountDocument: string, readonly amount: number) {}
}
