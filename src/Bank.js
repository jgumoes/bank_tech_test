class Bank {
  constructor(balance = 0){
    this.balance = balance;
    this.transactions = [];
    this.date = new Date();
  }
}

Bank.prototype.withdraw = function(amount, date = null, month = null, year = null) {
  this.balance -= amount;
  this._transaction(amount, "debit", this._createDate(date, month, year));
}

Bank.prototype.deposit = function(amount, date = null, month = null, year = null) {
  this.balance += amount;
  this._transaction(amount, "credit", this._createDate(date, month, year))
};

Bank.prototype.statement = function(){
  var fillAmount = {  // this function is officially declared as a Branch-Free Zone
    "credit": function (amount) { return amount.toFixed(2) + " || \t\t"},
    "debit": function (amount) { return "\t\t || " + amount.toFixed(2)}
  }
  
  var transArray = [];
  for(var trans of this.transactions){
    transArray.push(trans.date + " || " + fillAmount[trans.type](trans.amount) + " || " + trans.balance)
  }
  transArray.reverse();

  var bankStatement = "   date    || credit || debit || balance\n";
  return bankStatement + transArray.join("\n")
}

// quasi-private functions below

Bank.prototype._transaction = function(amount, type, date){
  // adds the transaction to the list of transactions
  const tObj = {
    "amount": amount,
    "type": type,
    "date": date,
    "balance": this.balance.toFixed(2)  // forces the balance to have 2 decimal places
  };
  this.transactions.push(tObj);
};

Bank.prototype._createDate = function(date, month, year){
  // converts the date to a string. If a parameter is null, it's replaced by today's parameter
  month = month || this.date.getMonth();
  if (month < 10){ month = "0" + month }
  return [
    date || this.date.getDate(),
    month,
    year || this.date.getFullYear()
    ].join("/")
};

// module.exports.Bank = Bank;