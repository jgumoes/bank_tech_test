class Bank {
  constructor(balance = 0){
    this.balance = balance;
    this.transactions = [];
    this.date = new Date();
  };
}

Bank.prototype.withdraw = function(amount, date = null, month = null, year = null) {
  this.balance -= amount;
  this._transaction(amount, "debit", this._createDate(date, month, year));
}

Bank.prototype.deposit = function(amount, date = null, month = null, year = null) {
  this.balance += amount;
  this._transaction(amount, "credit", this._createDate(date, month, year))
};

// quasi-private functions below

Bank.prototype._transaction = function(amount, type, date){
  const tObj = {
    "amount": amount,
    "type": type,
    "date": date
  };
  this.transactions.push(tObj);
};

Bank.prototype._createDate = function(date, month, year){
  var dateString = ""
  dateString += date || this.date.getDate(); 
  dateString += "/";
  dateString += month || this.date.getMonth();
  dateString += "/";
  dateString += year || this.date.getFullYear();
  return dateString;
};