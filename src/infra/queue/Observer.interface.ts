import CommandInterface from "../../application/command/Command.interface";

export default interface ObserverInterface {
  operation: string;
  notify(command: CommandInterface): void;
}
