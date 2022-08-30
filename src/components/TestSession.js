import React from 'react';
import '../styles/testSession.css';
import Chart from 'chart.js/auto';

const TestSession = () => {

    const ctx = document.getElementById('myChart');

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const [income, setIncome] = React.useState({
        income1: "",
        income2: "",
    });
    const [expenses, setExpenses] = React.useState({
        rent: "",
        phone: "",
    });

    let totalIncome = Object.values(income).filter(item => {
        return parseInt(item);
    });

    let totalExpenses = Object.values(expenses).filter(item => {
        return parseInt(item);
    });


    // Add values of filtered array to display;
    function addValues(arr) {
        let calculables;
        if (arr.length === 1) return arr[0];

        if (arr.length > 0) {
            calculables = arr.reduce((a, b) => {
                return parseInt(a) + parseInt(b);
            })
        }
        return calculables
    };


    // console.log(addValues(totalIncome));


    function handleChange(e) {
        const name = e.target.name;
        const className = e.target.className;
        let value = e.target.value;

        // Check that value is Number only.
        if (isNaN(value)) return;

        //If value is empty string return zero
        // if (value === "") value = 0;


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
                <div className='stats'>
                    <h1>Budget imagery here</h1>
                    <h3>Income: {addValues(totalIncome)}</h3>
                    <h3>Allocated: {addValues(totalExpenses)}</h3>
                    <h3>Remaining: {addValues(totalIncome) - addValues(totalExpenses)}</h3>
                </div>
                <div className='chart'>
                    <canvas id="myChart" width="400" height="400"></canvas>

                </div>
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