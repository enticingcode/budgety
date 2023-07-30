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

  const cashFlows = [income, expenses, savings]; // Array of three sets of Arrays

  // Component gathers each category of expenses and shows the highest spending.
  // Component will pull from the dispatch store of Items


function getHighestOffender(arr) {
  if(!arr.length) return null;

  return arr.reduce((prev, current) => {
    const currentAmount = parseInt(current.amount);
    return currentAmount > prev ? currentAmount : prev;
  },parseInt(arr[0].amount));
};

  
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
  

  let highestIncomes = getHighestOffender(income);

  console.log(highestIncomes);


// Refine this
const offenderElements = cashFlows.map(item => {
  return item.map(item => {
    return (
    <div className="top-offender" key={item.id}>
      <p>{item.name}</p>
      <p>{item.amount}</p>
    </div>
  )
  })
});


// const offenderElements = cashFlows.map(item => {
//       return (
//         <div key={item.id}>
//           <p>{item.name}</p>
//           <p>{item.amount}</p>
//         </div>
//       )
//     });

  return (
    <div className="high-offenders">
      {offenderElements}
    </div>
  )
}

export default TopOffenders