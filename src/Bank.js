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

Bank.prototype.statement = function(){
  var fillAmount = {
    // this function is officially declared as a Branch-Free Zone
    "credit": function (amount) { return amount.toFixed(2) + " || \t"},
    "debit": function (amount) { return "\t || " + amount.toFixed(2)}
  }
  var balanceChange = {
    "credit": function (amount) { return amount},
    "debit": function (amount) { return - amount}
  }
  
  var runningBalance = 0.0;
  var transArray = [];
  for(t of this.transactions){
    var transAmount = t["amount"];
    runningBalance += balanceChange[t["type"]](transAmount);  // todo: add runningBalance to transactions and remove need for this line
    // todo: refactor this for loop into a map function
    transArray.push(t.date + " || " + fillAmount[t["type"]](transAmount) + " || " + runningBalance.toFixed(2));
  }
  transArray.reverse();

  var bankStatement = "date|| credit || debit || balance\n";
  return bankStatement + transArray.join("\n")
}

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
  var month = month || this.date.getMonth();
  if (month < 10){ dateString += 0 }
  dateString += month;
  dateString += "/";
  dateString += year || this.date.getFullYear();
  return dateString;
};