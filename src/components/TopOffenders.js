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

  const cashFlows = [income, expenses, savings];

  // Component gathers each category of expenses and shows the highest spending.
  // Component will pull from the dispatch store of Items

console.log(cashFlows);


// Refine this
const offenderElements = cashFlows.map(item => {
  return item.map(item => {
    return (
    <div key={item.id}>
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
    <>
      {offenderElements}
    </>
  )
}

export default TopOffenders