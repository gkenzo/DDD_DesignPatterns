import CommandInterface from "./Command.interface";

export default class TransferCommand implements CommandInterface {
  readonly operation = "transfer";
  constructor(
    readonly accountDocumentFrom: string,
    readonly accountDocumentTo: string,
    readonly amount: number
  ) {}
}
