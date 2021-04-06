describe('Bank', function() {
  var account;

  beforeEach(function() {
    account = new Bank();
  });

  it("should have an empty balance by default", function() {
    expect(account.balance).toEqual(0);
  });

  it('should have an empty transactions list when initialised', function() {
    expect(account.transactions).toEqual([]);
  });

  describe('.deposit', function() {
    beforeEach(function() {
      spyOn(account, '_transaction');
      account.deposit(300, 20, 4, 2069);
    });
    
    it('should increase the balance by amount deposited', function() {
      var account = new Bank();
      account.deposit(20);
      expect(account.balance).toEqual(20);
    });
      
    it('should call the transaction creator with the appropriate date, type, and amount', function () {
      expect(account._transaction).toHaveBeenCalledWith(300, "credit", "20/4/2069");
    });
    
    it('should put a transaction object in the transactions array', function() {
      var account = new Bank();   // these must be here otherwise the test fails. I have no idea why.
      account.deposit(300, 20, 4, 2069);
      var depositTransaction = {"amount": 300, "type": "credit", "date": "20/4/2069"};

      var transObj = account.transactions[0];

      expect(transObj.amount).toEqual(depositTransaction.amount);
      expect(transObj.date).toEqual(depositTransaction.date);
      expect(transObj.type).toEqual(depositTransaction.type);
    });
  });

  describe('._createDate', function() {
    it('should return a string of the date entered', function() {
      expect(account._createDate(20, 4, 2069)).toEqual("20/4/2069");
    });

    it('should return todays date when passed nulls', function() {
      var date = new Date();
      var today = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      expect(account._createDate(null, null, null)).toEqual(today);
    });
  });

  describe('.withdraw', function() {
    beforeEach(function() {
      account = new Bank();
    });
    it('should decrease the balance by amount deposited', function() {
      // var account = new Bank();
      account.withdraw(30.99);
      expect(account.balance).toEqual(-30.99)
    });

    it('should call the transaction creator with the appropriate date, type, and amount', function () {
      spyOn(account, '_transaction');
      account.withdraw(300, 20, 4, 2069);
      expect(account._transaction).toHaveBeenCalledWith(300, "debit", "20/4/2069");
    });

    it('should put a transaction object in the transactions array', function() {
      // var account = new Bank();   // these must be here otherwise the test fails. I have no idea why.
      account.withdraw(300, 20, 4, 2069);
      var withdrawTransaction = {"amount": 300, "type": "debit", "date": "20/4/2069"};

      var transObj = account.transactions[0];

      expect(transObj.amount).toEqual(withdrawTransaction.amount);
      expect(transObj.date).toEqual(withdrawTransaction.date);
      expect(transObj.type).toEqual(withdrawTransaction.type);
    });
  });
});