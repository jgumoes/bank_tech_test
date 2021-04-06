describe('Bank', function() {
  var account;
  var todaysDate; 
  beforeEach(function() {
    account = new Bank();
    var date = new Date();
    todaysDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  });

  it("should have an empty balance by default", function() {
    expect(account.balance).toEqual(0);
  });

  it('should have an empty transactions list when initialised', function() {
    expect(account.transactions).toEqual([]);
  });

  describe('.deposit', function() {
    beforeEach(function() {
      account.deposit(13.37, 20, 4, 2069);
    });
    
    it('should increase the balance by amount deposited', function() {
      expect(account.balance).toEqual(13.37);
    });
      
    it('should call the transaction creator with the appropriate type and amount, and todays date', function () {
      spyOn(account, '_transaction');
      account.deposit(300);
      expect(account._transaction).toHaveBeenCalledWith(300, "credit", todaysDate);
    });
    
    it('should put a transaction object in the transactions array', function() {
      var depositTransaction = {"amount": 13.37, "type": "credit", "date": "20/4/2069"};
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
      expect(account._createDate(null, null, null)).toEqual(todaysDate);
    });
  });

  describe('.withdraw', function() {
    beforeEach(function() {
      account.withdraw(300.99, 20, 4, 2069);
    });
    it('should decrease the balance by amount deposited', function() {
      expect(account.balance).toEqual(-300.99)
    });

    it('should call the transaction creator with the appropriate type and amount, and todays date', function () {
      spyOn(account, '_transaction');
      account.withdraw(300);
      expect(account._transaction).toHaveBeenCalledWith(300, "debit", todaysDate);
    });

    it('should put a transaction object in the transactions array', function() {
      var withdrawTransaction = {"amount": 300.99, "type": "debit", "date": "20/4/2069"};
      var transObj = account.transactions[0];

      expect(transObj.amount).toEqual(withdrawTransaction.amount);
      expect(transObj.date).toEqual(withdrawTransaction.date);
      expect(transObj.type).toEqual(withdrawTransaction.type);
    });
  });
});