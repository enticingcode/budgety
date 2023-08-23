import React from 'react'
import { useSelector } from 'react-redux'

/**
 * 
 * @param {*} props - cashFlow object with 3 arrays
 * @returns Top offending components
 */
function TopOffenders(props) {


  const income = props.cashFlow.incomeArr;
  const expenses = props.cashFlow.expenseArr;
  const savings = props.cashFlow.savingsArr;

  // const cashFlows = [income, expenses, savings]; // Array of three sets of Arrays

  // Component gathers each category of expenses and shows the highest spending.
  // Component will pull from the dispatch store of Items

  [
    {
      "date": "6/29/2023",
      "amount": "3000",
      "name": "LP",
      "id": "ljhuh4au",
      "category": "Income"
    },
    {
      "date": "7/18/2023",
      "amount": "30",
      "name": "test",
      "id": "lk8znxft",
      "category": "Income"
    },
    {
      "date": "7/18/2023",
      "amount": "400",
      "name": "bookmark",
      "id": "lk8zoolr",
      "category": "Income"
    }
  ],
    [],
    []

  // function getHighestOffender(arr) {
  //   if (!arr.length) return null;

  //   return arr.reduce((prev, current) => {
  //     console.log(prev, current);
  //     const currentAmount = parseInt(current.amount);
  //     return currentAmount > prev ? currentAmount : prev;
  //   }, parseInt(arr[0].amount));
  // };

  function getHighestOffender(arr) {
    if (!arr.length) return null;

    return arr.reduce((prev, current) => {
      let prevAmount = parseInt(prev.amount);
      let currAmount = parseInt(current.amount);

      console.log(prevAmount, currAmount);

      return currAmount > prevAmount ? current : prev;
    });
  };


  let highestIncome = getHighestOffender(income);
  let highestExpense = getHighestOffender(expenses);
  let highestSaving = getHighestOffender(savings);

  let offArr = [highestIncome, highestExpense, highestSaving];

  const offenders = offArr.map(item => {
    if(item == null) return null
    return (
      <div className="top-offender" key={item.id}>
        <p>{item.name}</p>
        <p>{item.amount}</p>
      </div>
    )
  })

  // Refine this
  // const offenderElements = cashFlows.map(item => {
  //   return item.map(item => {
  //     return (
  //       <div className="top-offender" key={item.id}>
  //         <p>{item.name}</p>
  //         <p>{item.amount}</p>
  //       </div>
  //     )
  //   })
  // });


  return (
    <div className="high-offenders">
      {offenders}
    </div>
  )
}

export default TopOffenders