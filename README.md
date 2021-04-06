# Bank tech test

## Usage

to create a new bank account:

```javascript
account = new Bank()  // create an account with no funds

account = new Bank(800) // create an account with £800
```

to make a deposit:

```javascript
account.deposit(30) // deposit £30 into the account
```

to make a withdrawal:

```javascript
account.withdrawal(19.99) // withdraw £19.99 from the account
```

## Theory of operation

### Class

There will be one class, called Bank.

| method | 