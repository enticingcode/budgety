import React from 'react'
import '../styles/testSession.css'

const TestSession = () => {

    const [income, setIncome] = React.useState({
        income1: "",
        income2: "",
    });
    const [expenses, setExpenses] = React.useState({
        rent: "",
        phone: "",
    });

    let filteredIncome = Object.values(income).filter(num => !isNaN(num));

    let totalIncome = filteredIncome.filter(num => !isNaN(num)).reduce((a, b) => {
        return parseInt(a) + parseInt(b);
    })


    //  totalIncome = Object.values(income).reduce((a, b) => {
    //     return parseInt(a) + parseInt(b);
    // });

    let totalExpenses = Object.values(expenses).reduce((a, b) => a + b);



    function handleChange(e) {
        const name = e.target.name;
        const className = e.target.className;
        let value = e.target.value;

        if (isNaN(value)) return;


        console.log(value)


        if (name.includes('income')) {
            setIncome(prev => {
                return {
                    ...prev,
                    [name]: value,
                }
            })
        }
        else if (className.includes('expense')) {
            setExpenses(prev => {
                return {
                    ...prev,
                    [name]: value,
                }
            })
        }

    };

    // console.log(income, expenses)


    return (
        <div className='test-container'>
            <section className='main-display'>
                <h1>Budget imagery here</h1>
                <h3>Income: {totalIncome}</h3>
                <h3>Allocated: {totalExpenses}</h3>
                <h3>Remaining: {totalIncome - totalExpenses}</h3>
            </section>


            <section className='userInputs'>

                <div className='input-sections income-inputs'>

                    <label htmlFor='income1'>Income 1:</label>
                    <input
                        id='income1'
                        className='input-item'
                        name='income1'
                        onChange={handleChange}
                        value={income.income1}
                    ></input>

                    <label htmlFor='income2'>Income 2:</label>
                    <input
                        id='income2'
                        className='input-item'
                        name='income2'
                        onChange={handleChange}
                        value={income.income2}
                    ></input>
                </div>

                <div className='input-sections expense-inputs'>

                    <label htmlFor='rent-expense'>Rent:</label>
                    <input
                        id='rent-expense'
                        className='expense input-item'
                        name='rent'
                        onChange={handleChange}
                        value={expenses.rent}></input>

                    <label htmlFor='phone-expense'>Phone:</label>
                    <input
                        id='phone-expense'
                        className='expense input-item'
                        name='phone'
                        onChange={handleChange}
                        value={expenses.phone}></input>
                </div>
            </section>
        </div>

    );
};

export default TestSession