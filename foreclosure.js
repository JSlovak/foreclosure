"use strict";

var steve;
var stevesLoan;
var month = 0;
var namedMonth = 0;
var monthsUntilEvicted;

var loan = function loan(){

    var account = {
      borrowed: 550000,
      balance:286000,
      monthlyPayment:1700,
      defaulted:0,
      defaultsToForclosure: 5,
      forclosed: false
    };

    function missPayment(){
      account.defaulted++;
      if (account.defaulted >= account.defaultsToForclosure){
        account.forclosed = true;
      }
    }

    function getBalance(){
      return account.balance;
    }

    function recievePayment(amount){
      if(amount < account.monthlyPayment){
        missPayment();
        } else
        {
          account.balance -= amount;
        }
    }

    function getMonthlyPayment(){
     return account.monthlyPayment;

    }

    function isForclosed(){
      return account.forclosed;
    }

    return {
      getBalance: getBalance(),
      recievePayment: recievePayment(),
      getMonthlyPayment: getMonthlyPayment(),
      isForclosed: isForclosed(),
    };

};

console.log(loan);

function borrower(){

    var account = {
      monthlyIncome: 1350,
      funds: 2800,
      loan: loan
    };
    console.log(account);


    function getFunds(){
      return account.funds;
    }
    console.log(getFunds);

    function makePayment(){
      if(account.funds > loan.getMonthlyPayment()){
        account.funds - loan.getMonthlyPayment();
      } else
        {
            loan.recievePayment(account.funds);
            account.funds = 0;
        }
    }

    function payDay(){
      account.funds = account.funds + borrower.monthlyIncome;
    }

    return {
      getFunds: getFunds(),
      makePayment: makePayment(),
      payDay: payDay()
    };

}

  stevesLoan = loan();
  steve = borrower(stevesLoan);
  while ( stevesLoan.forclosed === false){
    steve.payDay();
    steve.makePayment();
    month++;
  }

console.log(monthsUntilEvicted);