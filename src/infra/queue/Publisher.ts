import CommandInterface from "../../application/command/Command.interface";
import ObserverInterface from "./Observer.interface";

export default class Publisher {
  observers: ObserverInterface[];
  constructor() {
    this.observers = [];
  }

  register(observer: ObserverInterface) {
    this.observers.push(observer);
  }

  publish(command: CommandInterface) {
    for (const observer of this.observers) {
      if (observer.operation === command.operation) observer.notify(command);
    }
  }
}
