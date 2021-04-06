describe('Bank', function() {
  var account;

  beforeEach(function() {
    account = new Bank();
  });

  it("should have an empty balance by default", function() {
    expect(account.balance).toBe(0);
  });
});