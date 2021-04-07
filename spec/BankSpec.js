/* eslint-disable init-declarations */
/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
describe("Bank", () => {
  var account;
  var testDate; 
  beforeEach(() => {
    account = new Bank();

    var date = new Date();
    testDate = date.getDate() + "/"
    var todaysMonth = date.getMonth();
    if (todaysMonth < 10){ testDate += 0}
    testDate += todaysMonth + "/" + date.getFullYear();
  });

  it("should have an empty balance by default", () => {
    expect(account.balance).toEqual(0);
  });

  it("should have an empty transactions list when initialised", () => {
    expect(account.transactions).toEqual([]);
  });

  describe(".deposit", () => {
    beforeEach(() => {
      account.deposit(13.37, 20, 4, 2069);
    });
    
    it("should increase the balance by amount deposited", () => {
      expect(account.balance).toEqual(13.37);
    });
      
    it("should call the transaction creator with the appropriate type and amount, and todays date", () => {
      spyOn(account, "_transaction");
      account.deposit(300);

      expect(account._transaction).toHaveBeenCalledWith(300, "credit", testDate);
    });
    
    it("should put a transaction object in the transactions array", () => {
      var depositTransaction = {
        "amount": 13.37,
        "type": "credit",
        "date": "20/04/2069"
        };
      var transObj = account.transactions[0];

      expect(transObj.amount).toEqual(depositTransaction.amount);
      expect(transObj.date).toEqual(depositTransaction.date);
      expect(transObj.type).toEqual(depositTransaction.type);
    });
  });

  describe("._createDate", () => {
    it("should return a string of the date entered", () => {
      expect(account._createDate(20, 12, 2069)).toEqual("20/12/2069");
    });

    it("should return todays date when passed nulls", () => {
      expect(account._createDate(null, null, null)).toEqual(testDate);
    });
  });

  describe(".withdraw", () => {
    beforeEach(() => {
      account.withdraw(300.99, 20, 4, 2069);
    });

    it("should decrease the balance by amount deposited", () => {
      expect(account.balance).toEqual(-300.99)
    });

    it("withdraw should call the transaction creator with the appropriate type and amount, and todays date", () => {
      spyOn(account, "_transaction");
      account.withdraw(300);

      expect(account._transaction).toHaveBeenCalledWith(300, "debit", testDate);
    });

    it("withdraw should put a transaction object in the transactions array", () => {
      var withdrawTransaction = {
        "amount": 300.99,
        "type": "debit",
        "date": "20/04/2069"
      };
      var transObj = account.transactions[0];

      expect(transObj.amount).toEqual(withdrawTransaction.amount);
      expect(transObj.date).toEqual(withdrawTransaction.date);
      expect(transObj.type).toEqual(withdrawTransaction.type);
    });
  });

  describe(".statement", () => {
    it("prints the acceptance criteria", () => {
      account.deposit(1000, 10, 1, 2012);
      account.deposit(2000, 13, 1, 2012);
      account.withdraw(500, 14, 1, 2012);
      var statement = account.statement().split("\n");

      // i used regex in case i wanted to format the table better (which i did)
      expect(statement[0]).toEqual(jasmine.stringMatching(/date\s*\|\|\s*credit\s*\|\|\s*debit\s*\|\|\s*balance\s*/u));
      expect(statement[1]).toEqual(jasmine.stringMatching(/14\/01\/2012\s*\|\|\s*\|\|\s*500.00\s*\|\|\s*2500.00\s*/u));
      expect(statement[2]).toEqual(jasmine.stringMatching(/13\/01\/2012\s*\|\|\s*2000.00\s*\|\|\s*\|\|\s*3000.00\s*/u));
      expect(statement[3]).toEqual(jasmine.stringMatching(/10\/01\/2012\s*\|\|\s*1000.00\s*\|\|\s*\|\|\s*1000.00\s*/u));
    });
  });
});