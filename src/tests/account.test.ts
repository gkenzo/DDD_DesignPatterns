import AccountApplicationService from "../application/service/AccountApplicationService";
import AccountRepositoryMemory from "../infra/repository/AccountRepositoryMemory";
import Publisher from "../infra/queue/Publisher";
import CreditHandler from "../domain/handler/CreditHandler";
import DebitHandler from "../domain/handler/DebitHandler";
import TransferHandler from "../domain/handler/TransferHandler";

let service: AccountApplicationService;
describe("account tests", () => {
  beforeEach(() => {
    const accountRepo = new AccountRepositoryMemory();
    const publisher = new Publisher();
    publisher.register(new CreditHandler(accountRepo));
    publisher.register(new DebitHandler(accountRepo));
    publisher.register(new TransferHandler(accountRepo));
    service = new AccountApplicationService(publisher, accountRepo);
  });
  it("should be able to create a new account", () => {
    service.create("111.111.111-11");
    const account = service.get("111.111.111-11");

    expect(account).toBeDefined();
    expect(account.balance()).toBe(0);
  });
  it("should be able to add credit to an exising account", () => {
    service.create("111.111.111-11");
    service.credit("111.111.111-11", 1000);
    service.credit("111.111.111-11", 3000);

    const account = service.get("111.111.111-11");

    expect(account.balance()).toBe(4000);
  });

  it("should be able to debit an exising account", () => {
    service.create("111.111.111-11");
    service.credit("111.111.111-11", 1000);
    service.debit("111.111.111-11", 500);

    const account = service.get("111.111.111-11");

    expect(account.balance()).toBe(500);
  });

  it("should be able to transfer between two accounts", () => {
    service.create("111.111.111-11");
    service.create("222.222.222-22");

    service.credit("111.111.111-11", 1000);
    service.credit("222.222.222-22", 1000);
    service.transfer("111.111.111-11", "222.222.222-22", 500);

    const accountFrom = service.get("111.111.111-11");
    const accountTo = service.get("222.222.222-22");

    expect(accountFrom.balance()).toBe(500);
    expect(accountTo.balance()).toBe(1500);
  });
});
