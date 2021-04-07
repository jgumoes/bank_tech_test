# Bank tech test

## Usage

to run tests, `open SpecRunner.html`


to create a new bank account:

```javascript
account = new Bank()  // create an account
```

to make a deposit:

```javascript
account.deposit(30, 7, 1, 2020) // deposit £30 into the account on 7th January, 2020
```

to make a withdrawal:

```javascript
account.withdraw(19.99, 20, 4, 2021) // withdraw £19.99 from the account on 20th April, 2021
```

to see your transaction history:

```javascript
account.statement() // prints your transactions as a table
```

to see your current balance:

```javascript
account.balance
```

## Theory of operation

Each time a transaction is made, a transaction object is added to the `account.transactions` array.
Each transaction object has the form:

```javascript
{
  "amount": amount,
  "type": type,
  "date": date,
  "balance": this.balance.toFixed(2)  // forces the balance to have 2 decimal places
};
```

### Functions

```javascript
Bank.prototype.withdraw(amount, date = null, month = null, year = null)
//  Adds a withdrawal to the transactions list. If date, month, or year are left blank, they will be filled with todays date.
//    Params:
//  - amount  : (int or float)    the amount to withdraw
//  - date    : (optional; int)   the day of the month the transaction takes place
//  - month   : (optional; int)   the month the transaction takes place
//  - year    : (optional; int)   the year the transaction takes place. must be the full year i.e. 2021


Bank.prototype.deposit(amount, date = null, month = null, year = null)
//  Adds a depost to the transactions list. If date, month, or year are left blank, they will be filled with todays date.
//    Params:
//  - amount  : (int or float)    the amount to deposit
//  - date    : (optional; int)   the day of the month the transaction takes place
//  - month   : (optional; int)   the month the transaction takes place
//  - year    : (optional; int)   the year the transaction takes place. must be the full year i.e. 2021


Bank.prototype.statement()
//  Prints all of the transactions as a table, in reverse chronological order.
```